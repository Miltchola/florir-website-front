"use client";
import { Button } from "@/app/sharedComponents/ui/Button";
import { Line } from "@/app/sharedComponents/ui/Line";
import { SectionDivision } from "@/app/sharedComponents/ui/SectionDivision";
import { SectionTitle } from "@/app/sharedComponents/ui/SectionTitle";

import { HeroSection } from "./components/HeroSection";

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
        </div>
    );
}