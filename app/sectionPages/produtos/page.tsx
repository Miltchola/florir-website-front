"use client";
import { Header } from '@/app/sharedComponents/layout/Header';
import { ProdutoGrid } from '@/app/sharedComponents/produto/ProdutoGrid';
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

            <ProdutoGrid
                produtos={[
                    {
                        imagem: "/images/Anel Florido.jpeg",
                        nome: "Arranjo Floral Exclusivo",
                        descricao: "Um arranjo floral desidratado, perfeito para decorar sua casa ou presentear alguém especial.",
                        preco: "R$ 150,00",
                        recomendado: true,
                        disponiveis: 5,
                        tipo: "Buquês",
                        buttonText: "Ver mais",
                    },
                    {
                        imagem: "/images/Bolo Florido.jpeg",
                        nome: "Arranjo Floral Exclusivo",
                        descricao: "Um arranjo floral desidratado, perfeito para decorar sua casa ou presentear alguém especial.",
                        preco: "R$ 150,00",
                        recomendado: true,
                        disponiveis: 5,
                        tipo: "Arranjos",
                        buttonText: "Ver mais",
                    },
                    {
                        imagem: "/images/Buquê.jpeg",
                        nome: "Buquê de Flores Desidratadas",
                        descricao: "Um arranjo floral desidratado, perfeito para decorar sua casa ou presentear alguém especial.",
                        preco: "R$ 75,00",
                        recomendado: false,
                        disponiveis: 5,
                        tipo: "Potes",
                        buttonText: "Ver mais",
                    },
                    {
                        imagem: "/images/Anel Florido.jpeg",
                        nome: "Arranjo Floral Exclusivo",
                        descricao: "Um arranjo floral desidratado, perfeito para decorar sua casa ou presentear alguém especial.",
                        preco: "R$ 150,00",
                        recomendado: true,
                        disponiveis: 5,
                        tipo: "Decoração",
                        buttonText: "Ver mais",
                    },
                    {
                        imagem: "/images/Bolo Florido.jpeg",
                        nome: "Arranjo Floral Exclusivo",
                        descricao: "Um arranjo floral desidratado, perfeito para decorar sua casa ou presentear alguém especial.",
                        preco: "R$ 150,00",
                        recomendado: true,
                        disponiveis: 2,
                        tipo: "Decoração",
                        buttonText: "Ver mais",
                    },
                    {
                        imagem: "/images/Buquê.jpeg",
                        nome: "Buquê de Flores Desidratadas",
                        descricao: "Um arranjo floral desidratado, perfeito para decorar sua casa ou presentear alguém especial.",
                        preco: "R$ 75,00",
                        recomendado: false,
                        disponiveis: 5,
                        tipo: "Decoração",
                        buttonText: "Ver mais",
                    },
                ]}
                quantidade={null} // ou null para mostrar todas
                mostrarBotaoVerTodos={false}
                topMenu={true}
            />
        </div>
    );
}