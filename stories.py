from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db

from story_crud import (
    create_story,
    get_all_stories,
    get_story_by_id
)

from schemas import (
    StoryCreate,
    StoryResponse
)

router = APIRouter(
    prefix="/stories",
    tags=["Stories"]
)


@router.post("/", response_model=StoryResponse)
async def create_story_api(
    story: StoryCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_story(
        db=db,
        user_id=story.user_id
    )


@router.get("/", response_model=List[StoryResponse])
async def get_stories_api(
    db: AsyncSession = Depends(get_db)
):
    return await get_all_stories(db)


@router.get("/{story_id}", response_model=StoryResponse)
async def get_story_api(
    story_id: int,
    db: AsyncSession = Depends(get_db)
):
    story = await get_story_by_id(
        db,
        story_id
    )

    if not story:
        raise HTTPException(
            status_code=404,
            detail="Story not found"
        )

    return story