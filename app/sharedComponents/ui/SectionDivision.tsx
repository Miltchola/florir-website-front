import { ReactNode } from 'react';

interface SectionDivisionProps {
  text: string;
  children?: ReactNode;
}

export function SectionDivision ({ text, children }: SectionDivisionProps) {
    return (
        <div className="flex items-center mb-4">
      <div
        className="h-6 w-1 bg-font-primary mr-3"
        style={{ backgroundColor: "var(--font-primary)" }}
      />
      <span className="text-font-primary text-xl font-medium david-libre-regular">
        {text}
      </span>
      {children}
    </div>
    )
}