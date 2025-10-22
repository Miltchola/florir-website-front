"use client";
import React from 'react';
import Image from 'next/image';

interface CardProps {
    valor1: string;
    texto1: string;
    valor2: string;
    texto2: string;
    valor3: string;
    texto3: string;
}

export function Valores({ valor1, texto1, valor2, texto2, valor3, texto3 }: CardProps) {
  return (
    <section className="w-full flex justify-center py-12">
      <div className="w-full max-w-5xl px-6">
        <h3 className="text-center text-font-primary font-light text-2xl mb-6">Meus Valores</h3>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center gap-4 px-4">
            <div className="w-16 h-16 rounded-full bg-background-secondary flex items-center justify-center">
              <Image src={valor1} alt={texto1} width={40} height={40} />
            </div>
            <h4 className="text-font-primary font-medium">{texto1}</h4>
            <p className="text-sm text-font-secondary">Sustentabilidade
              <span className="block font-light mt-2">Trabalho de forma consciente, valorizando a natureza e criando peças duradouras que reduzem o desperdício.</span>
            </p>
          </div>

          <div className="flex flex-col items-center text-center gap-4 px-4">
            <div className="w-16 h-16 rounded-full bg-background-secondary flex items-center justify-center">
              <Image src={valor2} alt={texto2} width={40} height={40} />
            </div>
            <h4 className="text-font-primary font-medium">{texto2}</h4>
            <p className="text-sm text-font-secondary">Originalidade
              <span className="block font-light mt-2">Cada peça é única, criada especialmente para você. Não existem dois arranjos iguais no meu ateliê.</span>
            </p>
          </div>

          <div className="flex flex-col items-center text-center gap-4 px-4">
            <div className="w-16 h-16 rounded-full bg-background-secondary flex items-center justify-center">
              <Image src={valor3} alt={texto3} width={40} height={40} />
            </div>
            <h4 className="text-font-primary font-medium">{texto3}</h4>
            <p className="text-sm text-font-secondary">Feito à mão
              <span className="block font-light mt-2">Todo o processo é artesanal, do início ao fim. Cada detalhe recebe atenção especial e muito amor.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}