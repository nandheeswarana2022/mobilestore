
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', fullWidth = false, className, ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-background';
  
  const variantStyles = {
    primary: 'bg-brand-primary text-white hover:bg-blue-500 focus:ring-blue-500',
    secondary: 'bg-brand-surface text-brand-text-primary hover:bg-gray-800 focus:ring-gray-500',
    outline: 'border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white focus:ring-brand-primary',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${widthStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};
