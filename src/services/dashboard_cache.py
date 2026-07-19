from src.models.dashboard_models import AttentionItem, AIUpdate

_dashboard_cache = {
    "attention": None,
    "updates": None,
}


def get_attention():
    return _dashboard_cache["attention"]


def set_attention(items: list[AttentionItem]):
    _dashboard_cache["attention"] = items


def get_updates():
    return _dashboard_cache["updates"]


def set_updates(items: list[AIUpdate]):
    _dashboard_cache["updates"] = items