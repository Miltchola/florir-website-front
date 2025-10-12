import { ReactNode, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/app/sharedComponents/ui/Button';
import { ProdutoModal } from './ProdutoModal';
import { div } from 'framer-motion/client';

interface ProdutoProps {
    imagem: string;
    nome: string;
    descricao: string;
    preco: number;
    recomendado: boolean;
    disponiveis: number;
    tipo: string;
    buttonText: string;
    buttonLink?: (() => void);
    adminEdit?: boolean;
}

export function ProdutoCard({
    imagem,
    nome,
    descricao,
    preco,
    recomendado,
    tipo,
    buttonText,
    buttonLink,
    adminEdit,
    disponiveis,
}: ProdutoProps) {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <div className="bg-background-primary rounded-[28px] p-6 flex flex-col w-[300px]
            transition duration-500 ease-in-out hover:scale-102 hover:shadow-xl">
                <div className="w-[250px] h-[250px] mb-4 overflow-hidden rounded-[18px]">
                    <Image
                        src={imagem}
                        alt={nome}
                        width={250}
                        height={250}
                        className="object-cover w-full h-full
                        transition duration-500 ease-in-out hover:scale-105"
                    />
                </div>
                <h2 className="font-bold leading-8 mb-2">{nome}</h2>
                <p className="text-font-primary text-base font-thin mb-4 text-left">
                    Preço: {preco.toFixed(2).replace('.', ',')}
                </p>
                <div className="flex">
                    {!adminEdit && (
                        <Button
                            text={buttonText}
                            onClick={() => setModalOpen(true)}
                            buttonColor="dark"
                        />
                    )}
                    
                    {adminEdit && (
                        <div className='flex'>
                            <Button
                                text="Editar"
                                onClick={() => alert('Função de editar produto')}
                                buttonColor="dark"
                            />
                            <div className="flex ml-2 justify-center items-center
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
            </div>
            <ProdutoModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                imagem={imagem}
                nome={nome}
                descricao={descricao}
                preco={preco.toFixed(2).replace('.', ',')}
                recomendado={recomendado}
                tipo={tipo}
                disponiveis={disponiveis}
                buttonText={buttonText}
                buttonLink={buttonLink}
            />
        </>
    );
}