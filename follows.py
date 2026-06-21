from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from follow_crud import (
    create_follow,
    get_followers,
    get_following
)

from schemas import (
    FollowCreate,
    FollowResponse
)

router = APIRouter(
    prefix="/follows",
    tags=["Follows"]
)


@router.post("/", response_model=FollowResponse)
async def create_follow_api(
    follow: FollowCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_follow(
        db=db,
        follower_id=follow.follower_id,
        following_id=follow.following_id
    )


@router.get("/followers/{user_id}", response_model=List[FollowResponse])
async def get_followers_api(
    user_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await get_followers(
        db,
        user_id
    )


@router.get("/following/{user_id}", response_model=List[FollowResponse])
async def get_following_api(
    user_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await get_following(
        db,
        user_id
    )