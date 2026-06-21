from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db

from Reels.CRUD import (
    create_reel,
    get_all_reels,
    get_reel_by_id,
    create_reel_like,
    get_reel_likes,
    create_reel_comment,
    get_reel_comments,
    create_reel_comment_reply,
    get_reel_comment_replies
)

from Reels.Schemas import (
    ReelCreate,
    ReelResponse,
    ReelLikeCreate,
    ReelLikeResponse,
    ReelCommentCreate,
    ReelCommentResponse,
    ReelCommentReplyCreate,
    ReelCommentReplyResponse
)

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


# Reels
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
    reel = await get_reel_by_id(
        db,
        reel_id
    )

    if not reel:
        raise HTTPException(
            status_code=404,
            detail="Reel not found"
        )

    return reel


# Reel Likes
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
    return await get_reel_likes(
        db,
        reel_id
    )


# Reel Comments
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
    return await get_reel_comments(
        db,
        reel_id
    )


# Reel Comment Replies
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
    return await get_reel_comment_replies(
        db,
        reel_comment_id
    )
