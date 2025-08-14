import * as React from "react"

import { cn } from "@/lib/utils"
import { FormControl } from "./form"

function Textarea({
  className,
  formControl,
  ...props
}: React.ComponentProps<"textarea"> & { formControl?: boolean }) {
  const textarea = (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 field-sizing-content shadow-xs flex min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  )

  return formControl ? <FormControl>{textarea}</FormControl> : textarea
}

export { Textarea }
