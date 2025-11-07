import { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/app/sharedComponents/ui/Button';
import { div } from 'framer-motion/client';
import { TextField } from '@/app/login/components/TextField';

interface ProdutoModalProps {
    _id: string;
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
    _id,
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

    const [titulo, setTitulo] = useState(nome);
    const [isRecomendado, setIsRecomendado] = useState(recomendado);
    const [isPreco, setPreco] = useState(preco.toString());
    const [descricaoLocal, setDescricaoLocal] = useState(descricao);
    const [isDisponiveis, setDisponiveis] = useState(disponiveis ?? 0);

    useEffect(() => {
        setIsRecomendado(recomendado);
    }, [recomendado]);

    const handleUpdate = async () => {
        const token = localStorage.getItem("authToken");
        const bearerToken = token?.startsWith("Bearer ") ? token : `Bearer ${token}`;
        console.log("Token de autenticação:", token);
        console.log("ID do produto:", _id);

        if (!token) {
            alert("Você precisa estar logado.");
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/produtos/${_id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // O token já vem com "Bearer" do backend
                },
                body: JSON.stringify({
                    imagem,
                    nome: titulo,
                    descricao: descricaoLocal,
                    preco: parseFloat(isPreco),
                    recomendado: isRecomendado,
                    tipo,
                    disponiveis: Number(isDisponiveis),
                }),
            });

            if (!res.ok) throw new Error("Erro ao atualizar produto");
            alert("Produto atualizado com sucesso!");
            onClose(); // fecha o modal
            // Se quiser, pode disparar um refresh na lista de produtos aqui
        } catch (error) {
            alert("Erro ao atualizar produto");
            console.error(error);
        }
    };

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
                            {/* Campo: Produto do Mês */}
                            <div className="flex items-center gap-3 mb-4">
                                <label htmlFor="produtoMes" className="text-font-primary text-xl font-semibold ml-2">
                                    Produto do Mês?
                                </label>
                                <input
                                    id="produtoMes"
                                    type="checkbox"
                                    checked={isRecomendado}
                                    onChange={() => setIsRecomendado(prev => !prev)}
                                    className="w-5 h-5 cursor-pointer accent-[#1E1E1E] rounded-md focus:ring-2 focus:ring-font-primary"
                                />
                                <span className="text-font-primary text-base select-none">
                                    {isRecomendado ? "Sim" : "Não"}
                                </span>
                            </div>


                            <TextField
                                title="Título do Produto"
                                value={titulo}
                                onChange={e => setTitulo(e.target.value)}
                                color='white'
                                placeholder="Escolha o Título do Produto"
                            />
                            <div className="mb-4">
                                <span className="text-base text-font-primary font-normal mb-2 ml-2 block">Tipo de Produto</span>
                                <select className="w-full rounded-2xl px-6 py-4 text-lg text-font-primary bg-[#fff] border-none outline-none focus:ring-2 focus:ring-font-primary transition">
                                    <option>Acessórios</option>
                                    <option>Arranjos</option>
                                    <option>Buquês</option>
                                    <option>Casamento</option>
                                    <option>Cúpulas</option>
                                    <option>Quadros</option>
                                    <option>Outros</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <span className="text-base text-font-primary font-normal mb-2 ml-2 block">Descrição</span>
                                <textarea
                                    className="w-full rounded-2xl px-6 py-4 text-lg text-font-primary bg-[#fff] border-none outline-none focus:ring-2 focus:ring-font-primary transition resize-none"
                                    rows={3}
                                    value={descricaoLocal}
                                    onChange={(e) => setDescricaoLocal(e.target.value)}
                                    placeholder="Escreva uma Descrição do Produto"
                                />
                            </div>
                            <div className="flex gap-4 mb-4">
                                <TextField
                                    title="Preço"
                                    value={isPreco}
                                    type="text"
                                    onChange={(e) => {
                                        const value = e.target.value.replace(',', '.'); // permite digitar vírgula
                                        if (/^\d*\.?\d{0,2}$/.test(value)) { // só números e até 2 casas decimais
                                        setPreco(value);
                                        }
                                    }}
                                    color='white'
                                    placeholder="0.00"
                                />
                                <div className="flex-1">
                                    <TextField
                                        title="Disponíveis"
                                        value={isDisponiveis.toString()}
                                        type="text"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value === "" || /^\d+$/.test(value)) {
                                                setDisponiveis(value === "" ? 0 : Number(value));
                                            }
                                        }}
                                        color="white"
                                        placeholder="0"
                                    />
                                    {/*
                                    <span className="text-base text-font-primary font-normal mb-2 ml-2 block">Disponíveis</span>
                                    <select className="w-full rounded-2xl px-6 py-4 text-lg text-font-primary bg-[#fff] border-none outline-none focus:ring-2 focus:ring-font-primary transition">
                                        <option>{disponiveis ?? 0}</option>
                                    </select>*/}
                                </div>
                            </div>
                            <div className="flex gap-4 mb-2">
                                <Button text="REMOVER PRODUTO" buttonColor="red" isDelete={true} width="100%" />
                            </div>
                            <div className="flex gap-4">
                                <Button text="ATUALIZAR" buttonColor="dark" width="50%" onClick={handleUpdate} />
                                <Button text="CANCELAR" buttonColor="black" width="50%" onClick={onClose} />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}