from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from profile_stats_crud import (
    create_profile_stats,
    get_all_profile_stats,
    get_profile_stats_by_user
)

from schemas import (
    ProfileStatsCreate,
    ProfileStatsResponse
)

router = APIRouter(
    prefix="/profile-stats",
    tags=["Profile Stats"]
)


@router.post("/", response_model=ProfileStatsResponse)
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


@router.get("/", response_model=List[ProfileStatsResponse])
async def get_profile_stats_api(
    db: AsyncSession = Depends(get_db)
):
    return await get_all_profile_stats(db)


@router.get("/{user_id}", response_model=ProfileStatsResponse)
async def get_profile_stats_by_user_api(
    user_id: int,
    db: AsyncSession = Depends(get_db)
):
    stats = await get_profile_stats_by_user(
        db,
        user_id
    )

    if not stats:
        raise HTTPException(
            status_code=404,
            detail="Profile stats not found"
        )

    return stats