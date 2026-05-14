"use client";
import Sidebar from "@/components/Sidebar";
import { useCollectionViewModel } from "@/hooks/useCollectionViewModel";

export default function Home() {
  const { collections, loading, refresh } = useCollectionViewModel();

  return (
    <div className="flex flex-1 font-sans">
      <Sidebar
        collections={collections}
        onRefresh={refresh}
        loading={loading}
      />
    </div>
  );
}
