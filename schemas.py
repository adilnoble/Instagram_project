
from pydantic import BaseModel
# ==========================
# POST LIKES
# ==========================

class PostLikeCreate(BaseModel):
    post_id: int
    user_id: int


class PostLikeResponse(BaseModel):
    post_id: int
    user_id: int

    class Config:
        from_attributes = True
# ==========================
# POSTS
# ==========================

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

# ==========================
# FOLLOWS
# ==========================

class FollowCreate(BaseModel):
    follower_id: int
    following_id: int


class FollowResponse(BaseModel):
    follower_id: int
    following_id: int

    class Config:
        from_attributes = True

from pydantic import BaseModel


# ==========================
# USERS
# ==========================

class UserCreate(BaseModel):
    email: str
    phone: str | None = None
    password_hash: str


class UserResponse(BaseModel):
    user_id: int
    email: str
    phone: str | None = None

    class Config:
        from_attributes = True


# ==========================
# PROFILES
# ==========================

class ProfileCreate(BaseModel):
    user_id: int
    username: str
    full_name: str | None = None
    bio: str | None = None
    profile_picture: str | None = None
    website: str | None = None
    account_type: str | None = None
    is_private: bool = False


class ProfileResponse(BaseModel):
    profile_id: int
    user_id: int
    username: str
    full_name: str | None = None
    bio: str | None = None
    profile_picture: str | None = None
    website: str | None = None
    account_type: str | None = None
    is_private: bool
    verified_status: bool

    class Config:
        from_attributes = True


# ==========================
# PROFILE STATS
# ==========================

class ProfileStatsCreate(BaseModel):
    user_id: int
    followers_count: int = 0
    following_count: int = 0
    posts_count: int = 0
    reels_count: int = 0


class ProfileStatsResponse(BaseModel):
    user_id: int
    followers_count: int
    following_count: int
    posts_count: int
    reels_count: int

    class Config:
        from_attributes = True

        # ==========================
# POST COMMENTS
# ==========================

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

        # ==========================
# COMMENT REPLIES
# ==========================

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

        # ==========================
# REELS
# ==========================

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

        # ==========================
# REEL LIKES
# ==========================

class ReelLikeCreate(BaseModel):
    reel_id: int
    user_id: int


class ReelLikeResponse(BaseModel):
    reel_id: int
    user_id: int

    class Config:
        from_attributes = True

     # ==========================
# REEL COMMENTS
# ==========================

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

        # ==========================
# REEL COMMENT REPLIES
# ==========================

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

        # ==========================
# STORIES
# ==========================

class StoryCreate(BaseModel):
    user_id: int


class StoryResponse(BaseModel):
    story_id: int
    user_id: int

    class Config:
        from_attributes = True

        # ==========================
# MESSAGES
# ==========================

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

        # ==========================
# STORY VIEWS
# ==========================

class StoryViewCreate(BaseModel):
    story_id: int
    viewer_id: int


class StoryViewResponse(BaseModel):
    story_id: int
    viewer_id: int

    class Config:
        from_attributes = True

        # ==========================
# NOTIFICATIONS
# ==========================

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