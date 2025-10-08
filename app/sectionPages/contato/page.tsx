// app/contato/page.tsx
"use client";
import React from 'react';
import { Header } from '@/app/sharedComponents/layout/Header';
// import Footer from '@/app/sharedComponents/layout/Footer';
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

    // Tipando o array com a interface importada
    const whatsappLink = 'https://api.whatsapp.com/send/?phone=557191225528&text=teste%20mamae&type=phone_number&app_absent=0';

    const locationGreen = '#CDE6D8';
    const whatsappPink = '#E8C7C2';

    const infoItems: InfoItem[] = [
        { icon: <FaWhatsapp size={18} color="currentColor" />, title: 'WhatsApp', subtitle: '(71) 91225-5528\nRespondo rapidamente por aqui!', bgColor: whatsappPink, iconColor: '#FFFFFF' },
        { icon: <FaRegEnvelope size={18} color="currentColor" />, title: 'E-mail', subtitle: 'tatianakiefer@gmail.com\nPara orçamentos detalhados', bgColor: locationGreen, iconColor: '#FFFFFF' },
        { icon: <FaMapMarkerAlt size={18} color="currentColor" />, title: 'Localização', subtitle: 'Salvador, Bahia\nAtendimento em toda a região', bgColor: whatsappPink, iconColor: '#FFFFFF' },
        { icon: <FaRegClock size={18} color="currentColor" />, title: 'Horário', subtitle: 'Segunda a Sexta: 9h às 20h\nSábado: 9h às 16h', bgColor: locationGreen, iconColor: '#FFFFFF' },
    ];

    // Tipando o array com a interface importada
    const socialLinks: SocialLink[] = [
        { icon: <FaInstagram size={24} color="currentColor" />, label: 'Instagram @florirportatikiefer', href: 'https://instagram.com/florirportatikiefer' },
        { icon: <FaTiktok size={24} color="currentColor" />, label: 'Tiktok @tiktok', href: 'https://tiktok.com/@tiktok' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[#FAF6F3]">
            <Header navLinks={navLinks} />

            <main className="flex-1 container mx-auto px-6 py-12">
                <SectionTitle
                    title="Entre em Contato"
                    text="Tem alguma dúvida ou quer fazer um pedido personalizado? Estou aqui para ajudar você a encontrar o arranjo perfeito!"
                />

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
                    {/* Coluna da Esquerda: QR e CTA */}
                    <div className="flex flex-col items-center text-center gap-4">
                        <h3 className="text-3xl font-serif text-[#5E635D]">Quer conversar?</h3>
                        <p className="text-sm text-[#6b6f69] max-w-sm">Inicie rapidamente uma conversa pelo WhatsApp comigo pelo QR Code abaixo:</p>
                        
                                                        <div className="mt-4">
                                                            <QRBox data={whatsappLink} size={200} />
                                                        </div>

                        <p className="text-sm text-[#6b6f69] my-2">ou por este Botão:</p>

                        <CTAButton label="QUERO CONVERSAR!" onClick={() => window.open(whatsappLink, '_blank')} />
                    </div>

                    {/* Coluna da Direita: cards de contato */}
                    <div className="flex flex-col">
                        <ContactInfoCard items={infoItems} />
                        <SocialLinksCard links={socialLinks} />
                    </div>
                </div>
            </main>

            {/* <Footer /> */}
        </div>
    );
};

export default Contato;