from Setting import Post, PostLike, PostComment, CommentReply
from datetime import datetime
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession





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
