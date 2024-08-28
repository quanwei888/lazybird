from datetime import datetime, timezone
from typing import Dict, List

from sqlalchemy import Column, JSON, UniqueConstraint
from sqlmodel import SQLModel, Field


class Message(SQLModel):
    message: str

class UserBase(SQLModel):
    name: str | None = Field(default=None, max_length=255)
    is_superuser: bool = False


class User(UserBase, table=True):
    id: int = Field(default=None, primary_key=True)


class AttributeBase(SQLModel):
    uuid: str
    node_type_id: int
    name: str
    type: str = "Attribute"
    value: Dict = Field(default_factory=dict, sa_column=Column(JSON))
    option: Dict = Field(default_factory=dict, sa_column=Column(JSON))
    mapping: Dict = Field(default_factory=dict, sa_column=Column(JSON))


class Attribute(AttributeBase, table=True):
    id: int = Field(default=None, primary_key=True)
    user_id: int
    create_time: datetime = Field(default_factory=lambda: datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"))
    mod_time: datetime = Field(default_factory=lambda: datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"))


class AttributeCreate(AttributeBase):
    create_time: datetime = Field(default_factory=lambda: datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"))


class AttributeUpdate(AttributeBase):
    uuid: str
    mod_time: datetime = Field(default_factory=lambda: datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"))


class AttributePublic(AttributeBase):
    id: int
    mod_time: datetime


class AttributesPublic(SQLModel):
    data: list[AttributePublic]
    count: int


class NodeTypeBase(SQLModel):
    name: str
    project_id: int
    is_private: bool = True
    data: Dict = Field(default_factory=dict, sa_column=Column(JSON))


class NodeType(NodeTypeBase, table=True):
    id: int = Field(default=None, primary_key=True)
    user_id: int
    create_time: datetime = Field(default_factory=lambda: datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"))
    mod_time: datetime = Field(default_factory=lambda: datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"))


class NodeTypeCreate(NodeTypeBase):
    create_time: datetime = Field(default_factory=lambda: datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"))


class NodeTypeUpdate(NodeTypeBase):
    mod_time: datetime = Field(default_factory=lambda: datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"))


class NodeTypePublic(NodeTypeBase):
    id: int
    mod_time: datetime


class NodeTypesPublic(SQLModel):
    data: list[NodeTypePublic]
    count: int


class NodeBase(SQLModel):
    uuid: str
    name: str
    projectId: int
    node_type_id: int
    parent_id: int
    user_id: int
    type: str = "Node"
    option: Dict = Field(default_factory=dict, sa_column=Column(JSON))
    attributes: Dict = Field(default_factory=dict, sa_column=Column(JSON))
    children: List[str] = Field(default_factory=list, sa_column=Column(JSON))


class Node(NodeBase, table=True):
    id: int = Field(default=None, primary_key=True)
    create_time: datetime = Field(default_factory=lambda: datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"))
    mod_time: datetime = Field(default_factory=lambda: datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"))


class NodeCreate(NodeBase):
    create_time: datetime = Field(default_factory=lambda: datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"))


class NodeUpdate(NodeBase):
    mod_time: datetime = Field(default_factory=lambda: datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"))


class NodePublic(NodeBase):
    id: int
    mod_time: datetime


class NodesPublic(SQLModel):
    data: list[NodePublic]
    count: int


class ProjectBase(SQLModel):
    name: str
    data: Dict = Field(default_factory=dict, sa_column=Column(JSON))


class Project(ProjectBase, table=True):
    id: int = Field(default=None, primary_key=True)
    user_id: int
    create_time: datetime = Field(default_factory=lambda: datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"))
    mod_time: datetime = Field(default_factory=lambda: datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"))


class ProjectCreate(ProjectBase):
    create_time: datetime = Field(default_factory=lambda: datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"))


class ProjectUpdate(ProjectBase):
    mod_time: datetime = Field(default_factory=lambda: datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"))


class ProjectPublic(ProjectBase):
    id: int
    create_time: datetime
    mod_time: datetime


class ProjectsPublic(SQLModel):
    data: list[ProjectPublic]
    count: int
