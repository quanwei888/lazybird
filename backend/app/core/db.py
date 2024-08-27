from sqlmodel import Session, create_engine

from app.core.config import settings

engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI), echo=True)

def init_db(session: Session) -> None:
    from app.models import SQLModel
    from app.core.db import engine
    SQLModel.metadata.create_all(engine)
