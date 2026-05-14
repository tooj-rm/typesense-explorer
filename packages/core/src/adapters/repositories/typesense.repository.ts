import { Collection, CollectionDto, CollectionRepository, HttpClient } from "@typesense_inspector/core";

export class TypesenseRepository implements CollectionRepository {
  private readonly baseUrl = 'http://localhost:8108';

  constructor(private readonly httpClient: HttpClient) {
  }

  async getCollections(): Promise<Collection[]> {
    const res = await this.httpClient.get<CollectionDto[]>(this.baseUrl + '/collections')

    return res.map((dto) => new Collection(dto.name, dto.num_documents, dto.fields));
  }
}
