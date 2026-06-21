from pydantic import BaseModel

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
