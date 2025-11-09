"use client";
import { Header } from '@/app/sharedComponents/layout/Header';
import { ProdutoGrid } from '@/app/sharedComponents/produto/ProdutoGrid';
import { SectionTitle } from '@/app/sharedComponents/ui/SectionTitle';
import React, { useEffect, useState } from 'react';
import RecomendadoCard from './components/RecomendadoCard';
import { Footer } from '@/app/sharedComponents/layout/Footer';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export default function Produtos() {
    const navLinks = [
        { label: 'HOME', href: '/' },
        { label: 'SOBRE MIM', href: '/sectionPages/sobre' },
        { label: 'PRODUTOS', href: '/sectionPages/produtos' },
        { label: 'ARRANJOS DESIDRATADOS', href: '/sectionPages/arranjos' },
        { label: 'CONTATO', href: '/sectionPages/contato' },
    ];

    async function fetchProdutos() {
        try {
            const res = await fetch(`${API_BASE_URL}/produtos`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) throw new Error("Erro ao buscar produtos");

            const data = await res.json();
            console.log("Resposta da API:", data);

            const produtosData = Array.isArray(data)
                ? data
                : Array.isArray(data.produtos)
                ? data.produtos
                : Array.isArray(data.data)
                ? data.data
                : [];

            setProdutos(produtosData);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        } finally {
            setLoading(false);
        }
    }

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProdutos();
    }, []);

    const [produtos, setProdutos] = useState<any[]>([]);

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

            {loading ? (
                <p className="text-center text-gray-500 py-10">Carregando produtos...</p>
            ) : produtos.length === 0 ? (
                <p className="text-center text-gray-500 py-10">
                    Nenhum produto encontrado.
                </p>
            ) : (
                <>
                    <RecomendadoCard
                        produtos={produtos.filter(p => p.recomendado)}
                        adminEdit={false}
                    />

                    <ProdutoGrid
                        produtos={produtos}
                        quantidade={null}
                        mostrarBotaoVerTodos={false}
                        topMenu={true}
                        adminEdit={false}
                    />
                </>
            )}

            <Footer navLinks={navLinks} />
        </div>
    );
}