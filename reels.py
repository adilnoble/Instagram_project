from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db

from reel_crud import (
    create_reel,
    get_all_reels,
    get_reel_by_id
)

from schemas import (
    ReelCreate,
    ReelResponse
)

router = APIRouter(
    prefix="/reels",
    tags=["Reels"]
)


@router.post("/", response_model=ReelResponse)
async def create_reel_api(
    reel: ReelCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_reel(
        db=db,
        user_id=reel.user_id,
        caption=reel.caption,
        duration=reel.duration
    )


@router.get("/", response_model=List[ReelResponse])
async def get_reels_api(
    db: AsyncSession = Depends(get_db)
):
    return await get_all_reels(db)


@router.get("/{reel_id}", response_model=ReelResponse)
async def get_reel_api(
    reel_id: int,
    db: AsyncSession = Depends(get_db)
):
    reel = await get_reel_by_id(
        db,
        reel_id
    )

    if not reel:
        raise HTTPException(
            status_code=404,
            detail="Reel not found"
        )

    return reel