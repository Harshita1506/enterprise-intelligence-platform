from src.services.intelligence_service import IntelligenceService

service = IntelligenceService()

for project in [
    "customer_portal",
    "inventory_management_ai",
    "healthcare_appointment_system",
]:
    print("=" * 60)
    print(project)

    result = service.action_items.extract_tasks(project)

    print(result)