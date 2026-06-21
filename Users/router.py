from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from Users.CRUD import (
    create_user,
    get_all_users,
    get_user_by_id,
    update_user
)
from Users.Schemas import UserCreate, UserResponse, UserUpdate

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post("/", response_model=UserResponse)
async def create_user_api(
    user: UserCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_user(
        db=db,
        email=user.email,
        phone=user.phone,
        password_hash=user.password_hash
    )


@router.get("/", response_model=List[UserResponse])
async def get_users_api(
    db: AsyncSession = Depends(get_db)
):
    return await get_all_users(db)


@router.get("/{user_id}", response_model=UserResponse)
async def get_user_api(
    user_id: int,
    db: AsyncSession = Depends(get_db)
):
    user = await get_user_by_id(db, user_id)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return user


@router.put("/{user_id}", response_model=UserResponse)
async def update_user_api(
    user_id: int,
    user: UserUpdate,
    db: AsyncSession = Depends(get_db)
):
    updated_user = await update_user(
        db=db,
        user_id=user_id,
        email=user.email,
        phone=user.phone,
        password_hash=user.password_hash
    )

    if not updated_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return updated_user
