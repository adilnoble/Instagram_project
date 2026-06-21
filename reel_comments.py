from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db

from reel_comment_crud import (
    create_reel_comment,
    get_reel_comments
)

from schemas import (
    ReelCommentCreate,
    ReelCommentResponse
)

router = APIRouter(
    prefix="/reel-comments",
    tags=["Reel Comments"]
)


@router.post("/", response_model=ReelCommentResponse)
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


@router.get("/{reel_id}", response_model=List[ReelCommentResponse])
async def get_reel_comments_api(
    reel_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await get_reel_comments(
        db,
        reel_id
    )