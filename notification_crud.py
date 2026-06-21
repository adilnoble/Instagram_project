from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from models import Notification


async def create_notification(
    db: AsyncSession,
    receiver_id: int,
    actor_id: int,
    notification_type: str,
    reference_id: int
):
    notification = Notification(
        receiver_id=receiver_id,
        actor_id=actor_id,
        notification_type=notification_type,
        reference_id=reference_id,
        is_read=False
    )

    db.add(notification)
    await db.commit()
    await db.refresh(notification)

    return notification


async def get_all_notifications(
    db: AsyncSession
):
    result = await db.execute(
        select(Notification)
    )

    return result.scalars().all()


async def get_notification_by_id(
    db: AsyncSession,
    notification_id: int
):
    result = await db.execute(
        select(Notification).where(
            Notification.notification_id == notification_id
        )
    )

    return result.scalar_one_or_none()