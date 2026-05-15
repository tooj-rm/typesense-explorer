"use client";

import { useEffect, useState } from "react";
import { Collection, GetCollectionsUseCase, TypesenseRepository } from "@typesense_inspector/core";
import { httpClient } from "@/lib/http-client";


export function useCollectionViewModel() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const repository = new TypesenseRepository(httpClient);
  const getCollections = new GetCollectionsUseCase(repository);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getCollections.execute();
      setCollections(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return {
    collections: collections,
    loading,
    error,
    refresh: load,
  };
}