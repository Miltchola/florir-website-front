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
  // Usamos api.qrserver para gerar a imagem do QR; size x size
  const pixelSize = Math.max(80, size); // mínimo 80px
  const qrUrl = data
    ? `https://api.qrserver.com/v1/create-qr-code/?size=${pixelSize}x${pixelSize}&data=${encodeURIComponent(data)}`
    : null;

  // converter px para classes ou inline style
  const imgStyle: React.CSSProperties = {
    width: pixelSize,
    height: pixelSize,
  };

  return (
    <div className="w-full max-w-[280px] bg-[#D9E0D8] rounded-lg flex items-center justify-center shadow-sm" style={{ padding: 12 }}>
      {qrUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={qrUrl} alt={alt} style={imgStyle} />
      ) : (
        <div style={imgStyle} className="bg-[#bfc9c1] rounded-md" />
      )}
    </div>
  );
};

export default QRBox;