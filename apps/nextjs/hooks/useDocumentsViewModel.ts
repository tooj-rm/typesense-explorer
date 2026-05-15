"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCollectionStore } from "@/store/collectionStore";
import { usePaginationStore } from "@/store/paginationStore";
import { useDocumentStore } from "@/store/documentStore";
import { getDocuments } from "@/lib/container";

export function useDocumentsViewModel() {
  const { selected: collection } = useCollectionStore()
  const { page, perPage, search, setTotal } = usePaginationStore()
  const { documents, setDocuments } = useDocumentStore()
  const [loading, setLoading] = useState(true);

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