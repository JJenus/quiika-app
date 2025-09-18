import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
  shadow?: boolean;
  border?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  padding = true,
  shadow = true,
  border = true
}) => {
  return (
    <div className={`
      bg-white dark:bg-gray-800 
      ${border ? 'border border-gray-200 dark:border-gray-700' : ''}
      ${shadow ? 'shadow-md' : ''}
      rounded-xl 
      ${padding ? 'p-6' : ''} 
      ${className}
    `}>
      {children}
    </div>
  );
};