from pydantic import BaseModel

class MessageCreate(BaseModel):
    sender_id: int
    message_type: str
    content: str


class MessageResponse(BaseModel):
    message_id: int
    sender_id: int
    message_type: str
    content: str

    class Config:
        from_attributes = True
