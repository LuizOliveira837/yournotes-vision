import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "compact";
}

export function Logo({ className, variant = "default" }: LogoProps) {
  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        <div className="flex items-baseline font-mono">
          <span className="text-2xl font-bold tracking-tighter">Y</span>
          <span className="text-lg font-medium text-muted-foreground">N</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-baseline font-mono">
        <span className="text-3xl font-bold tracking-tighter">Your</span>
        <span className="text-3xl font-light text-muted-foreground ml-1">Notes</span>
      </div>
      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
    </div>
  );
}