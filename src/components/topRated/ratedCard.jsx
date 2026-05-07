import PropTypes from 'prop-types';
import { StarIcon, HeartIcon, EyeIcon, ShoppingBagIcon } from '@phosphor-icons/react';
import TitleComponent from '../titleComponent/titleComponent';

const RatedCard = ({ product }) => {
    return (
        <div className="group relative bg-white border border-[#e5e7eb] flex flex-col p-3 duration-500 hover:shadow-2 hover:border-transparent overflow-hidden h-full">
            {/* Bestseller Badge */}
            {product.isBestseller && (
                <span className="absolute top-0 left-0 z-10 px-3 py-1.5 bg-dark text-white text-[9px] font-semibold uppercase tracking-widest">
                    BESTSELLER
                </span>
            )}

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

            {/* Image Area */}
            <div className="relative aspect-square bg-[#f5f5f5] mb-5 flex items-center justify-center overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-[80%] h-auto object-contain drop-shadow-xl duration-700 group-hover:scale-105"
                />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-2 mt-auto">
                <TitleComponent type="h6" className="text-dark group-hover:text-primary duration-300 line-clamp-2 font-bold mb-2.5">
                    {product.name}
                </TitleComponent>

                <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon
                                key={i}
                                size={14}
                                weight={i < Math.floor(product.rating) ? "fill" : "regular"}
                                className="text-primary"
                            />
                        ))}
                    </div>
                    <span className="text-sm font-black text-dark">{product.rating.toFixed(1)}</span>
                </div>

                <div className="pt-3 mt-1 border-t border-dark/5">
                    <span className="text-lg font-black text-dark">${product.price.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

RatedCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        price: PropTypes.number,
        rating: PropTypes.number,
        image: PropTypes.string,
        isBestseller: PropTypes.bool
    }).isRequired
};

export default RatedCard;
