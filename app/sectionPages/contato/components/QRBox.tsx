// components/QRBox.tsx
import React from 'react';

interface QRBoxProps {
  /** Dados que serão codificados no QR (por exemplo link do WhatsApp). Se fornecido, será gerado um QR image via api.qrserver.com */
  data?: string;
  /** tamanho em pixels do QR (ex: 220) - controla tanto a imagem gerada quanto o tamanho exibido */
  size?: number;
  alt?: string;
}

const QRBox: React.FC<QRBoxProps> = ({ data, size = 220, alt = 'QR Code' }) => {
  const pixelSize = Math.max(80, size);
  const qrUrl = data
    ? `https://api.qrserver.com/v1/create-qr-code/?size=${pixelSize}x${pixelSize}&data=${encodeURIComponent(data)}`
    : null;

  const imgStyle: React.CSSProperties = {
    width: pixelSize,
    height: pixelSize,
  };

  return (
    <div 
      className="w-full max-w-[280px] bg-[#CDE6D8] rounded-2xl flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-105" 
      style={{ padding: 16 }}
    >
      {qrUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={qrUrl} alt={alt} style={imgStyle} className="rounded-lg" />
      ) : (
        <div style={imgStyle} className="bg-[#b8d4c7] rounded-lg" />
      )}
    </div>
  );
};

export default QRBox;