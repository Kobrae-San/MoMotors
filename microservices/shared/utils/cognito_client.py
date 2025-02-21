import base64
import hashlib
import hmac
import os
import logging
import boto3
from fastapi import HTTPException
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger(__name__)

client = boto3.client(
    'cognito-idp',
    region_name=os.getenv('AWS_REGION'),
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
)

try:
    response = client.list_user_pools(MaxResults=1)
    print("Connexion AWS OK")
except Exception as e:
    print(f"Erreur de connexion AWS: {e}")

def calculate_secret_hash(username: str) -> str:
    message = username + os.getenv("CLIENT_ID")
    key = bytes(os.getenv("CLIENT_SECRET"), 'utf-8')
    return base64.b64encode(hmac.new(key, message.encode('utf-8'), digestmod=hashlib.sha256).digest()).decode()


def authenticate_cognito(username: str, password: str):
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
        return response["AuthenticationResult"]["AccessToken"]

    except client.exceptions.NotAuthorizedException:
        raise HTTPException(status_code=401, detail="Mot de passe incorrect")
    except client.exceptions.UserNotFoundException:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")


def create_user_cognito(username: str, password: str):
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
        logger.error(f"Erreur lors de la création de l'utilisateur dans Cognito: {e}")
        raise HTTPException(status_code=500, detail="Erreur lors de la création de l'utilisateur")
