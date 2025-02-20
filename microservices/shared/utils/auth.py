import base64
import hashlib
import logging
import hmac
from typing import Union
import boto3
from fastapi import HTTPException
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger()

client = boto3.client(
    'cognito-idp',
    region_name=os.getenv('AWS_REGION'),
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
)

class Auth(BaseModel):
    username: str
    password: str
    new_password: Union[str, None] = None

class UserRegistration(BaseModel):
    username: str
    password: str

def calculate_secret_hash(username):
    message = username + os.getenv("CLIENT_ID")
    key = bytes(os.getenv("CLIENT_SECRET"), 'utf-8')
    return base64.b64encode(hmac.new(key, message.encode('utf-8'), digestmod=hashlib.sha256).digest()).decode()

def respond_to_new_password_challenge(session, username, new_password):
    try:
        response = client.respond_to_auth_challenge(
            ClientId=os.getenv('CLIENT_ID'),
            ChallengeName='NEW_PASSWORD_REQUIRED',
            Session=session,
            ChallengeResponses={
                "USERNAME": username,
                "NEW_PASSWORD": new_password,
                "SECRET_HASH": calculate_secret_hash(username)
            }
        )
        auth_result = response.get("AuthenticationResult")
        if auth_result and "AccessToken" in auth_result:
            return auth_result["AccessToken"]
        else:
            raise HTTPException(status_code=400, detail="Erreur: token d'accès non trouvé.")
    except Exception as e:
        logger.error(f"Erreur Cognito: {e}")
        raise HTTPException(status_code=400, detail="Une erreur est survenue lors du changement de mot de passe")

def authenticate(username: str, password: str, new_password: str = None):
    try:
        response = client.initiate_auth(
            AuthFlow="USER_PASSWORD_AUTH",
            AuthParameters={
                "USERNAME": username,
                "PASSWORD": password,
                "SECRET_HASH": calculate_secret_hash(username)
            },
            ClientId=os.getenv('CLIENT_ID'),
        )

        if response.get("ChallengeName") == "NEW_PASSWORD_REQUIRED":
            if not new_password:
                raise HTTPException(status_code=403, detail="Nouveau mot de passe requis")

            session = response["Session"]
            return respond_to_new_password_challenge(session, username, new_password)

        return response["AuthenticationResult"]["AccessToken"]

    except client.exceptions.NotAuthorizedException:
        raise HTTPException(status_code=401, detail="Mot de passe incorrect")

    except client.exceptions.UserNotFoundException:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")

def create_user(username: str, password: str):
    try:
        user_attributes = [
            {'Name': 'email', 'Value': username},
        ]

        response = client.sign_up(
            ClientId=os.getenv('CLIENT_ID'),
            SecretHash=calculate_secret_hash(username),
            Username=username,
            Password=password,
            UserAttributes=user_attributes
        )

        client.admin_confirm_sign_up(
            UserPoolId=os.getenv('USER_POOL_ID'),
            Username=username
        )

        return response["UserSub"]

    except client.exceptions.UsernameExistsException:
        raise HTTPException(status_code=400, detail="Cet utilisateur existe déjà")
    except client.exceptions.InvalidPasswordException as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Erreur lors de la création de l'utilisateur: {e}")
        raise HTTPException(status_code=500, detail="Erreur lors de la création de l'utilisateur")

