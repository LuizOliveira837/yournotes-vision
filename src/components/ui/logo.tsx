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
        <h1 className="text-5xl md:text-6xl font-mono font-light tracking-wide text-foreground transform -rotate-1 relative">
          <span className="inline-block transform hover:rotate-1 transition-transform duration-300">
            Your
          </span>
          <span className="inline-block ml-3 transform rotate-1 hover:-rotate-1 transition-transform duration-300">
            Notes
          </span>
          {/* Underline scribble effect */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full h-1">
            <svg viewBox="0 0 300 20" className="w-full h-full">
              <path 
                d="M10,15 Q50,5 100,12 T200,8 T290,15" 
                stroke="currentColor" 
                strokeWidth="2" 
                fill="none" 
                className="opacity-60"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </h1>
      </div>
      
      {showSlogan && (
        <div className="text-center mt-2">
          <p className="text-sm text-muted-foreground font-light italic opacity-0 animate-fade-in animation-delay-500 transform rotate-1">
            <span className="inline-block animate-typewriter overflow-hidden whitespace-nowrap border-r-2 border-primary/50 pr-1">
              I think better when I write
            </span>
          </p>
        </div>
      )}
    </div>
  );
}