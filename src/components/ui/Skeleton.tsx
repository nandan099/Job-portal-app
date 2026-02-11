import React from "react";
import { cn } from "../../lib/cn";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "circle" | "text";
  count?: number;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = "default", count = 1, ...props }, ref) => {
    const skeletonVariants = {
      default: "h-12 w-full rounded-lg",
      circle: "h-12 w-12 rounded-full",
      text: "h-4 w-full rounded",
    };

    const skeletons = Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className={cn(
          "animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800",
          skeletonVariants[variant],
          className,
        )}
      />
    ));

    return count > 1 ? (
      <div className="space-y-2" ref={ref} {...props}>
        {skeletons}
      </div>
    ) : (
      <div ref={ref} {...props}>
        {skeletons}
      </div>
    );
  },
);

Skeleton.displayName = "Skeleton";

export { Skeleton };
