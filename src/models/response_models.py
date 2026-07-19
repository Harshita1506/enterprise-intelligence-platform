from typing import Any, Optional

from pydantic import BaseModel


class APIResponse(BaseModel):
    """
    Standard response format for all backend APIs.
    """

    success: bool
    message: str
    data: Optional[Any] = None