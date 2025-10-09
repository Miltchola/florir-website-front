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
      className={`mt-3 border-2 border-[#5E635D] px-10 py-3.5 rounded-lg text-base font-medium tracking-widest bg-transparent text-[#5E635D] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-lg hover:border-[#4a4e47] active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CDE6D8] ${className}`}
      aria-label={label}
    >
      {label}
    </button>
  );
};

export default CTAButton;