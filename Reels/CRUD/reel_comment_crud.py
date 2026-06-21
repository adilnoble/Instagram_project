from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from models import ReelComment


async def create_reel_comment(
    db: AsyncSession,
    reel_id: int,
    user_id: int,
    comment_text: str
):
    comment = ReelComment(
        reel_id=reel_id,
        user_id=user_id,
        comment_text=comment_text
    )

    db.add(comment)
    await db.commit()
    await db.refresh(comment)

    return comment


async def get_reel_comments(
    db: AsyncSession,
    reel_id: int
):
    result = await db.execute(
        select(ReelComment).where(
            ReelComment.reel_id == reel_id
        )
    )

    return result.scalars().all()
