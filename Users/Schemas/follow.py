from pydantic import BaseModel

class FollowCreate(BaseModel):
    follower_id: int
    following_id: int


class FollowResponse(BaseModel):
    follower_id: int
    following_id: int

    class Config:
        from_attributes = True
