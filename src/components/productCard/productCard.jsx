import { Link } from 'react-router-dom';
import { StarIcon, HeartIcon, EyeIcon, ShoppingBagIcon } from '@phosphor-icons/react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import TitleComponent from '../titleComponent/titleComponent';
import ThemeButton from '../themeButton/themeButton';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { slugify } from '../../utils/slugify';

const ProductCard = ({ product, layout = 'grid', variant = 'default' }) => {
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const { addToCart, isInCart } = useCart();
    const wishlisted = isInWishlist(product.id);
    const inCart = isInCart(product.id);

    const handleWishlistToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        wishlisted ? removeFromWishlist(product.id) : addToWishlist(product);
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const stock = product.stock !== undefined ? product.stock : 20;
        if (stock > 0) addToCart(product);
    };

    const badgeText = product.badge || (product.isBestseller ? "Bestseller" : null);
    const isPromo = badgeText?.toLowerCase() === 'sale' || badgeText?.toLowerCase() === 'hot' || badgeText?.toLowerCase() === 'hot sale';

    if (variant === 'premium') {
        return (
            <Link to={`/product/${slugify(product.name)}`} className="relative flex flex-col bg-white border border-dark/5 p-6 duration-500 group hover:shadow-xl hover:border-primary/20">
                <div className="relative overflow-hidden mb-8 bg-off-white">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="size-full aspect-square object-contain duration-700 group-hover:scale-105"
                    />
                </div>

                <div className="flex flex-col items-center text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-3">
                        Premium Collection
                    </span>

                    <TitleComponent type="h4" className="text-dark text-2xl tracking-tight mb-4">
                        {product.name}
                    </TitleComponent>

                    <div className="flex items-center gap-2 mb-8">
                        <span className="text-dark font-black text-2xl tracking-tighter">
                            ${product.price.toFixed(2)}
                        </span>
                    </div>

                    <ThemeButton
                        variant="dark"
                        onClick={handleAddToCart}
                        disabled={(product.stock !== undefined ? product.stock : 20) === 0}
                        className="w-full bg-dark hover:bg-primary hover:text-dark py-4 text-xs tracking-[0.2em] uppercase"
                    >
                        {(product.stock !== undefined ? product.stock : 20) === 0 ? "Out of Stock" : "Add to Cart"}
                    </ThemeButton>
                </div>
            </Link>
        );
    }

    if (layout === 'list') {
        return (
            <div className="group/card relative bg-white border border-gray-100 flex flex-col sm:flex-row p-4 md:p-6 duration-500 hover:shadow-2 hover:border-transparent overflow-hidden">
                <Link to={`/product/${slugify(product.name)}`} className="relative w-full sm:size-40 md:size-48 lg:size-56 bg-card-lighter flex-shrink-0 flex items-center justify-center overflow-hidden aspect-square sm:aspect-auto">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="size-[80%] object-contain drop-shadow-xl duration-700 group-hover/card:scale-105"
                    />
                    {badgeText && (
                        <span className="absolute top-0 left-0 z-10 px-3 py-1.5 bg-dark text-white text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.2em]">
                            {badgeText}
                        </span>
                    )}
                </Link>

                <div className="flex flex-col flex-1 px-0 sm:px-6 md:px-8 py-4 sm:py-2">
                    <Link to={`/product/${slugify(product.name)}`} className="text-dark group-hover/card:text-primary duration-300 font-bold mb-2 text-lg md:text-xl block">
                        <TitleComponent type="h4" className="">
                            {product.name}
                        </TitleComponent>
                    </Link>

                    <div className="flex items-center gap-1.5 mb-3 md:mb-4">
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
                        <span className="text-xs text-dark/40 font-bold ml-1">
                            ({product.rating?.toFixed(1) || "5.0"})
                        </span>
                    </div>

                    <p className="text-dark/50 text-sm mb-6 line-clamp-2 sm:line-clamp-3 max-w-xl hidden sm:block">
                        Experience premium comfort and style with our latest collection. This product features high-quality materials and contemporary design.
                    </p>

                    <div className="mt-auto flex flex-col xs:flex-row items-start xs:items-center justify-between gap-4">
                        <div className="flex items-baseline gap-3">
                            <span className="text-2xl md:text-3xl font-semibold text-dark2">
                                ${product.price.toFixed(2)}
                            </span>
                            {product.oldPrice && isPromo && (
                                <span className="text-sm md:text-base text-dark/40 line-through font-bold">
                                    ${product.oldPrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        <div className="flex gap-2 w-full xs:w-auto">
                            <button
                                onClick={handleWishlistToggle}
                                className="size-11 flex-shrink-0 flex items-center justify-center bg-gray-50 text-dark/40 hover:bg-primary hover:text-dark duration-300 border border-gray-100"
                            >
                                <HeartIcon
                                    size={20}
                                    weight="bold"
                                    className={clsx(wishlisted ? "text-amber" : "text-dark/40")}
                                />
                            </button>
                            <button className="size-11 flex-shrink-0 flex items-center justify-center bg-gray-50 text-dark/40 hover:bg-primary hover:text-dark duration-300 border border-gray-100">
                                <EyeIcon size={20} weight="bold" />
                            </button>
                            <ThemeButton 
                                variant="primary"
                                onClick={handleAddToCart}
                                disabled={(product.stock !== undefined ? product.stock : 20) === 0}
                            >
                                Add to Cart
                            </ThemeButton>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="group relative bg-white border border-grey-100 flex flex-col p-3 md:p-4 duration-500 hover:shadow-2 hover:border-transparent overflow-hidden h-full">
            {/* Merchandising Badge */}
            {badgeText && (
                <span className="absolute top-0 left-0 z-10 px-3 py-1.5 bg-dark text-white text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.2em]">
                    {badgeText}
                </span>
            )}

            {/* Action Icons Toolbar */}
            <div className="absolute top-3 right-3 md:top-4 md:right-4 z-20 flex flex-col translate-x-4 opacity-0 border border-dark/5 group-hover:translate-x-0 group-hover:opacity-100 duration-300">
                <button
                    onClick={handleWishlistToggle}
                    className="size-10 md:size-12 flex items-center justify-center bg-white text-dark/40 border-b border-dark/5 hover:bg-primary hover:text-dark duration-300"
                >
                    <HeartIcon
                        size={18}
                        weight="bold"
                        className={clsx(wishlisted ? "text-amber" : "text-dark/40")}
                    />
                </button>
                <button 
                    onClick={handleAddToCart}
                    className={clsx(
                        "size-10 md:size-12 flex items-center justify-center bg-white border-dark/5 hover:bg-primary hover:text-dark duration-300",
                        inCart ? "text-amber" : "text-dark/40"
                    )}
                >
                    <ShoppingBagIcon size={18} weight="bold" />
                </button>
            </div>

            {/* Image Area — navigates to product detail */}
            <Link to={`/product/${slugify(product.name)}`} className="relative aspect-square bg-card-lighter mb-4 md:mb-6 flex items-center justify-center overflow-hidden block">
                <img
                    src={product.image}
                    alt={product.name}
                    className="size-[85%] object-contain drop-shadow-xl duration-700 group-hover:scale-105"
                />
            </Link>

            {/* Product Information — navigates to product detail */}
            <Link to={`/product/${slugify(product.name)}`} className="flex flex-col gap-2 mt-auto">
                <TitleComponent type="h6" className="text-dark group-hover:text-primary duration-300 line-clamp-2 font-bold mb-1">
                    {product.name}
                </TitleComponent>

                {/* Rating */}
                <div className="flex items-center gap-1.5">
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
                    <span className="text-[10px] md:text-xs text-dark/40 font-bold ml-1">
                        ({product.rating?.toFixed(1) || "5.0"})
                    </span>
                </div>

                {/* Price Area */}
                <div className="pt-3 mt-1 border-t border-dark/5 flex items-baseline gap-2 md:gap-3">
                    <span className="text-lg md:text-xl font-semibold text-dark">
                        ${product.price.toFixed(2)}
                    </span>
                    {product.oldPrice && isPromo && (
                        <span className="text-[10px] md:text-xs text-dark/40 line-through font-bold">
                            ${product.oldPrice.toFixed(2)}
                        </span>
                    )}
                </div>
            </Link>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
        price: PropTypes.number,
        oldPrice: PropTypes.number,
        image: PropTypes.string,
        rating: PropTypes.number,
        badge: PropTypes.string,
        isBestseller: PropTypes.bool
    }).isRequired,
    layout: PropTypes.oneOf(['grid', 'list']),
    variant: PropTypes.oneOf(['default', 'premium'])
};

export default ProductCard;
