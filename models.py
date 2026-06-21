from sqlalchemy import (
    Column,
    BigInteger,
    Integer,
    String,
    Boolean,
    DateTime,
    ForeignKey,
    Text
)

from sqlalchemy.orm import relationship

from database import Base

BigIntegerID = BigInteger().with_variant(Integer, 'sqlite')


# ==================================
# USERS
# ==================================

class User(Base):
    __tablename__ = "users"

    user_id = Column(
        BigIntegerID,
        primary_key=True,
        autoincrement=True
    )

    email = Column(
        String(255),
        unique=True,
        nullable=False
    )

    phone = Column(String(20))

    password_hash = Column(
        String(255),
        nullable=False
    )

    status = Column(String(50))

    created_at = Column(DateTime)

    last_login = Column(DateTime)

    # Relationships
    profile = relationship(
        "Profile",
        back_populates="user",
        uselist=False
    )

    profile_stats = relationship(
        "ProfileStats",
        back_populates="user",
        uselist=False
    )

    user_roles = relationship(
        "UserRole",
        back_populates="user"
    )


# ==================================
# ROLES
# ==================================

class Role(Base):
    __tablename__ = "roles"

    role_id = Column(
        BigIntegerID,
        primary_key=True,
        autoincrement=True
    )

    role_name = Column(
        String(100),
        unique=True,
        nullable=False
    )

    description = Column(Text)

    user_roles = relationship(
        "UserRole",
        back_populates="role"
    )



# USER ROLES


class UserRole(Base):
    __tablename__ = "user_roles"

    user_id = Column(
        BigIntegerID,
        ForeignKey("users.user_id"),
        primary_key=True
    )

    role_id = Column(
        BigIntegerID,
        ForeignKey("roles.role_id"),
        primary_key=True
    )

    assigned_at = Column(DateTime)

    user = relationship(
        "User",
        back_populates="user_roles"
    )

    role = relationship(
        "Role",
        back_populates="user_roles"
    )



# PROFILES


class Profile(Base):
    __tablename__ = "profiles"

    profile_id = Column(
        BigIntegerID,
        primary_key=True,
        autoincrement=True
    )

    user_id = Column(
        BigIntegerID,
        ForeignKey("users.user_id"),
        unique=True
    )

    username = Column(
        String(100),
        unique=True,
        nullable=False
    )

    full_name = Column(String(255))

    bio = Column(Text)

    profile_picture = Column(String(500))

    website = Column(String(255))

    account_type = Column(String(50))

    is_private = Column(
        Boolean,
        default=False
    )

    verified_status = Column(
        Boolean,
        default=False
    )

    user = relationship(
        "User",
        back_populates="profile"
    )


# 
# PROFILE STATS
# ==================================

class ProfileStats(Base):
    __tablename__ = "profile_stats"

    user_id = Column(
        BigIntegerID,
        ForeignKey("users.user_id"),
        primary_key=True
    )

    followers_count = Column(
        Integer,
        default=0
    )

    following_count = Column(
        Integer,
        default=0
    )

    posts_count = Column(
        Integer,
        default=0
    )

    reels_count = Column(
        Integer,
        default=0
    )

    user = relationship(
        "User",
        back_populates="profile_stats"
    )
# ==================================
# FOLLOWS
# ==================================

class Follow(Base):
    __tablename__ = "follows"

    follower_id = Column(
        BigIntegerID,
        ForeignKey("users.user_id"),
        primary_key=True
    )

    following_id = Column(
        BigIntegerID,
        ForeignKey("users.user_id"),
        primary_key=True
    )

    followed_at = Column(DateTime)
 # ==================================
# POSTS
# ==================================

class Post(Base):
    __tablename__ = "posts"

    post_id = Column(
        BigIntegerID,
        primary_key=True,
        autoincrement=True
    )

    user_id = Column(
        BigIntegerID,
        ForeignKey("users.user_id")
    )

    caption = Column(Text)

    location = Column(String(255))

    visibility = Column(String(50))

    created_at = Column(DateTime)

    # ==================================
# POST LIKES
# ==================================

class PostLike(Base):
    __tablename__ = "post_likes"

    post_id = Column(
        BigIntegerID,
        ForeignKey("posts.post_id"),
        primary_key=True
    )

    user_id = Column(
        BigIntegerID,
        ForeignKey("users.user_id"),
        primary_key=True
    )

    liked_at = Column(DateTime)

    # ==================================
# POST COMMENTS
# ==================================

class PostComment(Base):
    __tablename__ = "post_comments"

    comment_id = Column(
        BigIntegerID,
        primary_key=True,
        autoincrement=True
    )

    post_id = Column(
        BigIntegerID,
        ForeignKey("posts.post_id")
    )

    user_id = Column(
        BigIntegerID,
        ForeignKey("users.user_id")
    )

    comment_text = Column(Text)

    created_at = Column(DateTime)

    # ==================================
# COMMENT REPLIES
# ==================================

class CommentReply(Base):
    __tablename__ = "comment_replies"

    reply_id = Column(
        BigIntegerID,
        primary_key=True,
        autoincrement=True
    )

    comment_id = Column(
        BigIntegerID,
        ForeignKey("post_comments.comment_id")
    )

    user_id = Column(
        BigIntegerID,
        ForeignKey("users.user_id")
    )

    reply_text = Column(Text)

    created_at = Column(DateTime)

    # ==================================
# REELS
# ==================================

class Reel(Base):
    __tablename__ = "reels"

    reel_id = Column(
        BigIntegerID,
        primary_key=True,
        autoincrement=True
    )

    user_id = Column(
        BigIntegerID,
        ForeignKey("users.user_id")
    )

    caption = Column(Text)

    duration = Column(Integer)

    created_at = Column(DateTime)

    # ==================================
# REEL LIKES
# ==================================

class ReelLike(Base):
    __tablename__ = "reel_likes"

    reel_id = Column(
        BigIntegerID,
        ForeignKey("reels.reel_id"),
        primary_key=True
    )

    user_id = Column(
        BigIntegerID,
        ForeignKey("users.user_id"),
        primary_key=True
    )

    liked_at = Column(DateTime)

    # ==================================
# REEL COMMENTS
# ==================================

class ReelComment(Base):
    __tablename__ = "reel_comments"

    reel_comment_id = Column(
        BigIntegerID,
        primary_key=True,
        autoincrement=True
    )

    reel_id = Column(
        BigIntegerID,
        ForeignKey("reels.reel_id")
    )

    user_id = Column(
        BigIntegerID,
        ForeignKey("users.user_id")
    )

    comment_text = Column(Text)

    # ==================================
# REEL COMMENT REPLIES
# ==================================

class ReelCommentReply(Base):
    __tablename__ = "reel_comment_replies"

    reply_id = Column(
        BigIntegerID,
        primary_key=True,
        autoincrement=True
    )

    reel_comment_id = Column(
        BigIntegerID,
        ForeignKey("reel_comments.reel_comment_id")
    )

    user_id = Column(
        BigIntegerID,
        ForeignKey("users.user_id")
    )

    reply_text = Column(Text)

    # ==================================
# STORIES
# ==================================

class Story(Base):
    __tablename__ = "stories"

    story_id = Column(
        BigIntegerID,
        primary_key=True,
        autoincrement=True
    )

    user_id = Column(
        BigIntegerID,
        ForeignKey("users.user_id")
    )

    expires_at = Column(DateTime)

    created_at = Column(DateTime)

   # ==================================
# MESSAGES
# ==================================

class Message(Base):
    __tablename__ = "messages"

    message_id = Column(
        BigIntegerID,
        primary_key=True,
        autoincrement=True
    )

    sender_id = Column(
        BigIntegerID,
        ForeignKey("users.user_id")
    )

    message_type = Column(
        String(50)
    )

    content = Column(Text)

    sent_at = Column(DateTime)

    # ==================================
# STORY VIEWS
# ==================================

class StoryView(Base):
    __tablename__ = "story_views"

    story_id = Column(
        BigIntegerID,
        ForeignKey("stories.story_id"),
        primary_key=True
    )

    viewer_id = Column(
        BigIntegerID,
        ForeignKey("users.user_id"),
        primary_key=True
    )

    viewed_at = Column(DateTime)

    # ==================================
# NOTIFICATIONS
# ==================================

class Notification(Base):
    __tablename__ = "notifications"

    notification_id = Column(
        BigIntegerID,
        primary_key=True,
        autoincrement=True
    )

    receiver_id = Column(
        BigIntegerID,
        ForeignKey("users.user_id")
    )

    actor_id = Column(
        BigIntegerID,
        ForeignKey("users.user_id")
    )

    notification_type = Column(
        String(50)
    )

    reference_id = Column(
        BigIntegerID
    )

    is_read = Column(
        Boolean,
        default=False
    )