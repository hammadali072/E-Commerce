import PropTypes from 'prop-types';
import { StarIcon, HeartIcon, EyeIcon, ShoppingBagIcon } from '@phosphor-icons/react';
import TitleComponent from '../titleComponent/titleComponent';

const SaleCard = ({ product }) => {
    return (
        <div className="group relative bg-white border border-[#e5e7eb] flex flex-col p-3 md:p-4 duration-500 hover:shadow-2 hover:border-transparent overflow-hidden h-full">
            {/* Sale Badge */}
            <span className="absolute top-0 left-0 z-10 px-4 py-2 bg-primary text-dark text-[10px] font-semibold uppercase tracking-widest">
                SALE
            </span>

            {/* Action Icons */}
            <div className="absolute top-3 right-3 md:top-4 md:right-4 z-20 flex flex-col translate-x-4 opacity-0 border border-dark/5 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
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

            {/* Image Stage */}
            <div className="relative bg-[#f8f8f8] aspect-square mb-6 flex items-center justify-center overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-[85%] h-auto object-contain drop-shadow-xl duration-700 group-hover:scale-110"
                />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-2 mt-auto">
                <TitleComponent type="h5" className="text-dark group-hover:text-primary duration-300 truncate font-bold text-base md:text-lg">
                    {product.name}
                </TitleComponent>

                <div className="flex items-center gap-1 mb-2">
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon
                                key={i}
                                size={14}
                                weight={i < Math.floor(product.rating || 5) ? "fill" : "regular"}
                                className="text-primary"
                            />
                        ))}
                    </div>
                    <span className="text-[10px] text-dark-40 font-bold ml-1">({product.rating || "5.0"})</span>
                </div>

                <div className="flex items-baseline gap-3 pt-4 border-t border-dark/5">
                    <span className="text-xl font-black text-dark">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-dark-40 line-through font-bold">${product.oldPrice.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

SaleCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        price: PropTypes.number,
        oldPrice: PropTypes.number,
        image: PropTypes.string,
        rating: PropTypes.number
    }).isRequired
};

export default SaleCard;
