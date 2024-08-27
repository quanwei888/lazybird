import uuid
from typing import Any, List

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy import func
from sqlmodel import Session, select

from app.api.deps import SessionDep, CurrentUser
from app.models import Project, ProjectCreate, ProjectUpdate, ProjectPublic, ProjectsPublic, Message

router = APIRouter()


@router.get("/", response_model=ProjectsPublic)
def read_projects(
        session: SessionDep, user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve projects.
    """

    if user.is_superuser:
        count_statement = select(func.count()).select_from(Project)
        count = session.exec(count_statement).one()
        statement = select(Project).offset(skip).limit(limit)
        projects = session.exec(statement).all()
    else:
        count_statement = (
            select(func.count())
            .select_from(Project)
            .where(Project.user_id == user.id)
        )
        count = session.exec(count_statement).one()
        statement = (
            select(Project)
            .where(Project.user_id == user.id)
            .offset(skip)
            .limit(limit)
        )
        projects = session.exec(statement).all()

    return ProjectsPublic(data=projects, count=count)


@router.get("/{id}", response_model=ProjectPublic)
def read_project(
        session: SessionDep,
        user: CurrentUser,
        id: int) -> Any:
    """
    Get project by ID.
    """
    project = session.get(Project, id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if not user.is_superuser and (project.user_id != user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return project


@router.post("/", response_model=ProjectPublic)
def create_project(
        session: SessionDep,
        user: CurrentUser,
        project_in: ProjectCreate
) -> Any:
    """
    Create new project.
    """
    project_data = project_in.model_dump()
    project_data["user_id"] = user.id
    project = Project(**project_data)
    session.add(project)
    session.commit()
    session.refresh(project)
    return project


@router.put("/{id}", response_model=ProjectPublic)
def update_project(
        session: SessionDep,
        user: CurrentUser,
        id: int,
        project_in: ProjectUpdate,
) -> Any:
    """
    Update a project.
    """
    project = session.get(Project, id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if not user.is_superuser and (project.user_id != user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    update_dict = project_in.model_dump(exclude_unset=True)
    project.sqlmodel_update(update_dict)
    session.add(project)
    session.commit()
    session.refresh(project)
    return project


@router.delete("/{id}")
def delete_project(
        session: SessionDep, user: CurrentUser, id: int
) -> Message:
    """
    Delete a project.
    """
    project = session.get(Project, id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if not user.is_superuser and (project.user_id != user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(project)
    session.commit()
    return Message(message="Project deleted successfully")
