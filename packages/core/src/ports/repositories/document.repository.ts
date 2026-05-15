import { Documents } from "@typesense_inspector/core";

export interface DocumentRepository {
  search(collection: string, search: string, page: number, limit: number): Promise<Documents>;
}