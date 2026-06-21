from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db

from Notifications.CRUD import (
    create_notification,
    get_all_notifications,
    get_notification_by_id
)

from Notifications.Schemas import (
    NotificationCreate,
    NotificationResponse
)

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)


@router.post("/", response_model=NotificationResponse)
async def create_notification_api(
    notification: NotificationCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_notification(
        db=db,
        receiver_id=notification.receiver_id,
        actor_id=notification.actor_id,
        notification_type=notification.notification_type,
        reference_id=notification.reference_id
    )


@router.get("/", response_model=List[NotificationResponse])
async def get_notifications_api(
    db: AsyncSession = Depends(get_db)
):
    return await get_all_notifications(db)


@router.get("/{notification_id}", response_model=NotificationResponse)
async def get_notification_api(
    notification_id: int,
    db: AsyncSession = Depends(get_db)
):
    notification = await get_notification_by_id(
        db,
        notification_id
    )

    if not notification:
        raise HTTPException(
            status_code=404,
            detail="Notification not found"
        )

    return notification
