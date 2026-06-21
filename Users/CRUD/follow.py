from datetime import datetime

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from Setting import Follow


async def create_follow(
    db: AsyncSession,
    follower_id: int,
    following_id: int
):
    follow = Follow(
        follower_id=follower_id,
        following_id=following_id,
        followed_at=datetime.utcnow()
    )

    db.add(follow)
    await db.commit()
    await db.refresh(follow)

    return follow


async def get_followers(
    db: AsyncSession,
    user_id: int
):
    result = await db.execute(
        select(Follow).where(
            Follow.following_id == user_id
        )
    )

    return result.scalars().all()


async def get_following(
    db: AsyncSession,
    user_id: int
):
    result = await db.execute(
        select(Follow).where(
            Follow.follower_id == user_id
        )
    )

    return result.scalars().all()
