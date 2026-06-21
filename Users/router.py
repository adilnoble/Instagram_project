from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from Setting import get_db
from Users.CRUD import (
    create_user, get_all_users, get_user_by_id, update_user,
    create_follow, get_followers, get_following,
    create_message, get_all_messages, get_message_by_id,
    create_notification, get_all_notifications, get_notification_by_id,
    create_post, get_all_posts, get_post_by_id,
    create_post_like, get_post_likes,
    create_post_comment, get_post_comments,
    create_comment_reply, get_comment_replies,
    create_profile, get_all_profiles, get_profile_by_id,
    create_profile_stats, get_all_profile_stats, get_profile_stats_by_user,
    create_reel, get_all_reels, get_reel_by_id,
    create_reel_like, get_reel_likes,
    create_reel_comment, get_reel_comments,
    create_reel_comment_reply, get_reel_comment_replies,
    create_story, get_all_stories, get_story_by_id,
    create_story_view, get_story_views
)
from Users.Schemas import (
    UserCreate, UserResponse, UserUpdate,
    FollowCreate, FollowResponse,
    MessageCreate, MessageResponse,
    NotificationCreate, NotificationResponse,
    PostCreate, PostResponse,
    PostLikeCreate, PostLikeResponse,
    PostCommentCreate, PostCommentResponse,
    CommentReplyCreate, CommentReplyResponse,
    ProfileCreate, ProfileResponse,
    ProfileStatsCreate, ProfileStatsResponse,
    ReelCreate, ReelResponse,
    ReelLikeCreate, ReelLikeResponse,
    ReelCommentCreate, ReelCommentResponse,
    ReelCommentReplyCreate, ReelCommentReplyResponse,
    StoryCreate, StoryResponse,
    StoryViewCreate, StoryViewResponse
)

# ----------------------------------------------------
# Users Routers
# ----------------------------------------------------
router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.post("/", response_model=UserResponse)
async def create_user_api(
    user: UserCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_user(
        db=db,
        email=user.email,
        phone=user.phone,
        password_hash=user.password_hash
    )

@router.get("/", response_model=List[UserResponse])
async def get_users_api(
    db: AsyncSession = Depends(get_db)
):
    return await get_all_users(db)

@router.get("/{user_id}", response_model=UserResponse)
async def get_user_api(
    user_id: int,
    db: AsyncSession = Depends(get_db)
):
    user = await get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    return user

@router.put("/{user_id}", response_model=UserResponse)
async def update_user_api(
    user_id: int,
    user: UserUpdate,
    db: AsyncSession = Depends(get_db)
):
    updated_user = await update_user(
        db=db,
        user_id=user_id,
        email=user.email,
        phone=user.phone,
        password_hash=user.password_hash
    )
    if not updated_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    return updated_user


# ----------------------------------------------------
# Follows Routers
# ----------------------------------------------------
follows_router = APIRouter(
    prefix="/follows",
    tags=["Follows"]
)

@follows_router.post("/", response_model=FollowResponse)
async def create_follow_api(
    follow: FollowCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_follow(
        db=db,
        follower_id=follow.follower_id,
        following_id=follow.following_id
    )

@follows_router.get("/followers/{user_id}", response_model=List[FollowResponse])
async def get_followers_api(
    user_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await get_followers(db, user_id)

@follows_router.get("/following/{user_id}", response_model=List[FollowResponse])
async def get_following_api(
    user_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await get_following(db, user_id)


# ----------------------------------------------------
# Messages Routers
# ----------------------------------------------------
messages_router = APIRouter(
    prefix="/messages",
    tags=["Messages"]
)

@messages_router.post("/", response_model=MessageResponse)
async def create_message_api(
    message: MessageCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_message(
        db=db,
        sender_id=message.sender_id,
        message_type=message.message_type,
        content=message.content
    )

@messages_router.get("/", response_model=List[MessageResponse])
async def get_messages_api(
    db: AsyncSession = Depends(get_db)
):
    return await get_all_messages(db)

@messages_router.get("/{message_id}", response_model=MessageResponse)
async def get_message_api(
    message_id: int,
    db: AsyncSession = Depends(get_db)
):
    msg = await get_message_by_id(db, message_id)
    if not msg:
        raise HTTPException(
            status_code=404,
            detail="Message not found"
        )
    return msg


# ----------------------------------------------------
# Notifications Routers
# ----------------------------------------------------
notifications_router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)

@notifications_router.post("/", response_model=NotificationResponse)
async def create_notification_api(
    notification: NotificationCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_notification(
        db=db,
        receiver_id=notification.receiver_id,
        actor_id=notification.actor_id,
        notification_type=notification.notification_type,
        reference_id=notification.reference_id
    )

@notifications_router.get("/", response_model=List[NotificationResponse])
async def get_notifications_api(
    db: AsyncSession = Depends(get_db)
):
    return await get_all_notifications(db)

@notifications_router.get("/{notification_id}", response_model=NotificationResponse)
async def get_notification_api(
    notification_id: int,
    db: AsyncSession = Depends(get_db)
):
    notif = await get_notification_by_id(db, notification_id)
    if not notif:
        raise HTTPException(
            status_code=404,
            detail="Notification not found"
        )
    return notif


# ----------------------------------------------------
# Profiles Routers
# ----------------------------------------------------
profile_router = APIRouter(
    prefix="/profiles",
    tags=["Profiles"]
)

profile_stats_router = APIRouter(
    prefix="/profile-stats",
    tags=["Profile Stats"]
)

@profile_router.post("/", response_model=ProfileResponse)
async def create_profile_api(
    profile: ProfileCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_profile(
        db=db,
        user_id=profile.user_id,
        username=profile.username,
        full_name=profile.full_name,
        bio=profile.bio,
        profile_picture=profile.profile_picture,
        website=profile.website,
        account_type=profile.account_type,
        is_private=profile.is_private
    )

@profile_router.get("/", response_model=List[ProfileResponse])
async def get_profiles_api(
    db: AsyncSession = Depends(get_db)
):
    return await get_all_profiles(db)

@profile_router.get("/{profile_id}", response_model=ProfileResponse)
async def get_profile_api(
    profile_id: int,
    db: AsyncSession = Depends(get_db)
):
    profile = await get_profile_by_id(db, profile_id)
    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )
    return profile

@profile_stats_router.post("/", response_model=ProfileStatsResponse)
async def create_profile_stats_api(
    stats: ProfileStatsCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_profile_stats(
        db=db,
        user_id=stats.user_id,
        followers_count=stats.followers_count,
        following_count=stats.following_count,
        posts_count=stats.posts_count,
        reels_count=stats.reels_count
    )

@profile_stats_router.get("/", response_model=List[ProfileStatsResponse])
async def get_profile_stats_api(
    db: AsyncSession = Depends(get_db)
):
    return await get_all_profile_stats(db)

@profile_stats_router.get("/{user_id}", response_model=ProfileStatsResponse)
async def get_profile_stats_by_user_api(
    user_id: int,
    db: AsyncSession = Depends(get_db)
):
    stats = await get_profile_stats_by_user(db, user_id)
    if not stats:
        raise HTTPException(
            status_code=404,
            detail="Profile stats not found"
        )
    return stats


# ----------------------------------------------------
# Posts Routers
# ----------------------------------------------------
posts_router = APIRouter(
    prefix="/posts",
    tags=["Posts"]
)

post_likes_router = APIRouter(
    prefix="/post-likes",
    tags=["Post Likes"]
)

post_comments_router = APIRouter(
    prefix="/post-comments",
    tags=["Post Comments"]
)

comment_replies_router = APIRouter(
    prefix="/comment-replies",
    tags=["Comment Replies"]
)

@posts_router.post("/", response_model=PostResponse)
async def create_post_api(
    post: PostCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_post(
        db=db,
        user_id=post.user_id,
        caption=post.caption,
        location=post.location,
        visibility=post.visibility
    )

@posts_router.get("/", response_model=List[PostResponse])
async def get_posts_api(
    db: AsyncSession = Depends(get_db)
):
    return await get_all_posts(db)

@posts_router.get("/{post_id}", response_model=PostResponse)
async def get_post_api(
    post_id: int,
    db: AsyncSession = Depends(get_db)
):
    p = await get_post_by_id(db, post_id)
    if not p:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )
    return p

@post_likes_router.post("/", response_model=PostLikeResponse)
async def create_post_like_api(
    like: PostLikeCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_post_like(
        db=db,
        post_id=like.post_id,
        user_id=like.user_id
    )

@post_likes_router.get("/{post_id}", response_model=List[PostLikeResponse])
async def get_post_likes_api(
    post_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await get_post_likes(db, post_id)

@post_comments_router.post("/", response_model=PostCommentResponse)
async def create_post_comment_api(
    comment: PostCommentCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_post_comment(
        db=db,
        post_id=comment.post_id,
        user_id=comment.user_id,
        comment_text=comment.comment_text
    )

@post_comments_router.get("/{post_id}", response_model=List[PostCommentResponse])
async def get_post_comments_api(
    post_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await get_post_comments(db, post_id)

@comment_replies_router.post("/", response_model=CommentReplyResponse)
async def create_comment_reply_api(
    reply: CommentReplyCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_comment_reply(
        db=db,
        comment_id=reply.comment_id,
        user_id=reply.user_id,
        reply_text=reply.reply_text
    )

@comment_replies_router.get("/{comment_id}", response_model=List[CommentReplyResponse])
async def get_comment_replies_api(
    comment_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await get_comment_replies(db, comment_id)


# ----------------------------------------------------
# Reels Routers
# ----------------------------------------------------
reels_router = APIRouter(
    prefix="/reels",
    tags=["Reels"]
)

reel_likes_router = APIRouter(
    prefix="/reel-likes",
    tags=["Reel Likes"]
)

reel_comments_router = APIRouter(
    prefix="/reel-comments",
    tags=["Reel Comments"]
)

reel_comment_replies_router = APIRouter(
    prefix="/reel-comment-replies",
    tags=["Reel Comment Replies"]
)

@reels_router.post("/", response_model=ReelResponse)
async def create_reel_api(
    reel: ReelCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_reel(
        db=db,
        user_id=reel.user_id,
        caption=reel.caption,
        duration=reel.duration
    )

@reels_router.get("/", response_model=List[ReelResponse])
async def get_reels_api(
    db: AsyncSession = Depends(get_db)
):
    return await get_all_reels(db)

@reels_router.get("/{reel_id}", response_model=ReelResponse)
async def get_reel_api(
    reel_id: int,
    db: AsyncSession = Depends(get_db)
):
    r = await get_reel_by_id(db, reel_id)
    if not r:
        raise HTTPException(
            status_code=404,
            detail="Reel not found"
        )
    return r

@reel_likes_router.post("/", response_model=ReelLikeResponse)
async def create_reel_like_api(
    like: ReelLikeCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_reel_like(
        db=db,
        reel_id=like.reel_id,
        user_id=like.user_id
    )

@reel_likes_router.get("/{reel_id}", response_model=List[ReelLikeResponse])
async def get_reel_likes_api(
    reel_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await get_reel_likes(db, reel_id)

@reel_comments_router.post("/", response_model=ReelCommentResponse)
async def create_reel_comment_api(
    comment: ReelCommentCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_reel_comment(
        db=db,
        reel_id=comment.reel_id,
        user_id=comment.user_id,
        comment_text=comment.comment_text
    )

@reel_comments_router.get("/{reel_id}", response_model=List[ReelCommentResponse])
async def get_reel_comments_api(
    reel_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await get_reel_comments(db, reel_id)

@reel_comment_replies_router.post("/", response_model=ReelCommentReplyResponse)
async def create_reel_comment_reply_api(
    reply: ReelCommentReplyCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_reel_comment_reply(
        db=db,
        reel_comment_id=reply.reel_comment_id,
        user_id=reply.user_id,
        reply_text=reply.reply_text
    )

@reel_comment_replies_router.get("/{reel_comment_id}", response_model=List[ReelCommentReplyResponse])
async def get_reel_comment_replies_api(
    reel_comment_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await get_reel_comment_replies(db, reel_comment_id)


# ----------------------------------------------------
# Stories Routers
# ----------------------------------------------------
stories_router = APIRouter(
    prefix="/stories",
    tags=["Stories"]
)

story_views_router = APIRouter(
    prefix="/story-views",
    tags=["Story Views"]
)

@stories_router.post("/", response_model=StoryResponse)
async def create_story_api(
    story: StoryCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_story(
        db=db,
        user_id=story.user_id
    )

@stories_router.get("/", response_model=List[StoryResponse])
async def get_stories_api(
    db: AsyncSession = Depends(get_db)
):
    return await get_all_stories(db)

@stories_router.get("/{story_id}", response_model=StoryResponse)
async def get_story_api(
    story_id: int,
    db: AsyncSession = Depends(get_db)
):
    s = await get_story_by_id(db, story_id)
    if not s:
        raise HTTPException(
            status_code=404,
            detail="Story not found"
        )
    return s

@story_views_router.post("/", response_model=StoryViewResponse)
async def create_story_view_api(
    view: StoryViewCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_story_view(
        db=db,
        story_id=view.story_id,
        viewer_id=view.viewer_id
    )

@story_views_router.get("/{story_id}", response_model=List[StoryViewResponse])
async def get_story_views_api(
    story_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await get_story_views(db, story_id)
