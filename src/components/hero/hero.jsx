import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { CaretLeftIcon, CaretRightIcon, ArrowRightIcon } from '@phosphor-icons/react';
import clsx from 'clsx';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import TitleComponent from '../titleComponent/titleComponent';
import ThemeButton from '../themeButton/themeButton';
import { HeroData } from '../../Data';

const Hero = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="relative w-full h-screen min-h-[600px] lg:min-h-[800px] overflow-hidden group/slide">
            <Swiper
                modules={[Autoplay, Navigation, Pagination, EffectFade]}
                effect="fade"
                loop={true}
                speed={1000}
                autoplay={{
                    delay: 5000,
                    // disableOnInteraction: false,
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                pagination={{
                    clickable: true,
                    el: '.hero-pagination',
                    bulletClass: 'hero-bullet',
                    bulletActiveClass: 'hero-bullet-active',
                }}
                navigation={{
                    prevEl: '.hero-prev',
                    nextEl: '.hero-next',
                }}
                className="h-full"
            >
                {HeroData.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className={clsx("relative size-full flex items-center duration-1000", slide.bgColor)}>
                            <div className="absolute inset-0 lg:hidden opacity-10 pointer-events-none">
                                <img src={slide.image} alt="" className="size-full object-cover" />
                            </div>

                            <div className="container">
                                <div className='relative z-10 px-6 sm:px-12 lg:px-4'>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                                        <div className="flex flex-col items-start text-left max-w-2xl mx-auto lg:mx-0">
                                            <span className="text-primary font-bold tracking-[0.3em] sm:tracking-[0.5em] uppercase text-[10px] sm:text-xs mb-4 sm:mb-6 animate-fadeInUp">
                                                {slide.label}
                                            </span>

                                            <TitleComponent
                                                type="h1"
                                                className={clsx(
                                                    "text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 sm:mb-8 tracking-tighter leading-[1.1] font-bold animate-fadeInUp delay-100",
                                                    slide.theme === 'dark' ? 'text-white' : 'text-dark'
                                                )}
                                            >
                                                {slide.heading.split('. ').map((line, i) => (
                                                    <span key={i} className="block">{line}{i === 0 ? '.' : ''}</span>
                                                ))}
                                            </TitleComponent>

                                            <p className={clsx(
                                                "text-base sm:text-lg md:text-xl leading-relaxed mb-10 sm:mb-12 max-w-lg font-light animate-fadeInUp delay-200",
                                                slide.theme === 'dark' ? 'text-white/60' : 'text-dark-40'
                                            )}>
                                                {slide.subtext}
                                            </p>

                                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto animate-fadeInUp delay-300">
                                                <ThemeButton
                                                    variant={slide.theme === 'dark' ? 'primary' : 'dark'}
                                                    icon={<ArrowRightIcon size={20} weight="bold" />}
                                                    className="px-8 sm:px-10 py-4 border-transparent justify-center sm:justify-start"
                                                >
                                                    {slide.primaryBtn}
                                                </ThemeButton>

                                                <ThemeButton
                                                    variant="outline"
                                                    className={clsx(
                                                        "px-8 sm:px-10 py-4 justify-center sm:justify-start border-2",
                                                        slide.theme === 'dark' ? 'border-white/20 text-white hover:border-white' : 'border-dark/10 text-dark hover:border-dark'
                                                    )}
                                                >
                                                    {slide.secondaryBtn}
                                                </ThemeButton>
                                            </div>
                                        </div>

                                        <div className="relative hidden lg:block h-[70vh] xl:h-[80vh]">
                                            <div className="absolute inset-0 bg-primary/5 -rotate-3 scale-95 duration-1000 group-hover/slide:rotate-0 group-hover/slide:scale-100" />
                                            <div className="relative size-full overflow-hidden shadow-2xl">
                                                <img
                                                    src={slide.image}
                                                    alt={slide.heading}
                                                    className="size-full object-cover duration-1000 transform scale-105 group-hover/slide:scale-100 animate-fadeIn"
                                                />
                                            </div>
                                            <div className="absolute -bottom-6 -right-6 size-32 border-r-4 border-b-4 border-primary -z-10" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                <div className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-8 right-4 sm:right-8 z-20 hidden md:flex justify-between pointer-events-none opacity-0 group-hover/slide:opacity-100 duration-500">
                    <button className={clsx(
                        "hero-prev pointer-events-auto size-12 sm:size-14 rounded-full border flex items-center justify-center duration-300 swiper-button-disabled:opacity-20 swiper-button-disabled:pointer-events-none backdrop-blur-sm",
                        HeroData[activeIndex]?.theme === 'dark'
                            ? 'border-white/20 text-white hover:bg-white hover:text-dark'
                            : 'border-dark/10 text-dark hover:bg-dark hover:text-white'
                    )}>
                        <CaretLeftIcon size={20} className="sm:hidden" weight="bold" />
                        <CaretLeftIcon size={24} className="hidden sm:block" weight="bold" />
                    </button>
                    <button className={clsx(
                        "hero-next pointer-events-auto size-12 sm:size-14 rounded-full border flex items-center justify-center duration-300 swiper-button-disabled:opacity-20 swiper-button-disabled:pointer-events-none backdrop-blur-sm",
                        HeroData[activeIndex]?.theme === 'dark'
                            ? 'border-white/20 text-white hover:bg-white hover:text-dark'
                            : 'border-dark/10 text-dark hover:bg-dark hover:text-white'
                    )}>
                        <CaretRightIcon size={20} className="sm:hidden" weight="bold" />
                        <CaretRightIcon size={24} className="hidden sm:block" weight="bold" />
                    </button>
                </div>

                <div className="hero-pagination absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-50 flex gap-3 sm:gap-4" />
            </Swiper>
        </section>
    );
};

export default Hero;
