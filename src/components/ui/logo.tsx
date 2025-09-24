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
        {/* Simple geometric icon similar to Lovable */}
        <div className="relative w-8 h-8">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-lg transform rotate-12" />
          <div className="absolute top-1 left-1 w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md" />
        </div>
        <span className="text-lg font-medium tracking-tight text-foreground">Your Notes</span>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Main logo with icon and text */}
      <div className="flex items-center gap-3">
        {/* Lovable-style geometric icon */}
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-xl shadow-lg shadow-orange-500/25" />
          <div className="absolute top-1.5 left-1.5 w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-sm" />
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