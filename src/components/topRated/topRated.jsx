import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { ArrowRightIcon } from '@phosphor-icons/react';
import 'swiper/css';

import SectionTitle from '../sectionTitle/sectionTitle';
import ProductCard from '../productCard/productCard';
import { TopRatedProducts } from '../../Data';

const TopRated = () => {
    return (
        <section className="py-20 md:py-32 bg-[#fcfcfc]">
            <div className="container">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 md:mb-16 gap-8">
                    <SectionTitle
                        title="Top Rated"
                        headingLevel="h2"
                        className='text-left !mb-0'
                    />
                    <Link
                        to="/shop"
                        className="self-start sm:self-center text-primary font-bold text-xs md:text-sm uppercase tracking-widest flex items-center gap-2 border-b border-primary/20 pb-1 duration-300 hover:gap-4"
                    >
                        View All <ArrowRightIcon size={16} weight="bold" />
                    </Link>
                </div>

                <div className="px-4 md:px-0">
                    <Swiper
                        modules={[Autoplay]}
                        loop={true}
                        autoplay={{
                            delay: 4500,
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
                        {TopRatedProducts.map(product => (
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

export default TopRated;
