"use client";

import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePaginationStore } from "@/store/paginationStore";

const Footer = () => {
  const { page, lastPage, setPage } = usePaginationStore()

  return (
    <footer className="flex items-center justify-between border-t border-border px-6 py-3 text-xs text-muted-foreground">
      <div>
        Page <span className="font-mono text-foreground">{page}</span> of{" "}
        <span className="font-mono text-foreground">{lastPage}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setPage(Math.max(1, page - 1))}
        >
          <ChevronLeft className="h-4 w-4" /> Prev
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setPage(Math.min(lastPage, page + 1))}
        >
          Next <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </footer>
  );
};

export default Footer;