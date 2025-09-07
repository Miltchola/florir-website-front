import { ReactNode } from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  buttonColor?: 'light' | 'dark';
  children?: ReactNode;
}

export function Button({ text, onClick, buttonColor = 'dark', children }: ButtonProps) {
  const colorVar = buttonColor === 'light' ? 'var(--font-secondary)' : 'var(--font-primary)';
  return (
    <button
      onClick={onClick}
      className="px-8 py-2 border-2 font-medium text-lg david-libre-regular tracking-wide
        transition duration-500 ease-in-out hover:scale-105"
      style={{
        minWidth: '200px',
        color: colorVar,
        borderColor: colorVar
      }}
    >
      {text.toLocaleUpperCase()}
      {children}
    </button>
  );
}