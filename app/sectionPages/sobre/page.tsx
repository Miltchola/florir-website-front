"use client";
import { Header } from '@/app/sharedComponents/layout/Header';
import { Line } from '@/app/sharedComponents/ui/Line';
import { SectionTitle } from '@/app/sharedComponents/ui/SectionTitle';
import React from 'react';
import { Card } from './components/Card';
import { Inspiration } from './components/Inspiration';
import { Valores } from './components/Valores';

export default function Sobre() {
    const navLinks = [
        { label: 'HOME', href: '/' },
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

            <Card
                image="/images/Tati Bolo.jpeg"
                alt="Sobre mim"
            />

            <h3 className="text-font-primary font-light text-4xl mt-16 tracking-normal">DÚVIDAS FREQUENTES</h3>

            <Inspiration
                image="/images/Tati Flores.jpeg"
                text1="Desde pequena, sempre fui fascinada pela beleza das flores e pela magia que elas trazem aos momentos especiais. Cresci em meio a jardins coloridos e aromas encantadores, o que despertou em mim uma paixão profunda pela natureza e pela arte de criar arranjos florais."
                text2="Com o tempo, essa paixão se transformou em uma missão: compartilhar a alegria e a beleza das flores com o mundo. A Florir nasceu desse desejo de levar cor, vida e emoção aos eventos mais importantes da vida das pessoas, tornando cada ocasião única e inesquecível."
                text3="Hoje, como fundadora da Florir, sinto-me honrada em poder transformar sonhos em realidade através das minhas criações florais. Cada arranjo é feito com amor, dedicação e um toque especial de criatividade, refletindo a essência e a personalidade de cada cliente. Acredito que as flores têm o poder de tocar corações e criar memórias duradouras, e é isso que me motiva a continuar florescendo junto com a Florir."
                imagePosition = "left"
            />

            {/* Seção duplicada com imagem à direita (invertida) */}
            <Inspiration
                image="/images/Tati Bolo.jpeg"
                text1="De vida à sua casa com arranjos florais desidratados personalizados. De vida à sua casa com arranjos florais desidratados personalizados."
                text2="De vida à sua casa com arranjos florais desidratados personalizados. De vida à sua casa com arranjos florais desidratados personalizados."
                text3="De vida à sua casa com arranjos florais desidratados personalizados. De vida à sua casa com arranjos florais desidratados personalizados."
                imagePosition = "right"
            />

                        <Valores
                            img1="/images/Anel Florido.jpeg"
                            valor1="Sustentabilidade"
                            texto1="Trabalho de forma consciente, valorizando a natureza e criando peças duradouras que reduzem o desperdício."
                            img2="/images/Tati Bolo.jpeg"
                            valor2="Originalidade"
                            texto2="Cada peça é única, criada especialmente para você. Não existem dois arranjos iguais no meu ateliê."
                            img3="/images/Tati Flores.jpeg"
                            valor3="Feito à mão"
                            texto3="Todo o processo é artesanal, do início ao fim. Cada detalhe recebe atenção especial e muito amor."
                        />

            <Line/>
        </div>
    );
}