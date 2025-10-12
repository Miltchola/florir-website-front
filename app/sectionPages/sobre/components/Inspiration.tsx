import { ReactNode } from 'react';
import Image from 'next/image';
import { Button } from '@/app/sharedComponents/ui/Button';
import { motion } from 'framer-motion';

interface InspirationProps {
  image: string;
  text1: string;
  text2: string;
  text3: string;
  children?: ReactNode;
  imagePosition?: "left" | "right";
}

export function Inspiration ({
  image,
  text1,
  text2,
  text3,
  children,
  imagePosition = "left",
}: InspirationProps) {
    // Define a classe de direção do flex
    const flexDirection = imagePosition === "right"
      ? "lg:flex-row-reverse"
      : "lg:flex-row";

    return (
        <div className="w-full flex justify-center">
            <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true }}
                className={`flex flex-col ${flexDirection} items-center justify-center w-full max-w-4xl px-6 py-12 gap-28 my-4`}
            >
                <div className="flex flex-row gap-8 flex-1 justify-center items-center">
                    <Image
                        src={image}
                        alt="About Image 1"
                        width={300}
                        height={300}
                        sizes="(max-width: 640px) 140px, (max-width: 1024px) 180px, 260px"
                        className="rounded-[32px] object-cover
                        w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[380px] lg:h-[380px]
                        transition duration-500 ease-in-out"
                    />
                </div>
                <div className="flex flex-col flex-1 justify-center items-start max-w-xl">
                    <Image 
                        className='h-12 w-auto md:w-auto md:h-12 mb-2'
                        src="/icons/Mini Logo Florir.png"
                        alt="Logo Florir"
                        width={100}
                        height={100}
                    />
                    <hr
                        className="border-t border-1 w-16 m-2"
                        style={{ borderColor: "var(--font-primary)" }}
                    />
                    <p className="mb-6" style={{ color: "var(--font-primary)", whiteSpace: "pre-line" }}>
                        {text1}
                    </p>
                    <p className="mb-6" style={{ color: "var(--font-primary)", whiteSpace: "pre-line" }}>
                        {text2}
                    </p>
                    <p className="mb-6" style={{ color: "var(--font-primary)", whiteSpace: "pre-line" }}>
                        {text3}
                    </p>
                    {children}
                </div>
            </motion.div>
        </div>
    );
}