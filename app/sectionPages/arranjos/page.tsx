"use client";
import React from 'react';
import { Header } from '@/app/sharedComponents/layout/Header';
import { SectionTitle } from '@/app/sharedComponents/ui/SectionTitle';

export default function Arranjos() {
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
                title="O que são Arranjos Desidratados?"
                text="Arranjos desidratados são flores naturais que passam
                por um processo artesanal de desidratação, preservando sua beleza
                por muito mais tempo. É uma forma sustentável e duradoura de ter a
                natureza sempre perto, criando ambientes acolhedores e cheios de vida."
            />
        </div>
    );
}