import {
  Collection,
  CollectionRepository,
  DocumentRepository,
  Documents,
  HttpClient, SearchParams,
} from "@typesense_inspector/core";
import { CollectionDto, SearchResponse } from "@typesense_inspector/adapters"

export class TypesenseRepository implements CollectionRepository, DocumentRepository {
  constructor(
    private readonly baseUrl: string,
    private readonly httpClient: HttpClient
  ) {
  }

  async search(collection: string, { search, page, limit, filterBy, queryBy, sortBy }: SearchParams): Promise<Documents> {
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      q: search,
      filter_by: filterBy,
      query_by: queryBy,
      sort_by: sortBy
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
