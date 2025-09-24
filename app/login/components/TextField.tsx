import Image from "next/image";
import { ReactNode } from "react";
import { Button } from "@/app/sharedComponents/ui/Button";

interface TextFieldProps {
  title: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
}

export function TextField({ children, onChange, title, type, value, required, placeholder }: TextFieldProps) {
  return (
    <div className="flex flex-col w-full mb-6">
      <label className="text-font-primary text-lg font-normal mb-2 ml-2">
        {title}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type || "text"}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder || title}
        className="text-font-primary font-normal text-lg rounded-2xl px-6 py-4 mb-2 outline-none border-none focus:ring-2 focus:ring-font-primary transition w-full"
        style={{ backgroundColor: "var(--background-primary)" }}
        autoComplete="off"
      />
      {children}
    </div>
  );
}