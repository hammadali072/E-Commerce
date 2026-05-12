import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import TitleComponent from '../titleComponent/titleComponent';
import ProductCard from '../productCard/productCard';
import { PremiumCollectionData } from '../../Data';

const PremiumCollection = () => {
    return (
        <section className="relative py-20 md:py-32 bg-card-subtle overflow-hidden">
            <div className="absolute -top-24 -left-24 size-96 bg-primary/5 rounded-full blur-[100px]" />
            <div className="absolute -bottom-24 -right-24 size-96 bg-primary/5 rounded-full blur-[100px]" />

            <div className="container">
                <div className='relative z-10'>
                    <div className="flex flex-col items-center text-center mb-16 md:mb-24">
                        <span className="text-primary font-bold tracking-[0.5em] uppercase text-[10px] mb-6">
                            The Selection
                        </span>
                        <TitleComponent type="h2" className="text-dark text-4xl md:text-7xl font-playfairDisplay mb-6 tracking-tighter">
                            Premium Collection
                        </TitleComponent>
                        <p className="text-dark-40 max-w-xl text-base md:text-lg font-light leading-relaxed px-4">
                            Curated for those who appreciate the intersection of heritage craftsmanship and avant-garde luxury.
                        </p>
                    </div>

                    <div className="px-4 md:px-0">
                        <Swiper
                            modules={[Autoplay]}
                            loop={true}
                            autoplay={{
                                delay: 5000,
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
                                }
                            }}
                        >
                            {PremiumCollectionData.map(product => (
                                <SwiperSlide key={product.id} className="h-auto">
                                    <ProductCard product={product} variant="premium" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PremiumCollection;
