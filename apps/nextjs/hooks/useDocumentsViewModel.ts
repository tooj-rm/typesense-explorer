"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCollectionStore } from "@/store/collectionStore";
import { usePaginationStore } from "@/store/paginationStore";
import { useDocumentStore } from "@/store/documentStore";
import { getUseCases } from "@/lib/container";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchStore } from "@/store/searchStore";

export function useDocumentsViewModel() {
  const { getDocuments } = getUseCases()
  const { selected: collection } = useCollectionStore()
  const { page, perPage, setTotal } = usePaginationStore()
  const { filterBy, queryBy, search } = useSearchStore()
  const { documents, setDocuments } = useDocumentStore()
  const [loading, setLoading] = useState(true);

  const debouncedFilterBy = useDebounce(filterBy);
  const debouncedSearch = useDebounce(search);
  const debouncedQueryBy = useDebounce(queryBy);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getDocuments.execute(collection?.name ?? '', { search, page, limit: perPage, filterBy, queryBy });
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
  }, [collection, page, debouncedSearch, debouncedFilterBy]);

  return {
    documents,
    loading
  };
}