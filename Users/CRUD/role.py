from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime
from Setting import Role, UserRole

async def create_role(db: AsyncSession, role_name: str, description: str | None = None):
    role = Role(role_name=role_name, description=description)
    db.add(role)
    await db.commit()
    await db.refresh(role)
    return role

async def get_role_by_name(db: AsyncSession, role_name: str):
    result = await db.execute(select(Role).where(Role.role_name == role_name))
    return result.scalar_one_or_none()

async def assign_role_to_user(db: AsyncSession, user_id: int, role_id: int):
    user_role = UserRole(user_id=user_id, role_id=role_id, assigned_at=datetime.utcnow())
    db.add(user_role)
    await db.commit()
    await db.refresh(user_role)
    return user_role
