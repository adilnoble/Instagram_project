from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db

from post_comment_crud import (
    create_post_comment,
    get_post_comments
)

from schemas import (
    PostCommentCreate,
    PostCommentResponse
)

router = APIRouter(
    prefix="/post-comments",
    tags=["Post Comments"]
)


@router.post("/", response_model=PostCommentResponse)
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


@router.get("/{post_id}", response_model=List[PostCommentResponse])
async def get_post_comments_api(
    post_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await get_post_comments(
        db,
        post_id
    )