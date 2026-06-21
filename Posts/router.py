from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db

from Posts.CRUD import (
    create_post,
    get_all_posts,
    get_post_by_id,
    create_post_like,
    get_post_likes,
    create_post_comment,
    get_post_comments,
    create_comment_reply,
    get_comment_replies
)

from Posts.Schemas import (
    PostCreate,
    PostResponse,
    PostLikeCreate,
    PostLikeResponse,
    PostCommentCreate,
    PostCommentResponse,
    CommentReplyCreate,
    CommentReplyResponse
)

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


# Posts
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
    post = await get_post_by_id(
        db,
        post_id
    )

    if not post:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    return post


# Post Likes
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
    return await get_post_likes(
        db,
        post_id
    )


# Post Comments
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
    return await get_post_comments(
        db,
        post_id
    )


# Comment Replies
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
    return await get_comment_replies(
        db,
        comment_id
    )
