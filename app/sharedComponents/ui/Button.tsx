import { ReactNode } from 'react';

interface ButtonProps {
  text?: string;
  onClick?: () => void;
  buttonColor?: 'light' | 'dark' | 'black' | 'red';
  width?: string;
  whatsapp?: boolean;
  isDelete?: boolean;
  children?: ReactNode;
}

export function Button({ text, onClick, buttonColor = 'dark', isDelete = false, width, whatsapp = false, children }: ButtonProps) {
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
  if (buttonColor === 'red') {
    colorVar = '#A70003'; // cor do fundo/borda do botão
    textColor = '#A70003';
  }

  return (
    <button
      onClick={onClick}
      className="px-8 py-2 border-2 font-medium text-lg david-libre-regular tracking-wide
        transition duration-500 ease-in-out hover:scale-105 flex items-center justify-center gap-2"
      style={{
        minWidth: '200px',
        width: width,
        color: textColor,
        borderColor: colorVar,
        background: backgroundVar,
      }}
    >
      {whatsapp && (
        <img
          src="/icons/whatsapp-dark.png"
          alt="WhatsApp"
          className="w-6 h-6"
        />
      )}
      {isDelete && (
        <img
          src="/icons/delete.png"
          alt="Delete"
          className="w-6 h-6"
        />
      )}
      {text ? text.toLocaleUpperCase() : "VER MAIS"}
      {children}
    </button>
  );
}