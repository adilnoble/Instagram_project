from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db

from reel_comment_reply_crud import (
    create_reel_comment_reply,
    get_reel_comment_replies
)

from schemas import (
    ReelCommentReplyCreate,
    ReelCommentReplyResponse
)

router = APIRouter(
    prefix="/reel-comment-replies",
    tags=["Reel Comment Replies"]
)


@router.post("/", response_model=ReelCommentReplyResponse)
async def create_reel_comment_reply_api(
    reply: ReelCommentReplyCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_reel_comment_reply(
        db=db,
        reel_comment_id=reply.reel_comment_id,
        user_id=reply.user_id,
        reply_text=reply.reply_text
    )


@router.get("/{reel_comment_id}", response_model=List[ReelCommentReplyResponse])
async def get_reel_comment_replies_api(
    reel_comment_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await get_reel_comment_replies(
        db,
        reel_comment_id
    )