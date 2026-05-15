"use client";
import Sidebar from "@/components/Sidebar";
import { useCollectionViewModel } from "@/hooks/useCollectionViewModel";
import Header from "@/components/Header";
import { useState } from "react";
import { Collection } from "@typesense_inspector/core";
import DocumentsResult from "@/components/DocumentsResult";
import Footer from "@/components/Footer";
import { useDocumentsViewModel } from "@/hooks/useDocumentsViewModel";

export default function Home() {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Collection>();
  const { collections, loading, refresh: refreshCollections } = useCollectionViewModel();
  const { documents, lastPage } = useDocumentsViewModel(selected?.name ?? '', '*', page, 20);

  const handleCollectionChange = (collection: Collection) => {
    setSelected(collection);
    setPage(1);
  }

  return (
    <div className="flex min-h-screen font-sans">
      <Sidebar
        collections={collections}
        onRefresh={refreshCollections}
        loading={loading}
        selected={selected}
        onClick={handleCollectionChange}
      />
      <main className="flex flex-1 flex-col min-w-0">
        <Header collection={selected}/>
        <DocumentsResult collection={selected} documents={documents}/>
        <Footer page={page} lastPage={lastPage} onChangePage={(p) => setPage(p)}/>
      </main>
    </div>
  );
}
