"use client";
import { Button } from "@/app/sharedComponents/ui/Button";
import { Line } from "@/app/sharedComponents/ui/Line";
import { SectionDivision } from "@/app/sharedComponents/ui/SectionDivision";


export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background-primary">
        <h1 className="text-4xl font-regular text-font-primary mb-4">Welcome to Florir</h1>
        <p className="text-lg text-font-secondary mb-8">Your journey to a greener life starts here.</p>
        <Button text="Ver Mais" onClick={() => alert('Button Clicked!')} />
        <Line/>
        <div className="w-full flex justify-start px-16">
            <SectionDivision text="Section Title"/>
        </div>
        </div>
    );
}