from pydantic import BaseModel
class Article(BaseModel):
    id:str
    index: int
    title:str
    content:str