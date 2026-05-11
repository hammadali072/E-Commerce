import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, EffectFade } from 'swiper/modules';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/effect-fade';

const ImageGallery = ({ images, badge }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    // Simulate a full gallery from a single image for mock data
    const galleryImages = Array.isArray(images) ? images : [images, images, images, images];

    return (
        <div className="w-full flex flex-col gap-3">
            {/* ── Main Image Swiper ── */}
            <div className="relative group">
                {badge && (
                    <span className="absolute top-4 left-4 z-20 px-4 py-1.5 bg-dark text-white text-[10px] font-bold uppercase tracking-widest pointer-events-none">
                        {badge}
                    </span>
                )}

                <Swiper
                    spaceBetween={0}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    navigation={{
                        prevEl: '.gallery-prev',
                        nextEl: '.gallery-next',
                    }}
                    thumbs={{
                        swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                    }}
                    modules={[FreeMode, Navigation, Thumbs, EffectFade]}
                    className="aspect-square bg-[#F5F5F5] w-full"
                >
                    {galleryImages.map((img, idx) => (
                        <SwiperSlide
                            key={idx}
                            className="flex items-center justify-center bg-[#F5F5F5]"
                        >
                            <img
                                src={img}
                                alt={`Product view ${idx + 1}`}
                                className="w-full h-full object-contain p-4 md:p-6 transition-transform duration-700 group-hover:scale-[1.03]"
                            />
                        </SwiperSlide>
                    ))}

                    {/* Custom Prev Arrow */}
                    <button className="gallery-prev absolute left-2 md:left-3 top-1/2 -translate-y-1/2 z-10 size-8 md:size-10 bg-white border border-gray-100 shadow-sm flex items-center justify-center text-dark/50 hover:bg-amber hover:text-dark hover:border-amber transition-all duration-300 opacity-0 group-hover:opacity-100">
                        <CaretLeftIcon size={16} className="md:w-[18px] md:h-[18px]" weight="bold" />
                    </button>

                    {/* Custom Next Arrow */}
                    <button className="gallery-next absolute right-2 md:right-3 top-1/2 -translate-y-1/2 z-10 size-8 md:size-10 bg-white border border-gray-100 shadow-sm flex items-center justify-center text-dark/50 hover:bg-amber hover:text-dark hover:border-amber transition-all duration-300 opacity-0 group-hover:opacity-100">
                        <CaretRightIcon size={16} className="md:w-[18px] md:h-[18px]" weight="bold" />
                    </button>


                </Swiper>
            </div>

            {/* ── Thumbnail Swiper ── */}
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={8}
                slidesPerView={4}
                breakpoints={{
                    0: { slidesPerView: 3.5 },
                    480: { slidesPerView: 4 },
                    768: { slidesPerView: 4 },
                }}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs]}
                className="w-full gallery-thumbs max-h-16 md:max-h-20"
            >
                {galleryImages.map((img, idx) => (
                    <SwiperSlide key={idx} className="cursor-pointer gallery-thumb-slide">
                        <div className="aspect-square bg-[#F5F5F5] p-1 border md:p-1.5 border-2 border-transparent transition-all duration-300 max-h-16 md:max-h-20">
                            <img
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                className="size-full object-contain"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    );
};

ImageGallery.propTypes = {
    images: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
    badge: PropTypes.string,
};

export default ImageGallery;
