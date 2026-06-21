from datetime import datetime, timedelta

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from models import Story


async def create_story(
    db: AsyncSession,
    user_id: int
):
    story = Story(
        user_id=user_id,
        created_at=datetime.utcnow(),
        expires_at=datetime.utcnow() + timedelta(hours=24)
    )

    db.add(story)
    await db.commit()
    await db.refresh(story)

    return story


async def get_all_stories(
    db: AsyncSession
):
    result = await db.execute(
        select(Story)
    )

    return result.scalars().all()


async def get_story_by_id(
    db: AsyncSession,
    story_id: int
):
    result = await db.execute(
        select(Story).where(
            Story.story_id == story_id
        )
    )

    return result.scalar_one_or_none()
