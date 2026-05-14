"use client";

import { useState } from 'react';
import { Database, LogOut, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Collection } from "@typesense_inspector/core";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

type SidebarProps = {
  collections: Collection[];
  onRefresh: () => void;
  loading: boolean;
  onClick: (collection: Collection) => void;
  selected?: Collection;
}

const Sidebar = ({ collections, onRefresh, loading, selected, onClick }: SidebarProps) => {

  return (
    <aside className="flex flex-col w-64 shrink-0 border-r border-border bg-card/50">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <Database className="h-4 w-4 text-primary"/>
        <span className="text-sl font-semibold">Typesense</span>
        <Badge variant="outline" className="ml-auto font-mono text-[10px]">Demo</Badge>
      </div>

      <div
        className="flex justify-between items-center px-4 py-2 mb-3 text-xs uppercase tracking-wider text-muted-foreground">
        <span>Collections</span>
        <Button onClick={onRefresh} size="sm" variant="ghost" className="h-3 w-3">
          <RefreshCw className="h-3 w-3"/>
        </Button>
      </div>

      {
        loading && (
          <div className="flex justify-center items-center w-full">
            <Spinner className="h-6 w-6 text-primary"/>
          </div>
        )
      }

      <nav className="flex flex-col flex-1 gap-2 px-2 pb-3">
        {
          !loading && collections.length == 0 && (
            <p className="px-2 py-4">No collections found</p>
          )
        }
        {
          !loading && collections.map((c) => (
            <Button
              key={c.name}
              variant="outline"
              onClick={() => onClick(c)}
              className={cn(
                "group flex w-full justify-between items-center gap-2 rounded-md px-2 py-1.5 text-left",
                selected?.name !== c.name && "text-foreground/80 hover:bg-accent/50",
                selected?.name === c.name && "bg-accent text-accent-foreground",
              )}
            >
              <span className="truncate">{c.name}</span>
              <span className="text-[10px] text-muted-foreground">{c.documentCount}</span>
            </Button>
          ))
        }
      </nav>

      <div className="border-t border-border p-3">
        <Button
          size="sm"
          variant="ghost"
          className="w-full justify-start"
        >
          <LogOut className="h-4 w-4"/> Disconnect
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;