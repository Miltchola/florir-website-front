import { ReactNode } from 'react';
import Image from 'next/image';
import { Button } from '@/app/sharedComponents/ui/Button';

interface AboutSectionProps {
  image1: string;
  image2?: string;
  title: string;
  text: string;
  buttonText: string;
  buttonStatus?: boolean;
  buttonLink?: (() => void);
  children?: ReactNode;
}

export function AboutSection ({
  image1,
  image2,
  title,
  text,
  buttonText,
  buttonStatus,
  buttonLink,
  children,
}: AboutSectionProps) {
  return (
    <div
      className="flex flex-col lg:flex-row items-center justify-center w-full px-8 py-12 gap-8 my-4"
      style={{ backgroundColor: "#DDB7AB" }}
    >
      <div className="flex flex-row gap-4 flex-1 justify-center items-center">
        <Image
          src={image1}
          alt="About Image 1"
          width={220}
          height={220}
          className="rounded-[40px] object-cover"
        />
        {image2 && (
          <Image
            src={image2}
            alt="About Image 2"
            width={220}
            height={220}
            className="rounded-[40px] object-cover"
          />
        )}
      </div>
      <div className="flex flex-col flex-1 justify-center items-start max-w-xl">
        <h1
          className="font-light text-3xl mb-2 tracking-normal leading-tight"
          style={{ color: "var(--font-secondary)" }}
        >
          {title}
        </h1>
        <hr
          className="border-t border-1 w-16 m-2"
          style={{ borderColor: "var(--font-secondary)" }}
        />
        <p
          className="mb-6"
          style={{ color: "var(--font-secondary)", whiteSpace: "pre-line" }}
        >
          {text}
        </p>
        {buttonStatus && (
          <Button
            text={buttonText}
            onClick={() => buttonLink && buttonLink()}
            buttonColor="light"
          />
        )}
        {children}
      </div>
    </div>
  )
}