from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db

from post_like_crud import (
    create_post_like,
    get_post_likes
)

from schemas import (
    PostLikeCreate,
    PostLikeResponse
)

router = APIRouter(
    prefix="/post-likes",
    tags=["Post Likes"]
)


@router.post("/", response_model=PostLikeResponse)
async def create_post_like_api(
    like: PostLikeCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_post_like(
        db=db,
        post_id=like.post_id,
        user_id=like.user_id
    )


@router.get("/{post_id}", response_model=List[PostLikeResponse])
async def get_post_likes_api(
    post_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await get_post_likes(
        db,
        post_id
    )