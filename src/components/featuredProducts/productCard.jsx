import PropTypes from 'prop-types';
import { ShoppingBagIcon, HeartIcon, EyeIcon, StarIcon } from '@phosphor-icons/react';

import TitleComponent from '../titleComponent/titleComponent';

const ProductCard = ({ product }) => {
    return (
        <div className="group relative bg-white border border-[#e5e7eb] flex flex-col p-3 md:p-4 duration-500 hover:shadow-2 hover:border-transparent overflow-hidden h-full">
            {product.badge && (
                <span className="absolute top-0 left-0 z-10 px-3 py-1.5 md:px-4 md:py-2 bg-dark text-white text-[9px] md:text-[10px] font-bold uppercase tracking-wider">
                    {product.badge}
                </span>
            )}

            <div className="absolute top-3 right-3 md:top-4 md:right-4 z-20 flex flex-col translate-x-4 opacity-0 border border-dark/5 group-hover:translate-x-0 group-hover:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:translate-x-4 lg:group-hover:translate-x-0 transition-all duration-300 md:opacity-100 md:translate-x-0 lg:translate-x-4 lg:opacity-0">
                <button className="p-3 md:p-4 bg-white text-dark/40 border-b border-dark/5 hover:bg-primary hover:text-dark duration-300">
                    <HeartIcon size={18} weight="bold" />
                </button>
                <button className="p-3 md:p-4 bg-white text-dark/40 border-b border-dark/5 hover:bg-primary hover:text-dark duration-300">
                    <EyeIcon size={18} weight="bold" />
                </button>
                <button className="p-3 md:p-4 bg-white text-dark/40 hover:bg-primary hover:text-dark duration-300">
                    <ShoppingBagIcon size={18} weight="bold" />
                </button>
            </div>

            <div className="relative aspect-square bg-[#f3f3f3] mb-4 md:mb-6 flex items-center justify-center overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-[85%] h-auto object-contain drop-shadow-xl duration-700 group-hover:scale-105"
                />
            </div>

            <div className="flex flex-col gap-2 relative z-10 mt-auto">
                <TitleComponent type="h5" className="text-dark group-hover:text-primary duration-300 truncate font-bold text-sm md:text-base">
                    {product.name}
                </TitleComponent>
                <div className="flex items-center gap-1 mb-1 md:mb-2">
                    {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} size={14} weight={i < Math.floor(product.rating) ? "fill" : "regular"} className="text-primary" />
                    ))}
                    <span className="text-[9px] md:text-[10px] text-dark-40 font-bold ml-1">({product.rating})</span>
                </div>

                <div className="flex items-baseline gap-2 md:gap-3 mt-1 pt-3 md:pt-4 border-t border-dark/5">
                    <span className="text-lg md:text-xl font-black text-dark">${product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                        <span className="text-[10px] md:text-xs text-dark-40 line-through font-bold tracking-tighter">${product.oldPrice.toFixed(2)}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        price: PropTypes.number,
        oldPrice: PropTypes.number,
        image: PropTypes.string,
        rating: PropTypes.number,
        badge: PropTypes.string
    }).isRequired
};

export default ProductCard;