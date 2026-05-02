import React from 'react';
import laptopImg from '../../assets/Top categories/Laptop.png';
import pcGamingImg from '../../assets/Top categories/Gaming PC.png';
import headphonesImg from '../../assets/Top categories/Headphons.png';
import monitorsImg from '../../assets/Top categories/Monitors.png';

const TopCategories = () => {
    const categories = [
        { name: 'Laptops', img: laptopImg },
        { name: 'PC Gaming', img: pcGamingImg },
        { name: 'Headphones', img: headphonesImg },
        { name: 'Monitors', img: monitorsImg }
    ];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 h-full">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-[20px] font-bold text-gray-900 tracking-wide">TOP CATEGORIES</h3>
                <a href="#" className="text-[15px] text-gray-500 hover:text-gray-900 transition-colors">
                    View All
                </a>
            </div>
            <div className="grid grid-cols-4 gap-6">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center gap-4 cursor-pointer group"
                    >
                        <div className="w-24 h-24 bg-gray-50 rounded-[16px] flex items-center justify-center group-hover:bg-[#E6F8F5] transition-colors p-4 group-hover:shadow-sm">
                            <img src={category.img} alt={category.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                        </div>
                        <span className="text-[15px] font-bold text-gray-800 group-hover:text-[#00B59C] transition-colors">
                            {category.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopCategories;
