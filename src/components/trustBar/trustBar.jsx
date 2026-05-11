import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

import TitleComponent from '../titleComponent/titleComponent';
import { TrustFeatures } from '../../Data';

const TrustBar = () => {
    return (
        <section className="py-12 sm:py-16 lg:py-24 overflow-hidden">
            <div className="container">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                    }}
                >
                    {TrustFeatures.map((feature, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex flex-col items-center text-center group py-2 md:py-4 px-4">
                                <div className="text-dark mb-4 md:mb-6">
                                    <div className="md:hidden">
                                        {React.cloneElement(feature.icon, { size: 40, weight: "light" })}
                                    </div>
                                    <div className="hidden md:block">
                                        {React.cloneElement(feature.icon, { size: 48, weight: "light" })}
                                    </div>
                                </div>

                                <TitleComponent size="large-semibold" className="text-dark font-medium tracking-tight mb-2 sm:mb-3">{feature.title}</TitleComponent>
                                <TitleComponent size="small" className='text-dark-40 leading-relaxed max-w-[280px]'>{feature.desc}</TitleComponent>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default TrustBar;
