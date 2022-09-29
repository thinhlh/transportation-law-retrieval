from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


def get_postgres_url():
    # return 'sqlite:///./sql_app.db'
    # username = os.environ.get("POSTGRES_USER")
    # password = os.environ.get("POSTGRES_PASSWORD")
    # db_name = os.environ.get("POSTGRES_DB")
    # host = os.environ.get("POSTGRES_HOST")
    # port = os.environ.get("POSTGRES_HOST")

    # return f'postgresql://{username}:{password}@{host}:{port}/{db_name}'

    return 'postgresql://postgres:postgres@localhost:5433/law'


SQLALCHEMY_DATABASE_URL = get_postgres_url()

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
