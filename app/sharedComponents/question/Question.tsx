import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { PerguntaModalEdit } from '@/app/adminPage/perguntas/components/PerguntaModalEdit';

interface QuestionProps {
    _id?: string;
    pergunta: string;
    resposta: string;
    delay?: number;
    adminEdit?: boolean;
}

export function Question({ _id, pergunta, resposta, delay = 0, adminEdit = false }: QuestionProps) {
    const [open, setOpen] = useState(false); // já existente para expandir resposta
    const [editOpen, setEditOpen] = useState(false); // novo: controla modal de edição
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleDelete = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) { alert('Você precisa estar logado.'); return; }
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/perguntas/${_id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) { alert('Erro ao deletar pergunta. Tente novamente.'); return; }
            alert('Pergunta deletada com sucesso!');
            setShowDeleteConfirm(false);
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert('Erro ao deletar pergunta. Veja console para detalhes.');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay }}
            viewport={{ once: true }}
            className="mb-6 w-full md:px-36 px-16 my-8"
        >
            <button
                className="flex items-center w-full text-left"
                onClick={() => setOpen(!open)}
            >
                <Image
                    src="/icons/right 64.png"
                    alt="Arrow"
                    width={32}
                    height={32}
                    className={`mr-2 transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
                />
                <h3 className="text-font-primary font-semibold text-xl ml-2">{pergunta}</h3>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="resposta"
                        initial={{ opacity: 0, y: -20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -20, height: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="text-font-primary text-base font-thin mt-2 px-12 overflow-hidden"
                    >
                        Resposta: {resposta}
                    </motion.div>
                )}
            </AnimatePresence>

            {adminEdit && (
                <div className="flex items-center justify-center gap-6 mt-4 px-12">
                    <Button
                        text="EDITAR PERGUNTA"
                        buttonColor="dark"
                        onClick={() => setEditOpen(true)} // abre o modal
                    />

                    <button
                        type="button"
                        className="flex items-center justify-center p-0 cursor-pointer hover:scale-120 transition ease-in-out duration-300"
                        onClick={() => setShowDeleteConfirm(true)}
                        aria-label="Deletar pergunta"
                    >
                        <Image src="/icons/delete.png" alt="Deletar" width={32} height={32} />
                    </button>
                </div>
            )}

            {editOpen && (
                <PerguntaModalEdit
                    _id={_id}
                    pergunta={pergunta}
                    resposta={resposta}
                    open={editOpen}
                    onClose={() => setEditOpen(false)}
                />
            )}

            {showDeleteConfirm && (
                <motion.div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowDeleteConfirm(false)}
                >
                    <motion.div
                        className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full mx-4 shadow-2xl"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl md:text-2xl font-bold text-font-primary mb-4">Confirmar Exclusão</h2>
                        <p className="text-sm md:text-base text-font-primary mb-6 leading-relaxed">
                            Tem certeza que deseja remover a pergunta <strong>"{pergunta}"</strong>? Esta ação não pode ser desfeita.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                                text="CANCELAR"
                                buttonColor="black"
                                width="100%"
                                onClick={() => setShowDeleteConfirm(false)}
                            />
                            <Button
                                text="REMOVER"
                                buttonColor="red"
                                width="100%"
                                onClick={handleDelete}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </motion.div>
    );
}