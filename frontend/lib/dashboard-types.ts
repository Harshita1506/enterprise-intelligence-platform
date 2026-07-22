export interface DashboardStats {
  total_projects: number;
  active_projects: number;
  total_documents: number;
  total_chunks: number;
}

export interface AttentionItem {
  project: string;
  title: string;
  status: string;
}

export interface AIUpdate {
  project: string;
  summary: string;
}

export interface PlatformStatus {
  knowledge_base: string;
  chat_api: string;
  llm: string;
}

export interface DashboardData {
  stats: DashboardStats;
  attention_items: AttentionItem[];
  ai_updates: AIUpdate[];
  platform_status: PlatformStatus;
}