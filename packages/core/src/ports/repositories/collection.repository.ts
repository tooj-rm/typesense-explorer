import { Collection } from "@typesense_inspector/core";

export interface CollectionRepository {
  getCollections(): Promise<Collection[]>;
}