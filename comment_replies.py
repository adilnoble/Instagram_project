from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db

from comment_reply_crud import (
    create_comment_reply,
    get_comment_replies
)

from schemas import (
    CommentReplyCreate,
    CommentReplyResponse
)

router = APIRouter(
    prefix="/comment-replies",
    tags=["Comment Replies"]
)


@router.post("/", response_model=CommentReplyResponse)
async def create_comment_reply_api(
    reply: CommentReplyCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_comment_reply(
        db=db,
        comment_id=reply.comment_id,
        user_id=reply.user_id,
        reply_text=reply.reply_text
    )


@router.get("/{comment_id}", response_model=List[CommentReplyResponse])
async def get_comment_replies_api(
    comment_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await get_comment_replies(
        db,
        comment_id
    )