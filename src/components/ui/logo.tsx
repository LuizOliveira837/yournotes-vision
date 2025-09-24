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
        <div className="w-10 h-10 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-foreground">
            {/* Pen grip/holder with details */}
            <rect x="13" y="20" width="6" height="10" rx="1.5" fill="currentColor" opacity="0.8"/>
            <rect x="12" y="22" width="8" height="1.5" rx="0.5" fill="currentColor" opacity="0.6"/>
            <rect x="12" y="25" width="8" height="1" rx="0.5" fill="currentColor" opacity="0.4"/>
            {/* Main nib body - pentagon shape with shadow */}
            <path d="M16 2 L9 16 L13 20 L19 20 L23 16 Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M16 2 L9 16 L13 20 L19 20 L23 16 Z" fill="black" opacity="0.1" transform="translate(1,1)"/>
            {/* Side details */}
            <path d="M11 14 L13 20" stroke="currentColor" strokeWidth="0.5" opacity="0.6"/>
            <path d="M21 14 L19 20" stroke="currentColor" strokeWidth="0.5" opacity="0.6"/>
            {/* Center slit */}
            <line x1="16" y1="6" x2="16" y2="18" stroke="white" strokeWidth="1.2"/>
            {/* Breathing hole */}
            <circle cx="16" cy="10" r="2" fill="white"/>
            <circle cx="16" cy="10" r="1.2" fill="currentColor" opacity="0.3"/>
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
        <div className="w-16 h-16 flex items-center justify-center">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="text-foreground drop-shadow-lg">
            {/* Pen body/barrel - background */}
            <rect x="23" y="35" width="10" height="18" rx="3" fill="currentColor" opacity="0.6"/>
            <rect x="21" y="37" width="14" height="2" rx="1" fill="currentColor" opacity="0.4"/>
            <rect x="21" y="41" width="14" height="1.5" rx="0.5" fill="currentColor" opacity="0.3"/>
            <rect x="21" y="44" width="14" height="1" rx="0.5" fill="currentColor" opacity="0.2"/>
            
            {/* Main nib body - pentagon shape with gradient effect */}
            <path d="M28 4 L15 28 L23 35 L33 35 L41 28 Z" fill="currentColor" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
            
            {/* Shadow/depth effect */}
            <path d="M28 4 L15 28 L23 35 L33 35 L41 28 Z" fill="black" opacity="0.15" transform="translate(2,2)"/>
            
            {/* Left side highlight */}
            <path d="M28 4 L15 28 L19 32 L28 15 Z" fill="white" opacity="0.2"/>
            
            {/* Right side shadow */}
            <path d="M28 15 L37 32 L41 28 L28 4 Z" fill="black" opacity="0.2"/>
            
            {/* Side detail lines */}
            <path d="M18 24 L23 35" stroke="currentColor" strokeWidth="0.8" opacity="0.7"/>
            <path d="M38 24 L33 35" stroke="currentColor" strokeWidth="0.8" opacity="0.7"/>
            
            {/* Feed lines */}
            <path d="M20 30 L24 35" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
            <path d="M36 30 L32 35" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
            
            {/* Center slit with depth */}
            <line x1="28" y1="10" x2="28" y2="32" stroke="white" strokeWidth="2"/>
            <line x1="28" y1="10" x2="28" y2="32" stroke="black" strokeWidth="0.5" opacity="0.3" transform="translate(0.5,0)"/>
            
            {/* Breathing hole with detail */}
            <circle cx="28" cy="18" r="3.5" fill="white"/>
            <circle cx="28" cy="18" r="2.5" fill="currentColor" opacity="0.4"/>
            <circle cx="28" cy="18" r="1.5" fill="white"/>
            
            {/* Small detail holes */}
            <circle cx="24" cy="25" r="0.8" fill="white" opacity="0.8"/>
            <circle cx="32" cy="25" r="0.8" fill="white" opacity="0.8"/>
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