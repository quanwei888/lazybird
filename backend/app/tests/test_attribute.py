import uuid

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.db import engine
from app.models import Attribute


def create_random_attribute() -> Attribute:
    attribute = Attribute(
        uuid=str(uuid.uuid4()),
        name="Random Attribute",
        user_id=1,
        value={},
        node_type_id=1,
    )
    with Session(engine) as session:
        session.add(attribute)
        session.commit()
        session.refresh(attribute)
    return attribute


def test_create_attribute(client: TestClient):
    data = {
        "uuid": str(uuid.uuid4()),
        "name": "Test Attribute",
        "value": {},
        "node_type_id": 1
    }

    response = client.post(
        f"/attribute/",
        json=data,
    )

    # 检查响应状态码
    assert response.status_code == 200

    # 检查响应数据
    response_data = response.json()
    assert response_data["name"] == data["name"]
    assert response_data["value"] == data["value"]
    assert response_data["node_type_id"] == data["node_type_id"]
    assert "id" in response_data


def test_read_attributes(client: TestClient):
    response = client.get("/attribute/")
    assert response.status_code == 200
    response_data = response.json()
    assert "data" in response_data
    assert "count" in response_data


def test_read_attribute(client: TestClient):
    attribute = create_random_attribute()
    response = client.get(f"/attribute/{attribute.id}")
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["id"] == attribute.id
    assert response_data["name"] == attribute.name
    assert response_data["value"] == attribute.value
    assert response_data["node_type_id"] == attribute.node_type_id


def test_update_attribute(client: TestClient):
    attribute = create_random_attribute()
    update_data = {
        "id": attribute.id,
        "name": "Updated Attribute",
        "uuid": attribute.uuid,
        "value": {"key": "value"},
        "node_type_id": attribute.node_type_id
    }

    response = client.put(f"/attribute/{attribute.id}", json=update_data)
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["id"] == attribute.id
    assert response_data["name"] == update_data["name"]
    assert response_data["value"] == update_data["value"]
    assert response_data["node_type_id"] == update_data["node_type_id"]


def test_delete_attribute(client: TestClient):
    attribute = create_random_attribute()
    with Session(engine) as session:
        session.add(attribute)
        session.commit()
        session.refresh(attribute)

    response = client.delete(f"/attribute/{attribute.id}")
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["message"] == "Attribute deleted successfully"

    response = client.get(f"/attribute/{attribute.id}")
    assert response.status_code == 404
