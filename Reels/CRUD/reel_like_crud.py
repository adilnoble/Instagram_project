from datetime import datetime

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from models import ReelLike


async def create_reel_like(
    db: AsyncSession,
    reel_id: int,
    user_id: int
):
    like = ReelLike(
        reel_id=reel_id,
        user_id=user_id,
        liked_at=datetime.utcnow()
    )

    db.add(like)
    await db.commit()
    await db.refresh(like)

    return like


async def get_reel_likes(
    db: AsyncSession,
    reel_id: int
):
    result = await db.execute(
        select(ReelLike).where(
            ReelLike.reel_id == reel_id
        )
    )

    return result.scalars().all()
