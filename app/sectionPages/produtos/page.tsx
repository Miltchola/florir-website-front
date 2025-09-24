"use client";
import { Header } from '@/app/sharedComponents/layout/Header';
import { SectionTitle } from '@/app/sharedComponents/ui/SectionTitle';
import React from 'react';


export default function Produtos() {
    const navLinks = [
        { label: 'SOBRE MIM', href: '/sectionPages/sobre' },
        { label: 'PRODUTOS', href: '/sectionPages/produtos' },
        { label: 'ARRANJOS DESIDRATADOS', href: '/sectionPages/arranjos' },
        { label: 'CONTATO', href: '/sectionPages/contato' },
    ];
    return (
        <div>
            <Header
                navLinks={navLinks}
            />

            <SectionTitle
                title="Catálogo Florir"
                text="Todos os arranjos são criados com flores naturais
                desidratadas manualmente, respeitando a sazonalidade e exclusividade. 
                Cada peça é única e feita com muito carinho especialmente para você."
            />
        </div>
    );
}