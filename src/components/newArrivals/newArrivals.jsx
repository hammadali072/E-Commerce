import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import clsx from 'clsx';
import 'swiper/css';

import SectionTitle from '../sectionTitle/sectionTitle';
import ProductCard from '../productCard/productCard';
import { newArrivalsProducts } from '../../Data';

const NewArrivals = () => {
    const [activeTab, setActiveTab] = useState('All');
    const tabs = ['All', 'Clothing', 'Shoes'];

    const filteredProducts = activeTab === 'All'
        ? newArrivalsProducts
        : newArrivalsProducts.filter(p => p.category.toLowerCase() === activeTab.toLowerCase());

    return (
        <section className="py-20 md:py-32 bg-white">
            <div className="container">
                <div className='flex flex-col lg:flex-row lg:items-center justify-between mb-12 md:mb-16 gap-10'>
                    <SectionTitle
                        title="New Arrivals"
                        headingLevel="h2"
                        className='text-left !mb-0'
                    />

                    <div className="flex flex-wrap gap-3 md:gap-4">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={clsx(
                                    "px-6 md:px-8 py-2.5 text-xs md:text-sm font-semibold tracking-widest uppercase border duration-300 ",
                                    activeTab === tab
                                        ? "bg-primary text-white border-primary shadow-sm"
                                        : "bg-transparent text-dark/40 border-dark/10 hover:border-primary hover:text-dark"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="px-4 md:px-0">
                    <Swiper
                        key={activeTab}
                        modules={[Autoplay]}
                        loop={filteredProducts.length > 4}
                        autoplay={{
                            delay: 3500,
                            pauseOnMouseEnter: true
                        }}
                        slidesPerView={1}
                        spaceBetween={20}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 24
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 24
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30
                            },
                            1280: {
                                slidesPerView: 4,
                                spaceBetween: 30
                            }
                        }}
                    >
                        {filteredProducts.map(product => (
                            <SwiperSlide key={product.id} className="h-auto">
                                <ProductCard product={product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default NewArrivals;
