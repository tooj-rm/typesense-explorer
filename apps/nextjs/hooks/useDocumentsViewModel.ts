"use client";

import { useEffect, useState } from "react";
import { GetDocumentsUseCase, TypesenseRepository } from "@typesense_inspector/core";
import { httpClient } from "@/lib/http-client";
import { toast } from "sonner";
import { useCollectionStore } from "@/store/collectionStore";
import { usePaginationStore } from "@/store/paginationStore";
import { useDocumentStore } from "@/store/documentStore";

export function useDocumentsViewModel() {
  const { selected: collection } = useCollectionStore()
  const { page, perPage, search, setTotal } = usePaginationStore()
  const { documents, setDocuments } = useDocumentStore()
  const [loading, setLoading] = useState(true);

  const repository = new TypesenseRepository(httpClient);
  const getDocuments = new GetDocumentsUseCase(repository);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getDocuments.execute(collection?.name ?? '', search, page, perPage);
      setDocuments(data);
      setTotal(data.total);
    } catch (e: any) {
      toast.error(e.message);
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
    loading
  };
}