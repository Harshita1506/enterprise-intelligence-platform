import logging
from src.models.project_models import ProjectCard, ProjectsResponse, ProjectDetail
from src.services.project_metadata_service import ProjectMetadataService
from src.services.intelligence_service import IntelligenceService

logger = logging.getLogger(__name__)

class ProjectService:
    """
    Service responsible for assembling project data
    for the Projects page.
    """

    def __init__(self):
        self.metadata_service = ProjectMetadataService()
        self.intelligence = IntelligenceService()

        # In-memory cache for the Projects page response
        self.projects_cache: ProjectsResponse | None = None

    def get_projects(self) -> ProjectsResponse:
        # Check the cache first
        if self.projects_cache is not None:
            logger.info("Returning cached projects.")
            return self.projects_cache

        projects = []
        metadata = self.metadata_service.get_projects_metadata()

        for project in metadata:
            summary_result = self.intelligence.summarizer.generate_summary(
                project["project_id"]
            )

            if summary_result["success"]:
                summary = summary_result["data"].executive_summary
            else:
                summary = "Summary could not be generated."

            projects.append(
                ProjectCard(
                    project_id=project["project_id"],
                    project_name=project["project_name"],
                    status=project["status"],
                    documents=project["documents"],
                    chunks=project["chunks"],
                    summary=summary,
                )
            )

        # Save the result before returning
        response = ProjectsResponse(projects=projects)
        self.projects_cache = response
        logger.info("Projects cached successfully.")
        
        return response
        
    def get_project(self, project_id: str):
        projects = self.metadata_service.get_projects_metadata()

        project = next(
            (p for p in projects if p["project_id"] == project_id),
            None,
        )

        if project is None:
            raise ValueError("Project not found.")

        # ---------------- Summary ----------------
        summary_result = self.intelligence.summarizer.generate_summary(project_id)

        if summary_result.get("success"):
            summary = summary_result["data"].executive_summary
        else:
            summary = "Summary unavailable."

        # ---------------- Risks ----------------
        risk_result = self.intelligence.risk_analyzer.analyze_risks(project_id)

        if risk_result["success"]:
            risks = risk_result["data"].risks
        else:
            risks = []

        # ---------------- Action Items ----------------
        action_result = self.intelligence.action_items.extract_tasks(project_id)

        if action_result["success"]:
            action_items = action_result["data"].items
        else:
            action_items = []

        return ProjectDetail(
            project_id=project["project_id"],
            project_name=project["project_name"],
            status=project["status"],
            documents=project["documents"],
            chunks=project["chunks"],
            summary=summary,
            risks=risks,
            action_items=action_items,
        )