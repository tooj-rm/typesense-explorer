"use client";
import Sidebar from "@/components/Sidebar";
import { useCollectionViewModel } from "@/hooks/useCollectionViewModel";
import Header from "@/components/Header";
import { useState } from "react";
import { Collection } from "@typesense_inspector/core";
import DocumentsResult from "@/components/DocumentsResult";
import Footer from "@/components/Footer";

export default function Home() {
  const { collections, loading, refresh } = useCollectionViewModel();
  const [selected, setSelected] = useState<Collection>();

  return (
    <div className="flex min-h-screen font-sans">
      <Sidebar
        collections={collections}
        onRefresh={refresh}
        loading={loading}
        selected={selected}
        onClick={(c) => setSelected(c)}
      />
      <main className="flex flex-1 flex-col min-w-0">
        <Header collection={selected}/>
        <DocumentsResult collection={selected}/>
        <Footer page={1} totalPages={2}/>
      </main>
    </div>
  );
}
