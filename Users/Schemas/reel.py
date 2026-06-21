from pydantic import BaseModel

class ReelCreate(BaseModel):
    user_id: int
    caption: str | None = None
    duration: int


class ReelResponse(BaseModel):
    reel_id: int
    user_id: int
    caption: str | None = None
    duration: int

    class Config:
        from_attributes = True


class ReelLikeCreate(BaseModel):
    reel_id: int
    user_id: int


class ReelLikeResponse(BaseModel):
    reel_id: int
    user_id: int

    class Config:
        from_attributes = True


class ReelCommentCreate(BaseModel):
    reel_id: int
    user_id: int
    comment_text: str


class ReelCommentResponse(BaseModel):
    reel_comment_id: int
    reel_id: int
    user_id: int
    comment_text: str

    class Config:
        from_attributes = True


class ReelCommentReplyCreate(BaseModel):
    reel_comment_id: int
    user_id: int
    reply_text: str


class ReelCommentReplyResponse(BaseModel):
    reply_id: int
    reel_comment_id: int
    user_id: int
    reply_text: str

    class Config:
        from_attributes = True
