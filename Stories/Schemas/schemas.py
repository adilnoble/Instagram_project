from pydantic import BaseModel

class StoryCreate(BaseModel):
    user_id: int


class StoryResponse(BaseModel):
    story_id: int
    user_id: int

    class Config:
        from_attributes = True


class StoryViewCreate(BaseModel):
    story_id: int
    viewer_id: int


class StoryViewResponse(BaseModel):
    story_id: int
    viewer_id: int

    class Config:
        from_attributes = True
