from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from models import ProfileStats


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