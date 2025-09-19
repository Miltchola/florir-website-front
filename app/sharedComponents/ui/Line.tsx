import React from "react";

interface LineProps {
  width?: string;
  className?: string;
}

export function Line({ width = "90%", className = "" }: LineProps) {
  return (
    <hr
      className={`border-t-2 border-font-primary my-12 ${className}`}
      style={{ width, borderColor: "var(--font-primary)" }}
    />
  );
}