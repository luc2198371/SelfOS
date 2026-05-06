import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  action,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-6",
        className
      )}
    >
      <div className="min-w-0 space-y-1.5">
        <h1 className="font-mono text-h1 text-ink leading-tight">{title}</h1>
        {description && (
          <p className="text-[0.92rem] text-muted leading-relaxed max-w-prose">
            {description}
          </p>
        )}
      </div>
      {action && <div className="flex items-center gap-2 shrink-0">{action}</div>}
    </header>
  );
}
