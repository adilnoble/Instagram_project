from datetime import datetime

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from models import PostComment


async def create_post_comment(
    db: AsyncSession,
    post_id: int,
    user_id: int,
    comment_text: str
):
    comment = PostComment(
        post_id=post_id,
        user_id=user_id,
        comment_text=comment_text,
        created_at=datetime.utcnow()
    )

    db.add(comment)
    await db.commit()
    await db.refresh(comment)

    return comment


async def get_post_comments(
    db: AsyncSession,
    post_id: int
):
    result = await db.execute(
        select(PostComment).where(
            PostComment.post_id == post_id
        )
    )

    return result.scalars().all()