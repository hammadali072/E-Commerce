import React from 'react';
import watchImg from '../../assets/Deal of the day/watch.png';

const PreorderBanner = () => {
    return (
        <section className="bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="relative bg-[#00B59C] rounded-[20px] flex flex-col md:flex-row items-center justify-between px-8 md:px-12 py-5 md:py-2 overflow-hidden shadow-sm">
                    {/* Background Decorative Oval */}
                    <div className="absolute left-[25%] md:left-[30%] top-1/2 -translate-y-1/2 w-[350px] h-[300px] bg-[#6682A1] rounded-full scale-y-110 pointer-events-none"></div>

                    {/* Left Content */}
                    <div className="relative z-10 flex flex-col mb-4 md:mb-0">
                        <h2 className="text-[28px] md:text-[34px] font-bold text-white leading-none tracking-wide mb-1">PRE ORDER</h2>
                        <span className="text-[10px] text-white/60 font-bold tracking-[0.2em] uppercase mb-2">BE THE FIRST TO OWN</span>
                        <span className="text-[16px] text-white font-medium">From $399</span>
                    </div>

                    {/* Center Image - Watch */}
                    <div className="absolute left-[35%] md:left-[28%] top-20 -translate-y-1/2 z-10 hidden md:flex items-center justify-center">
                        <img
                            src={watchImg}
                            alt="Opplo Watch Sport Series 8"
                            className="h-[140px] md:h-[100px] object-contain hover:scale-110 transition-transform duration-500"
                        />
                    </div>

                    {/* Middle Right Content */}
                    <div className="relative z-10 flex flex-col md:ml-auto md:mr-32 mb-4 md:mb-0 md:w-[260px]">
                        <span className="text-white/80 text-[13px] mb-0.5">Opplo Watch Sport</span>
                        <span className="text-white/80 text-[13px] mb-1">Series 8</span>
                        <h3 className="text-[24px] md:text-[28px] font-normal text-white leading-tight tracking-wide">
                            A healthy leap ahead
                        </h3>
                    </div>

                    {/* Discover Button */}
                    <div className="relative z-10 shrink-0">
                        <button className="bg-white text-gray-900 px-6 py-2.5 rounded-full font-bold text-[13px] hover:bg-gray-100 transition-colors shadow-sm tracking-wide">
                            Discover Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PreorderBanner;
