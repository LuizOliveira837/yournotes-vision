import { cn } from "@/lib/utils";
import penIcon from "@/assets/pen-icon.webp";

interface LogoProps {
  className?: string;
  variant?: "default" | "compact";
  showSlogan?: boolean;
}

export function Logo({ className, variant = "default", showSlogan = false }: LogoProps) {
  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        {/* Original pen icon - compact version */}
        <div className="w-8 h-8 flex items-center justify-center">
          <img 
            src={penIcon} 
            alt="Fountain pen nib" 
            className="w-6 h-6 object-contain"
          />
        </div>
        <span className="text-lg font-medium tracking-tight text-foreground">Your Notes</span>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Main logo with icon and text */}
      <div className="flex items-center gap-4">
        {/* Original pen icon - larger version */}
        <div className="w-12 h-12 flex items-center justify-center">
          <img 
            src={penIcon} 
            alt="Fountain pen nib" 
            className="w-10 h-10 object-contain"
          />
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