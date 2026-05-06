import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-[0.68rem] tracking-wider uppercase transition-colors",
  {
    variants: {
      variant: {
        default: "border-line text-muted",
        outline: "border-line-strong text-ink",
        accent:
          "border-accent/40 text-accent bg-accent/5",
        muted: "border-line bg-surface-2 text-muted",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
