from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from reel_like_crud import (
    create_reel_like,
    get_reel_likes
)

from schemas import (
    ReelLikeCreate,
    ReelLikeResponse
)

router = APIRouter(
    prefix="/reel-likes",
    tags=["Reel Likes"]
)


@router.post("/", response_model=ReelLikeResponse)
async def create_reel_like_api(
    like: ReelLikeCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_reel_like(
        db=db,
        reel_id=like.reel_id,
        user_id=like.user_id
    )


@router.get("/{reel_id}", response_model=List[ReelLikeResponse])
async def get_reel_likes_api(
    reel_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await get_reel_likes(
        db,
        reel_id
    )