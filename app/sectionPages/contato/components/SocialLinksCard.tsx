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
    <div className="bg-white rounded-3xl p-7 shadow-md w-full mt-6">
      <h4 className="text-xl font-light text-[#5E635D] mb-5 tracking-wide">{title}</h4>
      <div className="flex flex-col gap-4">
        {links.map((l, i) => (
          <a
            key={i}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 py-4 px-5 rounded-xl bg-[#DDB7AB] text-sm font-medium text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:bg-[#d4a89f] active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DDB7AB]"
          >
            <div className="text-white text-xl">
              {l.icon}
            </div>
            <span className="text-white text-base">{l.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinksCard;