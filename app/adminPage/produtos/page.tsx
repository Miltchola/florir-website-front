"use client";
import React, { useEffect } from 'react';
import { Header } from '../../sharedComponents/layout/Header';
import { ProdutoGrid } from '@/app/sharedComponents/produto/ProdutoGrid';
import RecomendadoCard from '@/app/sectionPages/produtos/components/RecomendadoCard';
import { SectionTitle } from '@/app/sharedComponents/ui/SectionTitle';

export default function ProdutosAdmin() {
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            window.location.href = "/login";
        }
    }, []);

    const navLinks = [
        { label: 'HERO', href: '/adminPage/hero' },
        { label: 'PRODUTOS', href: '/adminPage/produtos' },
        { label: 'VOLTAR', href: '/' },
    ];

    const produtos=[
                    {
                        imagem: "/images/Anel Florido.jpeg",
                        nome: "Arranjo Floral Exclusivo",
                        descricao: "Um arranjo floral desidratado, perfeito para decorar sua casa ou presentear alguém especial.",
                        preco: 150.00,
                        recomendado: true,
                        disponiveis: 5,
                        tipo: "Buquês",
                        buttonText: "Ver mais",
                    },
                    {
                        imagem: "/images/Bolo Florido.jpeg",
                        nome: "Arranjo Floral Exclusivo",
                        descricao: "Um arranjo floral desidratado, perfeito para decorar sua casa ou presentear alguém especial.",
                        preco: 150.00,
                        recomendado: true,
                        disponiveis: 5,
                        tipo: "Arranjos",
                        buttonText: "Ver mais",
                    },
                    {
                        imagem: "/images/Buquê.jpeg",
                        nome: "Buquê de Flores Desidratadas",
                        descricao: "Um arranjo floral desidratado, perfeito para decorar sua casa ou presentear alguém especial.",
                        preco: 75.00,
                        recomendado: false,
                        disponiveis: 5,
                        tipo: "Potes",
                        buttonText: "Ver mais",
                    },
                    {
                        imagem: "/images/Anel Florido.jpeg",
                        nome: "Arranjo Floral Exclusivo",
                        descricao: "Um arranjo floral desidratado, perfeito para decorar sua casa ou presentear alguém especial.",
                        preco: 149.90,
                        recomendado: true,
                        disponiveis: 5,
                        tipo: "Decoração",
                        buttonText: "Ver mais",
                    },
                    {
                        imagem: "/images/Bolo Florido.jpeg",
                        nome: "Arranjo Floral Exclusivo",
                        descricao: "Um arranjo floral desidratado, perfeito para decorar sua casa ou presentear alguém especial.",
                        preco: 150.90,
                        recomendado: true,
                        disponiveis: 2,
                        tipo: "Decoração",
                        buttonText: "Ver mais",
                    },
                    {
                        imagem: "/images/Buquê.jpeg",
                        nome: "Buquê de Flores Desidratadas",
                        descricao: "Um arranjo floral desidratado, perfeito para decorar sua casa ou presentear alguém especial.",
                        preco: 75.50,
                        recomendado: false,
                        disponiveis: 5,
                        tipo: "Decoração",
                        buttonText: "Ver mais",
                    },
                ]

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

            <RecomendadoCard
                produtos={produtos}
                adminEdit={false}
            />

            <ProdutoGrid
                produtos={produtos}
                quantidade={null}
                mostrarBotaoVerTodos={false}
                topMenu={true}
                adminEdit={true}
            />
        </div>
    );
}