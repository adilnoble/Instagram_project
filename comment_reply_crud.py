from datetime import datetime

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from models import CommentReply


async def create_comment_reply(
    db: AsyncSession,
    comment_id: int,
    user_id: int,
    reply_text: str
):
    reply = CommentReply(
        comment_id=comment_id,
        user_id=user_id,
        reply_text=reply_text,
        created_at=datetime.utcnow()
    )

    db.add(reply)
    await db.commit()
    await db.refresh(reply)

    return reply


async def get_comment_replies(
    db: AsyncSession,
    comment_id: int
):
    result = await db.execute(
        select(CommentReply).where(
            CommentReply.comment_id == comment_id
        )
    )

    return result.scalars().all()