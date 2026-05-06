import { ArrowRightIcon } from '@phosphor-icons/react';

import TitleComponent from '../titleComponent/titleComponent';
import ThemeButton from '../themeButton/themeButton';

const HighlightSection = () => {
    return (
        <section className="py-24 bg-dark relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary opacity-5 rounded-full -mr-64 -mt-64 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary opacity-5 rounded-full -ml-64 -mb-64 blur-[120px] pointer-events-none" />

            <div className="container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 md:gap-24">
                    {/* Image Side */}
                    <div className="relative group">
                        <div className="absolute -inset-4 border border-primary/20 duration-500 group-hover:inset-0 pointer-events-none" />
                        <div className="aspect-[4/5] bg-[#1A1A1A] flex items-center justify-center p-12 relative overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1000"
                                alt="Premium Collection"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 duration-700 transition-all transform group-hover:scale-105"
                            />
                            {/* Floating Stats */}
                            <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md p-6 border-l-4 border-primary">
                                <span className="text-primary font-black text-4xl block mb-1">01</span>
                                <span className="text-white/60 text-xs uppercase tracking-widest font-bold">Limited Release</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="flex flex-col items-start">
                        <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-6">Seasonal Highlight</span>
                        <TitleComponent type="h2" className="text-white text-5xl md:text-7xl font-playfairDisplay mb-8 tracking-tight leading-[1.1]">
                            Crafted for the <br /> <span className="italic text-primary/80">Modern Icon.</span>
                        </TitleComponent>

                        <div className="w-24 h-1 bg-primary mb-10" />

                        <p className="text-white/50 text-lg md:text-xl leading-relaxed mb-12 max-w-lg">
                            Experience the intersection of traditional craftsmanship and avant-garde design. Our seasonal collection redefined comfort without compromising on sheer elegance.
                        </p>

                        <div className="flex flex-wrap gap-6">
                            <ThemeButton variant="primary" icon={<ArrowRightIcon size={20} weight="bold" />}>
                                Shop Collection
                            </ThemeButton>
                            <ThemeButton variant="outline" className="text-white border-white/20 hover:border-primary">
                                View Lookbook
                            </ThemeButton>
                        </div>

                        {/* Feature Points */}
                        <div className="grid grid-cols-2 gap-12 mt-16 pt-16 border-t border-white/10 w-full">
                            <div>
                                <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-3">Superior Fabric</h4>
                                <p className="text-white/30 text-xs leading-relaxed">Sourced from the finest mills in Northern Italy.</p>
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-3">Hand Finished</h4>
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
