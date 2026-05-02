import React from 'react';
import ProductCard from './ProductCard';

const BestSeller = () => {
    const products = [
        {
            id: 1,
            title: 'BOSO 2 Wireless On Ear Headphone',
            image: 'https://placehold.co/300x300/transparent/333?text=Headphone',
            reviews: 152,
            price: '359.00',
            tags: ['FREE SHIPPING', 'FREE GIFT'],
            status: 'In stock',
            variants: ['https://placehold.co/40x40/transparent/333?text=W', 'https://placehold.co/40x40/transparent/333?text=B']
        },
        {
            id: 2,
            title: 'OPod Pro 12.9 Inch M1 2023, 64GB + Wifi, GPS',
            image: 'https://placehold.co/300x300/transparent/333?text=iPad',
            reviews: 152,
            price: '569.00',
            originalPrice: '759.00',
            saveAmount: '199.00',
            tags: ['FREE SHIPPING'],
            status: 'In stock'
        },
        {
            id: 3,
            title: 'uLosk Mini case 2.0, Xenon i10 / 32GB / SSD 512GB / VGA 8GB',
            image: 'https://placehold.co/300x300/transparent/333?text=Mini+PC',
            reviews: 8,
            price: '1,729.00',
            originalPrice: '2,119.00',
            saveAmount: '59.00',
            tags: ['FREE SHIPPING'],
            status: 'Out of stock'
        },
        {
            id: 4,
            title: 'Opplo Watch Series 8 GPS + Cellular Stainless Steel Case with Milanese Loop',
            image: 'https://placehold.co/300x300/transparent/333?text=Watch',
            priceRange: '$979.00 - $1,259.00',
            shippingCost: '$2.98',
            status: 'PRE - ORDER'
        },
        {
            id: 5,
            title: 'iSmart 24V Charger',
            image: 'https://placehold.co/300x300/transparent/333?text=Charger',
            reviews: 9,
            price: '9.00',
            originalPrice: '12.00',
            saveAmount: '3.00',
            shippingCost: '$3.98',
            status: 'Contact'
        }
    ];

    return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 relative">
                
                {/* Header Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-50 pb-5 mb-10">
                    <div className="flex items-center gap-10">
                        <h2 className="text-[20px] font-bold text-gray-900 tracking-wide uppercase">BEST SELLER</h2>
                        <div className="flex items-center gap-8 text-[15px] font-medium text-gray-400">
                            <button className="hover:text-gray-900 transition-colors uppercase">NEW IN</button>
                            <button className="hover:text-gray-900 transition-colors uppercase">POPULAR</button>
                        </div>
                    </div>
                    <a href="#" className="text-gray-500 hover:text-gray-900 text-[14px] font-medium mt-4 md:mt-0 transition-colors">
                        View All
                    </a>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
                    
                    {/* Navigation Arrows */}
                    <button className="absolute -left-10 top-1/2 -translate-y-1/2 w-10 h-[70px] bg-[#EEF1F5] flex items-center justify-center rounded-r-xl z-10 hover:bg-gray-200 transition-colors text-gray-400 hidden xl:flex">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>

                    <button className="absolute -right-10 top-1/2 -translate-y-1/2 w-10 h-[70px] bg-[#EEF1F5] flex items-center justify-center rounded-l-xl z-10 hover:bg-gray-200 transition-colors text-gray-400 hidden xl:flex">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>

                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BestSeller;
