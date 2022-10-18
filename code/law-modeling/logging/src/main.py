from fastapi import FastAPI
from routers import article
app = FastAPI()

app.include_router(article.router)
