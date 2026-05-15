import {
  GetCollectionsUseCase,
  GetDocumentsUseCase,
  TypesenseRepository,
} from "@typesense_inspector/core";

import { httpClient } from "@/lib/http-client";
import { useConnectStore } from "@/store/connectStore";

export const getUseCases = () => {
  const { host } = useConnectStore.getState();

  const repository = new TypesenseRepository(host, httpClient);

  return {
    getDocuments: new GetDocumentsUseCase(repository),
    getCollections: new GetCollectionsUseCase(repository),
  };
};