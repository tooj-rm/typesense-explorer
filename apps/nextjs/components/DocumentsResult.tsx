"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useCollectionStore } from "@/store/collectionStore";
import { useDocumentsViewModel } from "@/hooks/useDocumentsViewModel";

const DocumentsResult = () => {
  const { selected: collection } = useCollectionStore()
  const columns = collection ? ['id', ...collection.fields.map((f) => f.name)] : []
  const { documents } = useDocumentsViewModel();

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
          <TableBody>
            {documents?.values?.map((hit: Record<string, unknown>, i: number) => {
              return (
                <TableRow
                  key={hit['id']?.toString() ?? i}
                  className="cursor-pointer border-border font-mono text-xs"
                >
                  {columns.map((col) => (
                    <TableCell
                      key={col}
                      className="max-w-[280px] truncate"
                    >
                      <CellValue value={hit[col]}/>
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

function CellValue({ value }: Readonly<{ value: unknown }>) {
  if (value === null || value === undefined) {
    return <span className="text-muted-foreground/60">—</span>;
  }
  if (typeof value === "boolean") {
    return (
      <span className="text-[var(--syntax-bool)]">{value ? "true" : "false"}</span>
    );
  }
  if (typeof value === "number") {
    return <span className="text-[var(--syntax-number)]">{value}</span>;
  }
  if (Array.isArray(value)) {
    const text = `[${value.length}] ${value.slice(0, 3).join(", ")}`;
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="text-muted-foreground">{text}</span>
        </TooltipTrigger>
        <TooltipContent className="max-w-sm font-mono text-xs">
          {JSON.stringify(value)}
        </TooltipContent>
      </Tooltip>
    );
  }
  if (typeof value === "object") {
    return (
      <span className="text-muted-foreground">
        {`{${Object.keys(value).length} keys}`}
      </span>
    );
  }
  return <span>{String(value)}</span>;
}

export default DocumentsResult;