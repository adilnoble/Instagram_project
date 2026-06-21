from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from models import User


async def create_user(
    db: AsyncSession,
    email: str,
    phone: str,
    password_hash: str
):
    user = User(
        email=email,
        phone=phone,
        password_hash=password_hash
    )

    db.add(user)
    await db.commit()
    await db.refresh(user)

    return user


async def get_all_users(
    db: AsyncSession
):
    result = await db.execute(
        select(User)
    )

    return result.scalars().all()


async def get_user_by_id(
    db: AsyncSession,
    user_id: int
):
    result = await db.execute(
        select(User).where(
            User.user_id == user_id
        )
    )

    return result.scalar_one_or_none()