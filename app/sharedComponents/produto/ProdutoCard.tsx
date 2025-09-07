import { ReactNode } from 'react';
import Image from 'next/image';
import { Button } from '@/app/sharedComponents/ui/Button';

interface ProdutoProps {
    imagem: string;
    nome: string;
    descricao: string;
    preco: string;
    recomendado: boolean;
    tipo: string;
    buttonText: string;
    buttonLink?: (() => void);
    children?: ReactNode;
}

export function ProdutoCard({
    imagem,
    nome,
    preco,
    buttonText,
    buttonLink,
}: ProdutoProps) {
    return (
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
                Preço: {preco}
            </p>
            <div className="flex">
                <Button
                    text={buttonText}
                    onClick={buttonLink}
                    buttonColor="dark"
                />
            </div>
        </div>
    );
}