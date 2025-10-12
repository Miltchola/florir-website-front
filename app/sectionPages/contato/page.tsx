"use client";
import React from 'react';
import { Header } from '@/app/sharedComponents/layout/Header';
import { SectionTitle } from '@/app/sharedComponents/ui/SectionTitle';


export default function Contato() {
    const navLinks = [
        { label: 'HOME', href: '/' },
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
                title="Entre em Contato"
                text="Tem alguma dúvida ou quer fazer um pedido personalizado? Estou aqui para ajudar você a encontrar o arranjo perfeito!"
            />
        </div>
    );
}