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

    async function fetchProdutos() {
        try {
            const res = await fetch(`${API_BASE_URL}/produtos`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) throw new Error("Erro ao buscar produtos");

            const data = await res.json();
            console.log("Resposta da API:", data);

            const produtosData = Array.isArray(data)
                ? data
                : Array.isArray(data.produtos)
                ? data.produtos
                : Array.isArray(data.data)
                ? data.data
                : [];

            setProdutos(produtosData);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        } finally {
            setLoading(false);
        }
    }

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProdutos();
    }, []);

    const [produtos, setProdutos] = useState<any[]>([]);

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

            {loading ? (
                <p className="text-center text-gray-500 py-10">Carregando produtos...</p>
            ) : produtos.length === 0 ? (
                <p className="text-center text-gray-500 py-10">
                    Nenhum produto encontrado.
                </p>
            ) : (
                <>

                    <ProdutoGrid
                        produtos={produtos}
                        quantidade={null}
                        mostrarBotaoVerTodos={false}
                        topMenu={true}
                        adminEdit={false}
                    />
                </>
            )}
            
            <Line/>

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

            <Footer navLinks={navLinks} />
        </div>
    );
}