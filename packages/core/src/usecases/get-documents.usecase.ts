import { DocumentRepository, SearchParams } from "@typesense_inspector/core";

export class GetDocumentsUseCase {
  constructor(private readonly documentRepository: DocumentRepository) {
  }

  async execute(collection: string, params: SearchParams) {
    return this.documentRepository.search(collection, params);
  }
}