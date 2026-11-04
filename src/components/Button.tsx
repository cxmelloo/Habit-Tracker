
import type { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "secondary" | "ghost-destructive";

type ButtonProps = {
  text?: string;
  children?: ReactNode;
  variant?: Variant;
} & ComponentProps<"button">;

function Button({ variant = "primary", text, children, className, ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        "cx-btn rounded-lg px-4 py-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed",
        getVarStyle(variant),
        className
      )}>
      {text}
      {children}
    </button>
  );
}

function getVarStyle(variant: Variant): string {
  switch (variant) {
    case "primary":
      return "bg-violet-600 hover:bg-violet-500 text-white";

    case "secondary":
      return "bg-zinc-700 hover:bg-zinc-600 text-zinc-300";

    case "ghost-destructive":
      return "hover:bg-red-600 bg-transparent text-red-400 hover:text-red-200";

    default:
      throw new Error(`Invalid variant: ${variant satisfies never}`);
  }
}

export default Button;
