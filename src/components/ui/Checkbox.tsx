import React, { forwardRef } from "react";
import { Check } from "lucide-react";
import { cn } from "../../lib/cn";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => (
    <div className="flex items-center gap-2">
      <div className="relative">
        <input
          type="checkbox"
          className={cn(
            "h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 bg-white checked:border-pink-600 checked:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500/10 dark:border-gray-600 dark:bg-gray-800 dark:checked:border-pink-500 dark:checked:bg-pink-500",
            className,
          )}
          ref={ref}
          {...props}
        />
        {props.checked && (
          <Check className="absolute left-0.5 top-0.5 h-4 w-4 text-white pointer-events-none" />
        )}
      </div>
      {label && (
        <label
          htmlFor={props.id}
          className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
    </div>
  ),
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
