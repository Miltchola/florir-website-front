// components/SocialLinksCard.tsx
import React from 'react';

// Exportando a interface
export interface SocialLink {
  icon?: React.ReactNode;
  label: string;
  href?: string;
}

interface SocialLinksCardProps {
  title?: string;
  links: SocialLink[];
}

const SocialLinksCard: React.FC<SocialLinksCardProps> = ({ title = 'Redes Sociais', links }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm w-full mt-6">
      <h4 className="text-lg font-medium text-[#5E635D] mb-4">{title}</h4>
      <div className="flex flex-col gap-3">
        {links.map((l, i) => (
          <a
            key={i}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 py-3 px-4 rounded-lg bg-[#E7C5C0] text-sm font-medium text-white transition-transform transform hover:-translate-y-1 hover:scale-102 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E7C5C0]"
          >
            <div className="text-current text-white">
              {l.icon}
            </div>
            <span className="text-white">{l.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinksCard;