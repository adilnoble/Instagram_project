from pydantic import BaseModel
from datetime import datetime

class RoleCreate(BaseModel):
    role_name: str
    description: str | None = None

class RoleResponse(BaseModel):
    role_id: int
    role_name: str
    description: str | None

    class Config:
        from_attributes = True

class UserRoleCreate(BaseModel):
    user_id: int
    role_id: int

class UserRoleResponse(BaseModel):
    user_id: int
    role_id: int
    assigned_at: datetime

    class Config:
        from_attributes = True
