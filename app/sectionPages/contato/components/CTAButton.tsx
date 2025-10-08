// components/CTAButton.tsx
import React from 'react';

interface CTAButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ label, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={"mt-2 border border-[#5E635D] px-8 py-3 rounded-md text-sm font-medium tracking-wider bg-transparent text-[#5E635D] transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E8C7C2] " + className}
      aria-label={label}
    >
      {label}
    </button>
  );
};

export default CTAButton;