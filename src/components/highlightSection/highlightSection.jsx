import { ArrowRightIcon } from '@phosphor-icons/react';

import TitleComponent from '../titleComponent/titleComponent';
import ThemeButton from '../themeButton/themeButton';

const HighlightSection = () => {
    return (
        <section className="py-20 md:py-32 bg-dark relative overflow-hidden">
            {/* Background Accents - Optimized for Performance */}
            <div className="absolute top-0 right-0 size-[300px] md:size-[500px] bg-primary opacity-5 rounded-full -mr-32 -mt-32 md:-mr-64 md:-mt-64 blur-[80px] md:blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 size-[300px] md:size-[500px] bg-primary opacity-5 rounded-full -ml-32 -mb-32 md:-ml-64 md:-mb-64 blur-[80px] md:blur-[120px] pointer-events-none" />

            <div className="container">
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 md:gap-24">
                    {/* Image Side - Responsive Aspect Ratio */}
                    <div className="relative group order-2 lg:order-1">
                        <div className="absolute -inset-2 md:-inset-4 border border-primary/20 duration-500 group-hover:inset-0 pointer-events-none" />
                        <div className="aspect-[4/5] bg-[#1A1A1A] flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1000"
                                alt="Premium Collection"
                                className="size-full object-cover grayscale group-hover:grayscale-0 duration-700 group-hover:scale-105"
                            />
                            {/* Floating Stats */}
                            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-white/10 backdrop-blur-md p-4 md:p-6 border-l-4 border-primary">
                                <span className="text-primary font-black text-3xl md:text-4xl block mb-1">01</span>
                                <span className="text-white/60 text-[10px] md:text-xs uppercase tracking-widest font-bold">Limited Release</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="flex flex-col items-start order-1 lg:order-2">
                        <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-6">Seasonal Highlight</span>

                        <TitleComponent
                            type="h2"
                            className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8 tracking-tight leading-[1.1]"
                        >
                            Crafted for the <br className='lg:block hidden' /> <span className="italic text-primary/80">Modern Icon.</span>
                        </TitleComponent>

                        <div className="w-16 md:w-24 h-1 bg-primary mb-10" />

                        <p className="text-white/50 text-base md:text-xl leading-relaxed mb-12">
                            Experience the intersection of traditional craftsmanship and avant-garde design. Our seasonal collection redefined comfort without compromising on sheer elegance.
                        </p>

                        <div className="flex flex-wrap gap-4 md:gap-6">
                            <ThemeButton variant="primary" icon={<ArrowRightIcon size={20} weight="bold" />}>
                                Shop Collection
                            </ThemeButton>
                            <ThemeButton variant="outline" className="text-white border-white/20 hover:border-primary">
                                View Lookbook
                            </ThemeButton>
                        </div>

                        {/* Feature Points - Responsive Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 mt-12 md:mt-16 pt-12 md:pt-16 border-t border-white/10 w-full">
                            <div>
                                <h4 className="text-white font-bold text-xs md:text-sm uppercase tracking-widest mb-3">Superior Fabric</h4>
                                <p className="text-white/30 text-xs leading-relaxed">Sourced from the finest mills in Northern Italy.</p>
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-xs md:text-sm uppercase tracking-widest mb-3">Hand Finished</h4>
                                <p className="text-white/30 text-xs leading-relaxed">Every seam is inspected and finished by hand.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HighlightSection;
