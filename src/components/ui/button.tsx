import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";

const variants: Record<
  ButtonVariant,
  string
> = {
  primary:
    "rounded-xl bg-gradient-to-br from-[#6C5CE7] to-[#7D6FF0] px-8 py-3.5 text-sm font-medium text-white shadow-[0_4px_20px_rgba(108,92,231,0.15)] transition-[transform,box-shadow] hover:shadow-[0_6px_28px_rgba(108,92,231,0.22)] active:scale-[0.98]",
  secondary:
    "rounded-xl border border-border-medium bg-white px-8 py-3.5 text-sm font-medium text-text-primary shadow-reel-sm transition-[transform,box-shadow,background-color] hover:shadow-reel-md active:scale-[0.98]",
  ghost:
    "rounded-xl px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant = "primary", type = "button", ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(variants[variant], "inline-flex items-center justify-center gap-2", className)}
        {...props}
      />
    );
  },
);
