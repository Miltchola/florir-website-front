"use client";
import React from 'react';
import Image from 'next/image';

interface CardProps {
    img1: string
    valor1: string;
    texto1: string;
    img2: string;
    valor2: string;
    texto2: string;
    img3: string;
    valor3: string;
    texto3: string;
}

export function Valores({ img1, valor1, texto1, img2, valor2, texto2, img3, valor3, texto3 }: CardProps) {
  return (
    <section className="w-full flex justify-center py-12">
      <div className="w-full max-w-5xl px-6">
        <h1 className="text-center text-font-primary font-light text-2xl mb-8 md:mb-24">Meus Valores</h1>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="flex flex-col items-center text-center gap-4 px-8">
            <div className="rounded-full bg-background-secondary flex items-center justify-center">
              <Image src={img1} alt={valor1} width={200} height={200}
                className="object-cover rounded-[32px] w-[250px] h-[250px]
                          transition duration-500 ease-in-out"
              />
            </div>

            <h2 className="text-sm text-font-secondary">{valor1}</h2>
              <p className="block font-light mt-2">{texto1}</p>
          </div>

          <div className="flex flex-col items-center text-center gap-4 px-8">
            <div className="rounded-full bg-background-secondary flex items-center justify-center">
              <Image src={img2} alt={valor2} width={200} height={200}
                className="object-cover rounded-[32px] w-[250px] h-[250px]
                          transition duration-500 ease-in-out"
              />
            </div>
            
            <h2 className="text-sm text-font-secondary">{valor2}</h2>
            <p className="block font-light mt-2">{texto2}</p>
          </div>

          <div className="flex flex-col items-center text-center gap-4 px-8">
            <div className="rounded-full bg-background-secondary flex items-center justify-center">
              <Image src={img3} alt={valor3} width={100} height={100}
                className="object-cover rounded-[32px] w-[250px] h-[250px]
                          transition duration-500 ease-in-out"
              />
            </div>

            <h2 className="text-sm text-font-secondary">{valor3} </h2>
            <p className="block font-light mt-2">{texto3}</p>
          </div>

        </div>
      </div>
    </section>
  );
}