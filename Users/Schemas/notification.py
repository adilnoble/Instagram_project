from pydantic import BaseModel

class NotificationCreate(BaseModel):
    receiver_id: int
    actor_id: int
    notification_type: str
    reference_id: int


class NotificationResponse(BaseModel):
    notification_id: int
    receiver_id: int
    actor_id: int
    notification_type: str
    reference_id: int
    is_read: bool

    class Config:
        from_attributes = True
