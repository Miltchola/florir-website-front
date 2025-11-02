"use client";
import React from 'react';
import Image from 'next/image';
import { Header } from '@/app/sharedComponents/layout/Header';
import { SectionTitle } from '@/app/sharedComponents/ui/SectionTitle';
import { Footer } from "@/app/sharedComponents/layout/Footer";
import { QuestionHandler } from "@/app/sharedComponents/question/QuestionHandler";
import { useEffect, useState } from 'react';

const benefitsData = [
    {
        icon: "⏱️",
        title: "Duram meses (ou anos!)",
        description: "Com os cuidados adequados, podem durar de 6 meses a 2 anos mantendo a beleza especial"
    },
    {
        icon: "🌱",
        title: "Sustentável e ecológico",
        description: "Processo natural que preserva as flores sem produtos químicos nocivos"
    },
    {
        icon: "🎁",
        title: "Ideal para decoração e presente",
        description: "Perfeito para qualquer ambiente e ocasião especial"
    }
];

const dehydrationSection = {
    title: "Como funciona a desidratação?",
    textColor: "#F5F5EF",
    steps: [
        {
            number: 1,
            title: "Seleção das flores",
            description: "Escolha criteriosa das melhores flores, frescas e recém-colhidas",
            textColor: "#F5F5EF"
        },
        {
            number: 2,
            title: "Processo de secagem",
            description: "Desidratação artesanal e controlada",
            textColor: "#F5F5EF"
        },
        {
            number: 3,
            title: "Montagem do arranjo",
            description: "Arte customizada composta com cores, texturas e formas harmoniosas",
            textColor: "#F5F5EF"
        }
    ]
};

const introImages = [
    {
        src: "/images/exemplo1.jpg",
        alt: "Arranjo desidratado com flores rosa"
    },
    {
        src: "/images/exemplo2.jpg",
        alt: "Arranjo desidratado com flores do campo"
    }
];

const dehydrationImages = [
    {
        src: "/images/exemplo3.jpeg",
        alt: "Seleção de flores frescas"
    },
    {
        src: "/images/exemplo4.jpeg",
        alt: "Processo de secagem das flores"
    },
    {
        src: "/images/exemplo5.jpeg",
        alt: "Montagem do arranjo final"
    }
];

export default function Arranjos() {
    const navLinks = [
        { label: 'HOME', href: '/' },
        { label: 'SOBRE MIM', href: '/sectionPages/sobre' },
        { label: 'PRODUTOS', href: '/sectionPages/produtos' },
        { label: 'ARRANJOS DESIDRATADOS', href: '/sectionPages/arranjos' },
        { label: 'CONTATO', href: '/sectionPages/contato' },
    ];
    const [perguntas, setPerguntas] = useState<PerguntaData[]>([]);
    const [loadingPerguntas, setLoadingPerguntas] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://florir-website-back.vercel.app';
  
    interface PerguntaData {
        _id: string;
        pergunta: string;
        resposta: string;
    }

    useEffect(() => {
        const controller = new AbortController();

        const fetchPerguntas = async () => {
            try {
                setLoadingPerguntas(true);
                const response = await fetch(`${API_BASE_URL}/perguntas`, { signal: controller.signal });
            
                if (!response.ok) {
                    throw new Error('Erro ao buscar perguntas frequentes');
                }

                const result = await response.json();
            
                if (Array.isArray(result.data) && result.data.length > 0) {
                    setPerguntas(result.data);
                } else {
                    setPerguntas([]);
                }
            } catch (err) {
                if ((err as any).name === 'AbortError') return;
                console.error('Erro ao carregar perguntas:', err);
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
            } finally {
                setLoadingPerguntas(false);
            }
        };

        fetchPerguntas();
        return () => controller.abort();
    }, []);

    return (
        <main className="min-h-screen">
            <Header navLinks={navLinks} />

            {/* make the page container full width so sections can touch the viewport edges */}
            <div className="max-w-full mx-0 px-0">
                <SectionTitle
                    title="O que são Arranjos Desidratados?"
                    text="Arranjos desidratados são flores naturais que passam por um processo artesanal de desidratação, preservando sua beleza por muito mais tempo. É uma forma sustentável e duradoura de ter a natureza sempre perto, criando ambientes acolhedores e cheios de vida."
                />

                {/* intro images: full width grid so images align to the page edges */}
                <section className="grid lg:grid-cols-2 gap-8 mt-12 max-w-3xl mx-auto px-6">
                    {introImages.map((image, index) => (
                        <div key={index} className="relative aspect-square">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="rounded-lg object-cover"
                            />
                        </div>
                    ))}
                </section>

                {/* Vantagens: make the section full width (background touches edges) and remove outer padding */}
                <section className="mt-16 py-12 bg-[#F8E8E3] w-full">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-3xl font-david-libre text-center mb-12">
                            Vantagens dos Arranjos desidratados
                        </h2>
                        <div className="grid lg:grid-cols-3 gap-8">
                            {benefitsData.map((benefit, index) => (
                                <div key={index} className="text-center">
                                    <span className="text-4xl mb-4 block">{benefit.icon}</span>
                                    <h3 className="font-david-libre text-xl mb-2">{benefit.title}</h3>
                                    <p className="text-gray-600">{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Como funciona: full width background; inner content constrained and centered */}
                <section className="mb-16 py-12 bg-[#DDB7AB] w-full">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-3xl font-david-libre text-center mb-12" style={{ color: dehydrationSection.textColor }}>
                            {dehydrationSection.title}
                        </h2>
                        <div className="grid lg:grid-cols-3 gap-8">
                            {dehydrationSection.steps.map((step, index) => (
                                <div key={index} className="text-center flex flex-col items-center">
                                    <div className="mb-4 w-[300px] h-[300px] rounded-lg overflow-hidden">
                                        <Image
                                            src={dehydrationImages[index].src}
                                            alt={dehydrationImages[index].alt}
                                            width={300}
                                            height={300}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>

                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto mb-4">
                                        <span className="font-david-libre text-xl">{step.number}</span>
                                    </div>
                                    <h3 className="font-david-libre text-xl mb-2" style={{ color: step.textColor }}>{step.title}</h3>
                                    <p style={{ color: step.textColor }}>{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Care Instructions Section - keep full width layout */}
                <section className="my-16 w-full">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-3xl font-david-libre text-center mb-12">
                            Cuidados Especiais
                        </h2>
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="text-center bg-white p-8 rounded-xl shadow-md border border-gray-100">
                                <span className="text-4xl mb-4 block">☀️</span>
                                <h3 className="font-david-libre text-xl mb-2">Evite sol direto</h3>
                                <p className="text-gray-600">Prefira locais com luz indireta para preservar as cores</p>
                            </div>
                            <div className="text-center bg-white p-8 rounded-xl shadow-md border border-gray-100">
                                <span className="text-4xl mb-4 block">💧</span>
                                <h3 className="font-david-libre text-xl mb-2">Mantenha seco</h3>
                                <p className="text-gray-600">Evite ambientes úmidos como banheiros e cozinhas</p>
                            </div>
                            <div className="text-center bg-white p-8 rounded-xl shadow-md border border-gray-100">
                                <span className="text-4xl mb-4 block">💨</span>
                                <h3 className="font-david-libre text-xl mb-2">Limpeza suave</h3>
                                <p className="text-gray-600">Use um pano seco para remover o pó ocasionalmente</p>
                            </div>
                        </div>
                    </div>
                </section>

            {loadingPerguntas ? (
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5E635D] mx-auto mb-4"></div>
                    <p className="text-[#5E635D]">Carregando perguntas frequentes...</p>
                </div>
            ) : error ? (
                <div className="text-center py-8">
                    <p className="text-red-600">{error}</p>
                </div>
            ) : (
                <QuestionHandler
                    perguntas={perguntas.map(p => ({
                        pergunta: p.pergunta,
                        resposta: p.resposta
                    }))}
                    quantidade={null}
                    mostrarBotaoVerTodas={false}
                />
            )}              
            </div>
            <Footer navLinks={navLinks} />            
        </main>
    );
}