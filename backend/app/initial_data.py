import logging
from app.core.db import engine, init_db

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

from app.models import Attribute,Node,NodeType
from sqlmodel import Session, SQLModel

owner_id = 1
def init_attribute(session: Session) -> None:
    attributes = [
        Attribute(
            id=1,
            name="layout",
            value={"direction": "flex-col", "position": "justify-start items-start"},
            option={"editMode": "layout", "group": "Style"},
            type="LayoutAttribute",
            uuid="attr0",
            nodeTypeId="Stack",
            owner_id=owner_id
        ),
        Attribute(
            id=2,
            name="space",
            value="None",
            option={"editMode": "tab", "group": "Style"},
            mapping={"None": "", "S": "space-y-2", "M": "space-y-4", "L": "space-y-8"},
            type="MapStyleAttribute",
            uuid="space",
            nodeTypeId="Stack",
            owner_id=owner_id
        ),
        Attribute(
            id=3,
            name="padding",
            value="S",
            option={"editMode": "tab", "group": "Style"},
            mapping={"None": "", "S": "p-2", "M": "p-4", "L": "p-8"},
            type="MapStyleAttribute",
            uuid="padding",
            nodeTypeId="Stack",
            owner_id=owner_id
        ),
        Attribute(
            id=4,
            name="color",
            value="gray-700",
            option={"editMode": "color", "group": "Color"},
            mapping={
                "None": "",
                "gray-50": "gray-50",
                "gray-100": "gray-100",
                "gray-200": "gray-200",
                "gray-300": "gray-300",
                "gray-400": "gray-400",
                "gray-500": "gray-500",
                "gray-600": "gray-600",
                "gray-700": "gray-700",
                "gray-800": "gray-800",
                "gray-900": "gray-900"
            },
            type="ColorAttribute",
            uuid="color",
            nodeTypeId="Stack",
            owner_id=owner_id
        ),
        Attribute(
            id=5,
            name="background",
            value="None",
            option={"editMode": "color", "group": "Color"},
            mapping={
                "None": "",
                "gray-50": "gray-50",
                "gray-100": "gray-100",
                "gray-200": "gray-200",
                "gray-300": "gray-300",
                "gray-400": "gray-400",
                "gray-500": "gray-500",
                "gray-600": "gray-600",
                "gray-700": "gray-700",
                "gray-800": "gray-800",
                "gray-900": "gray-900"
            },
            type="BackgroundAttribute",
            uuid="background",
            nodeTypeId="Stack",
            owner_id=owner_id
        ),
        Attribute(
            id=6,
            name="width",
            value={"tag": "Fill", "size": "0"},
            option={"editMode": "size", "cssPrefix": "w", "group": "Size"},
            type="SizeAttribute",
            uuid="width",
            nodeTypeId="Stack",
            owner_id=owner_id
        ),
        Attribute(
            id=7,
            name="height",
            value={"tag": "Hug", "size": "0"},
            option={"editMode": "size", "cssPrefix": "h", "group": "Size"},
            type="SizeAttribute",
            uuid="height",
            nodeTypeId="Stack",
            owner_id=owner_id
        ),
        Attribute(
            id=8,
            name="border",
            value="Neutral",
            option={"editMode": "tab", "group": "Style"},
            mapping={
                "None": "",
                "Primary": "border border-primary",
                "Neutral": "border border-neutral-200"
            },
            type="MapStyleAttribute",
            uuid="border",
            nodeTypeId="Stack",
            owner_id=owner_id
        ),
        Attribute(
            id=9,
            name="corner",
            value="M",
            option={"editMode": "tab", "group": "Style"},
            mapping={"None": "", "S": "rounded-sm", "M": "rounded-md", "L": "rounded-lg"},
            type="MapStyleAttribute",
            uuid="corner",
            nodeTypeId="Stack",
            owner_id=owner_id
        ),
        Attribute(
            id=10,
            name="shadow",
            value="None",
            option={"editMode": "tab", "group": "Style"},
            mapping={"None": "", "S": "shadow-sm", "M": "shadow-md", "L": "shadow-lg"},
            type="MapStyleAttribute",
            uuid="shadow",
            nodeTypeId="Stack",
            owner_id=owner_id
        ),
        Attribute(
            id=11,
            name="font",
            value="M",
            option={"editMode": "tab", "group": "Style"},
            mapping={
                "XS": "text-sm",
                "S": "text-sm",
                "M": "text-md",
                "L": "text-lg",
                "XL": "text-xl"
            },
            type="MapStyleAttribute",
            uuid="font",
            nodeTypeId="Label",
            owner_id=owner_id
        ),
        Attribute(
            id=12,
            name="bold",
            value="Normal",
            option={"editMode": "tab", "group": "Style"},
            mapping={"Normal": "font-normal", "Bold": "font-bold"},
            type="MapStyleAttribute",
            uuid="bold",
            nodeTypeId="Label",
            owner_id=owner_id
        ),
        Attribute(
            id=13,
            name="color",
            value="gray-700",
            option={"editMode": "color", "group": "Color"},
            mapping={
                "None": "",
                "gray-50": "gray-50",
                "gray-100": "gray-100",
                "gray-200": "gray-200",
                "gray-300": "gray-300",
                "gray-400": "gray-400",
                "gray-500": "gray-500",
                "gray-600": "gray-600",
                "gray-700": "gray-700",
                "gray-800": "gray-800",
                "gray-900": "gray-900"
            },
            type="ColorAttribute",
            uuid="color",
            nodeTypeId="Label",
            owner_id=owner_id
        ),
        Attribute(
            id=14,
            name="background",
            value="None",
            option={"editMode": "color", "group": "Color"},
            mapping={
                "None": "",
                "gray-50": "gray-50",
                "gray-100": "gray-100",
                "gray-200": "gray-200",
                "gray-300": "gray-300",
                "gray-400": "gray-400",
                "gray-500": "gray-500",
                "gray-600": "gray-600",
                "gray-700": "gray-700",
                "gray-800": "gray-800",
                "gray-900": "gray-900"
            },
            type="BackgroundAttribute",
            uuid="background",
            nodeTypeId="Label",
            owner_id=owner_id
        ),
        Attribute(
            id=15,
            name="text",
            value="Hello World",
            option={"editMode": "text", "group": "Property"},
            type="PropsAttribute",
            uuid="text",
            nodeTypeId="Label",
            owner_id=owner_id
        ),
        Attribute(
            id=16,
            name="height",
            value={"tag": "Hug", "size": "0"},
            option={"editMode": "size", "cssPrefix": "h", "group": "Size"},
            type="SizeAttribute",
            uuid="height",
            nodeTypeId="Component",
            owner_id=owner_id
        ),
        Attribute(
            id=17,
            name="width",
            value={"tag": "Fill", "size": "0"},
            option={"editMode": "size", "cssPrefix": "w", "group": "Size"},
            type="SizeAttribute",
            uuid="width",
            nodeTypeId="Component",
            owner_id=owner_id
        ),
        Attribute(
            id=18,
            name="children",
            value=["Stack_0"],
            option={},
            type="ChildrenAttribute",
            uuid="children",
            nodeTypeId="Component",
            owner_id=owner_id
        ),
        Attribute(
            id=19,
            name="layout",
            value={"direction": "flex-col", "position": "justify-start items-start"},
            option={"editMode": "layout", "group": "Style"},
            type="LayoutAttribute",
            uuid="1",
            nodeTypeId="CardExample",
            owner_id=owner_id
        ),
        Attribute(
            id=20,
            name="space",
            value="None",
            option={"editMode": "tab", "group": "Style"},
            mapping={"None": "", "S": "space-y-2", "M": "space-y-4", "L": "space-y-8"},
            type="MapStyleAttribute",
            uuid="2",
            nodeTypeId="CardExample",
            owner_id=owner_id
        ),
        Attribute(
            id=21,
            name="padding",
            value="S",
            option={"editMode": "tab", "group": "Style"},
            mapping={"None": "", "S": "p-2", "M": "p-4", "L": "p-8"},
            type="MapStyleAttribute",
            uuid="3",
            nodeTypeId="CardExample",
            owner_id=owner_id
        ),
        Attribute(
            id=22,
            name="color",
            value="gray-700",
            option={"editMode": "color", "group": "Color"},
            mapping={
                "None": "",
                "gray-50": "gray-50",
                "gray-100": "gray-100",
                "gray-200": "gray-200",
                "gray-300": "gray-300",
                "gray-400": "gray-400",
                "gray-500": "gray-500",
                "gray-600": "gray-600",
                "gray-700": "gray-700",
                "gray-800": "gray-800",
                "gray-900": "gray-900"
            },
            type="ColorAttribute",
            uuid="4",
            nodeTypeId="CardExample",
            owner_id=owner_id
        ),
        Attribute(
            id=23,
            name="background",
            value="None",
            option={"editMode": "color", "group": "Color"},
            mapping={
                "None": "",
                "gray-50": "gray-50",
                "gray-100": "gray-100",
                "gray-200": "gray-200",
                "gray-300": "gray-300",
                "gray-400": "gray-400",
                "gray-500": "gray-500",
                "gray-600": "gray-600",
                "gray-700": "gray-700",
                "gray-800": "gray-800",
                "gray-900": "gray-900"
            },
            type="BackgroundAttribute",
            uuid="5",
            nodeTypeId="CardExample",
            owner_id=owner_id
        ),
        Attribute(
            id=24,
            name="width",
            value={"tag": "Fill", "size": "0"},
            option={"editMode": "size", "cssPrefix": "w", "group": "Size"},
            type="SizeAttribute",
            uuid="6",
            nodeTypeId="CardExample",
            owner_id=owner_id
        ),
        Attribute(
            id=25,
            name="height",
            value={"tag": "Hug", "size": "0"},
            option={"editMode": "size", "cssPrefix": "h", "group": "Size"},
            type="SizeAttribute",
            uuid="7",
            nodeTypeId="CardExample",
            owner_id=owner_id
        ),
        Attribute(
            id=26,
            name="border",
            value="Neutral",
            option={"editMode": "tab", "group": "Style"},
            mapping={
                "None": "",
                "Primary": "border border-primary",
                "Neutral": "border border-neutral-200"
            },
            type="MapStyleAttribute",
            uuid="8",
            nodeTypeId="CardExample",
            owner_id=owner_id
        ),
        Attribute(
            id=27,
            name="corner",
            value="M",
            option={"editMode": "tab", "group": "Style"},
            mapping={"None": "", "S": "rounded-sm", "M": "rounded-md", "L": "rounded-lg"},
            type="MapStyleAttribute",
            uuid="9",
            nodeTypeId="CardExample",
            owner_id=owner_id
        ),
        Attribute(
            id=28,
            name="shadow",
            value="None",
            option={"editMode": "tab", "group": "Style"},
            mapping={"None": "", "S": "shadow-sm", "M": "shadow-md", "L": "shadow-lg"},
            type="MapStyleAttribute",
            uuid="10",
            nodeTypeId="CardExample",
            owner_id=owner_id
        ),
        Attribute(
            id=29,
            name="children",
            value=["Stack_0"],
            option={},
            type="ChildrenAttribute",
            uuid="children",
            nodeTypeId="CardExample",
            owner_id=owner_id
        )
    ]

    for attribute in attributes:
        session.add(attribute)
    session.commit()


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
