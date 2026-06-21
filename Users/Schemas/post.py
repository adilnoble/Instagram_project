from pydantic import BaseModel

class PostLikeCreate(BaseModel):
    post_id: int
    user_id: int


class PostLikeResponse(BaseModel):
    post_id: int
    user_id: int

    class Config:
        from_attributes = True


class PostCreate(BaseModel):
    user_id: int
    caption: str | None = None
    location: str | None = None
    visibility: str | None = None


class PostResponse(BaseModel):
    post_id: int
    user_id: int
    caption: str | None = None
    location: str | None = None
    visibility: str | None = None

    class Config:
        from_attributes = True


class PostCommentCreate(BaseModel):
    post_id: int
    user_id: int
    comment_text: str


class PostCommentResponse(BaseModel):
    comment_id: int
    post_id: int
    user_id: int
    comment_text: str

    class Config:
        from_attributes = True


class CommentReplyCreate(BaseModel):
    comment_id: int
    user_id: int
    reply_text: str


class CommentReplyResponse(BaseModel):
    reply_id: int
    comment_id: int
    user_id: int
    reply_text: str

    class Config:
        from_attributes = True
