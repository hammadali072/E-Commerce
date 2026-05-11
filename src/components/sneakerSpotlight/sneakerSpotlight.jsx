import { ArrowRightIcon } from '@phosphor-icons/react';

import TitleComponent from '../titleComponent/titleComponent';
import ThemeButton from '../themeButton/themeButton';

const SneakerSpotlight = () => {
    return (
        <section className="bg-[#f5f5f5] overflow-hidden">
            <div className="container-fluid !p-0">
                <div className="flex flex-col lg:flex-row items-stretch min-h-[600px] lg:min-h-[800px]">

                    <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-auto overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200"
                            alt="Fresh Kicks Editorial"
                            className="absolute inset-0 size-full object-cover transition-transform duration-1000 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-dark/5" />
                    </div>

                    <div className="w-full lg:w-1/2 flex items-center justify-center py-20 px-6 sm:px-12 lg:px-24 xl:px-32 bg-[#F5F5F5]">
                        <div className="flex flex-col items-start w-full">
                            <span className="text-amber font-bold tracking-[0.4em] uppercase text-xs mb-6">Fresh Kicks</span>

                            <TitleComponent
                                type="h2"
                                className="text-dark text-4xl md:text-6xl font-bold mb-8 tracking-tight leading-[1.1]"
                            >
                                Built For The Streets. <br />
                                <span className="italic text-dark/30 font-medium">Made To Last.</span>
                            </TitleComponent>

                            <div className="w-20 h-1.5 bg-amber mb-10" />

                            <TitleComponent size='large' className='text-dark/50 md:text-xl leading-relaxed mb-12 font-light'>Discover the perfect fusion of high-performance urban design and all-day comfort. Engineered for the modern explorer who demands style without compromise.</TitleComponent>

                            <div className="flex flex-wrap gap-6 mb-16">
                                <ThemeButton
                                    variant="dark"
                                    icon={<ArrowRightIcon size={20} weight="bold" />}
                                    className="px-10 py-5 justify-center"
                                >
                                    Shop Sneakers
                                </ThemeButton>
                                <ThemeButton
                                    variant="outline"
                                    className="px-10 py-5 justify-center border-dark/10 hover:border-dark text-dark"
                                >
                                    View All Shoes
                                </ThemeButton>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-16 border-t border-dark/10 w-full">
                                <div>
                                    <h4 className="text-dark font-black text-xs uppercase tracking-widest mb-3">Urban Performance</h4>
                                    <TitleComponent size="extra-small" className='text-dark/40 leading-relaxed'>Anti-slip vulcanized soles designed for maximum grip on city surfaces.</TitleComponent>
                                </div>
                                <div>
                                    <h4 className="text-dark font-black text-xs uppercase tracking-widest mb-3">Adaptive Comfort</h4>
                                    <TitleComponent size='extra-small' className='text-dark/40 leading-relaxed'>Responsive cushioning technology that molds to your unique stride.</TitleComponent>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default SneakerSpotlight;
