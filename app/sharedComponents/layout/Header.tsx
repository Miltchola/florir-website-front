    import { ReactNode, useState } from 'react';
    import Image from 'next/image';
    import { Button } from '@/app/sharedComponents/ui/Button';

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
        {/* Logo centralizada em mobile, alinhada à esquerda em desktop */}
        <div className="flex-1 flex justify-center lg:justify-start items-center">
            <Image
            src="/icons/Mini Logo Florir.png"
            alt="Logo Florir"
            width={140}
            height={83}
            className="object-contain"
            priority
            />
        </div>

        {/* Navegação desktop centralizada entre logo e borda direita */}
        <nav className="hidden lg:flex flex-1 justify-center">
            <ul className="flex gap-8 justify-center w-full">
            {navLinks.map((link) => (
                <li key={link.label}>
                <Button
                    text={link.label}
                    onClick={link.onClick ? link.onClick : () => window.location.href = link.href}
                    buttonColor="dark"
                />
                </li>
            ))}
            </ul>
        </nav>

        {/* Espaço à direita para centralizar os botões entre logo e borda direita */}
        <div className="hidden lg:flex items-center" style={{ flex: "0.58 1 0%" }}>
          {children}
        </div>

        {/* Menu mobile */}
        <div className="flex lg:hidden items-center">
            <button
            aria-label="Abrir menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded focus:outline-none"
            >
            {/* Ícone de menu hambúrguer */}
            <svg width="32" height="32" fill="#5E635D" viewBox="0 0 24 24">
                <rect y="6" width="24" height="2" rx="1"/>
                <rect y="11" width="24" height="2" rx="1"/>
                <rect y="16" width="24" height="2" rx="1"/>
            </svg>
            </button>
            {/* Dropdown menu */}
            {menuOpen && (
            <div className="absolute top-[95px] right-0 w-48 bg-[#F8E8E3] shadow-lg rounded-b z-50 flex flex-col py-4">
                {navLinks.map((link) => (
                <Button
                    key={link.label}
                    text={link.label}
                    onClick={() => {
                    setMenuOpen(false);
                    link.onClick ? link.onClick() : window.location.href = link.href;
                    }}
                    buttonColor="dark"
                />
                ))}
            </div>
            )}
        </div>
        </header>
    );
    }