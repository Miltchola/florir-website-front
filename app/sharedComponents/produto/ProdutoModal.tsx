import { ReactNode, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/app/sharedComponents/ui/Button';

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

export function ProdutoModal({
    open,
    onClose,
    imagem,
    nome,
    descricao,
    preco,
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

    const mensagemWhatsApp = `Olá, gostaria de mais informações sobre o produto que vi no seu site: ${nome}, ${descricao} - Preço: R$ ${preco}.`;
    const whatsappLink = `https://wa.me/5571991225528?text=${encodeURIComponent(mensagemWhatsApp)}`;

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
                    {/* Modal */}
                    <motion.div
                        className="relative rounded-[32px] lg:p-12 p-6
                        max-w-[75%] max-h-[80%] min-w-[300px]
                        w-full flex flex-col lg:flex-row
                        gap-8 shadow-2xl z-10 overflow-y-scroll scrollbar-hide"
                        style={{
                            background: "#F5F5EF",
                            msOverflowStyle: "none", // IE and Edge
                            scrollbarWidth: "none"   // Firefox
                        }}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex-shrink-0 flex justify-center items-center mb-4 md:mb-0">
                            <Image
                                src={imagem}
                                alt={nome}
                                width={280}
                                height={300}
                                className="rounded-[24px] object-cover w-[220px] h-[220px] sm:w-[160px] sm:h-[160px] md:w-[260px] md:h-[280px]"
                            />
                        </div>
                        <div className="flex flex-col justify-between flex-1">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Produto do Mês</h3>
                                <h2 className="text-2xl font-serif font-medium mb-1">{nome}</h2>
                                <p className="text-base text-gray-600 mb-2">{tipo}</p>
                                <p className="text-base text-font-primary mb-4">{descricao}</p>
                                <p className="text-xl font-bold mb-1">R$ {preco.toFixed(2).replaceAll('.', ',')}</p>
                                {disponiveis !== undefined && (
                                    <p className="text-sm text-gray-500 mb-4">Disponíveis: {disponiveis}</p>
                                )}
                            </div>
                            <div className="flex flex-col md:flex-row gap-4 mt-4">
                                <Button
                                    text="QUERO PRA MIM"
                                        onClick={() => window.open(whatsappLink, '_blank')}
                                    buttonColor="dark"
                                    width="100%"
                                    whatsapp={true}
                                />
                                <Button
                                    text="FECHAR"
                                    onClick={onClose}
                                    buttonColor="black"
                                    width="100%"
                                />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}