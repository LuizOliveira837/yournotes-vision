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
        <span className="text-lg font-medium tracking-tight">YourNotes</span>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-br from-foreground via-foreground/90 to-foreground/80 rounded-2xl flex items-center justify-center shadow-lg shadow-foreground/20">
          <div className="w-5 h-5 bg-background rounded-full relative">
            <div className="absolute -top-1 -right-1 w-1.5 h-4 bg-foreground/70 rounded-full transform rotate-45" />
            <div className="absolute top-1.5 left-1.5 w-2 h-0.5 bg-foreground/30 rounded-full" />
          </div>
        </div>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary/20 rounded-full animate-pulse" />
      </div>
      
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          YourNotes
        </h1>
        {showSlogan && (
          <p className="text-sm text-muted-foreground mt-1 font-light italic">
            I think better when I write
          </p>
        )}
      </div>
    </div>
  );
}