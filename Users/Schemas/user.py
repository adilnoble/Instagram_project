from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    phone: str | None = None
    password_hash: str

class UserUpdate(BaseModel):
    email: str
    phone: str | None = None
    password_hash: str

class UserResponse(BaseModel):
    user_id: int
    email: str
    phone: str | None = None

    class Config:
        from_attributes = True
