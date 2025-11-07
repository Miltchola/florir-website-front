"use client";
import { Line } from "@/app/sharedComponents/ui/Line";
import { SectionDivision } from "@/app/sharedComponents/ui/SectionDivision";
import { AboutSection } from "@/app/sharedComponents/layout/AboutSection";
import { ProdutoGrid } from "@/app/sharedComponents/produto/ProdutoGrid";
import { Button } from "@/app/sharedComponents/ui/Button";
import { Header } from "@/app/sharedComponents/layout/Header";
import { Footer } from "@/app/sharedComponents/layout/Footer";

import { HeroSection } from "./components/HeroSection";
import { Carousel } from "./components/Carousel";
import { QuestionHandler } from "@/app/sharedComponents/question/QuestionHandler";
import { useEffect, useState } from "react";

export default function Home() {
    const navLinks = [
        { label: 'HOME', href: '/' },
        { label: 'SOBRE MIM', href: '/sectionPages/sobre' },
        { label: 'PRODUTOS', href: '/sectionPages/produtos' },
        { label: 'ARRANJOS DESIDRATADOS', href: '/sectionPages/arranjos' },
        { label: 'CONTATO', href: '/sectionPages/contato' },
    ];

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    interface PerguntaData {
        _id: string;
        pergunta: string;
        resposta: string;
    }

    const [perguntas, setPerguntas] = useState<PerguntaData[]>([]);
    const [loadingPerguntas, setLoadingPerguntas] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
    
        const fetchPerguntas = async () => {
            const timeoutId = setTimeout(() => {
                controller.abort();
            }, 15000);

            try {
                const response = await fetch(`${API_BASE_URL}/perguntas`, {
                    signal: controller.signal,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            
                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            
                const result = await response.json();
            
                if (Array.isArray(result.data)) {
                    const normalized = result.data.map((item: any) => ({
                        _id: item._id,
                        pergunta: item.pergunta ?? item.question ?? '',
                        resposta: item.resposta ?? item.answer ?? ''
                    }));
                    setPerguntas(normalized);
                }
            
                setLoadingPerguntas(false);
            } catch (error) {
                setError('Erro ao carregar perguntas');
                setLoadingPerguntas(false);
            }
        };

        fetchPerguntas();
        return () => controller.abort();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background-primary">
            
            <Header navLinks={navLinks} />
            
            <div>
                <HeroSection
                    logo="/icons/Mini Logo Florir.png"
                    title="Flores lindas para qualquer ocasião"
                    text="Dê vida a sua casa com arranjos florais desidratados personalizados"
                    image="/images/Flor sem fundo.png"
                    buttonText="Ver Mais"
                />
            </div>

            <Line/>
            <Carousel
                images={[
                    { src: '/images/Anel Florido.jpeg', alt: 'Slide 1' },
                    { src: '/images/Tati Bolo.jpeg', alt: 'Slide 2' },
                ]}
            />
            <Line/>

            {/*
            <SectionTitle
                title="Catálogo Florir"
                text="Todos os arranjos são criados com flores
                    naturais desidratadas manualmente,
                    respeitando a sazonalidade e exclusividade.
                    Cada peça é única e feita com muito carinho
                    especialmente para você."
            />*/}


            <div className="w-full flex justify-start px-16">
                <SectionDivision text="Quem sou eu"/>
            </div>

            <AboutSection
                image1="/images/Tati Bolo.jpeg"
                image2="/images/Tati Flores.jpeg"
                title="Tatiana Kiefer de Albuquerque Mello"
                text={`Fundadora da Florir, apaixonada por flores e design floral.
                    Com anos de experiência no mercado, Tatiana combina criatividade
                    e técnica para criar arranjos únicos que encantam seus clientes.

                    Sua visão é transformar espaços através da beleza das flores,
                    trazendo alegria e elegância para cada ocasião.`}
                buttonText="Saiba Mais"
                buttonStatus={true}
                buttonLink={() => window.location.href = '/sectionPages/sobre'}
            />

            <ProdutoGrid
                produtos={[
                    {
                        imagem: "/images/Anel Florido.jpeg",
                        nome: "Arranjo Floral Exclusivo",
                        descricao: "Um arranjo floral desidratado, perfeito para decorar sua casa ou presentear alguém especial.",
                        preco: 150,
                        recomendado: true,
                        disponiveis: 5,
                        tipo: "Decoração",
                        buttonText: "Ver mais",
                    },
                    {
                        imagem: "/images/Bolo Florido.jpeg",
                        nome: "Arranjo Floral Exclusivo",
                        descricao: "Um arranjo floral desidratado, perfeito para decorar sua casa ou presentear alguém especial.",
                        preco: 70.00,
                        recomendado: true,
                        disponiveis: 5,
                        tipo: "Decoração",
                        buttonText: "Ver mais",
                    },
                    {
                        imagem: "/images/Buquê.jpeg",
                        nome: "Buquê de Flores Desidratadas",
                        descricao: "Um arranjo floral desidratado, perfeito para decorar sua casa ou presentear alguém especial.",
                        preco: 75.00,
                        recomendado: false,
                        disponiveis: 5,
                        tipo: "Decoração",
                        buttonText: "Ver mais",
                    },
                    {
                        imagem: "/images/Anel Florido.jpeg",
                        nome: "Arranjo Floral Exclusivo",
                        descricao: "Um arranjo floral desidratado, perfeito para decorar sua casa ou presentear alguém especial.",
                        preco: 50.00,
                        recomendado: true,
                        disponiveis: 5,
                        tipo: "Decoração",
                        buttonText: "Ver mais",
                    },
                    {
                        imagem: "/images/Bolo Florido.jpeg",
                        nome: "Arranjo Floral Exclusivo",
                        descricao: "Um arranjo floral desidratado, perfeito para decorar sua casa ou presentear alguém especial.",
                        preco: 78.00,
                        recomendado: true,
                        disponiveis: 2,
                        tipo: "Decoração",
                        buttonText: "Ver mais",
                    },
                    {
                        imagem: "/images/Buquê.jpeg",
                        nome: "Buquê de Flores Desidratadas",
                        descricao: "Um arranjo floral desidratado, perfeito para decorar sua casa ou presentear alguém especial.",
                        preco: 75.00,
                        recomendado: false,
                        disponiveis: 5,
                        tipo: "Decoração",
                        buttonText: "Ver mais",
                    },
                ]}
                quantidade={3} // ou null para mostrar todas
                mostrarBotaoVerTodos={true}
            />
            
            <Line/>

            <QuestionHandler
                perguntas={perguntas.map(p => ({
                            pergunta: p.pergunta,
                            resposta: p.resposta
                        }))}
                quantidade={3} // ou null para mostrar todas
                mostrarBotaoVerTodas={true}
            />

            <Footer navLinks={navLinks} />
        </div>
    );
}