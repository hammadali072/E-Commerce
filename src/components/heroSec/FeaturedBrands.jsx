import React from 'react';
import brand1 from '../../assets/Features brand/Link → logo1.png.svg';
import brand2 from '../../assets/Features brand/Link → logo2.png.svg';
import brand3 from '../../assets/Features brand/Link → logo3.png.svg';
import brand4 from '../../assets/Features brand/Link → logo4.png.svg';
import brand5 from '../../assets/Features brand/Link → logo5.png.svg';
import brand6 from '../../assets/Features brand/Link → logo6.png.svg';
import brand7 from '../../assets/Features brand/Link → logo7.png.svg';
import brand8 from '../../assets/Features brand/Link → logo8.png.svg';
import brand9 from '../../assets/Features brand/Link → logo9.png.svg';
import brand10 from '../../assets/Features brand/Link → logo10.png.svg';

const FeaturedBrands = () => {
    return (
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-50">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-[20px] font-bold text-gray-900 tracking-wide">FEATURED BRANDS</h3>
                <a href="#" className="text-[15px] text-gray-500 hover:text-gray-900 transition-colors">
                    View All
                </a>
            </div>
            <div className="grid grid-cols-5 gap-y-10 gap-x-6">
                {[brand1, brand2, brand3, brand4, brand5, brand6, brand7, brand8, brand9, brand10].map((brandImg, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-center cursor-pointer transition-all opacity-80 hover:opacity-100 hover:scale-105"
                    >
                        <img src={brandImg} alt={`Brand ${index + 1}`} className="max-h-8 object-contain" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedBrands;
