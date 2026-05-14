"use client";

import { useEffect, useState } from "react";
import { Collection, GetCollectionsUseCase, TypesenseRepository } from "@typesense_inspector/core";

const headers = {
  'x-typesense-api-key': 'xyz',
}

const httpClient = {
  get: async (url: string) => {
    const res = await fetch(url, { headers });
    return res.json();
  },
  post: async (url: string, data: any) => {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers
    });
    return res.json();
  },
  put: async (url: string, data: any) => {
    const res = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers
    });
    return res.json();
  },
  delete: async (url: string) => {
    const res = await fetch(url, {
      method: 'DELETE',
      headers
    });
    return res.json();
  },
};

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