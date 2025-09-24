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
        {/* Clean fountain pen nib icon - compact version */}
        <div className="w-8 h-8 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground">
            {/* Top rectangle (grip) */}
            <rect x="8" y="4" width="8" height="3" rx="1" fill="currentColor"/>
            {/* Diamond shape (nib body) */}
            <path d="M12 7 L6 12 L12 20 L18 12 Z" fill="currentColor"/>
            {/* Center circle */}
            <circle cx="12" cy="12" r="2" fill="white"/>
            {/* Center line */}
            <line x1="12" y1="14" x2="12" y2="18" stroke="white" strokeWidth="1.5"/>
          </svg>
        </div>
        <span className="text-lg font-medium tracking-tight text-foreground">Your Notes</span>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Main logo with icon and text */}
      <div className="flex items-center gap-4">
        {/* Clean fountain pen nib icon - larger version */}
        <div className="w-12 h-12 flex items-center justify-center">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-foreground">
            {/* Top rectangle (grip) */}
            <rect x="12" y="6" width="12" height="4" rx="1.5" fill="currentColor"/>
            {/* Diamond shape (nib body) */}
            <path d="M18 10 L9 18 L18 30 L27 18 Z" fill="currentColor"/>
            {/* Center circle */}
            <circle cx="18" cy="18" r="3" fill="white"/>
            {/* Center line */}
            <line x1="18" y1="21" x2="18" y2="27" stroke="white" strokeWidth="2"/>
          </svg>
        </div>
        
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Your Notes
        </h1>
      </div>
      
      {showSlogan && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground font-light italic opacity-0 animate-fade-in animation-delay-500">
            <span className="inline-block animate-typewriter overflow-hidden whitespace-nowrap border-r-2 border-primary/50 pr-1">
              I think better when I write
            </span>
          </p>
        </div>
      )}
    </div>
  );
}