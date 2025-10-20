// app/sectionPages/contato/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { Header } from '@/app/sharedComponents/layout/Header';
import { SectionTitle } from '@/app/sharedComponents/ui/SectionTitle';

// Importando os componentes e seus tipos
import ContactInfoCard, { InfoItem } from './components/ContactInfoCard';
import SocialLinksCard, { SocialLink } from './components/SocialLinksCard';
import QRBox from './components/QRBox';
import CTAButton from './components/CTAButton';

// Importando os ícones
import { FaWhatsapp, FaRegEnvelope, FaMapMarkerAlt, FaRegClock, FaInstagram, FaTiktok } from 'react-icons/fa';
import { Footer } from '@/app/sharedComponents/layout/Footer';

interface NavLink {
    label: string;
    href: string;
}

interface ContatoData {
    _id: string;
    instagram?: string;
    tiktok?: string;
    email?: string;
    telefone?: string;
    whatsappQRCode: string;
    altText?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://florir-website-back.vercel.app';

const Contato: React.FC = () => {
    const [contatoData, setContatoData] = useState<ContatoData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navLinks: NavLink[] = [
        { label: 'HOME', href: '/' },
        { label: 'SOBRE MIM', href: '/sectionPages/sobre' },
        { label: 'PRODUTOS', href: '/sectionPages/produtos' },
        { label: 'ARRANJOS DESIDRATADOS', href: '/sectionPages/arranjos' },
        { label: 'CONTATO', href: '/sectionPages/contato' },
    ];

    useEffect(() => {
        const fetchContatoData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/contatos`);
                
                if (!response.ok) {
                    throw new Error('Erro ao buscar dados de contato');
                }

                const result = await response.json();
                
                // A API retorna um array, pegamos o primeiro item
                if (result.data && result.data.length > 0) {
                    setContatoData(result.data[0]);
                } else {
                    throw new Error('Nenhum dado de contato encontrado');
                }
            } catch (err) {
                console.error('Erro ao carregar dados de contato:', err);
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
            } finally {
                setLoading(false);
            }
        };

        fetchContatoData();
    }, []);

    // Formata o telefone para exibição (71) 91225-5528
    const formatarTelefone = (telefone: string) => {
        if (!telefone) return '';
        const cleaned = telefone.replace(/\D/g, '');
        if (cleaned.length === 11) {
            return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
        }
        return telefone;
    };

    // Cria o link do WhatsApp a partir do telefone
    const criarWhatsAppLink = (telefone: string) => {
        if (!telefone) return '#';
        const cleaned = telefone.replace(/\D/g, '');
        return `https://api.whatsapp.com/send/?phone=55${cleaned}&text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20arranjos%20florais&type=phone_number&app_absent=0`;
    };

    // Extrai o nome do usuário do Instagram da URL
    const extrairInstagramUsername = (url: string) => {
        if (!url) return '@florirportatikiefer';
        const match = url.match(/instagram\.com\/([^/?]+)/);
        return match ? `@${match[1]}` : url;
    };

    // Extrai o nome do usuário do TikTok da URL
    const extrairTiktokUsername = (url: string) => {
        if (!url) return '@florir';
        const match = url.match(/tiktok\.com\/@?([^/?]+)/);
        return match ? `@${match[1]}` : url;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-[#FAF6F3]">
                <Header navLinks={navLinks} />
                <main className="flex-1 container mx-auto px-6 py-12 max-w-7xl flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#5E635D] mx-auto mb-4"></div>
                        <p className="text-[#5E635D] text-lg">Carregando informações de contato...</p>
                    </div>
                </main>
                <Footer navLinks={navLinks} />
            </div>
        );
    }

    if (error || !contatoData) {
        return (
            <div className="min-h-screen flex flex-col bg-[#FAF6F3]">
                <Header navLinks={navLinks} />
                <main className="flex-1 container mx-auto px-6 py-12 max-w-7xl flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-red-600 text-lg mb-4">
                            {error || 'Erro ao carregar dados de contato'}
                        </p>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="px-6 py-2 bg-[#5E635D] text-white rounded-lg hover:bg-[#4a4e47] transition"
                        >
                            Tentar Novamente
                        </button>
                    </div>
                </main>
                <Footer navLinks={navLinks} />
            </div>
        );
    }

    const whatsappLink = criarWhatsAppLink(contatoData.telefone || '');

    const infoItems: InfoItem[] = [
        { 
            icon: <FaWhatsapp size={22} color="currentColor" />, 
            title: 'WhatsApp', 
            subtitle: `${formatarTelefone(contatoData.telefone || '')}\nRespondo rapidamente por aqui!`, 
            bgColor: '#E8C7C2', 
            iconColor: '#FFFFFF' 
        },
        { 
            icon: <FaRegEnvelope size={20} color="currentColor" />, 
            title: 'E-mail', 
            subtitle: `${contatoData.email || 'contato@florir.com'}\nPara orçamentos detalhados`, 
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
            label: `Instagram ${extrairInstagramUsername(contatoData.instagram || '')}`, 
            href: contatoData.instagram || 'https://instagram.com/florirportatikiefer' 
        },
        { 
            icon: <FaTiktok size={24} color="currentColor" />, 
            label: `TikTok ${extrairTiktokUsername(contatoData.tiktok || '')}`, 
            href: contatoData.tiktok || 'https://tiktok.com' 
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
                            <QRBox 
                                data={whatsappLink} 
                                size={220} 
                                alt={contatoData.altText || 'QR Code WhatsApp'}
                            />
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

            <Footer navLinks={navLinks} />
        </div>
    );
};

export default Contato;