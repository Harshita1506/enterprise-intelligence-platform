from pydantic import BaseModel
from typing import List
from src.week3_project_intelligence.schemas import (
    RiskAssessment,
    ActionItem,
)

class ProjectCard(BaseModel):
    project_id: str
    project_name: str
    status: str
    documents: int
    chunks: int
    summary: str


class ProjectsResponse(BaseModel):
    projects: List[ProjectCard]
    
class ProjectDetail(BaseModel):
    project_id: str
    project_name: str
    status: str

    documents: int
    chunks: int

    summary: str

    risks: List[RiskAssessment]

    action_items: List[ActionItem]