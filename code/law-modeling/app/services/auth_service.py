from fastapi.security.oauth2 import OAuth2PasswordBearer
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/token')


def register(username: str, password: str):
    pass
