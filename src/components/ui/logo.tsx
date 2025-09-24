import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "compact";
  showSlogan?: boolean;
}

export function Logo({ className, variant = "default", showSlogan = false }: LogoProps) {
  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <div className="relative">
          <div className="w-8 h-8 bg-gradient-to-br from-foreground to-foreground/80 rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-background rounded-full relative">
              <div className="absolute -top-0.5 -right-0.5 w-1 h-3 bg-foreground/60 rounded-full transform rotate-45" />
            </div>
          </div>
        </div>
        <span className="text-lg font-medium tracking-tight">Your Notes</span>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="relative">
        {/* Fountain pen nib */}
        <div className="w-14 h-14 bg-gradient-to-br from-foreground via-foreground/95 to-foreground/85 rounded-lg flex items-center justify-center shadow-xl shadow-foreground/25 transform rotate-12">
          {/* Pen nib shape */}
          <div className="relative">
            {/* Main nib body */}
            <div className="w-6 h-8 bg-gradient-to-b from-background/95 to-background/90 rounded-t-full rounded-b-sm border border-foreground/20">
              {/* Center slit */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-foreground/40 rounded-full" />
              {/* Breathing hole */}
              <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-foreground/30 rounded-full" />
            </div>
            {/* Nib tip */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-b from-background to-foreground/80 rounded-full" />
          </div>
        </div>
        {/* Ink dot animation */}
        <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-primary/40 rounded-full animate-pulse" />
      </div>
      
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-2">
          Your Notes
        </h1>
        {showSlogan && (
          <p className="text-sm text-muted-foreground font-light italic animate-fade-in opacity-0 animation-delay-500">
            <span className="inline-block animate-[typewriter_2s_steps(26,end)_1s_forwards] overflow-hidden whitespace-nowrap border-r-2 border-primary/50 pr-1">
              I think better when I write
            </span>
          </p>
        )}
      </div>
    </div>
  );
}