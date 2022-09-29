import uuid
from sqlalchemy import Column, String, Integer
from sqlalchemy.dialects.postgresql import UUID
from config.pg_database import Base


class Article(Base):
    __tablename__ = "article"

    id = Column(String, primary_key=True, default=uuid.uuid4())
    title = Column(String)
