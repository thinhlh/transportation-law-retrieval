from config.pg_database import Base, get_session
from sqlalchemy.dialects.postgresql import UUID
import uuid
from sqlmodel import Column, String, SQLModel, Field,  Relationship
from sqlalchemy.sql.expression import select


class User(SQLModel, table=True):
    id: str = Field(primary_key=True)
    username: str = Field(unique=True, nullable=False)
    password: str = Field(nullable=False)


select(User).join(Article).where().offset(3).limit(5)
