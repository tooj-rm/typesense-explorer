import React from 'react';
import { Collection } from "@typesense_inspector/core";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Props = {
  collection?: Collection;
};

const DocumentsResult = ({ collection }: Props) => {
  const columns = !collection ? [] : ['id', ...collection.fields.map((f) => f.name)]

  return (
    <section className="flex-1 overflow-x-auto px-6 py-4">
      <div className="overflow-hidden rounded-md border border-border bg-card/30">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((c) => (
                <TableHead
                  key={c}
                  className="text-muted-foreground tracking-wider"
                >
                  {c}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
        </Table>
      </div>
    </section>
  );
};

export default DocumentsResult;