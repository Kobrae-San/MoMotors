import jwt
import logging
from fastapi import HTTPException, Depends, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

logger = logging.getLogger(__name__)


class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)

        if not credentials:
            raise HTTPException(status_code=401, detail="Token d'authentification manquant")

        if credentials.scheme != "Bearer":
            raise HTTPException(status_code=401, detail="Schéma d'authentification invalide")

        try:
            payload = jwt.decode(credentials.credentials, options={"verify_signature": False})
            return payload
        except Exception as e:
            logger.error(f"Erreur lors de la vérification du token: {e}")
            raise HTTPException(status_code=401, detail="Token invalide ou expiré")


def get_current_user(payload=Depends(JWTBearer())):
    return {
        "sub": payload.get("sub"),  # ID unique Cognito
        "email": payload.get("email"),
        "username": payload.get("cognito:username", ""),
        "groups": payload.get("cognito:groups", [])
    }