"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';


interface CarouselProps {
  images: { src: string; alt?: string }[];
}

export function Carousel({ images }: CarouselProps) {
	return (
		<div className="w-[98%] rounded-[32px]
				overflow-hidden bg-background-primary
				md:px-24 px-12
				hover:scale-102 transition-all duration-500 ease-in-out lg:opacity-75 hover:opacity-100"
				style={{ position: 'relative' }}>
			<Swiper
				modules={[Navigation, Pagination]}
				navigation
				pagination={{ clickable: true }}
				loop
				className="w-full md:h-[400px] h-[200px]"
				style={{ borderRadius: '32px' }}
			>
				{images.map((img, idx) => (
					<SwiperSlide key={idx}>
						<div className="w-full md:h-[400px] h-[200px] relative flex items-center justify-center">
							<Image
								src={img.src}
								alt={img.alt || `slide-${idx}`}
								fill
								style={{ objectFit: 'cover' }}
								className="rounded-[32px]"
								priority={idx === 0}
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
