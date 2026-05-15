"use client";

import { useEffect, useState } from "react";
import { useCollectionStore } from "@/store/collectionStore";
import { toast } from "sonner";
import { getUseCases } from "@/lib/container";


export function useCollectionViewModel() {
  const { collections, setCollections } = useCollectionStore()
  const [loading, setLoading] = useState(true);
  const { getCollections } = getUseCases()

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