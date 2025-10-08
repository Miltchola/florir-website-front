// components/CTAButton.tsx
import React from 'react';

interface CTAButtonProps {
  label: string;
  onClick?: () => void;
}

const CTAButton: React.FC<CTAButtonProps> = ({ label, onClick }) => {
  return (
    <button onClick={onClick} className="mt-2 border border-[#5E635D] px-8 py-3 rounded-md text-sm font-medium tracking-wider hover:bg-[#5E635D] hover:text-white transition-colors">
      {label}
    </button>
  );
};

export default CTAButton;