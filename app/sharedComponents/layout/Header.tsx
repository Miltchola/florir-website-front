import { ReactNode, useState } from 'react';
import Image from 'next/image';

interface HeaderProps {
  navLinks: { label: string; href: string; onClick?: () => void }[];
  backgroundColor?: string;
  height?: string;
  children?: ReactNode;
}

export function Header({
  navLinks,
  backgroundColor = "#F8E8E3",
  height = "95px",
  children,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const showHamburger = navLinks.length > 1;
  return (
    <header
      className="w-full flex items-center px-8"
      style={{
        backgroundColor,
        height,
        minHeight: height,
        boxSizing: "border-box",
      }}
    >
      {/* Logo sempre à esquerda */}
      <div className="flex items-center">
        <div className="transition-transform duration-500 ease-in-out hover:scale-115">
          <Image
            src="/icons/Logo Florir.png"
            alt="Logo Florir"
            width={200}
            height={80}
            className="object-contain"
            priority
            onClick={() => window.location.href = '/'}
          />
        </div>
      </div>

      {/* Navegação desktop alinhada à direita */}
      <nav className="hidden lg:flex items-center justify-end w-full">
        <ul className="flex flex-row items-center gap-16 mr-4">
          {navLinks.map((link) => (
            <li key={link.label} className="flex justify-end">
              <a
                href={link.href}
                onClick={link.onClick}
                className="text-lg font-light tracking-wide whitespace-nowrap relative group
                hover:scale-110 transition-transform duration-500 ease-in-out"
                style={{ color: "#5E635D", cursor: "pointer" }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Espaço à direita para centralizar os textos entre logo e borda direita */}
      <div className="hidden lg:flex items-center" style={{ flex: "0.65 1 0%" }}>
        {children}
      </div>

      {/* Mobile: navLinks à direita, logo à esquerda */}
      <div className="flex lg:hidden flex-1 items-center justify-between">
        {/* Logo já está à esquerda */}
        {/* NavLinks ou Hamburguer à direita */}
        {showHamburger ? (
          <div className="flex items-center ml-auto">
            <button
              aria-label="Abrir menu"
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded focus:outline-none"
            >
              <svg width="32" height="32" fill="#5E635D" viewBox="0 0 24 24">
                <rect y="6" width="24" height="2" rx="1"/>
                <rect y="11" width="24" height="2" rx="1"/>
                <rect y="16" width="24" height="2" rx="1"/>
              </svg>
            </button>
            {menuOpen && (
                <div className="absolute top-[95px] right-0 w-48 bg-[#F8E8E3] shadow-lg rounded-b z-50 flex flex-col py-4 animate-slideDown">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => {
                      setMenuOpen(false);
                      link.onClick && link.onClick();
                    }}
                    className="text-lg font-light tracking-wide px-4 py-2 relative group"
                    style={{ color: "#5E635D", cursor: "pointer" }}
                  >
                    {link.label}
                    <span className="underline-anim absolute left-0 -bottom-1 w-full h-[2px] bg-font-primary origin-left"></span>
                  </a>
                ))}
              </div>
            )}
          </div>
        ) : (
          <nav className="flex items-center ml-auto">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={link.onClick}
                className="text-lg font-light tracking-wide px-4 py-2"
                style={{ color: "#5E635D", cursor: "pointer" }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}