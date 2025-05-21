import React, { forwardRef, TextareaHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface TextFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const TextField = forwardRef<HTMLTextAreaElement, TextFieldProps>(
  ({ className, label, error, fullWidth = false, ...props }, ref) => {
    return (
      <div className={cn(fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <textarea
          className={cn(
            'px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 min-h-[100px]',
            error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
            fullWidth && 'w-full',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;