import { ReactNode } from 'react';

interface SectionTitleProps {
  image: string;
  title: string;
  text?: string | ReactNode;
  line?: boolean;
  children?: ReactNode;
}

export function SectionTitle ({children, image, title, text, line}:SectionTitleProps){
    return (
        <div className='display flex flex-col items-center text-center'>
            <img src="../../../public/icons/Mini Logo Florir.png" alt="Logo Florir" />
            <div>
                <h2 className="text-font-primary font-bold text-lg mb-1">{title}</h2>
                {text && (
                  <p className="text-font-primary text-sm font-normal">{text}</p>
                )}
            </div>
            {line && <hr className='border-t-4 border-font-primary mt-3 w-30px'/>}
        </div>
    )
}