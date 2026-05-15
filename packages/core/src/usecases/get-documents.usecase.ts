import { DocumentRepository } from "@typesense_inspector/core";

export class GetDocumentsUseCase {
  constructor(private readonly documentRepository: DocumentRepository) {
  }

  async execute(collection: string, search: string, page: number, limit: number) {
    return this.documentRepository.search(collection, search, page, limit);
  }
}