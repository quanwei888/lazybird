import uuid

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.db import engine
from app.models import NodeType


def create_random_node_type() -> NodeType:
    node_type = NodeType(
        uuid=str(uuid.uuid4()),
        name="Random NodeType",
        projectId=1,
        user_id=1,
        is_private=True,
        option={},
        attribute_ids=[]
    )
    with Session(engine) as session:
        session.add(node_type)
        session.commit()
        session.refresh(node_type)
    return node_type


def test_create_node_type(client: TestClient):
    data = {
        "uuid": str(uuid.uuid4()),
        "name": "Test NodeType",
        "projectId": 1,
        "is_private": True,
        "option": {},
        "attribute_ids": []
    }

    response = client.post(
        f"/node_type/",
        json=data,
    )

    # 检查响应状态码
    assert response.status_code == 200

    # 检查响应数据
    response_data = response.json()
    assert response_data["name"] == data["name"]
    assert response_data["projectId"] == data["projectId"]
    assert response_data["is_private"] == data["is_private"]
    assert response_data["option"] == data["option"]
    assert response_data["attribute_ids"] == data["attribute_ids"]
    assert "id" in response_data


def test_read_node_types(client: TestClient):
    response = client.get("/node_type/")
    assert response.status_code == 200
    response_data = response.json()
    assert "data" in response_data
    assert "count" in response_data


def test_read_node_type(client: TestClient):
    node_type = create_random_node_type()
    response = client.get(f"/node_type/{node_type.id}")
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["id"] == node_type.id
    assert response_data["name"] == node_type.name
    assert response_data["projectId"] == node_type.projectId
    assert response_data["is_private"] == node_type.is_private
    assert response_data["option"] == node_type.option
    assert response_data["attribute_ids"] == node_type.attribute_ids


def test_update_node_type(client: TestClient):
    node_type = create_random_node_type()
    update_data = {
        "id": node_type.id,
        "name": "Updated NodeType",
        "uuid": node_type.uuid,
        "projectId": node_type.projectId,
        "is_private": node_type.is_private,
        "option": {"key": "value"},
        "attribute_ids": node_type.attribute_ids
    }

    response = client.put(f"/node_type/{node_type.id}", json=update_data)
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["id"] == node_type.id
    assert response_data["name"] == update_data["name"]
    assert response_data["projectId"] == update_data["projectId"]
    assert response_data["is_private"] == update_data["is_private"]
    assert response_data["option"] == update_data["option"]
    assert response_data["attribute_ids"] == update_data["attribute_ids"]


def test_delete_node_type(client: TestClient):
    node_type = create_random_node_type()
    with Session(engine) as session:
        session.add(node_type)
        session.commit()
        session.refresh(node_type)

    response = client.delete(f"/node_type/{node_type.id}")
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["message"] == "Node type deleted successfully"

    response = client.get(f"/node_type/{node_type.id}")
    assert response.status_code == 404
