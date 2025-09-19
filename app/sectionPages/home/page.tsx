"use client";
import { Button } from "@/app/sharedComponents/ui/Button";
import { Line } from "@/app/sharedComponents/ui/Line";
import { SectionDivision } from "@/app/sharedComponents/ui/SectionDivision";
import { SectionTitle } from "@/app/sharedComponents/ui/SectionTitle";
import { AboutSection } from "@/app/sharedComponents/layout/AboutSection";
import { ProdutoCard } from "@/app/sharedComponents/produto/ProdutoCard";
import { Question } from "@/app/sharedComponents/question/Question";

import { HeroSection } from "./components/HeroSection";
import { Carousel } from "./components/Carousel";
import { QuestionHandler } from "@/app/sharedComponents/question/QuestionHandler";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background-primary">
            <HeroSection
                logo="/icons/Mini Logo Florir.png"
                title="Flores lindas para qualquer ocasião"
                text="Dê vida a sua casa com arranjos florais desidratados personalizados"
                image="/images/Flor sem fundo.png"
                buttonText="Ver Mais"
            />
            
            <Carousel
                images={[
                    { src: '/images/Bolo Florido.jpeg', alt: 'Slide 1' },
                    { src: '/images/Anel Florido.jpeg', alt: 'Slide 2' },
                ]}
            />
            
            <SectionTitle
                    image="/icons/Mini Logo Florir.png"
                    title="Catálogo Florir"
                    text="Todos os arranjos são criados com flores
                        naturais desidratadas manualmente,
                        respeitando a sazonalidade e exclusividade.
                        Cada peça é única e feita com muito carinho
                        especialmente para você."
                />
            <Button text="Ver Mais" onClick={() => alert('Button Clicked!')} />
            <Line/>
            <div className="w-full flex justify-start px-16">
                <SectionDivision text="Section Title"/>
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
            />

            {/* Teste ProdutoCard */}
            <ProdutoCard
                imagem="/images/Anel Florido.jpeg"
                nome="Arranjo Floral Exclusivo"
                descricao="Um arranjo floral desidratado, perfeito para decorar sua casa ou presentear alguém especial."
                preco="R$ 150,00"
                recomendado={true}
                tipo="Decoração"
                buttonText="Ver mais"
                buttonLink={() => alert('Produto Adicionado ao Carrinho!')}
            />

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
                pergunta: "Como que é o procediomento de desidratar uma planta?",
                resposta: `Fundadora da Florir, apaixonada por flores e design floral.
                    Com anos de experiência no mercado, Tatiana combina criatividade
                    e técnica para criar arranjos únicos que encantam seus clientes.

                    Sua visão é transformar espaços através da beleza das flores,
                    trazendo alegria e elegância para cada ocasião.`
                },
            ]}
            quantidade={3} // ou null para mostrar todas
            mostrarBotaoVerTodas={true}
            />

        </div>
    );
}