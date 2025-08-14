"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useBreakpoint } from "@/hooks/use-breakpoint"
import { FormControl } from "./form"
import { HugeiconsIcon } from "@hugeicons/react"
import { UnfoldMoreIcon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { getInputClassName } from "./input"

type Option = {
  value: string
  label:
    | string
    | ((option: Option, selectedOption: Option | null) => React.ReactNode)
}

type ComboboxProps<TOption extends Option> = {
  options: TOption[]
  value?: string
  formControl?: boolean
  placeholder?: React.ReactNode
  onValueChange?: (selectedOption: TOption, allOptions: TOption[]) => void
  classNames?: Partial<Record<"root" | "trigger" | "content" | "list", string>>
  disabled?: boolean
  renderLabel?: (
    selectedOption: TOption | null,
    options: TOption[],
  ) => React.ReactNode
  searchable?: boolean
}

export function ComboBox<TOption extends Option>({
  options,
  value,
  onValueChange,
  formControl,
  placeholder = "Select an option",
  renderLabel,
  classNames,
  disabled,
  searchable = true,
}: ComboboxProps<TOption>) {
  const [open, setOpen] = React.useState(false)
  const isMobile = useBreakpoint("max-md")
  const [_selectedOption, _setSelectedOption] = React.useState<TOption | null>(
    null,
  )

  const selectedOption = value
    ? options.find((option) => option.value === value)
    : _selectedOption

  const setSelectedOption = (option: TOption) => {
    onValueChange?.(option, options)
    _setSelectedOption(option)
    setOpen(false)
  }

  let trigger = (
    <Button
      variant="outline"
      disabled={disabled}
      className={cn(
        "w-[200px] justify-start",
        getInputClassName({ placeholder: !selectedOption }),
        classNames?.trigger,
      )}
    >
      {selectedOption ? (
        <>{renderLabel?.(selectedOption, options) ?? selectedOption.label}</>
      ) : (
        placeholder
      )}
      <HugeiconsIcon icon={UnfoldMoreIcon} className="ml-auto" />
    </Button>
  )

  trigger = formControl ? <FormControl>{trigger}</FormControl> : trigger

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent>
          <div className="mt-4 border-t">
            <StatusList
              options={options}
              onValueChange={setSelectedOption}
              searchable={searchable}
            />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        align="start"
        className={cn("w-fit p-0", classNames?.content)}
      >
        <StatusList
          options={options}
          onValueChange={setSelectedOption}
          searchable={searchable}
        />
      </PopoverContent>
    </Popover>
  )
}

function StatusList<TOption extends Option>({
  options,
  onValueChange,
  searchable,
}: Pick<ComboboxProps<TOption>, "options" | "onValueChange"> & {
  searchable?: boolean
}) {
  return (
    <Command>
      {searchable && <CommandInput placeholder="Search..." />}
      <CommandList className="min-w-30">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {options.map((option) => (
            <CommandItem
              key={option.value}
              value={option.value}
              onSelect={(value) => {
                const selectedOption = options.find(
                  (option) => option.value === value,
                )
                if (!selectedOption) return
                onValueChange?.(selectedOption, options)
              }}
            >
              {typeof option.label === "function"
                ? option.label(option, null)
                : option.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
