import React from 'react';
import PropTypes from 'prop-types';
import { ArrowRightIcon } from '@phosphor-icons/react';

import TitleComponent from '../titleComponent/titleComponent';
import ThemeButton from '../themeButton/themeButton';

const PremiumCard = ({ product }) => {
    return (
        <div className="group relative flex flex-col bg-white border border-dark/5 p-6 duration-500 hover:shadow-xl hover:border-primary/20">
            <div className="relative overflow-hidden mb-8 bg-[#FBFBFB]">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto aspect-square object-contain duration-700 group-hover:scale-105"
                />
            </div>

            {/* Info Section */}
            <div className="flex flex-col items-center text-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-3">
                    Premium Collection
                </span>

                <TitleComponent type="h4" className="text-dark font-playfairDisplay text-2xl tracking-tight mb-4">
                    {product.name}
                </TitleComponent>

                <div className="flex items-center gap-2 mb-8">
                    <span className="text-dark font-black text-2xl tracking-tighter">
                        ${product.price.toFixed(2)}
                    </span>
                </div>

                <ThemeButton
                    variant="primary"
                    className="w-full bg-dark hover:bg-primary hover:text-dark py-4 text-xs tracking-[0.2em] uppercase"
                    icon={<ArrowRightIcon size={18} weight="bold" />}
                >
                    Shop Now
                </ThemeButton>
            </div>
        </div>
    );
};

PremiumCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string
    }).isRequired
};

export default PremiumCard;
