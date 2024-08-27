import uuid
from pprint import pprint

from sqlalchemy import Column, String, Text, JSON
from sqlmodel import SQLModel, Session, create_engine, Field, select
from datetime import datetime, timezone
from typing import Dict, List

DATABASE_URL = "mysql+pymysql://admin:111111@localhost/testdb"
engine = create_engine(DATABASE_URL, echo=True)

class Attribute(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str = Field(unique=True)
    owner_id: int
    value: Dict = Field(default_factory=dict, sa_column=Column(JSON))  # Use JSON
    option: Dict = Field(default_factory=dict, sa_column=Column(JSON))  # Use JSON
    mapping: Dict = Field(default_factory=dict, sa_column=Column(JSON))  # Use JSON
    create_time: datetime = Field(default_factory=lambda: datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"))
    mod_time: datetime = Field(default_factory=lambda: datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"))

class NodeType(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str = Field(unique=True)
    owner_id: int
    option: Dict = Field(default_factory=dict, sa_column=Column(JSON))  # Use JSON
    attribute_ids: List[int] = Field(default_factory=list, sa_column=Column(JSON))  # Use JSON
    create_time: datetime = Field(default_factory=lambda: datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"))
    mod_time: datetime = Field(default_factory=lambda: datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"))

class Node(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str = Field(unique=True)
    nodeTypeId: int
    parentId: int
    owner_id: int
    option: Dict = Field(default_factory=dict, sa_column=Column(JSON))  # Use JSON
    attributes: Dict = Field(default_factory=dict, sa_column=Column(JSON))  # Use JSON
    children: List[int] = Field(default_factory=list, sa_column=Column(JSON))  # Use JSON
    create_time: datetime = Field(default_factory=lambda: datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"))
    mod_time: datetime = Field(default_factory=lambda: datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"))

# 删除现有表
SQLModel.metadata.drop_all(engine)

# 创建数据库表
SQLModel.metadata.create_all(engine)

def create_sample_data(session: Session):
    attribute = Attribute(name="Color", owner_id=1, value="Red")
    node_type = NodeType(name="TypeA", owner_id=1, attribute_ids=[1])
    node = Node(name="Node1", nodeTypeId=1, parentId=0, owner_id=1, attributes={"Color": "Red"})

    session.add(attribute)
    session.add(node_type)
    session.add(node)
    session.commit()

def read_data(session: Session):
    attributes = session.exec(select(Attribute)).all()
    node_types = session.exec(select(NodeType)).all()
    nodes = session.exec(select(Node)).all()

    print("Attributes:")
    pprint(attributes)
    print("Node Types:")
    pprint(node_types)
    print("Nodes:")
    pprint(nodes)

def update_data(session: Session):
    attribute = session.exec(select(Attribute).where(Attribute.name == "Color")).first()
    if attribute:
        attribute.value = "Blue"
        session.add(attribute)
        session.commit()

def delete_data(session: Session):
    attribute = session.exec(select(Attribute).where(Attribute.name == "Color")).first()
    if attribute:
        session.delete(attribute)
        session.commit()

def main():
    with Session(engine) as session:
        create_sample_data(session)
        read_data(session)
        update_data(session)
        read_data(session)
        #delete_data(session)
        read_data(session)

if __name__ == "__main__":
    main()
