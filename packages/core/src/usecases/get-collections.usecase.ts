import { Collection, CollectionRepository } from "@typesense_inspector/core";

export class GetCollectionsUseCase {
  constructor(private readonly collectionRepository: CollectionRepository) {
  }

  async execute(): Promise<Collection[]> {
    return this.collectionRepository.getCollections();
  }
}