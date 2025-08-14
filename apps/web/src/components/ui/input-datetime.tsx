"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { Calendar04Icon, Clock01Icon } from "@hugeicons/core-free-icons"
import { format } from "date-fns"
import type { DayPickerProps, PropsSingle } from "react-day-picker"
import { getInputClassName } from "./input"
import { FormControl } from "./form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"

function getFormattedDate(date: Date | undefined) {
  if (!date) return ""
  return format(date, "PPP")
}

const timeOptions = Array.from({ length: 48 }).map((_, index) => {
  const hours = Math.floor(index / 2)
  const minutes = index % 2 === 0 ? "00" : "30"
  return {
    label: `${hours}:${minutes}`,
    value: `${hours}:${minutes}`,
  }
})

type DatePickerProps = Omit<DayPickerProps, "mode"> & {
  placeholder?: string
  className?: string
  selected?: PropsSingle["selected"]
  onSelect?: PropsSingle["onSelect"]
  formControl?: boolean
}

export const DateInput = ({
  placeholder = "Select date",
  selected,
  onSelect,
  className,
  formControl,
  ...props
}: DatePickerProps) => {
  const [open, setOpen] = React.useState(false)
  const [_selected, _setSelected] = React.useState<Date | undefined>(selected)

  const formattedDate = getFormattedDate(selected || _selected) || placeholder

  const input = (
    <button
      className={getInputClassName({
        placeholder: placeholder && placeholder === formattedDate,
      })}
    >
      <HugeiconsIcon
        icon={Calendar04Icon}
        className="text-muted-foreground size-4"
      />
      {formattedDate}
    </button>
  )

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {formControl ? <FormControl>{input}</FormControl> : input}
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="center">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            className={cn("w-full", className)}
            selected={_selected}
            onSelect={(date, ...rest) => {
              _setSelected(date)
              setOpen(false)
              onSelect?.(date, ...rest)
            }}
            {...props}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export const TimeInput = ({
  formControl,
  ...props
}: React.ComponentProps<typeof Select> & { formControl?: boolean }) => {
  const trigger = (
    <SelectTrigger>
      <HugeiconsIcon className="shrink-0" icon={Clock01Icon} />
      <SelectValue placeholder="Select a time" />
    </SelectTrigger>
  )

  return (
    <Select {...props}>
      {formControl ? <FormControl>{trigger}</FormControl> : trigger}
      <SelectContent>
        {timeOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
