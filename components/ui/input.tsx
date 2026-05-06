import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-9 w-full rounded-md border border-line-strong bg-bg px-3 py-2 text-[0.9rem] text-ink placeholder:text-muted/70",
          "focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
          "disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
