from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db

from Stories.CRUD import (
    create_story,
    get_all_stories,
    get_story_by_id,
    create_story_view,
    get_story_views
)

from Stories.Schemas import (
    StoryCreate,
    StoryResponse,
    StoryViewCreate,
    StoryViewResponse
)

stories_router = APIRouter(
    prefix="/stories",
    tags=["Stories"]
)

story_views_router = APIRouter(
    prefix="/story-views",
    tags=["Story Views"]
)


# Stories
@stories_router.post("/", response_model=StoryResponse)
async def create_story_api(
    story: StoryCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_story(
        db=db,
        user_id=story.user_id
    )


@stories_router.get("/", response_model=List[StoryResponse])
async def get_stories_api(
    db: AsyncSession = Depends(get_db)
):
    return await get_all_stories(db)


@stories_router.get("/{story_id}", response_model=StoryResponse)
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


# Story Views
@story_views_router.post("/", response_model=StoryViewResponse)
async def create_story_view_api(
    view: StoryViewCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_story_view(
        db=db,
        story_id=view.story_id,
        viewer_id=view.viewer_id
    )


@story_views_router.get("/{story_id}", response_model=List[StoryViewResponse])
async def get_story_views_api(
    story_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await get_story_views(
        db,
        story_id
    )
