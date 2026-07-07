"""
Enterprise Data Contracts.
Defines the strict Pydantic schemas that all Intelligence Modules 
(Summarizer, Risk Engine, Action Items) must return.
"""
from typing import Generic, TypeVar, Any
from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum
from pydantic import BaseModel, Field
from typing import List, Optional, Generic, TypeVar, Any

class ActionItem(BaseModel):
    """Data contract for a single extracted action item/task."""
    task: str = Field(description="The specific task that needs to be completed")
    owner: str = Field(description="The person or team responsible for the task, or 'Unassigned'")
    status: str = Field(description="Current status (e.g., 'Pending', 'In Progress', 'Completed')")
    source: str = Field(description="The document source where this item was found")

class RiskAssessment(BaseModel):
    """Data contract for a detected project risk."""
    risk_title: str = Field(description="A short, descriptive title for the risk")
    severity: str = Field(description="Severity: 'Low', 'Medium', 'High', or 'Critical'")
    reasoning: str = Field(description="Explanation of why this is a risk based on the context")
    recommendation: str = Field(description="Suggested mitigation strategy")

class RiskCollection(BaseModel):
    """Wrapper for a list of identified risks."""
    risks: List[RiskAssessment] = Field(default_factory=list, description="List of identified project risks")

class ProjectSummary(BaseModel):
    """Data contract for a comprehensive project overview."""
    project_name: str = Field(description="The display name of the project")
    executive_summary: str = Field(description="A 2-3 sentence high-level overview of the project's purpose and state")
    key_features: List[str] = Field(description="List of core requirements and technical specifications")
    current_progress: str = Field(description="Summary of sprint status and timeline")
    action_items: List[ActionItem] = Field(default_factory=list, description="Pending tasks and commitments")
    blockers_and_risks: List[RiskAssessment] = Field(default_factory=list, description="Current issues or identified risks")
    sources_used: List[str] = Field(description="List of document sources analyzed to generate this summary")


class ActionItemCollection(BaseModel):
    """Wrapper to ensure the LLM returns a well-formed list of Action Items."""
    project_id: str = Field(default="Unknown", description="The project this applies to")
    items: List[ActionItem] = Field(default_factory=list, description="List of extracted action items")
    confidence_score: float = Field(default=1.0, description="Overall confidence in extraction")
    
T = TypeVar("T")

class Metadata(BaseModel):
    model: str
    schema_name: str
    generation_time_sec: float
    sources: List[str] = Field(default_factory=list)
    stats: dict = Field(default_factory=dict)

class IntelligenceResult(BaseModel, Generic[T]):
    success: bool
    data: Optional[T] = None
    metadata: Optional[Metadata] = None
    error: Optional[str] = None
    
class ProjectHealth(str, Enum):
    ON_TRACK = "On Track"
    AT_RISK = "At Risk"
    DELAYED = "Delayed"

class DeliveryForecast(str, Enum):
    LIKELY_ON_SCHEDULE = "Likely On Schedule"
    NEEDS_ATTENTION = "Needs Attention"
    HIGH_RISK_OF_DELAY = "High Risk of Delay"

# --- SCHEMAS ---

class InsightReport(BaseModel):
    """Executive-level analysis report with strict constraints."""
    project_health: ProjectHealth = Field(description="Strict status: On Track, At Risk, or Delayed")
    delivery_forecast: DeliveryForecast = Field(description="Outlook: Likely On Schedule, Needs Attention, or High Risk of Delay")
    critical_focus_area: str = Field(description="The single biggest strategic issue requiring management attention (one sentence)")
    top_priorities: List[str] = Field(description="Top 3 strategic priorities for the leadership team")
    management_recommendations: List[str] = Field(description="Actionable strategic or managerial recommendations")
    executive_summary: str = Field(description="A 2-3 sentence high-level synthesis of project status")