"use client";
import Sidebar from "@/components/Sidebar";
import { useCollectionViewModel } from "@/hooks/useCollectionViewModel";
import Header from "@/components/Header";
import { useState } from "react";
import { Collection } from "@typesense_inspector/core";

export default function Home() {
  const { collections, loading, refresh } = useCollectionViewModel();
  const [selected, setSelected] = useState<Collection>();

  return (
    <div className="flex flex-1 font-sans">
      <Sidebar
        collections={collections}
        onRefresh={refresh}
        loading={loading}
        selected={selected}
        onClick={(c) => setSelected(c)}
      />
      <div className="flex flex-col flex-1">
        <Header collection={selected}/>
      </div>
    </div>
  );
}
