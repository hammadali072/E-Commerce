import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import 'swiper/css';
import 'swiper/css/navigation';

import SectionTitle from '../sectionTitle/sectionTitle';
import ProductCard from './productCard';

import formalShoesImg from '../../assets/formal-shoes-img.png';
import joggersImg from '../../assets/jogger-img.png';
import pantImg from '../../assets/pant-img.png';
import shirtsImg from '../../assets/shirts-img.png';

const products = [
    {
        id: 1,
        name: 'Classic White Oxford Shirt',
        category: 'Formal Shirts',
        price: 45.00,
        oldPrice: 60.00,
        image: shirtsImg,
        rating: 3.8,
        badge: 'Bestseller'
    },
    {
        id: 2,
        name: 'Slim Fit Navy Chinos',
        category: 'Formal Pant',
        price: 55.00,
        oldPrice: 75.00,
        image: pantImg,
        rating: 4.6,
        badge: 'New'
    },
    {
        id: 3,
        name: 'Handcrafted Leather Oxfords',
        category: 'Formal Shoes',
        price: 120.00,
        oldPrice: 150.00,
        image: formalShoesImg,
        rating: 4.9,
        badge: 'Premium'
    },
    {
        id: 4,
        name: 'Urban Performance Joggers',
        category: 'Joggers',
        price: 35.00,
        oldPrice: 50.00,
        image: joggersImg,
        rating: 4.5,
        badge: 'Sale'
    },
    {
        id: 5,
        name: 'Swift-Step Modern Sneakers',
        category: 'Sneakers',
        price: 85.00,
        oldPrice: 110.00,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
        rating: 4.7,
        badge: 'Hot'
    }
];

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
                    {products.map((product) => (
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
