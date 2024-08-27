import logging
from app.core.db import engine, init_db

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

from app.models import Attribute,Node,NodeType
from sqlmodel import Session, SQLModel

def init() -> None:
    with Session(engine) as session:
        init_db(session)
        #init_attribute(session)


def main() -> None:
    logger.info("Creating initial data")
    init()
    logger.info("Initial data created")


if __name__ == "__main__":
    # 删除现有表
    SQLModel.metadata.drop_all(engine)
    main()
