from src.week5_langgraph.runner import LangGraphProjectAgent


class ChatService:
    """
    Service layer for AI Companion.

    Wraps the existing Week 5 LangGraph runner.
    """

    def __init__(self):
        self.agent = LangGraphProjectAgent()

    def process_query(self, query: str):

        response = self.agent.run(query)

        return {
            "success": response.success,
            "response": response.response,
            "status": response.status.value,
            "metadata": response.metadata.model_dump(),
            "telemetry": response.telemetry.model_dump(),
            "node_history": response.node_history,
        }