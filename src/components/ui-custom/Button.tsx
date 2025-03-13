
import React from "react";
import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'glass';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', children, isLoading, ...props }, ref) => {
    const glassStyles = variant === 'glass' 
      ? "bg-white/70 dark:bg-black/70 backdrop-blur-lg border border-white/20 dark:border-black/20 hover:bg-white/80 dark:hover:bg-black/80 text-foreground" 
      : "";

    return (
      <ShadcnButton
        ref={ref}
        variant={variant === 'glass' ? 'ghost' : variant}
        size={size}
        className={cn(
          "font-medium transition-all duration-200 shadow-sm hover:shadow",
          glassStyles,
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading...</span>
          </div>
        ) : (
          children
        )}
      </ShadcnButton>
    );
  }
);

Button.displayName = "Button";

export { Button };
