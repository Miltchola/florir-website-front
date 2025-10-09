// components/ContactInfoCard.tsx
import React from 'react';

// Exportando a interface para ser usada na página principal
export interface InfoItem {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  /** opcional: cor de fundo do círculo do ícone (hex ou css) */
  bgColor?: string;
  /** opcional: cor do ícone/texto dentro do círculo */
  iconColor?: string;
}

interface ContactInfoCardProps {
  items: InfoItem[];
}

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({ items }) => {
  return (
    <div className="bg-[#F9E9E5] rounded-3xl p-8 shadow-md w-full">
      <h3 className="text-2xl font-light text-[#5E635D] mb-8 tracking-wide">Contato Direto</h3>

      <div className="flex flex-col gap-7">
        {items.map((it, idx) => (
          <div key={idx} className="flex items-start gap-5">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-300 hover:scale-110"
              style={{ backgroundColor: it.bgColor ?? '#D9E0D8', color: it.iconColor ?? '#5E635D' }}
            >
              <span className="flex items-center justify-center text-[20px]">
                {it.icon}
              </span>
            </div>

            <div className="flex-1">
              <div className="text-lg font-medium text-[#5E635D] mb-1.5">{it.title}</div>
              {it.subtitle && <div className="text-sm text-[#6b6f69] leading-relaxed whitespace-pre-line">{it.subtitle}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfoCard;