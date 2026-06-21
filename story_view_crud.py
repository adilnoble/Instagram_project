from datetime import datetime

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from models import StoryView


async def create_story_view(
    db: AsyncSession,
    story_id: int,
    viewer_id: int
):
    view = StoryView(
        story_id=story_id,
        viewer_id=viewer_id,
        viewed_at=datetime.utcnow()
    )

    db.add(view)
    await db.commit()
    await db.refresh(view)

    return view


async def get_story_views(
    db: AsyncSession,
    story_id: int
):
    result = await db.execute(
        select(StoryView).where(
            StoryView.story_id == story_id
        )
    )

    return result.scalars().all()