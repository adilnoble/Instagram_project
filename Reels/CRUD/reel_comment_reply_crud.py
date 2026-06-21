from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from models import ReelCommentReply


async def create_reel_comment_reply(
    db: AsyncSession,
    reel_comment_id: int,
    user_id: int,
    reply_text: str
):
    reply = ReelCommentReply(
        reel_comment_id=reel_comment_id,
        user_id=user_id,
        reply_text=reply_text
    )

    db.add(reply)
    await db.commit()
    await db.refresh(reply)

    return reply


async def get_reel_comment_replies(
    db: AsyncSession,
    reel_comment_id: int
):
    result = await db.execute(
        select(ReelCommentReply).where(
            ReelCommentReply.reel_comment_id == reel_comment_id
        )
    )

    return result.scalars().all()
