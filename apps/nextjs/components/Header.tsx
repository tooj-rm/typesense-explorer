import React from 'react';
import { FileJson, Filter, Search } from "lucide-react";
import { Collection } from "@typesense_inspector/core";
import { Input } from "@/components/ui/input";

const Header = ({ collection }: { collection?: Collection }) => {
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

        <div className="ml-auto text-xs text-muted-foreground">
          <span>7 hits</span>
          {` • `}
          <span>4 ms</span>
        </div>
      </div>

      <div className="grid gap-2 mt-4 md:grid-cols-[1fr_1fr_220px]">
        <div className="relative">
          <Search className="absolute pointer-events-none left-3 top-1/2 h-4 w-4 -translate-1/2"/>
          <Input
            className="pl-9 text-sm"
            placeholder="Search query (use * for all)"
          />
        </div>

        <div className="relative">
          <Filter className="absolute pointer-events-none left-3 top-1/2 h-4 w-4 -translate-1/2"/>
          <Input
            className="pl-9 text-sm"
            placeholder="filter_by e.g. category:=shoes && price:>50"
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