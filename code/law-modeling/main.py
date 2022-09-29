from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import article, auth, document

app = FastAPI(
    title='Transportation Law Retrieval API',
    description='An API for transportation law retrieval',
    root_path='/api',
)


@app.on_event('startup')
def init_db():
    pass


ALLOW_ORIGINS = ["*"]
ALLOW_HEADERS = ["*"]
ALLOW_METHODS = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOW_ORIGINS,
    allow_credentials=True,
    allow_methods=ALLOW_METHODS,
    allow_headers=ALLOW_HEADERS,
)

ROUTERS = [
    article.router,
    auth.router,
    document.router,
]

for router in ROUTERS:
    app.include_router(router=router)


# @app.on_event('startup')
# async def on_startup():

#     pass

# # Dependency
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()
