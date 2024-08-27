from fastapi import APIRouter

from app.api.routes import project,node_type,attribute

api_router = APIRouter()
api_router.include_router(project.router, prefix="/project", tags=["project"])
api_router.include_router(node_type.router, prefix="/node_type", tags=["node_type"])
api_router.include_router(attribute.router, prefix="/attribute", tags=["attribute"])