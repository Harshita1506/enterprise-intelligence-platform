from src.models.project_models import ProjectCard, ProjectsResponse, ProjectDetail
from src.services.project_metadata_service import ProjectMetadataService
from src.services.intelligence_service import IntelligenceService

class ProjectService:
    """
    Service responsible for assembling project data
    for the Projects page.
    """

    def __init__(self):
        self.metadata_service = ProjectMetadataService()
        self.intelligence = IntelligenceService()

    def get_projects(self) -> ProjectsResponse:
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

        return ProjectsResponse(projects=projects)
        
    def get_project(self, project_id: str):
        projects = self.metadata_service.get_projects_metadata()

        project = next(
            (
                p
                for p in projects
                if p["project_id"] == project_id
            ),
            None,
        )

        if project is None:
            raise ValueError("Project not found.")

        # ---------------- Summary ----------------

        summary_result = self.intelligence.summarizer.generate_summary(project_id)
        
        # DEBUG PRINTS
        print("--- DEBUG SUMMARY RESULT ---")
        print(summary_result)
        if not summary_result.get("success"):
            print("ERROR:", summary_result.get("error"))
        print("----------------------------")

        if summary_result["success"]:
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