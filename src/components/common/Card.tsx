import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className,
  onClick,
  hoverable = false,
}) => {
  return (
    <div 
      className={cn(
        'bg-white rounded-lg shadow-md overflow-hidden',
        hoverable && 'transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => {
  return <div className={cn('p-4 border-b', className)}>{children}</div>;
};

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => {
  return <div className={cn('p-4', className)}>{children}</div>;
};

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => {
  return <div className={cn('p-4 border-t bg-gray-50', className)}>{children}</div>;
};

export default Card;