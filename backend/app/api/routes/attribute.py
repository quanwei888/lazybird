import uuid
from typing import Any, List

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy import func
from sqlmodel import Session, select

from app.api.deps import SessionDep, CurrentUser
from app.models import Attribute, AttributeCreate, AttributeUpdate, AttributePublic, AttributesPublic, Message

router = APIRouter()


@router.get("/", response_model=AttributesPublic)
def read_attributes(
        session: SessionDep, user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve attributes.
    """

    if user.is_superuser:
        count_statement = select(func.count()).select_from(Attribute)
        count = session.exec(count_statement).one()
        statement = select(Attribute).offset(skip).limit(limit)
        attributes = session.exec(statement).all()
    else:
        count_statement = (
            select(func.count())
            .select_from(Attribute)
            .where(Attribute.user_id == user.id)
        )
        count = session.exec(count_statement).one()
        statement = (
            select(Attribute)
            .where(Attribute.user_id == user.id)
            .offset(skip)
            .limit(limit)
        )
        attributes = session.exec(statement).all()

    return AttributesPublic(data=attributes, count=count)


@router.get("/{id}", response_model=AttributePublic)
def read_attribute(session: SessionDep, user: CurrentUser, id: int) -> Any:
    """
    Get attribute by ID.
    """
    attribute = session.get(Attribute, id)
    if not attribute:
        raise HTTPException(status_code=404, detail="Attribute not found")
    if not user.is_superuser and (attribute.user_id != user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return attribute


@router.post("/", response_model=AttributePublic)
def create_attribute(
        session: SessionDep, user: CurrentUser, attribute_in: AttributeCreate
) -> Any:
    """
    Create new attribute.
    """
    attribute_data = attribute_in.dict()
    attribute_data["user_id"] = user.id
    attribute = Attribute(**attribute_data)
    session.add(attribute)
    session.commit()
    session.refresh(attribute)
    return attribute


@router.put("/{id}", response_model=AttributePublic)
def update_attribute(
        session: SessionDep,
        user: CurrentUser,
        id: int,
        attribute_in: AttributeUpdate,
) -> Any:
    """
    Update an attribute.
    """
    attribute = session.get(Attribute, id)
    if not attribute:
        raise HTTPException(status_code=404, detail="Attribute not found")
    if not user.is_superuser and (attribute.user_id != user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    update_dict = attribute_in.model_dump(exclude_unset=True)
    attribute.sqlmodel_update(update_dict)
    session.add(attribute)
    session.commit()
    session.refresh(attribute)
    return attribute


@router.delete("/{id}")
def delete_attribute(
        session: SessionDep, user: CurrentUser, id: int
) -> Message:
    """
    Delete an attribute.
    """
    attribute = session.get(Attribute, id)
    if not attribute:
        raise HTTPException(status_code=404, detail="Attribute not found")
    if not user.is_superuser and (attribute.user_id != user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(attribute)
    session.commit()
    return Message(message="Attribute deleted successfully")
