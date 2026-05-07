import PropTypes from 'prop-types';
import { ArrowRightIcon } from '@phosphor-icons/react';

import TitleComponent from '../titleComponent/titleComponent';
import ThemeButton from '../themeButton/themeButton';

import promoImg from '../../assets/formal-shoes-img.png';

const PromoBanner = () => {
    return (
        <section className="w-full overflow-hidden">
            <div className="flex flex-col lg:flex-row min-h-[500px] md:min-h-[600px]">
                {/* Left Side: Content */}
                <div className="w-full lg:w-1/2 bg-[#fdfbf7] flex items-center justify-center p-8 md:p-16 lg:p-24">
                    <div className="max-w-xl flex flex-col items-start">
                        <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-6 px-4 py-2 border border-primary/20 bg-white shadow-sm">
                            Limited Offer
                        </span>

                        <TitleComponent
                            type="h2"
                            className="text-dark text-4xl md:text-6xl font-playfairDisplay mb-8 tracking-tight leading-[1.1] font-bold"
                        >
                            Step Into Comfort, <br />
                            <span className="italic text-dark/70 font-medium">Dressed for Success.</span>
                        </TitleComponent>

                        <p className="text-dark-65 text-lg md:text-xl leading-relaxed mb-12 border-l-2 border-primary pl-6">
                            Experience the perfect blend of ergonomic design and premium Italian craftsmanship.
                        </p>

                        <ThemeButton variant="primary" icon={<ArrowRightIcon size={20} weight="bold" />}>
                            Shop the Collection
                        </ThemeButton>
                    </div>
                </div>

                {/* Right Side: Image/Lifestyle */}
                <div className="w-full lg:w-1/2 bg-dark flex items-center justify-center relative overflow-hidden group">
                    {/* Decorative Element */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary opacity-5 rounded-full blur-[120px] group-hover:opacity-10 duration-700 pointer-events-none" />

                    <img
                        src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1200"
                        alt="Lifestyle Collection"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 duration-1000 transition-all transform group-hover:scale-105"
                    />

                    {/* Floating Product Layer */}
                    <div className="absolute inset-0 flex items-center justify-center p-12 lg:p-24 pointer-events-none">
                        <img
                            src={promoImg}
                            alt="Featured Product"
                            className="w-3/4 h-auto object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] transform -rotate-12 group-hover:rotate-0 duration-700 transition-all"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

PromoBanner.propTypes = {};

export default PromoBanner;
