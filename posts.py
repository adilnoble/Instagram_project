from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db

from post_crud import (
    create_post,
    get_all_posts,
    get_post_by_id
)

from schemas import (
    PostCreate,
    PostResponse
)

router = APIRouter(
    prefix="/posts",
    tags=["Posts"]
)


@router.post("/", response_model=PostResponse)
async def create_post_api(
    post: PostCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_post(
        db=db,
        user_id=post.user_id,
        caption=post.caption,
        location=post.location,
        visibility=post.visibility
    )


@router.get("/", response_model=List[PostResponse])
async def get_posts_api(
    db: AsyncSession = Depends(get_db)
):
    return await get_all_posts(db)


@router.get("/{post_id}", response_model=PostResponse)
async def get_post_api(
    post_id: int,
    db: AsyncSession = Depends(get_db)
):
    post = await get_post_by_id(
        db,
        post_id
    )

    if not post:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    return post