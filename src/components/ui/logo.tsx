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
        {/* Fountain pen nib icon - compact version */}
        <div className="w-8 h-8 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground">
            {/* Pen grip/holder */}
            <rect x="10" y="16" width="4" height="6" rx="1" fill="currentColor" opacity="0.8"/>
            {/* Main nib body - pentagon shape */}
            <path d="M12 2 L8 12 L10 16 L14 16 L16 12 Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            {/* Center slit */}
            <line x1="12" y1="6" x2="12" y2="14" stroke="white" strokeWidth="1"/>
            {/* Breathing hole */}
            <circle cx="12" cy="8" r="1.5" fill="white"/>
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
        {/* Fountain pen nib icon - larger version */}
        <div className="w-12 h-12 flex items-center justify-center">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-foreground">
            {/* Pen grip/holder */}
            <rect x="15" y="24" width="6" height="9" rx="2" fill="currentColor" opacity="0.7"/>
            <rect x="14" y="26" width="8" height="2" rx="1" fill="currentColor" opacity="0.5"/>
            {/* Main nib body - pentagon shape */}
            <path d="M18 3 L10 18 L15 24 L21 24 L26 18 Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            {/* Center slit */}
            <line x1="18" y1="8" x2="18" y2="20" stroke="white" strokeWidth="1.5"/>
            {/* Breathing hole */}
            <circle cx="18" cy="12" r="2" fill="white"/>
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