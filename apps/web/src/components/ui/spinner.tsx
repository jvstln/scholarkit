import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { Orbit01Icon } from "@hugeicons/core-free-icons";

export const Spinner = ({ className }: { className?: string }) => {
  return (
    <>
      <HugeiconsIcon
        icon={Orbit01Icon}
        className={cn("size-4 animate-spin", className)}
      />
      <span className="sr-only">Loading...</span>
    </>
  );
};
