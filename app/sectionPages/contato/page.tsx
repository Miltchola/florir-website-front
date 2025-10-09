// app/contato/page.tsx
"use client";
import React from 'react';
import { Header } from '@/app/sharedComponents/layout/Header';
import { SectionTitle } from '@/app/sharedComponents/ui/SectionTitle';

// Importando os componentes e seus tipos
import ContactInfoCard, { InfoItem } from './components/ContactInfoCard';
import SocialLinksCard, { SocialLink } from './components/SocialLinksCard';
import QRBox from './components/QRBox';
import CTAButton from './components/CTAButton';

// Importando os ícones
import { FaWhatsapp, FaRegEnvelope, FaMapMarkerAlt, FaRegClock, FaInstagram, FaTiktok } from 'react-icons/fa';

interface NavLink {
    label: string;
    href: string;
}

const Contato: React.FC = () => {
    const navLinks: NavLink[] = [
        { label: 'SOBRE MIM', href: '/sectionPages/sobre' },
        { label: 'PRODUTOS', href: '/sectionPages/produtos' },
        { label: 'ARRANJOS DESIDRATADOS', href: '/sectionPages/arranjos' },
        { label: 'CONTATO', href: '/sectionPages/contato' },
    ];

    const whatsappLink = 'https://api.whatsapp.com/send/?phone=557191225528&text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20arranjos%20florais&type=phone_number&app_absent=0';

    const infoItems: InfoItem[] = [
        { 
            icon: <FaWhatsapp size={22} color="currentColor" />, 
            title: 'WhatsApp', 
            subtitle: '(71) 91225-5528\nRespondo rapidamente por aqui!', 
            bgColor: '#E8C7C2', 
            iconColor: '#FFFFFF' 
        },
        { 
            icon: <FaRegEnvelope size={20} color="currentColor" />, 
            title: 'E-mail', 
            subtitle: 'tatianakiefer@gmail.com\nPara orçamentos detalhados', 
            bgColor: '#CDE6D8', 
            iconColor: '#FFFFFF' 
        },
        { 
            icon: <FaMapMarkerAlt size={22} color="currentColor" />, 
            title: 'Localização', 
            subtitle: 'Salvador, Bahia\nAtendimento em toda a região', 
            bgColor: '#E8C7C2', 
            iconColor: '#FFFFFF' 
        },
        { 
            icon: <FaRegClock size={20} color="currentColor" />, 
            title: 'Horário', 
            subtitle: 'Segunda a Sexta: 9h às 20h\nSábado: 9h às 16h', 
            bgColor: '#CDE6D8', 
            iconColor: '#FFFFFF' 
        },
    ];

    const socialLinks: SocialLink[] = [
        { 
            icon: <FaInstagram size={24} color="currentColor" />, 
            label: 'Instagram @florirportatikiefer', 
            href: 'https://instagram.com/florirportatikiefer' 
        },
        { 
            icon: <FaTiktok size={24} color="currentColor" />, 
            label: 'TikTok @florir', 
            href: 'https://tiktok.com' 
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[#FAF6F3]">
            <Header navLinks={navLinks} />

            <main className="flex-1 container mx-auto px-6 py-12 max-w-7xl">
                <SectionTitle
                    title="Entre em Contato"
                    text="Tem alguma dúvida ou quer fazer um pedido personalizado? Estou aqui para ajudar você a encontrar o arranjo perfeito!"
                />

                <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Coluna da Esquerda: QR e CTA */}
                    <div className="flex flex-col items-center text-center gap-6 lg:sticky lg:top-8">
                        <h3 className="text-3xl font-light text-[#5E635D] leading-tight">Quer conversar?</h3>
                        <p className="text-base text-[#6b6f69] max-w-md leading-relaxed">
                            Inicie rapidamente uma conversa pelo WhatsApp comigo pelo QR Code abaixo:
                        </p>
                        
                        <div className="mt-4 mb-2">
                            <QRBox data={whatsappLink} size={220} />
                        </div>

                        <p className="text-base text-[#5E635D] font-medium my-2">ou por este Botão:</p>

                        <CTAButton 
                            label="QUERO CONVERSAR!" 
                            onClick={() => window.open(whatsappLink, '_blank')} 
                        />
                    </div>

                    {/* Coluna da Direita: cards de contato */}
                    <div className="flex flex-col">
                        <ContactInfoCard items={infoItems} />
                        <SocialLinksCard links={socialLinks} />
                    </div>
                </div>
            </main>

            {/* Footer será adicionado por outra pessoa */}
        </div>
    );
};

export default Contato;