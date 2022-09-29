from app.models.user import User
from fastapi import Depends
from config.pg_database import get_session
from sqlalchemy.sql.expression import select
from sqlalchemy.orm import Session


class UserRepository:
    def get_user_by_username(username: str, db: Session = Depends(get_session)) -> User | None:
        result = db.execute(select(User).where(User.username == username))
        userRow = result.first()

        if userRow:
            user = User(**dict(userRow))
            return user
        return None
