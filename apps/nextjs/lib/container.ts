import { GetCollectionsUseCase, GetDocumentsUseCase, } from "@typesense_inspector/core";
import { FetchHttpClient, TypesenseRepository } from "@typesense_inspector/adapters";

import { useConnectStore } from "@/store/connectStore";


const buildHeaders = () => {
  const { apiKey } = useConnectStore.getState();

  return {
    "x-typesense-api-key": apiKey,
    "Content-Type": "application/json",
  };
};

export const getUseCases = () => {
  const { host } = useConnectStore.getState();
  const httpClient = new FetchHttpClient(buildHeaders());

  const repository = new TypesenseRepository(host, httpClient);

  return {
    getDocuments: new GetDocumentsUseCase(repository),
    getCollections: new GetCollectionsUseCase(repository),
  };
};