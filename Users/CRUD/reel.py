from Setting import Reel, ReelLike, ReelComment, ReelCommentReply
from datetime import datetime
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession





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
