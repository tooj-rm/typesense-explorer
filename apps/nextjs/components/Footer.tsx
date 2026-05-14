import React from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Footer = ({ page, totalPages }: { page: number, totalPages: number }) => {
  return (
    <footer className="flex items-center justify-between border-t border-border px-6 py-3 text-xs text-muted-foreground">
      <div>
        Page <span className="font-mono text-foreground">{page}</span> of{" "}
        <span className="font-mono text-foreground">{totalPages}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
        >
          <ChevronLeft className="h-4 w-4" /> Prev
        </Button>
        <Button
          size="sm"
          variant="outline"
        >
          Next <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </footer>
  );
};

export default Footer;