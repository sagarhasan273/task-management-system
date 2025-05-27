import { ReactNode } from 'react';

interface BadgeProps {
  color: string;
  children: ReactNode;
  className?: string;
}

const Badge = ({ color, children, className = '' }: BadgeProps) => {
  const style = {
    backgroundColor: `${color}20`, // Add transparency to the color
    color: color,
    borderColor: `${color}40`,
  };

  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${className}`}
      style={style}
    >
      {children}
    </span>
  );
};

export default Badge;