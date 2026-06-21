from datetime import datetime

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from models import Reel


async def create_reel(
    db: AsyncSession,
    user_id: int,
    caption: str = None,
    duration: int = 0
):
    reel = Reel(
        user_id=user_id,
        caption=caption,
        duration=duration,
        created_at=datetime.utcnow()
    )

    db.add(reel)
    await db.commit()
    await db.refresh(reel)

    return reel


async def get_all_reels(
    db: AsyncSession
):
    result = await db.execute(
        select(Reel)
    )

    return result.scalars().all()


async def get_reel_by_id(
    db: AsyncSession,
    reel_id: int
):
    result = await db.execute(
        select(Reel).where(
            Reel.reel_id == reel_id
        )
    )

    return result.scalar_one_or_none()