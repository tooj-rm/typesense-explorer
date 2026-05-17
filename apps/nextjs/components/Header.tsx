"use client";

import { FileJson, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCollectionStore } from "@/store/collectionStore";
import { useDocumentStore } from "@/store/documentStore";
import { useSearchStore } from "@/store/searchStore";
import { MultiSelectAutocomplete } from "@/components/ui/multi-select";
import { usePaginationStore } from "@/store/paginationStore";

const Header = () => {
  const { search, setSearch, filterBy, setFilterBy, queryBy, setQueryBy } = useSearchStore()
  const { reset } = usePaginationStore()
  const { selected: collection } = useCollectionStore()
  const { documents } = useDocumentStore()

  const columns = collection?.fields.map((field) => ({
    label: field.name,
    value: field.name,
  })) ?? []

  return (
    <header className="px-4 py-6 border-b border-border bg-background/60">
      <div className="flex items-center gap-3">
        <FileJson className="h-5 w-5 text-primary"/>
        <div className="min-w-0">
          <span>{collection?.name ?? "Select a collection"}</span>
          {collection && (<div className="text-xs text-muted-foreground">
            <span>{collection.documentCount} docs</span>
            {` • `}
            <span>{collection.fieldCount} fields</span>
          </div>)
          }
        </div>

        {documents && (
          <div className="ml-auto text-xs text-muted-foreground">
            <span>{documents.values.length} hits</span>
            {` • `}
            <span>{documents.searchTime}ms</span>
          </div>
        )}
      </div>

    <div className="grid gap-2 mt-4 md:grid-cols-4">
        <div className="relative">
          <MultiSelectAutocomplete
            options={columns}
            value={queryBy.split(',')}
            onChange={values => setQueryBy(values.join(','))}
            placeholder="query_by"
          />
        </div>
        <div className="relative">
          <Search className="absolute pointer-events-none left-3 top-1/2 h-4 w-4 -translate-1/2"/>
          <Input
            className="pl-9 text-sm"
            placeholder="Search query (use * for all)"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              reset()
            }}
          />
        </div>

        <div className="relative">
          <Filter className="absolute pointer-events-none left-3 top-1/2 h-4 w-4 -translate-1/2"/>
          <Input
            className="pl-9 text-sm"
            placeholder="filter_by e.g. category:=shoes && price:>50"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          />
        </div>

        <Input
          className="text-sm"
          placeholder="sort_by e.g. price:desc"
        />
      </div>
    </header>
  );
};

export default Header;