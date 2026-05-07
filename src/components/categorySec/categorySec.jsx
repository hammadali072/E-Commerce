import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { CaretDoubleRightIcon } from '@phosphor-icons/react';
import clsx from 'clsx';
import 'swiper/css';

import TitleComponent from '../titleComponent/titleComponent';
import SectionTitle from '../sectionTitle/sectionTitle';
import { categoriesData } from '../../Data';

const CategorySec = () => {
    return (
        <section className="py-16 md:py-24">
            <div className="container">
                <SectionTitle
                    title="Explore Our Categories"
                    description="Discover our curated collection of premium formal wear and active lifestyle essentials."
                    headingLevel="h2"
                    className='items-center text-center'
                />

                <Swiper
                    modules={[Navigation, Autoplay]}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    slidesPerView={1}
                    spaceBetween={16}
                    allowTouchMove={false}
                    simulateTouch={false}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 4,
                        }
                    }}
                >
                    {categoriesData.map((cat, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className={clsx(
                                    "group relative flex flex-col items-center pt-10 pb-8 px-6 duration-500 hover:shadow-2 h-full",
                                    cat.bgColor
                                )}
                            >
                                <div className="text-center mb-8 relative z-10">
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-dark-40 mb-2 block">
                                        {cat.label}
                                    </span>
                                    <TitleComponent type="h4" className="text-dark duration-300 group-hover:text-primary">
                                        {cat.name}
                                    </TitleComponent>
                                </div>

                                <div className="relative mb-6 flex items-center justify-center duration-700 ease-out group-hover:scale-110">
                                    <img
                                        src={cat.img}
                                        alt={cat.name}
                                        className="aspect-square w-full h-auto object-contain drop-shadow-lg"
                                    />
                                </div>

                                <Link
                                    to={cat.path}
                                    className="inline-flex items-center gap-2 text-sm font-bold text-dark duration-300 group/button group-hover/button:gap-4 mt-auto"
                                >
                                    <span className='text-dark duration-300 group-hover/button:text-primary'>Shop Now</span>
                                    <CaretDoubleRightIcon size={16} weight="bold" className="text-dark duration-300 group-hover/button:text-primary" />
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default CategorySec;
