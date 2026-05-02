import React from 'react';
import HeroImg from '../../assets/hero img.png';

const HeroBanner = () => {
    return (
        <div className="relative h-full min-h-[400px] rounded-[20px] overflow-hidden shadow-lg">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url('${HeroImg}')`,
                    filter: 'brightness(0.7)'
                }}
            ></div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex flex-col justify-center px-12 lg:px-20 text-white">
                <h1 className="text-5xl lg:text-[72px] font-bold mb-4 leading-[1.1] drop-shadow-sm tracking-tight">
                    Don't miss amazing<br />
                    grocery deals
                </h1>
                <p className="text-xl lg:text-[24px] my-6 drop-shadow-sm opacity-90 tracking-wide">
                    Sign up for the daily newsletter
                </p>

                <div className="flex items-center w-full max-w-[400px] border border-white/50 rounded-full pl-6 pr-2 py-2 bg-transparent">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                    <input
                        type="email"
                        placeholder="Your email address"
                        className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/80 px-4 text-lg w-full"
                    />
                    <button className="bg-[#00B59C] hover:bg-[#009E88] text-white px-10 py-3 rounded-full text-lg font-medium transition-colors">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;
