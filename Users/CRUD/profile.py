from Setting import Profile, ProfileStats
from datetime import datetime
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession




async def create_profile(
    db: AsyncSession,
    user_id: int,
    username: str,
    full_name: str = None,
    bio: str = None,
    profile_picture: str = None,
    website: str = None,
    account_type: str = None,
    is_private: bool = False
):
    profile = Profile(
        user_id=user_id,
        username=username,
        full_name=full_name,
        bio=bio,
        profile_picture=profile_picture,
        website=website,
        account_type=account_type,
        is_private=is_private
    )

    db.add(profile)
    await db.commit()
    await db.refresh(profile)

    return profile


async def get_all_profiles(
    db: AsyncSession
):
    result = await db.execute(
        select(Profile)
    )

    return result.scalars().all()


async def get_profile_by_id(
    db: AsyncSession,
    profile_id: int
):
    result = await db.execute(
        select(Profile).where(
            Profile.profile_id == profile_id
        )
    )

    return result.scalar_one_or_none()



async def create_profile_stats(
    db: AsyncSession,
    user_id: int,
    followers_count: int = 0,
    following_count: int = 0,
    posts_count: int = 0,
    reels_count: int = 0
):
    stats = ProfileStats(
        user_id=user_id,
        followers_count=followers_count,
        following_count=following_count,
        posts_count=posts_count,
        reels_count=reels_count
    )

    db.add(stats)
    await db.commit()
    await db.refresh(stats)

    return stats


async def get_all_profile_stats(
    db: AsyncSession
):
    result = await db.execute(
        select(ProfileStats)
    )

    return result.scalars().all()


async def get_profile_stats_by_user(
    db: AsyncSession,
    user_id: int
):
    result = await db.execute(
        select(ProfileStats).where(
            ProfileStats.user_id == user_id
        )
    )

    return result.scalar_one_or_none()
