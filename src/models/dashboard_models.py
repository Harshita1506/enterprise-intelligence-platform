from pydantic import BaseModel
from typing import List


class DashboardStats(BaseModel):
    total_projects: int
    active_projects: int
    total_documents: int
    total_chunks: int


class AttentionItem(BaseModel):
    project: str
    title: str
    severity: str


class AIUpdate(BaseModel):
    project: str
    summary: str


class PlatformStatus(BaseModel):
    knowledge_base: str
    chat_api: str
    llm: str


class DashboardData(BaseModel):
    stats: DashboardStats
    attention_items: List[AttentionItem]
    ai_updates: List[AIUpdate]
    platform_status: PlatformStatus