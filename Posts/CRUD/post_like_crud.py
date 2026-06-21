from datetime import datetime

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from models import PostLike


async def create_post_like(
    db: AsyncSession,
    post_id: int,
    user_id: int
):
    like = PostLike(
        post_id=post_id,
        user_id=user_id,
        liked_at=datetime.utcnow()
    )

    db.add(like)
    await db.commit()
    await db.refresh(like)

    return like


async def get_post_likes(
    db: AsyncSession,
    post_id: int
):
    result = await db.execute(
        select(PostLike).where(
            PostLike.post_id == post_id
        )
    )

    return result.scalars().all()
