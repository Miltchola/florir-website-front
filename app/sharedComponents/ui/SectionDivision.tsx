import { ReactNode } from 'react';

interface SectionDivisionProps {
  text: string;
  children?: ReactNode;
}

export function SectionDivision ({ text, children }: SectionDivisionProps) {
    return (
        <div className="flex items-center">
      <div
        className="h-6 w-1 bg-font-primary mr-3"
        style={{ backgroundColor: "var(--font-primary)" }}
      />
      <span className="text-font-primary font-light text-3xl mb-1 tracking-normal david-libre-regular">
        {text}
      </span>
      {children}
    </div>
    )
}