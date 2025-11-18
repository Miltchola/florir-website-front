import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';

interface QuestionProps {
    _id?: string;
    pergunta: string;
    resposta: string;
    delay?: number;
    adminEdit?: boolean;
}

export function Question({ _id, pergunta, resposta, delay = 0, adminEdit = false }: QuestionProps) {
    const [open, setOpen] = useState(false);

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
                <div className="flex items-center justify-center gap-6 mt-8 px-12">
                    <Button
                        text="EDITAR PERGUNTA"
                        buttonColor="dark"
                        onClick={() => alert(`Editar pergunta: ${_id}`)}
                    />

                    <button
                        type="button"
                        className="flex items-center justify-center p-0 cursor-pointer hover:scale-120 transition ease-in-out duration-300"
                        onClick={() => alert(`Deletar pergunta: ${_id}`)}
                        aria-label="Deletar pergunta"
                    >
                        <Image
                            src="/icons/delete.png"
                            alt="Deletar"
                            width={32}
                            height={32}
                        />
                    </button>
                </div>
            )}
        </motion.div>
    );
}