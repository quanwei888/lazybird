import uuid
from typing import Any, List

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy import func
from sqlmodel import Session, select, or_

from app.api.deps import SessionDep, CurrentUser
from app.models import NodeType, NodeTypeCreate, NodeTypeUpdate, NodeTypePublic, NodeTypesPublic, Message

router = APIRouter()


@router.get("/project_node_type/{project_id}", response_model=NodeTypesPublic)
def read_node_types(
        project_id: int, session: SessionDep, user: CurrentUser) -> Any:
    count_statement = (
        select(func.count())
        .select_from(NodeType)
        .where(NodeType.user_id == user.id)
        .where(NodeType.project_id == project_id)
    )
    count = session.exec(count_statement).one()
    statement = (
        select(NodeType)
        .where(
            or_(
                NodeType.user_id == user.id,
                NodeType.project_id == project_id
            ),
            NodeType.is_private == False
        )
    )
    node_types = session.exec(statement).all()

    return NodeTypesPublic(data=node_types, count=count)


@router.get("/{id}", response_model=NodeTypePublic)
def read_node_type(session: SessionDep, user: CurrentUser, id: int) -> Any:
    """
    Get node type by ID.
    """
    node_type = session.get(NodeType, id)
    if not node_type:
        raise HTTPException(status_code=404, detail="Node type not found")
    if not user.is_superuser and (node_type.user_id != user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return node_type


@router.post("/", response_model=NodeTypePublic)
def create_node_type(
        session: SessionDep, user: CurrentUser, node_type_in: NodeTypeCreate
) -> Any:
    """
    Create new node type.
    """
    node_type_data = node_type_in.dict()
    node_type_data["user_id"] = user.id
    node_type = NodeType(**node_type_data)
    session.add(node_type)
    session.commit()
    session.refresh(node_type)
    return node_type


@router.put("/{id}", response_model=NodeTypePublic)
def update_node_type(
        session: SessionDep,
        user: CurrentUser,
        id: int,
        node_type_in: NodeTypeUpdate,
) -> Any:
    """
    Update a node type.
    """
    node_type = session.get(NodeType, id)
    if not node_type:
        raise HTTPException(status_code=404, detail="Node type not found")
    if not user.is_superuser and (node_type.user_id != user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    update_dict = node_type_in.model_dump(exclude_unset=True)
    node_type.sqlmodel_update(update_dict)
    session.add(node_type)
    session.commit()
    session.refresh(node_type)
    return node_type


@router.delete("/{id}")
def delete_node_type(
        session: SessionDep, user: CurrentUser, id: int
) -> Message:
    """
    Delete a node type.
    """
    node_type = session.get(NodeType, id)
    if not node_type:
        raise HTTPException(status_code=404, detail="Node type not found")
    if not user.is_superuser and (node_type.user_id != user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(node_type)
    session.commit()
    return Message(message="Node type deleted successfully")
