import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import SectionTitle from '../sectionTitle/sectionTitle';
import ProductCard from '../productCard/productCard';
import { SaleProductsData } from '../../Data';

const CountdownBox = ({ value, label }) => (
    <div className="flex flex-col items-center flex-1 sm:flex-none min-w-[70px] md:min-w-[80px]">
        <div className="bg-dark text-white w-full h-12 md:h-14 flex items-center justify-center text-lg md:text-xl font-black mb-2 shadow-lg">
            {value.toString().padStart(2, '0')}
        </div>
        <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-semibold text-dark-40">{label}</span>
    </div>
);

CountdownBox.propTypes = {
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired
};

const HotSale = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 2,
        hours: 14,
        minutes: 45,
        seconds: 30
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-20 md:py-32">
            <div className="container">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 md:mb-16 gap-10">
                    <div className="flex flex-col gap-6 md:gap-8 max-w-2xl">
                        <SectionTitle
                            title="Hot Sale"
                            headingLevel="h2"
                            className='text-left !mb-0'
                        />
                    </div>

                    <div className="flex flex-wrap gap-3 md:gap-4 w-full sm:w-auto">
                        <CountdownBox value={timeLeft.days} label="Days" />
                        <CountdownBox value={timeLeft.hours} label="Hrs" />
                        <CountdownBox value={timeLeft.minutes} label="Min" />
                        <CountdownBox value={timeLeft.seconds} label="Sec" />
                    </div>
                </div>

                {/* Slider Section */}
                <div className="relative">
                    <Swiper
                        modules={[Autoplay]}
                        loop={true}
                        autoplay={{
                            delay: 4000,
                            pauseOnMouseEnter: true
                        }}
                        navigation={{
                            prevEl: '.hotsale-prev',
                            nextEl: '.hotsale-next',
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
                        className="px-4"
                    >
                        {SaleProductsData.map(product => (
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

export default HotSale;
