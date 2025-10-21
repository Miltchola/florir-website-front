import { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/app/sharedComponents/ui/Button';
import { div } from 'framer-motion/client';
import { TextField } from '@/app/login/components/TextField';

interface ProdutoModalProps {
    open: boolean;
    onClose: () => void;
    imagem: string;
    nome: string;
    descricao: string;
    preco: number;
    recomendado: boolean;
    tipo: string;
    disponiveis?: number;
    buttonText: string;
    buttonLink?: (() => void);
    children?: ReactNode;
    adminEdit?: boolean;
}

export function ProdutoModalEdit({
    open,
    onClose,
    imagem,
    nome,
    descricao,
    preco,
    recomendado,
    tipo,
    disponiveis,
    buttonText,
    buttonLink,
    adminEdit = false,
}: ProdutoModalProps) {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    const [titulo, setTitulo] = useState("");

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Fundo escurecido */}
                    <div
                        className="absolute inset-0 bg-black/70"
                        onClick={onClose}
                    />
                    {/* Modal centralizado */}
                    <motion.div
                        className="relative rounded-[32px] p-6 md:p-10
                            max-w-[900px] w-full flex flex-col md:flex-row
                            gap-8 shadow-2xl z-10 bg-[#FCECEC] overflow-y-auto"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex flex-col items-center md:items-start flex-shrink-0 mb-4 md:mb-0 min-w-[220px]">
                            <Image
                                src={imagem}
                                alt={nome}
                                width={220}
                                height={220}
                                className="rounded-[20px] object-cover w-[220px] h-[220px] mb-4"
                            />   
                            <div className="mt-2 w-full flex-col items-center justify-center">
                                <div className="mb-4">
                                    <Button text="Trocar Imagem" buttonColor="dark" width="180px" />
                                </div>
                                <Button text="Remover Imagem" buttonColor="dark" width="180px" />
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-lg font-semibold">Produto do Mês?</span>
                                <div className="flex gap-2">
                                    {/* FAZER NOVOS BOTÕES!! */}
                                    <Button text="Sim" buttonColor={recomendado ? 'black' : 'dark'} width="10px" />
                                    <Button text="Não" buttonColor={!recomendado ? 'black' : 'dark'} width="10px" />
                                </div>
                            </div>
                            <TextField
                                title="Título do Produto"
                                value={nome}
                                onChange={e => setTitulo(e.target.value)}
                            />
                            <div className="mb-4">
                                <span className="text-base text-font-primary font-normal mb-2 ml-2 block">Tipo de Produto</span>
                                <select className="w-full rounded-2xl px-6 py-4 text-lg text-font-primary bg-[#fff] border-none outline-none focus:ring-2 focus:ring-font-primary transition">
                                    <option>Escolha uma das opções</option>
                                    {/* Adicione opções reais aqui */}
                                </select>
                            </div>
                            <div className="mb-4">
                                <span className="text-base text-font-primary font-normal mb-2 ml-2 block">Descrição</span>
                                <textarea
                                    className="w-full rounded-2xl px-6 py-4 text-lg text-font-primary bg-[#fff] border-none outline-none focus:ring-2 focus:ring-font-primary transition resize-none"
                                    rows={3}
                                    value={descricao}
                                />
                            </div>
                            <div className="flex gap-4 mb-4">
                                <TextField title="Preço" value={`R$ ${preco.toFixed(2).replace('.', ',')}`} />
                                <div className="flex-1">
                                    <span className="text-base text-font-primary font-normal mb-2 ml-2 block">Disponíveis</span>
                                    <select className="w-full rounded-2xl px-6 py-4 text-lg text-font-primary bg-[#fff] border-none outline-none focus:ring-2 focus:ring-font-primary transition">
                                        <option>{disponiveis ?? 0}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-4 mb-2">
                                <Button text="REMOVER PRODUTO" buttonColor="red" isDelete={true} width="100%" />
                            </div>
                            <div className="flex gap-4">
                                <Button text="ATUALIZAR" buttonColor="dark" width="50%" />
                                <Button text="CANCELAR" buttonColor="black" width="50%" onClick={onClose} />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}