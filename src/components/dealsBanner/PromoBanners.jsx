import React from 'react';
import promo1 from '../../assets/Deal of the day/phone.png';
import promo2 from '../../assets/Deal of the day/controller.png';
import promo3 from '../../assets/Deal of the day/tablets.png';

const PromoBanners = () => {
    const promos = [promo1, promo2, promo3];

    return (
        <div className="flex flex-col gap-6 h-full">
            {promos.map((promoImg, idx) => (
                <div key={idx} className="flex-1 bg-gray-100 rounded-2xl overflow-hidden relative group cursor-pointer shadow-sm min-h-[220px] flex items-center justify-center p-4">
                    <img
                        src={promoImg}
                        alt={`Promo ${idx + 1}`}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 rounded-2xl"></div>
                </div>
            ))}
        </div>
    );
};

export default PromoBanners;
