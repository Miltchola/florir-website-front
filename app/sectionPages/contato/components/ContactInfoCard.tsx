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
    <div className="bg-[#F9E9E5] rounded-2xl p-8 shadow-sm w-full">
      <h3 className="text-2xl font-serif text-[#6a6059] mb-6">Contato Direto</h3>

      <div className="flex flex-col gap-6">
        {items.map((it, idx) => (
          <div key={idx} className="flex items-start gap-5">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-inner"
              style={{ backgroundColor: it.bgColor ?? '#D9E0D8', color: it.iconColor ?? '#5E635D' }}
            >
              {/* garantir que o ícone herde a cor do container */}
              <span className="flex items-center justify-center text-[18px]">
                {it.icon}
              </span>
            </div>

            <div>
              <div className="text-base font-semibold text-[#5E635D] mb-1">{it.title}</div>
              {it.subtitle && <div className="text-sm text-[#6b6f69] whitespace-pre-line">{it.subtitle}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfoCard;