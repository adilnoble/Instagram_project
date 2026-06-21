from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from Profiles.CRUD import (
    create_profile,
    get_all_profiles,
    get_profile_by_id,
    create_profile_stats,
    get_all_profile_stats,
    get_profile_stats_by_user
)
from Profiles.Schemas import (
    ProfileCreate,
    ProfileResponse,
    ProfileStatsCreate,
    ProfileStatsResponse
)

profile_router = APIRouter(
    prefix="/profiles",
    tags=["Profiles"]
)

profile_stats_router = APIRouter(
    prefix="/profile-stats",
    tags=["Profile Stats"]
)


# Profiles endpoints
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
    profile = await get_profile_by_id(
        db,
        profile_id
    )

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )

    return profile


# Profile Stats endpoints
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
