import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-accent-subtle px-3 py-1.5 font-mono text-xs font-medium uppercase tracking-wide text-accent",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
