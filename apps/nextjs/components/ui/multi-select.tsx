import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

type Key = string

export type MultiSelectOption<T> = T & {
  label: string
  value: Key
}

type Props<T> = {
  options: MultiSelectOption<T>[]
  value?: Key[]
  onChange?: (values: Key[]) => void

  placeholder?: string
  className?: string

  disabled?: boolean
}

export function MultiSelectAutocomplete<T>(
  {
    options,
    value,
    onChange,
    placeholder = "Select items...",
    className,
    disabled,
  }: Readonly<Props<T>>) {
  const [open, setOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState<Key[]>([])

  const isControlled = value !== undefined
  const selected = isControlled ? value : internalValue

  const setSelected = (vals: Key[]) => {
    if (!isControlled) setInternalValue(vals)
    onChange?.(vals)
  }

  const toggle = (val: Key) => {
    setSelected(
      selected.includes(val)
        ? selected.filter((v) => v !== val)
        : [...selected, val]
    )
  }

  const selectedItems = options.filter((o) =>
    selected.includes(o.value)
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-between h-8",
            className
          )}
        >
          {selected.length === 0 ? (
            <span className="text-muted-foreground">
      {placeholder}
      </span>
          ) : (
            <div className="flex flex-wrap gap-1">
              {selectedItems.map((item) => (
                <Badge key={item.value} variant="secondary">
                  {item.label}
                </Badge>
              ))}
            </div>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search..."/>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup>
              {options.map((option) => {
                const isSelected = selected.includes(option.value)

                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => toggle(option.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}