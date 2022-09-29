from sqlalchemy.ext.declarative import as_declarative, declared_attr
from sqlalchemy import Column, Integer


@as_declarative()
class Base(object):
    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()
    id = Column(Integer, primary_key=True)
