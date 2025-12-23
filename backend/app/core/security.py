import secrets
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def generate_encoder_key() -> str:
    # A printable token users paste into their encoder config
    return secrets.token_urlsafe(32)

def hash_key(raw: str) -> str:
    return pwd_context.hash(raw)

def verify_key(raw: str, hashed: str) -> bool:
    return pwd_context.verify(raw, hashed)
