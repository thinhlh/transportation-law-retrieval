from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os


def get_postgres_url():
    # return 'sqlite:///./sql_app.db'
    username = os.environ.get("POSTGRES_USER")
    password = os.environ.get("POSTGRES_PASSWORD")
    db_name = os.environ.get("POSTGRES_DB")
    host = os.environ.get("POSTGRES_HOST")
    port = os.environ.get("POSTGRES_PORT")

    return f'postgresql://{username}:{password}@{host}:{port}/{db_name}'


def get_engine():
    return create_engine(get_postgres_url())


def get_session():
    try:
        SessionLocal = sessionmaker(
            autocommit=False, autoflush=False, bind=get_engine())
        yield SessionLocal
    finally:
        SessionLocal.close_all()


Base = declarative_base()
