import { ReactNode } from 'react';
import Image from 'next/image';

interface SectionTitleProps {
  image: string;
  title: string;
  text?: string | ReactNode;
  children?: ReactNode;
}

export function SectionTitle ({children, image, title, text}:SectionTitleProps){
    return (
        <div className='display flex flex-col items-center text-center px-12 py-4 lg:px-60 sm:px-20'>
            <Image 
              className='h-12 w-auto md:w-auto md:h-12'
              src={image}
              alt="Logo Florir"
              width={100} // defina width
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