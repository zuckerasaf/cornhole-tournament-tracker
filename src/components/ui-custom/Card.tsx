
import React from "react";
import { Card as ShadcnCard, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  glass?: boolean;
  hover?: boolean;
  animate?: boolean;
}

const Card = ({ className, children, glass = false, hover = false, animate = false, ...props }: CardProps) => {
  return (
    <ShadcnCard
      className={cn(
        "overflow-hidden border",
        glass && "bg-white/70 dark:bg-black/70 backdrop-blur-lg border-white/20 dark:border-black/20",
        hover && "transition-all duration-300 hover:shadow-lg hover:scale-[1.01]",
        animate && "animate-scale-in",
        className
      )}
      {...props}
    >
      {children}
    </ShadcnCard>
  );
};

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export { Card };
