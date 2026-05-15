import {
  Collection,
  CollectionDto,
  CollectionRepository,
  DocumentRepository,
  Documents,
  HttpClient,
  SearchResponse
} from "@typesense_inspector/core";

export class TypesenseRepository implements CollectionRepository, DocumentRepository {
  constructor(
    private readonly baseUrl: string,
    private readonly httpClient: HttpClient
  ) {
  }

  async search(collection: string, search: string, page: number, limit: number): Promise<Documents> {
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      q: search
    }
    const query = new URLSearchParams(params).toString();
    const res = await this.httpClient.get<SearchResponse>(this.baseUrl + `/collections/${collection}/documents/search?${query}`)

    return new Documents(res.search_time_ms, res.found, res.hits.map((hit) => hit.document));
  }

  async getCollections(): Promise<Collection[]> {
    const res = await this.httpClient.get<CollectionDto[]>(this.baseUrl + '/collections')

    return res.map((dto) => new Collection(dto.name, dto.num_documents, dto.fields));
  }
}
