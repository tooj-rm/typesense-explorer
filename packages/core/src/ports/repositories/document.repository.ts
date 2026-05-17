import { Documents } from "@typesense_inspector/core";

export type SearchParams = {
  search: string;
  page: number;
  limit: number;
  filterBy: string;
  queryBy: string;
}

export interface DocumentRepository {
  search(collection: string, params: SearchParams): Promise<Documents>;
}