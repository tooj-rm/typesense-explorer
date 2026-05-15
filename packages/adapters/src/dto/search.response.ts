export interface SearchResponse {
  found: number;
  out_of: number;
  page: number;
  search_time_ms: number;
  hits: SearchHit[];
  facet_counts?: unknown[];
}

export interface SearchHit {
  document: Record<string, unknown>;
  highlights?: unknown[];
}