"use client";

import { useEffect, useState } from "react";
import { GetCollectionsUseCase, TypesenseRepository } from "@typesense_inspector/core";
import { httpClient } from "@/lib/http-client";
import { useCollectionStore } from "@/store/collectionStore";
import { toast } from "sonner";


export function useCollectionViewModel() {
  const { collections, setCollections } = useCollectionStore()
  const [loading, setLoading] = useState(true);

  const repository = new TypesenseRepository(httpClient);
  const getCollections = new GetCollectionsUseCase(repository);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getCollections.execute();
      setCollections(data);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return {
    collections,
    loading,
    refresh: load,
  };
}