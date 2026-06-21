from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db

from message_crud import (
    create_message,
    get_all_messages,
    get_message_by_id
)

from schemas import (
    MessageCreate,
    MessageResponse
)

router = APIRouter(
    prefix="/messages",
    tags=["Messages"]
)


@router.post("/", response_model=MessageResponse)
async def create_message_api(
    message: MessageCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_message(
        db=db,
        sender_id=message.sender_id,
        message_type=message.message_type,
        content=message.content
    )


@router.get("/", response_model=List[MessageResponse])
async def get_messages_api(
    db: AsyncSession = Depends(get_db)
):
    return await get_all_messages(db)


@router.get("/{message_id}", response_model=MessageResponse)
async def get_message_api(
    message_id: int,
    db: AsyncSession = Depends(get_db)
):
    message = await get_message_by_id(
        db,
        message_id
    )

    if not message:
        raise HTTPException(
            status_code=404,
            detail="Message not found"
        )

    return message