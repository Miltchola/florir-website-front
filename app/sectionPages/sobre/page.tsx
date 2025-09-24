"use client";
import { Header } from '@/app/sharedComponents/layout/Header';
import { Line } from '@/app/sharedComponents/ui/Line';
import { SectionTitle } from '@/app/sharedComponents/ui/SectionTitle';
import React from 'react';

export default function Sobre() {
    const navLinks = [
        { label: 'SOBRE MIM', href: '/sectionPages/sobre' },
        { label: 'PRODUTOS', href: '/sectionPages/produtos' },
        { label: 'ARRANJOS DESIDRATADOS', href: '/sectionPages/arranjos' },
        { label: 'CONTATO', href: '/sectionPages/contato' },
    ];
    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-background-primary">
            <Header
                navLinks={navLinks}
            />

            <SectionTitle
                title="A alma por trás da Florir"
            />

            <Line/>
        </div>
    );
}