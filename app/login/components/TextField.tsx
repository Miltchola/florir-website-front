import { ReactNode, CSSProperties } from "react";

interface TextFieldProps {
  title: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  value?: string;
  color?: 'gray' | 'white';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  /** 
   * Largura opcional: aceita valores como "100%", "300px", "50vw" ou até números (em pixels)
   * Exemplo: width="300px" ou width="80%"
   */
  width?: string | number;
}

export function TextField({
  children,
  onChange,
  title,
  type,
  value,
  required,
  placeholder,
  width,
  color = 'gray'
}: TextFieldProps) {
  // Estilo dinâmico de largura (mantém responsividade)
  const containerStyle: CSSProperties = {
    width: width || "100%",
    maxWidth: "100%", // evita overflow em telas pequenas
  };

  let backgroundColor = 'var(--background-primary)';

  if (color === 'gray') {
    backgroundColor = 'var(--font-secondary)';
  }
  if (color === 'white') {
    backgroundColor = '#FFFFFF';
  }

  return (
    <div className="flex flex-col mb-6" style={containerStyle}>
      <label className="text-font-primary text-lg font-normal mb-2 ml-2">
        {title}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        type={type || "text"}
        value={value}
        onChange={onChange}
        readOnly={!onChange}
        required={required}
        placeholder={placeholder || title}
        className="
          text-font-primary font-normal text-lg rounded-2xl px-6 py-4 mb-2 
          outline-none border-none focus:ring-2 focus:ring-font-primary transition 
          w-full
        "
        style={{
          backgroundColor: backgroundColor,
        }}
        autoComplete="off"
      />

      {children}
    </div>
  );
}