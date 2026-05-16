import React from 'react';
import TitleComponent from '../../titleComponent/titleComponent';
import clsx from 'clsx';

const MOCK_PRODUCTS = [
    { name: 'Nike Air Max 2026', category: 'Footwear', sold: 452, revenue: '$81,360', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=100' },
    { name: 'Luxury Gold Watch', category: 'Accessories', sold: 320, revenue: '$40,160', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=100' },
    { name: 'Wireless Headphones', category: 'Electronics', sold: 285, revenue: '$19,665', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=100' },
    { name: 'Minimalist Backpack', category: 'Bags', sold: 210, revenue: '$16,800', img: 'https://images.unsplash.com/photo-1553062407-98eeb94c6a62?auto=format&fit=crop&q=80&w=100' },
    { name: 'Premium Denim Jeans', category: 'Clothing', sold: 195, revenue: '$15,405', img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=100' },
];

const TopSelling = () => {
    return (
        <div className="bg-white border border-grey-100/50 shadow-1 p-6 sm:p-8">
            <div className="mb-8">
                <TitleComponent type="h4" className="font-black text-dark">Top Selling</TitleComponent>
                <TitleComponent type="p" size="small-medium" className="text-dark/40 mt-1">Best performing products this month</TitleComponent>
            </div>

            <div className="flex flex-col">
                {MOCK_PRODUCTS.map((product, i) => (
                    <div key={i} className={clsx(
                        "flex items-center gap-3 sm:gap-4 py-3 sm:py-4 group cursor-pointer duration-300",
                        i !== MOCK_PRODUCTS.length - 1 && "border-b border-grey-100"
                    )}>
                        <div className="size-10 sm:size-12 lg:size-14 bg-gray-50 overflow-hidden flex-shrink-0">
                            <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 duration-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <TitleComponent size="small-bold" className="text-dark sm:text-base truncate group-hover:text-primary duration-300">
                                {product.name}
                            </TitleComponent>
                            <TitleComponent size="extra-small-medium" className="text-dark/40 sm:text-sm font-medium mt-1">
                                {product.category}
                            </TitleComponent>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <TitleComponent size="small-bold" className="text-dark">{product.revenue}</TitleComponent>
                            <TitleComponent size="extra-small-medium" className="text-dark/40 sm:text-sm mt-0.5">
                                {product.sold} Sold
                            </TitleComponent>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopSelling;
