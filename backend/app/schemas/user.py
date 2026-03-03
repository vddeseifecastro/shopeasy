from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

# --- Registro ---
class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str

# --- Login ---
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# --- Respuesta pública (nunca devuelve la password) ---
class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    is_active: bool
    is_admin: bool
    created_at: datetime

    class Config:
        from_attributes = True

# --- Token JWT ---
class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class TokenData(BaseModel):
    user_id: Optional[int] = None
    is_admin: Optional[bool] = False