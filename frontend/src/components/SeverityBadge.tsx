
import React from 'react';
import { CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';

type SeverityLevel = 'none' | 'mild' | 'severe';

interface SeverityBadgeProps {
  level: SeverityLevel;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const SeverityBadge: React.FC<SeverityBadgeProps> = ({
  level,
  size = 'md',
  showLabel = true
}) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };

  const renderIcon = () => {
    switch (level) {
      case 'none':
        return <CheckCircle className={`${size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5'} mr-1.5`} />;
      case 'mild':
        return <AlertTriangle className={`${size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5'} mr-1.5`} />;
      case 'severe':
        return <AlertCircle className={`${size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5'} mr-1.5`} />;
      default:
        return null;
    }
  };

  const getLabel = () => {
    switch (level) {
      case 'none':
        return 'No Stutter';
      case 'mild':
        return 'Mild Stutter';
      case 'severe':
        return 'Severe Stutter';
      default:
        return '';
    }
  };

  const badgeClassMap = {
    none: 'badge-none',
    mild: 'badge-mild',
    severe: 'badge-severe'
  };

  return (
    <span className={`therapy-badge ${badgeClassMap[level]} ${sizeClasses[size]} flex items-center`}>
      {renderIcon()}
      {showLabel && getLabel()}
    </span>
  );
};

export default SeverityBadge;
