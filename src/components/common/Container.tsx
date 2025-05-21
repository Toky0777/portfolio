import React from 'react';
import { cn } from '../../utils/cn';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: React.ElementType;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  id,
  as: Component = 'div',
}) => {
  return (
    <Component
      id={id}
      className={cn(
        'w-full px-4 mx-auto sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px]',
        className
      )}
    >
      {children}
    </Component>
  );
};

export default Container;