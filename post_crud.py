from datetime import datetime

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from models import Post


async def create_post(
    db: AsyncSession,
    user_id: int,
    caption: str = None,
    location: str = None,
    visibility: str = None
):
    post = Post(
        user_id=user_id,
        caption=caption,
        location=location,
        visibility=visibility,
        created_at=datetime.utcnow()
    )

    db.add(post)
    await db.commit()
    await db.refresh(post)

    return post


async def get_all_posts(
    db: AsyncSession
):
    result = await db.execute(
        select(Post)
    )

    return result.scalars().all()


async def get_post_by_id(
    db: AsyncSession,
    post_id: int
):
    result = await db.execute(
        select(Post).where(
            Post.post_id == post_id
        )
    )

    return result.scalar_one_or_none()