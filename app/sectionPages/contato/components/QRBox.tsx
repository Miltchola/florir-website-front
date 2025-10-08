// components/QRBox.tsx
import React from 'react';

interface QRBoxProps {
  /** Dados que serão codificados no QR (por exemplo link do WhatsApp). Se fornecido, será gerado um QR image via api.qrserver.com */
  data?: string;
  alt?: string;
}

const QRBox: React.FC<QRBoxProps> = ({ data, alt = 'QR Code' }) => {
  // Usamos api.qrserver para gerar a imagem do QR simples
  const qrUrl = data
    ? `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(data)}`
    : null;

  return (
    <div className="w-full max-w-[280px] aspect-square bg-[#D9E0D8] rounded-lg flex items-center justify-center shadow-sm">
      {qrUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={qrUrl} alt={alt} className="object-contain w-48 h-48" />
      ) : (
        <div className="w-48 h-48 bg-[#bfc9c1] rounded-md" />
      )}
    </div>
  );
};

export default QRBox;