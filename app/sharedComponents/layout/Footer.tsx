import Image from "next/image";

interface FooterProps {
  navLinks: { label: string; href: string }[];
}

export function Footer({ navLinks }: FooterProps) {
  return (
    <footer
      className="w-full px-8 pt-16 pb-10"
      style={{
        backgroundColor: "#F8E8E3",
        color: "#5E635D",
        fontFamily: "inherit",
      }}
    >
      <div className="flex flex-col md:flex-row gap-32 md:gap-0 justify-between items-start w-full">
        {/* Logo */}
        <div className="mb-6 md:mb-0 flex-shrink-0">
          <Image
            src="/icons/Sublogo Florir.png"
            alt="Subogo Florir"
            width={320}
            height={320}
            className="object-contain"
            priority
          />
        </div>

        {/* Divider */}
        <div className="hidden md:block h-full border-l border-[#5E635D] mx-8" />

        {/* Info Columns */}
        <div className="flex flex-col md:flex-row gap-32 w-full justify-between">
          {/* Social */}
          <div>
            <h3 className="font-semibold mb-2" style={{ color: "#5E635D" }}>
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
          <div>
            <h3 className="font-semibold mb-2" style={{ color: "#5E635D" }}>
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

          {/* Menu */}
          <div>
            <h3 className="font-semibold mb-2" style={{ color: "#5E635D" }}>
              MENU
            </h3>
            <ul className="space-y-8">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:underline"
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

      {/* Divider */}
      <div
        className="w-full my-6"
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