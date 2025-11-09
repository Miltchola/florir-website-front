import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/app/sharedComponents/ui/Button';
import { ProdutoModal } from '@/app/sharedComponents/produto/ProdutoModal';
import { motion, AnimatePresence } from 'framer-motion';
import { ProdutoModalEdit } from '@/app/adminPage/produtos/components/ProdutoModalEdit';

interface Produto {
    imagem: string;
    _id: string;
    nome: string;
    descricao: string;
    preco: number;
    recomendado: boolean;
    disponiveis: number;
    tipo: string;
    adminEdit?: boolean;
}

interface RecomendadoProdutoProps {
    produtos: Produto[];
    adminEdit?: boolean;
}

export default function RecomendadoProduto({ produtos, adminEdit = false }: RecomendadoProdutoProps) {
    const recomendados = produtos.filter(p => p.recomendado);
    const [index, setIndex] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const [direction, setDirection] = useState(0);

    if (recomendados.length === 0) {
        return null;
    }

    const produto = recomendados[index];

    function prev() {
        setDirection(-1);
        setIndex(i => (i === 0 ? recomendados.length - 1 : i - 1));
    }
    function next() {
        setDirection(1);
        setIndex(i => (i === recomendados.length - 1 ? 0 : i + 1));
    }

    return (
        <div className="w-full flex flex-col items-center gap-4 bg-[#F5E7E2] py-8 mt-12 px-4">
            <h2 className="text-xl font-serif text-center">Produtos do Mês</h2>
            <div className="w-full max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-center gap-16 mb-4">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={produto.nome}
                        custom={direction}
                        initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="flex flex-col md:flex-row items-center justify-center gap-8 w-full"
                    >
                        {/* Imagem */}
                        <div className="flex-shrink-0 flex justify-center items-center mb-4 md:mb-0">
                            <Image
                                src={produto.imagem}
                                alt={produto.nome}
                                width={280}
                                height={300}
                                className="rounded-[24px] object-cover w-[220px] h-[220px] sm:w-[160px] sm:h-[160px] md:w-[260px] md:h-[280px]"
                            />
                        </div>
                        {/* Informações */}
                        <div className="flex flex-col justify-between flex-1 min-w-[220px] md:px-4 px-6">
                            <h3 className="text-lg font-semibold mb-2">{produto.tipo}</h3>
                            <h2 className="text-2xl font-serif font-medium mb-1">{produto.nome}</h2>
                            <p className="text-base text-font-primary mb-4">{produto.descricao}</p>
                            <p className="text-xl font-bold mb-1">R$ {produto.preco.toFixed(2).replace('.', ',')}</p>
                            <p className="text-sm text-gray-500 mb-4">Disponíveis: {produto.disponiveis}</p>
                            
                            {!adminEdit && (
                                <Button
                                    text="QUERO PRA MIM"
                                    buttonColor="dark"
                                    width="100%"
                                    onClick={() => setModalOpen(true)}
                                />
                            )}
                            {adminEdit && (
                                <div className="flex">
                                    <Button
                                        text="EDITAR"
                                        buttonColor="dark"
                                        width="80%"
                                        onClick={() => setEditModalOpen(true)}
                                    />
                                    <div className="flex ml-4 justify-center items-center
                                    cursor-pointer hover:scale-120 transition ease-in-out duration-300">
                                        <Image
                                            src="/icons/delete.png"
                                            alt="Editar"
                                            width={32}
                                            height={32}
                                        />
                                    </div>
                                </div>
                            )}
                            
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Setas e bolinhas de navegação */}
            <div className="flex flex-col items-center gap-2 mt-2 w-full">
                <div className="flex justify-center items-center gap-8 w-full">
                    <button
                        className="text-[#646862] text-3xl px-2 py-1 rounded-full hover:bg-[#e6d7d0] transition"
                        onClick={prev}
                        aria-label="Anterior"
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <circle cx="16" cy="16" r="14" stroke="#646862" strokeWidth="3" fill="none"/>
                            <polyline points="20,11 12,16 20,21" fill="none" stroke="#646862" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    {/* Bolinhas */}
                    <div className="flex gap-2 justify-center items-center">
                        {recomendados.map((_, i) => (
                            <button
                                key={i}
                                aria-label={`Ir para produto ${i + 1}`}
                                onClick={() => {
                                    setDirection(i > index ? 1 : -1);
                                    setIndex(i);
                                }}
                                className={`rounded-full transition-all duration-300
                                    ${index === i
                                        ? "bg-[#646862] w-4 h-4"
                                        : "bg-[#E6D7D0] w-3 h-3 border border-[#646862] opacity-70"
                                    }
                                `}
                                style={{
                                    outline: "none",
                                }}
                            />
                        ))}
                    </div>
                    <button
                        className="text-[#646862] text-3xl px-2 py-1 rounded-full hover:bg-[#e6d7d0] transition"
                        onClick={next}
                        aria-label="Próximo"
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <circle cx="16" cy="16" r="14" stroke="#646862" strokeWidth="3" fill="none"/>
                            <polyline points="12,11 20,16 12,21" fill="none" stroke="#646862" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>

            {modalOpen && (
                <ProdutoModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    imagem={produto.imagem}
                    nome={produto.nome}
                    descricao={produto.descricao}
                    preco={produto.preco}
                    recomendado={produto.recomendado}
                    tipo={produto.tipo}
                    disponiveis={produto.disponiveis}
                    buttonText="QUERO PRA MIM"
                />
            )}

            {editModalOpen && (
                <ProdutoModalEdit
                    open={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    _id={produto._id}
                    imagem={produto.imagem}
                    nome={produto.nome}
                    descricao={produto.descricao}
                    preco={produto.preco}
                    recomendado={produto.recomendado}
                    tipo={produto.tipo}
                    disponiveis={produto.disponiveis}
                    adminEdit={adminEdit}
                    buttonText="ATUALIZAR"
                />
            )}
        </div>
    );
}