import * as React from "react"
import { Plus, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Condition = {
  field: string
  operator: string
  value: string
}

const operators = ["=", ">", "<", ">=", "<="]

type Props = {
  value?: Condition[]
  onChange?: (value: Condition[]) => void,
  placeholder?: string,
  fields: {
    label: string,
    value: string
  }[]
}

export function QueryByInput({ value, onChange, placeholder, fields }: Readonly<Props>) {
  const [open, setOpen] = React.useState(false)

  const [internal, setInternal] = React.useState<Condition[]>([])
  const isControlled = value !== undefined

  const conditions = isControlled ? value : internal

  const setConditions = (next: Condition[]) => {
    if (!isControlled) setInternal(next)
    onChange?.(next)
  }

  const [draft, setDraft] = React.useState<Condition>({
    field: "category",
    operator: "=",
    value: "",
  })

  const addCondition = () => {
    if (!draft.value.trim()) return

    setConditions([...conditions, draft])

    setDraft({
      field: "category",
      operator: "=",
      value: "",
    })

    setOpen(false)
  }

  const removeCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index))
  }

  return (
    <div className="w-full">
      {/* INPUT CONTAINER */}
      <div
        className={cn(
          "flex flex-wrap justify-between items-center gap-2",
          "w-full h-8",
          "border rounded-lg px-2 py-1",
          "focus-within:ring-2 focus-within:ring-ring",
          "bg-card/80"
        )}
      >
        {
          conditions.length === 0 && (
            <span className="text-sm text-muted-foreground px-1">
              {placeholder}
            </span>
          )}
        <div>
          {conditions.map((c, i) => (
            <Badge
              key={i}
              variant="secondary"
              className="gap-1 font-mono"
            >
              {c.field}:{c.operator}{c.value}

              <button
                onClick={() => removeCondition(i)}
                className="ml-1"
              >
                <X className="h-3 w-3"/>
              </button>
            </Badge>
          ))}
        </div>

        {/* ADD BUTTON (acts like cursor) */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button className="flex items-center justify-center h-6 w-6 rounded hover:bg-accent">
              <Plus className="h-3 w-3"/>
            </button>
          </PopoverTrigger>

          <PopoverContent className="w-90 space-y-3" align="end">
            <div className="flex gap-2">
              <Select
                value={draft.field}
                onValueChange={(v) =>
                  setDraft({ ...draft, field: v })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Field"/>
                </SelectTrigger>
                <SelectContent>
                  {fields.map((f) => (
                    <SelectItem key={f.value} value={f.value}>
                      {f.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={draft.operator}
                onValueChange={(v) =>
                  setDraft({ ...draft, operator: v })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Operator"/>
                </SelectTrigger>
                <SelectContent>
                  {operators.map((op) => (
                    <SelectItem key={op} value={op}>
                      {op}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                placeholder="Value..."
                value={draft.value}
                onChange={(e) =>
                  setDraft({ ...draft, value: e.target.value })
                }
              />
            </div>

            <Button onClick={addCondition} className="w-full">
              Add filter
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}