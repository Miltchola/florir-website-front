import Image from "next/image";
import { ReactNode } from "react";
import { Button } from "@/app/sharedComponents/ui/Button";

interface HeroSectionProps {
  logo: string;
  title: string;
  text: string | ReactNode;
  image: string;
  children?: ReactNode;
  buttonText: string;
}

export function HeroSection({ children, logo, title, text, image, buttonText }: HeroSectionProps) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between w-full px-20 py-12 gap-8 xl:gap-32">

        <div className="left flex flex-col items-start flex-1 max-w-xl">
            <Image 
                className='h-12 w-auto md:w-auto md:h-12'
                src={logo}
                alt="Logo Florir"
                width={100}
                height={100}
            />
            <div className="lg:mr-20">
                <h1 className="my-2">{title}</h1>
                <hr className='border-t-2 border-font-primary w-16 ml-4'/>
                <p className="my-2">{text}</p>
            </div>
            
            <div className="button mx-4">
                <Button
                    text={buttonText}
                    onClick={() => window.location.href = '/sectionPages/produtos'}
                />
            </div>
        </div>

        <div className="right flex-1 flex justify-center items-center">
            <Image 
                className="rounded-lg shadow-lg mt-6
                    w-2rem max-w-4rem sm:max-w-4rem md:max-w-2rem lg:max-w-2rem h-auto
                    hover:scale-105 hover:rotate-1 transition-all duration-500 ease-in-out"
                src={image}
                alt="Hero Image"
                width={350}
                height={400}
            />
        </div>

    </div>
  );
}