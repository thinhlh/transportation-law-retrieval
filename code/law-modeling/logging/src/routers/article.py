from datetime import date, datetime
from fastapi.routing import APIRouter
from fastapi.responses import HTMLResponse
from fastapi import Request

from models.article import Article
router = APIRouter()

@router.get('/article',response_class=HTMLResponse)
def get_article_template(request: Request, article: list[Article]):
    data = 'At ' + str(datetime.now()) + ' called /article'
    print(data)
    try:
        with open(f'../logs/{date.today()}.log', "a+") as f:
            f.write(data)
    finally:
        return { "message":None, "success":True, "data":data}