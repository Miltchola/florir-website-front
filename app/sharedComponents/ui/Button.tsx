import { ReactNode } from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  children?: ReactNode;
}

export function Button({ text, onClick, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-8 py-2 border-2 border-font-primary bg-background-primary
        text-font-primary font-medium text-lg david-libre-regular tracking-wide
        transition duration-500 ease-in-out hover:scale-105"
      style={{ minWidth: '200px' }}
    >
      {text.toLocaleUpperCase()}
      {children}
    </button>
  );
}