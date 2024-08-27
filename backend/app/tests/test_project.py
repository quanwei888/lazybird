import uuid

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.db import engine
from app.models import Project


def create_random_project() -> Project:
    project = Project(name=str(uuid.uuid4()), user_id=1, data={})
    with Session(engine) as session:
        session.add(project)
        session.commit()
        session.refresh(project)
    return project


def test_create_project(client: TestClient):
    data = {
        "name": "Test Project",
        "data": {}
    }

    response = client.post(
        f"/project/",
        json=data,
    )

    # 检查响应状态码
    assert response.status_code == 200

    # 检查响应数据
    response_data = response.json()
    assert response_data["name"] == data["name"]
    assert response_data["data"] == data["data"]
    assert "id" in response_data


def test_read_projects(client: TestClient):
    response = client.get("/project/")
    assert response.status_code == 200
    response_data = response.json()
    assert "data" in response_data
    assert "count" in response_data


def test_read_project(client: TestClient):
    project = create_random_project()
    response = client.get(f"/project/{project.id}")
    print(response)
    assert response.status_code == 200
    print(11111)
    response_data = response.json()
    print(11111)
    assert response_data["id"] == project.id
    assert response_data["name"] == project.name
    assert response_data["data"] == project.data


def test_update_project(client: TestClient):
    project = create_random_project()
    update_data = {
        "id": project.id,
        "name": "Updated Project",
        "data": {"key": "value"}
    }

    response = client.put(f"/project/{project.id}", json=update_data)
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["id"] == project.id
    assert response_data["name"] == update_data["name"]
    assert response_data["data"] == update_data["data"]


def test_delete_project(client: TestClient):
    project = create_random_project()
    with Session(engine) as session:
        session.add(project)
        session.commit()
        session.refresh(project)

    response = client.delete(f"/project/{project.id}")
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["message"] == "Project deleted successfully"

    response = client.get(f"/project/{project.id}")
    assert response.status_code == 404
