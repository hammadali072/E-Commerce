import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import 'swiper/css';
import 'swiper/css/navigation';

import SectionTitle from '../sectionTitle/sectionTitle';
import ProductCard from './productCard';
import { featuredProductsData } from '../../Data';

const FeaturedProducts = () => {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-10 gap-6">
                    <SectionTitle
                        title="Featured Collections"
                        headingLevel="h2"
                        className='text-left !mb-0'
                    />

                    <div className="flex gap-3 self-start sm:self-center">
                        <button className="featured-prev p-2.5 md:p-3 border border-dark/10 hover:bg-primary hover:border-primary duration-300 cursor-pointer">
                            <CaretLeftIcon size={22} weight="bold" />
                        </button>
                        <button className="featured-next p-2.5 md:p-3 border border-dark/10 hover:bg-primary hover:border-primary duration-300 cursor-pointer">
                            <CaretRightIcon size={22} weight="bold" />
                        </button>
                    </div>
                </div>

                <Swiper
                    modules={[Navigation, Autoplay]}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        // disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    navigation={{
                        prevEl: '.featured-prev',
                        nextEl: '.featured-next',
                    }}
                    slidesPerView={1}
                    spaceBetween={20}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 24
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 30
                        }
                    }}
                >
                    {featuredProductsData.map((product) => (
                        <SwiperSlide key={product.id}>
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default FeaturedProducts;
