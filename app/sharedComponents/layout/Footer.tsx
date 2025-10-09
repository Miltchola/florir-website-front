import Image from "next/image";

interface FooterProps {
  navLinks: { label: string; href: string }[];
}

export function Footer({ navLinks }: FooterProps) {
  return (
    <footer
      className="w-full px-8 pt-10 pb-10"
      style={{
        backgroundColor: "#F8E8E3",
        color: "#5E635D",
        fontFamily: "inherit",
      }}
    >
      <div className="relative w-full lg:flex lg:items-start">
        {/* Logo: canto superior esquerdo no desktop, centralizada no mobile */}
        <div className="flex justify-center lg:justify-start lg:flex-shrink-0">
          <div className="w-64 h-24 lg:w-[260px] lg:h-[100px]">
            <Image
              src="/icons/Sublogo Florir.png"
              alt="Sublogo Florir"
              width={260}
              height={100}
              className="object-contain w-full h-full"
              priority
            />
          </div>
        </div>

        {/* Divider para desktop */}
        <div
          className="hidden lg:block mx-8"
          style={{ borderLeft: "2px solid #5E635D", height: "auto" }}
        />

        {/* Conteúdo centralizado com padding à esquerda para não sobrepor a logo no desktop */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 justify-between items-center lg:items-start w-full mt-8 lg:mt-0 lg:pl-0 lg:flex-grow">
          {/* Social */}
          <div className="flex flex-col lg:items-start items-center">
            <h3 className="font-semibold mb-2 text-sm lg:text-left text-center" style={{ color: "#5E635D" }}>
              ACOMPANHE FLORIR:
            </h3>
            <ul className="space-y-8">
              <li>
                <a
                  href="https://www.instagram.com/florirportatikiefer?igsh=MmU3NGtkNmcxN3d1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:underline"
                  style={{ color: "#5E635D" }}
                >
                  <Image
                    src="/icons/instagram.svg"
                    alt="Instagram"
                    width={33}
                    height={33}
                  />
                  @florirportatikefer
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com/placeholder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:underline"
                  style={{ color: "#5E635D" }}
                >
                  <Image
                    src="/icons/tiktok.svg"
                    alt="TikTok"
                    width={33}
                    height={33}
                  />
                  @tiktok
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col lg:items-start items-center">
            <h3 className="font-semibold mb-2 text-sm lg:text-left text-center" style={{ color: "#5E635D" }}>
              ENTRE EM CONTATO:
            </h3>
            <ul className="space-y-8">
              <li className="flex items-center gap-2">
                <Image
                  src="/icons/phone.svg"
                  alt="Telefone"
                  width={33}
                  height={33}
                />
                (71) 99122-5528
              </li>
              <li className="flex items-center gap-2">
                <Image
                  src="/icons/email.svg"
                  alt="Email"
                  width={33}
                  height={33}
                />
                tatianakiefer@gmail.com
              </li>
            </ul>
          </div>

          {/* Menu - hidden on mobile */}
          <div className="hidden lg:flex flex-col items-start">
            <h3 className="font-semibold mb-2 text-sm" style={{ color: "#5E635D" }}>
              MENU
            </h3>
            <ul className="space-y-8">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:underline normal-case"
                    style={{ color: "#5E635D" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Divider original (apenas para mobile) */}
      <div
        className="w-full my-6 lg:hidden"
        style={{ borderTop: "2px solid #5E635D" }}
      />

      {/* Copyright */}
      <div className="text-center text-sm" style={{ color: "#5E635D" }}>
        <span className="mr-2">©</span>
        2025 Florir por Tati Kiefer. Todos os direitos reservados.
      </div>
    </footer>
  );
}

