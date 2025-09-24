import { ReactNode } from 'react';
import Image from 'next/image';


interface SectionTitleProps {
  title: string;
  text?: string | ReactNode;
  children?: ReactNode;
}

export function SectionTitle ({children, title, text}:SectionTitleProps){
    return (
        <div className='display flex flex-col items-center text-center px-12 py-4 lg:px-60 sm:px-20'>
            <Image 
              className='h-12 w-auto md:w-auto md:h-12'
              src="/icons/Mini Logo Florir.png"
              alt="Logo Florir"
              width={100}
              height={100}
            />
            <div>
                <h1 className="text-font-primary font-light text-4xl mb-1 tracking-normal">{title}</h1>
                {text && (
                  <p className="text-font-primary text-lg font-thin lg:px-24 px-4">{text}</p>
                )}
            </div>
        </div>
    );
}