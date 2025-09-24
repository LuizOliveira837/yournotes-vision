import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "compact";
  showSlogan?: boolean;
}

export function Logo({ className, variant = "default", showSlogan = false }: LogoProps) {
  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <h1 className="text-xl font-mono font-light tracking-wide text-foreground transform -rotate-1">
          Your Notes
        </h1>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Large handwritten style logo */}
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-mono font-light tracking-wide text-foreground">
          Your Notes
        </h1>
        
        {showSlogan && (
          <p className="text-sm text-muted-foreground font-light italic mt-3 opacity-0 animate-fade-in animation-delay-500">
            <span className="inline-block animate-typewriter overflow-hidden whitespace-nowrap border-r-2 border-primary/50 pr-1">
              I think better when I write.
            </span>
          </p>
        )}
      </div>
    </div>
  );
}