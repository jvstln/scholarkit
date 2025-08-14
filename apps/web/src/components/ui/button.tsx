import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Spinner } from "./spinner"

const buttonVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all duration-300 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='transition'])]:transition-transform [&_svg]:pointer-events-none [&_svg]:shrink-0 active:[&_svg]:scale-90",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow hover:shadow-primary hover:text-shadow-md",
        "primary-outline":
          "bg-primary-foreground shadow-primary hover:shadow-glow border-primary text-primary hover:text-shadow-md dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border",
        outline:
          "bg-background text-foreground shadow-xs hover:bg-background/80 dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border",
        destructive:
          "bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 hover:shadow-destructive shadow-glow text-white",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-glow hover:shadow-secondary",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "link",
      },
      size: {
        default: "h-10 px-5 py-2 has-[>svg]:px-4",
        sm: "h-8 gap-1.5 rounded-md px-3",
        lg: "h-12 rounded-md px-6",
        icon: "size-9",
        "icon-sm":
          "[>svg:not([class*='size'])]:size-4 size-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        "icon-lg":
          "[>svg:not([class*='size'])]:size-8 size-10 rounded-md px-6 has-[>svg]:px-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  isLoading,
  loadingText,
  disabled,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    isLoading?: boolean
    loadingText?: React.ReactNode
  }) {
  const Comp = asChild ? Slot : "button"
  const LoadingComp = Comp === "button" ? React.Fragment : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <LoadingComp>
          {loadingText}
          <Spinner />
        </LoadingComp>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
