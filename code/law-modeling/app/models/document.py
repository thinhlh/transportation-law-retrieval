from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
import uuid
from config.pg_database import Base


class Document(Base):
    __tablename__ = "document"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    title = Column(String)
