"use client";

import { useEffect, useState } from "react";
import { Documents, GetDocumentsUseCase, TypesenseRepository } from "@typesense_inspector/core";
import { httpClient } from "@/lib/http-client";

export function useDocumentsViewModel(collection: string, search: string, page: number, limit: number) {
  const [documents, setDocuments] = useState<Documents>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const repository = new TypesenseRepository(httpClient);
  const getDocuments = new GetDocumentsUseCase(repository);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getDocuments.execute(collection, search, page, limit);
      setDocuments(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(!collection) return
    load();
  }, [collection, search, page]);

  return {
    documents,
    searchTime: documents?.searchTime,
    lastPage: Math.ceil((documents?.total ?? 1) / limit),
    loading,
    error,
  };
}