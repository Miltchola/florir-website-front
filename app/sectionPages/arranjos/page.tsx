"use client";
import React from 'react';
import Image from 'next/image';
import { Header } from '@/app/sharedComponents/layout/Header';
import { SectionTitle } from '@/app/sharedComponents/ui/SectionTitle';
import { Footer } from "@/app/sharedComponents/layout/Footer";
import { QuestionHandler } from "@/app/sharedComponents/question/QuestionHandler";

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

const dehydrationSteps = [
    {
        number: 1,
        title: "Seleção das flores",
        description: "Escolha criteriosa das melhores flores, frescas e recém-colhidas"
    },
    {
        number: 2,
        title: "Processo de secagem",
        description: "Desidratação artesanal e controlada"
    },
    {
        number: 3,
        title: "Montagem do arranjo",
        description: "Arte customizada composta com cores, texturas e formas harmoniosas"
    }
];

const introImages = [
    {
        src: "/images/exemplo1.jpg",
        alt: "Arranjo desidratado com flores rosa"
    },
    {
        src: "/images/exemplo1.jpg",
        alt: "Arranjo desidratado com flores do campo"
    }
];

const dehydrationImages = [
    {
        src: "/images/exemplo1.jpg",
        alt: "Seleção de flores frescas"
    },
    {
        src: "/images/exemplo1.jpg",
        alt: "Processo de secagem das flores"
    },
    {
        src: "/images/exemplo1.jpg",
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

    return (
        <main className="min-h-screen">
            <Header navLinks={navLinks} />

            <div className="container mx-auto px-4">
                <SectionTitle
                    title="O que são Arranjos Desidratados?"
                    text="Arranjos desidratados são flores naturais que passam por um processo artesanal de desidratação, preservando sua beleza por muito mais tempo. É uma forma sustentável e duradoura de ter a natureza sempre perto, criando ambientes acolhedores e cheios de vida."
                />

                <section className="grid lg:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
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

                <section className="my-16 py-12 bg-[#F8E8E3] rounded-lg">
                    <h2 className="text-3xl font-david-libre text-center mb-12">
                        Vantagens dos Arranjos desidratados
                    </h2>
                    <div className="grid lg:grid-cols-3 gap-8 px-6">
                        {benefitsData.map((benefit, index) => (
                            <div key={index} className="text-center">
                                <span className="text-4xl mb-4 block">{benefit.icon}</span>
                                <h3 className="font-david-libre text-xl mb-2">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="my-16 py-12 bg-[#DDB7AB] rounded-lg">
                    <h2 className="text-3xl font-david-libre text-center mb-12">
                        Como funciona a desidratação?
                    </h2>
                    <div className="grid lg:grid-cols-3 gap-8 px-6">
                        {dehydrationSteps.map((step, index) => (
                            <div key={index} className="text-center flex flex-col items-center">
                                {/* image above each step - 300x300 */}
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
                                <h3 className="font-david-libre text-xl mb-2">{step.title}</h3>
                                <p className="text-gray-700">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Care Instructions Section - Added emojis consistent with Vantagens */}
                <section className="my-16">
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
                </section>

            <QuestionHandler
            perguntas={[
                {
                pergunta: "Como funciona o delivery?",
                resposta: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.`,
                },
                {
                pergunta: "Como cuidar das flores?",
                resposta: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.`,
                },
                {
                pergunta: "Como que é o procedimento de desidratar uma planta?",
                resposta: `Fundadora da Florir, apaixonada por flores e design floral.
                    Com anos de experiência no mercado, Tatiana combina criatividade
                    e técnica para criar arranjos únicos que encantam seus clientes.

                    Sua visão é transformar espaços através da beleza das flores,
                    trazendo alegria e elegância para cada ocasião.`
                },
                {
                pergunta: "Como posso entrar em contato com a Criadora?",
                resposta: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.`,
                },
                {
                pergunta: "Faz pedidos personalizados",
                resposta: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.`,
                },
            ]}
            quantidade={3} // ou null para mostrar todas
            mostrarBotaoVerTodas={true}
            />              
            </div>
            <Footer navLinks={navLinks} />            
        </main>
    );
}