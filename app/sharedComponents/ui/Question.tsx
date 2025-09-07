import { useState } from 'react';
import Image from 'next/image';

interface QuestionProps {
    pergunta: string;
    resposta: string;
    arrowIcon: string; // Caminho da seta única
}

export function Question({ pergunta, resposta, arrowIcon }: QuestionProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="mb-6 w-full md:px-36 px-16 my-8">
            <button
                className="flex items-center w-full text-left"
                onClick={() => setOpen(!open)}
            >
                <Image
                    src={arrowIcon}
                    alt="Arrow"
                    width={32}
                    height={32}
                    className={`mr-2 transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
                />
                <h3 className="text-font-primary font-semibold text-xl ml-2">{pergunta}</h3>
            </button>
            {open && (
                <div className="text-font-primary text-base font-thin mt-2 px-12">
                    Resposta: {resposta}
                </div>
            )}
        </div>
    );
}