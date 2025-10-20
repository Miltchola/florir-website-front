import { ReactNode } from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  buttonColor?: 'light' | 'dark' | 'black';
  width?: string;
  children?: ReactNode;
}

export function Button({ text, onClick, buttonColor = 'dark', width, children }: ButtonProps) {
  let colorVar = 'var(--font-primary)';
  let backgroundVar = 'transparent';
  let textColor = colorVar;

  if (buttonColor === 'light') {
    colorVar = 'var(--font-secondary)';
    textColor = colorVar;
  }
  if (buttonColor === 'black') {
    colorVar = '#646862'; // cor do fundo/borda do botão
    backgroundVar = '#646862';
    textColor = '#fff';
  }

  return (
    <button
      onClick={onClick}
      className="px-8 py-2 border-2 font-medium text-lg david-libre-regular tracking-wide
        transition duration-500 ease-in-out hover:scale-105"
      style={{
        minWidth: '200px',
        width: width,
        color: textColor,
        borderColor: colorVar,
        background: backgroundVar,
      }}
    >
      {text.toLocaleUpperCase()}
      {children}
    </button>
  );
}