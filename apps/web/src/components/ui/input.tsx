"use client"
import * as React from "react"

import { cn } from "@/lib/utils"
import { FormControl } from "./form"
import { HugeiconsIcon } from "@hugeicons/react"
import { ViewIcon, ViewOffSlashIcon } from "@hugeicons/core-free-icons"
import { Button } from "./button"

type InputProps = {
  formControl?: boolean
  icon?: React.ComponentProps<typeof HugeiconsIcon>["icon"]
  iconPosition?: "start" | "end"
  rootClassName?: string
}

// This function is used to generate the className for the input-looking elements such as date, select, combobox...
export const getInputClassName = ({
  className,
  icon,
  iconPosition,
  placeholder,
}: {
  className?: string
  icon?: boolean | React.ReactNode
  iconPosition?: "start" | "end"
  placeholder?: boolean | string
} = {}) =>
  cn(
    "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input shadow-xs flex h-12 w-full min-w-0 rounded-md border bg-transparent text-base outline-none transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-sm disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    // colors
    "file:text-foreground bg-background text-foreground has-data-[placeholder]:text-muted-foreground hover:bg-gray-50 focus:bg-gray-50 disabled:bg-gray-100",
    // For spacings (and normalizing buttons) in particular
    "flex items-center gap-2 px-4 py-1",
    // Icons
    "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    placeholder && "text-muted-foreground",
    className,
    icon && iconPosition === "start" && "pl-11",
    icon && iconPosition === "end" && "pr-11",
  )

export function Input({
  type,
  className,
  formControl,
  icon,
  iconPosition = "start",
  rootClassName,
  ...props
}: React.ComponentProps<"input"> & InputProps) {
  const [showPassword, setShowPassword] = React.useState(false)

  let input = (
    <input
      data-slot="input"
      className={getInputClassName({ className, icon: !!icon, iconPosition })}
      type={type === "password" && showPassword ? "text" : type}
      {...props}
    />
  )

  if (formControl) input = <FormControl>{input}</FormControl>

  if (icon || type === "password") {
    input = (
      <div
        className={cn(
          "has-disabled:cursor-not-allowed group relative",
          rootClassName,
        )}
      >
        {icon && (
          <HugeiconsIcon
            icon={icon}
            className={cn(
              "absolute top-1/2 size-5 -translate-y-1/2 group-has-[:disabled]:opacity-50",
              iconPosition === "start" && "left-4",
              iconPosition === "end" && "right-4",
            )}
          />
        )}
        {input}
        {type === "password" && (
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-1/2 h-full -translate-y-1/2 cursor-pointer"
            disabled={props.disabled}
          >
            <HugeiconsIcon icon={showPassword ? ViewIcon : ViewOffSlashIcon} />
          </Button>
        )}
      </div>
    )
  }

  return input
}
