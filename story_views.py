from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db

from story_view_crud import (
    create_story_view,
    get_story_views
)

from schemas import (
    StoryViewCreate,
    StoryViewResponse
)

router = APIRouter(
    prefix="/story-views",
    tags=["Story Views"]
)


@router.post("/", response_model=StoryViewResponse)
async def create_story_view_api(
    view: StoryViewCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_story_view(
        db=db,
        story_id=view.story_id,
        viewer_id=view.viewer_id
    )


@router.get("/{story_id}", response_model=List[StoryViewResponse])
async def get_story_views_api(
    story_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await get_story_views(
        db,
        story_id
    )