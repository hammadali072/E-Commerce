import { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
    StarIcon,
    ShoppingCartIcon,
    HeartIcon,
    MinusIcon,
    PlusIcon
} from '@phosphor-icons/react';

import ThemeButton from '../themeButton/themeButton';
import TitleComponent from '../titleComponent/titleComponent';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const ProductInfo = ({ product }) => {
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [sizeError, setSizeError] = useState(false);

    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const wishlisted = isInWishlist(product.id);

    const discount = product.oldPrice
        ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
        : 0;

    const stock = product.stock !== undefined ? product.stock : 20;
    const isOutOfStock = stock === 0;

    const handleAddToCart = () => {
        if (!selectedSize && product.sizes?.length > 0) {
            setSizeError(true);
            setTimeout(() => setSizeError(false), 2000);
            return;
        }
        addToCart({
            ...product,
            quantity,
            selectedSize,
            selectedColor
        });
    };

    const handleWishlistToggle = () => {
        wishlisted ? removeFromWishlist(product.id) : addToWishlist(product);
    };

    return (
        <div className="w-full flex flex-col items-start">
            <nav className="flex flex-wrap items-center gap-1.5 text-dark/40 text-xs uppercase tracking-widest mb-3 md:mb-4">
                <span>Home</span>
                <span>/</span>
                <span>{product.category}</span>
                <span>/</span>
                <span className="text-dark/60 font-semibold">{product.subCategory}</span>
            </nav>

            <TitleComponent type="h1" className="text-dark font-bold mb-3 md:mb-4 leading-tight">{product.name}</TitleComponent>

            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-5 md:mb-8">
                <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon
                                key={i}
                                size={15}
                                weight={i < Math.floor(product.rating) ? 'fill' : 'regular'}
                                className="text-amber"
                            />
                        ))}
                    </div>
                    <span className="text-xs md:text-sm font-semibold text-dark ml-1">{product.rating}</span>
                </div>
                <span className="text-xs md:text-sm text-dark/40 font-medium">({product.reviewCount} reviews)</span>
                {product.rating >= 4.5 && (
                    <span className="px-2 md:px-3 py-1 bg-amber/10 text-amber text-xs font-semibold uppercase tracking-widest">
                        Top Rated
                    </span>
                )}
            </div>

            <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-8">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark tracking-tight">
                    ${product.price.toFixed(2)}
                </span>
                {product.oldPrice && (
                    <div className="flex items-center gap-3">
                        <span className="text-base md:text-lg text-dark/30 line-through font-medium">
                            ${product.oldPrice.toFixed(2)}
                        </span>
                        <span className="px-3 py-1 bg-success-bg text-success-text text-xs font-semibold">
                            -{discount}% OFF
                        </span>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2 mb-8">
                {(() => {
                    if (stock === 0) {
                        return (
                            <>
                                <div className="size-2 rounded-full bg-red-500" />
                                <span className="text-[13px] md:text-sm font-medium text-red-500">Out of Stock</span>
                            </>
                        );
                    } else if (stock > 0 && stock <= 5) {
                        return (
                            <>
                                <div className="size-2 rounded-full bg-amber" />
                                <span className="text-[13px] md:text-sm font-semibold text-amber">Only {stock} Left</span>
                                <span className="text-xs text-dark/30 ml-1 font-medium">Order soon</span>
                            </>
                        );
                    } else {
                        return (
                            <>
                                <div className="size-2 rounded-full bg-green-500" />
                                <span className="text-[13px] md:text-sm font-semibold text-green-600">In Stock</span>
                                <span className="text-xs text-dark/30 ml-1 font-medium">Ready to ship in 24hrs</span>
                            </>
                        );
                    }
                })()}
            </div>

            <div className="w-full flex flex-col gap-6 md:gap-8 mb-8 md:mb-10">
                <div className="flex flex-col gap-2 md:gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-xs md:text-sm font-semibold text-dark uppercase tracking-widest">Color:</span>
                        <span className="text-xs md:text-sm text-dark/40 capitalize">{selectedColor}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                        {product.colors?.map((color) => (
                            <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={clsx(
                                    "size-7 md:size-8 flex items-center justify-center border-2 duration-300",
                                    selectedColor === color ? 'border-amber p-0.5' : 'border-transparent'
                                )}
                            >
                                <div
                                    className="size-full border border-dark/5"
                                    style={{ backgroundColor: color === 'white' ? '#fff' : color === 'navy' ? '#000080' : color }}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-2 md:gap-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs md:text-sm font-semibold text-dark uppercase tracking-widest">
                            Size ({product.sizeType === 'shoe' ? 'EU' : product.sizeType === 'waist' ? 'Inches' : 'Alpha'}):
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {product.sizes?.map((size) => (
                            <button
                                key={size}
                                onClick={() => {
                                    setSelectedSize(size);
                                    setSizeError(false);
                                }}
                                className={clsx(
                                    "h-9 md:h-11 min-w-[2.75rem] md:min-w-[3.5rem] px-3 md:px-4 flex items-center justify-center text-xs md:text-sm font-bold border duration-300",
                                    selectedSize === size
                                        ? 'bg-dark text-white border-dark'
                                        : 'bg-white text-dark/60 border-gray-200 hover:border-dark',
                                    sizeError && !selectedSize && "border-red-500 text-red-500"
                                )}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className={clsx(
                "w-full flex flex-col gap-3 md:gap-4 mb-6 md:mb-10",
                isOutOfStock && "opacity-50 pointer-events-none"
            )}>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <div className="flex items-center border border-gray-200 h-11 md:h-14 bg-white self-start sm:self-auto">
                        <button
                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            disabled={isOutOfStock}
                            className="size-11 md:size-14 flex items-center justify-center text-dark/40 hover:text-amber duration-300 disabled:cursor-not-allowed"
                        >
                            <MinusIcon size={14} weight="bold" />
                        </button>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                            disabled={isOutOfStock}
                            className="w-10 md:w-12 text-center bg-transparent border-none focus:ring-0 font-semibold text-dark text-sm disabled:cursor-not-allowed"
                        />
                        <button
                            onClick={() => setQuantity(q => q + 1)}
                            disabled={isOutOfStock}
                            className="size-11 md:size-14 flex items-center justify-center text-dark/40 hover:text-amber duration-300 disabled:cursor-not-allowed"
                        >
                            <PlusIcon size={14} weight="bold" />
                        </button>
                    </div>

                    <ThemeButton
                        variant="dark"
                        disabled={isOutOfStock}
                        onClick={handleAddToCart}
                        className={clsx(
                            "flex-1 h-11 md:h-14 text-xs md:text-sm tracking-[0.15em] md:tracking-[0.2em] font-semibold uppercase disabled:opacity-50 disabled:cursor-not-allowed",
                            sizeError && "animate-shake"
                        )}
                        icon={<ShoppingCartIcon size={18} weight="bold" />}
                    >
                        {sizeError ? "Select Size First" : "Add to Cart"}
                    </ThemeButton>
                </div>

                <ThemeButton
                    variant="outline"
                    disabled={isOutOfStock}
                    onClick={handleWishlistToggle}
                    className={clsx(
                        "w-full h-11 md:h-14 text-xs md:text-sm tracking-[0.15em] md:tracking-[0.2em] font-semibold uppercase border-2",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        wishlisted && "bg-amber/5 border-amber text-amber"
                    )}
                    icon={<HeartIcon size={18} weight={wishlisted ? "fill" : "bold"} />}
                >
                    {wishlisted ? "In Wishlist" : "Add to Wishlist"}
                </ThemeButton>
            </div>
        </div>
    );
};

ProductInfo.propTypes = {
    product: PropTypes.shape({
        name: PropTypes.string,
        category: PropTypes.string,
        subCategory: PropTypes.string,
        price: PropTypes.number,
        oldPrice: PropTypes.number,
        rating: PropTypes.number,
        reviewCount: PropTypes.number,
        colors: PropTypes.array,
        sizes: PropTypes.array,
        sizeType: PropTypes.string
    }).isRequired
};

export default ProductInfo;
