import React from 'react';
import thumb1 from '../../assets/Deal of the day/features phone front.png';
import thumb2 from '../../assets/Deal of the day/features phone.png';
import thumb3 from '../../assets/Deal of the day/feature phone back.png';
import thumb4 from '../../assets/Deal of the day/feature phone side.png';

const DealCard = () => {
    const thumbnails = [thumb1, thumb2, thumb3, thumb4];

    return (
        <div className="bg-white rounded-[20px] p-8 flex flex-col md:flex-row gap-10 shadow-sm border border-gray-50 h-full">
            {/* Left side: Images */}
            <div className="flex md:w-[45%] gap-6 relative">
                {/* Sale Badge */}
                <div className="absolute top-0 left-[80px] z-10 bg-[#00B59C] text-white px-4 py-2 rounded-[10px]">
                    <span className="block text-[11px] uppercase tracking-wider mb-0.5">SAVE</span>
                    <span className="block font-bold text-lg leading-none">$199.00</span>
                </div>

                {/* Thumbnails */}
                <div className="flex flex-col gap-4">
                    {thumbnails.map((thumb, idx) => (
                        <div key={idx} className={`w-[72px] h-[90px] rounded-xl border-2 ${idx === 0 ? 'border-[#00B59C]' : 'border-transparent'} p-1 cursor-pointer hover:border-[#00B59C] transition-colors bg-gray-50 flex items-center justify-center`}>
                            <img src={thumb} alt={`thumbnail ${idx}`} className="w-full h-full object-contain" />
                        </div>
                    ))}
                </div>

                {/* Main Image */}
                <div className="flex-1 flex items-center justify-center relative">
                    <button className="absolute top-0 right-0 w-12 h-12 bg-[#F3F4F6] hover:bg-[#E5E7EB] rounded-full flex items-center justify-center transition-colors">
                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                    <img src={thumb2} alt="Xioma Redmi Note 11 Pro" className="w-full max-h-[420px] object-contain px-4" />
                </div>
            </div>

            {/* Right side: Details */}
            <div className="flex md:w-[55%] flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-[#FFB800]">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <svg key={i} className="w-[18px] h-[18px] fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-gray-500 text-sm">(12)</span>
                </div>

                <h3 className="text-[26px] font-bold text-gray-900 mb-5 leading-[1.3]">
                    Xioma Redmi Note 11 Pro 256GB 2023, Black Smartphone
                </h3>

                <div className="flex items-end gap-4 mb-8">
                    <span className="text-[34px] font-bold text-[#00B59C] leading-none">$569.00</span>
                    <span className="text-[22px] text-gray-400 line-through font-semibold mb-0.5">$759.00</span>
                </div>

                <ul className="space-y-3 mb-10">
                    <li className="flex items-start gap-3 text-gray-600 text-[16px]">
                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></span>
                        Intel LGA 1700 Socket: Supports 13th & 12th Gen Intel Core
                    </li>
                    <li className="flex items-start gap-3 text-gray-600 text-[16px]">
                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></span>
                        DDR5 Compatible: 4*SMD DIMMs with XMP 3.0 Memory
                    </li>
                    <li className="flex items-start gap-3 text-gray-600 text-[16px]">
                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></span>
                        Commanding Power Design: Twin 16+1+2 Phases Digital VRM
                    </li>
                </ul>

                <div className="flex gap-4 mb-10">
                    <span className="bg-[#E6F8F5] text-[#00B59C] px-5 py-2.5 rounded-lg text-[13px] font-bold tracking-wider">
                        FREE SHIPPING
                    </span>
                    <span className="bg-[#E6F8F5] text-[#00B59C] px-5 py-2.5 rounded-lg text-[13px] font-bold tracking-wider">
                        FREE GIFT
                    </span>
                </div>

                {/* Countdown */}
                <div className="flex items-center gap-8 mb-10">
                    <div className="flex flex-col">
                        <span className="text-[15px] font-bold text-gray-900 leading-snug">HURRY UP!</span>
                        <span className="text-[15px] font-bold text-gray-900 leading-snug">PROMOTION WILL</span>
                        <span className="text-[15px] font-bold text-gray-900 leading-snug">EXPIRES IN</span>
                    </div>
                    <div className="flex gap-3">
                        {[{v: '-162', l: 'd'}, {v: '-9', l: 'h'}, {v: '-3', l: 'm'}, {v: '-3', l: 's'}].map((time, i) => (
                            <div key={i} className="bg-[#EEF1F5] rounded-xl p-4 min-w-[70px] min-h-[70px] flex flex-col items-center justify-center relative">
                                <span className="text-[28px] font-bold text-gray-900 leading-none mb-1">{time.v}</span>
                                <span className="text-gray-500 font-bold absolute bottom-2 right-2.5 text-[12px]">{time.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-[480px]">
                    <div className="h-2.5 w-full bg-[#E5E7EB] rounded-full overflow-hidden mb-3">
                        <div className="h-full bg-[#00B59C] rounded-full" style={{ width: '35%' }}></div>
                    </div>
                    <div className="text-[15px] text-gray-600">
                        Sold: <span className="font-bold text-gray-900">26/75</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DealCard;
