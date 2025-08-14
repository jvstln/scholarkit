"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  onValueChange,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  const moveTabsTriggerDecorator = () => {
    const decorator = document.querySelector<HTMLDivElement>(
      '[data-slot="tabs-trigger-decorator"]',
    )
    const trigger = document.querySelector<HTMLButtonElement>(
      '[data-slot="tabs-trigger"][data-state="active"]',
    )
    if (!decorator || !trigger) return

    decorator.style.left = trigger.offsetLeft + "px"
    decorator.style.width = trigger.offsetWidth + "px"
  }

  // Also move the decorator if there is a defaultValue or value
  React.useEffect(() => {
    if (!props.defaultValue && !props.value) return
    moveTabsTriggerDecorator()
    window.addEventListener("resize", moveTabsTriggerDecorator)
    return () => {
      window.removeEventListener("resize", moveTabsTriggerDecorator)
    }
  }, [props.defaultValue, props.value])

  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      onValueChange={(value) => {
        // Move the underline decorator and call the main onValueChange function (if any)
        moveTabsTriggerDecorator()
        onValueChange?.(value)
      }}
      {...props}
    />
  )
}

function TabsList({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "text-muted-foreground relative inline-flex h-12 w-full items-center justify-start overflow-auto border-y p-1",
        className,
      )}
      {...props}
    >
      {children}
      <div
        className="bg-primary pointer-events-none absolute bottom-0 left-0 right-0 h-0.5 w-0 transition-all duration-300"
        data-slot="tabs-trigger-decorator"
      />
    </TabsPrimitive.List>
  )
}

function TabsTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:text-primary focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground flex-0 inline-flex h-[calc(100%-1px)] cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-s-md border border-transparent px-2 py-1 text-sm font-medium transition-[color,box-shadow] focus-visible:outline-1 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      onClick={(...args) => {
        onClick?.(...args)
        if (args[0].defaultPrevented) return
        args[0].currentTarget.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        })
      }}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("animate-in fade-in flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
