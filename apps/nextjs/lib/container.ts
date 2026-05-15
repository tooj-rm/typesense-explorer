import { GetCollectionsUseCase, GetDocumentsUseCase, TypesenseRepository } from "@typesense_inspector/core";
import { httpClient } from "@/lib/http-client";


const repository = new TypesenseRepository(httpClient);

export const getDocuments = new GetDocumentsUseCase(repository);

export const getCollections = new GetCollectionsUseCase(repository);