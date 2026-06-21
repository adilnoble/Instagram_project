from datetime import datetime

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from models import Message


async def create_message(
    db: AsyncSession,
    sender_id: int,
    message_type: str,
    content: str
):
    message = Message(
        sender_id=sender_id,
        message_type=message_type,
        content=content,
        sent_at=datetime.utcnow()
    )

    db.add(message)
    await db.commit()
    await db.refresh(message)

    return message


async def get_all_messages(
    db: AsyncSession
):
    result = await db.execute(
        select(Message)
    )

    return result.scalars().all()


async def get_message_by_id(
    db: AsyncSession,
    message_id: int
):
    result = await db.execute(
        select(Message).where(
            Message.message_id == message_id
        )
    )

    return result.scalar_one_or_none()
