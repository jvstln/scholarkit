import { Button } from "./button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./dialog"
import { DialogHeader, DialogFooter } from "./dialog"
import { HugeiconsIcon } from "@hugeicons/react"
import { AlertCircleIcon } from "@hugeicons/core-free-icons"
import { useState } from "react"

type DeleteConfirmationDialogProps = {
  children: React.ReactNode
  title?: string
  description?: string
  deleteButtonText?: string
  onDelete?: React.MouseEventHandler<HTMLButtonElement>
}

export const DeleteConfirmationDialog = ({
  children,
  title = "Confirm delete",
  description = "Are you sure you want to proceed",
  deleteButtonText = "Yes, delete",
  onDelete,
}: DeleteConfirmationDialogProps) => {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="max-w-sm md:max-w-sm"
      >
        <DialogHeader className="items-center gap-2">
          <HugeiconsIcon
            icon={AlertCircleIcon}
            className="size-16 rounded-md bg-red-100 fill-red-500 p-2 text-white [&_circle]:stroke-transparent"
          />
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="*:flex-1">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={async (e) => {
              setIsDeleting(true)
              await onDelete?.(e)
              if (!e.defaultPrevented) {
                setOpen(false)
              }
              setIsDeleting(false)
            }}
            isLoading={isDeleting}
          >
            {deleteButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
