import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import {
    ShoppingBagIcon,
    StarIcon,
    ShoppingCartIcon,
    TrashIcon,
    XIcon
} from '@phosphor-icons/react';
import 'swiper/css';

import InnerHero from '../components/innerHero/innerHero';
import TitleComponent from '../components/titleComponent/titleComponent';
import SectionTitle from '../components/sectionTitle/sectionTitle';
import ProductCard from '../components/productCard/productCard';
import ThemeButton from '../components/themeButton/themeButton';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { slugify } from '../utils/slugify';

import { AllProducts } from '../Data';

const WishlistPage = () => {
    const { items, clearWishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const recommendedProducts = useMemo(() => {
        return AllProducts
            .filter(product => !items.some(item => item.id === product.id))
            .slice(0, 8);
    }, [items]);

    // Helper to render stock indicator (matching ProductInfo logic)
    const renderStockIndicator = (product) => {
        const stock = product.stock !== undefined ? product.stock : 20;
        if (stock === 0) {
            return (
                <div className="flex items-center gap-1.5 mt-1">
                    <div className="size-1.5 rounded-full bg-red-500" />
                    <span className="text-[10px] font-medium text-red-500">Out of Stock</span>
                </div>
            );
        } else if (stock > 0 && stock <= 5) {
            return (
                <div className="flex items-center gap-1.5 mt-1">
                    <div className="size-1.5 rounded-full bg-amber" />
                    <span className="text-[10px] font-bold text-amber">Only {stock} Left</span>
                </div>
            );
        } else {
            return (
                <div className="flex items-center gap-1.5 mt-1">
                    <div className="size-1.5 rounded-full bg-green-500" />
                    <span className="text-[10px] font-bold text-green-600">In Stock</span>
                </div>
            );
        }
    };

    return (
        <>
            <InnerHero
                title="My Wishlist"
                subtitle="YOUR SAVED ITEMS"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: 'Wishlist', active: true }
                ]}
            />

            {items.length > 0 ? (
                <section className="py-12 md:py-20 lg:py-24 bg-white">
                    <div className="container">
                        {/* Wishlist Toolbar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 md:mb-12 gap-4 border-b border-gray-100 pb-6">
                            <TitleComponent size="base" className="text-dark/40 font-medium !mb-0">
                                {items.length} {items.length === 1 ? 'item' : 'items'} saved
                            </TitleComponent>
                            <ThemeButton
                                variant="outline"
                                onClick={clearWishlist}
                                className="px-6 group w-full sm:w-auto"
                                icon="TrashIcon"
                                iconPosition="left"
                            >
                                Clear Wishlist
                            </ThemeButton>
                        </div>

                        {/* Desktop Table Layout */}
                        <div className="hidden lg:block w-full overflow-hidden mb-12 md:mb-20">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-table-header">
                                        <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-dark/40">Product</th>
                                        <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-dark/40">Details</th>
                                        <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-dark/40">Unit Price</th>
                                        <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-dark/40">Rating</th>
                                        <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-dark/40 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => {
                                        const isOutOfStock = (item.stock !== undefined ? item.stock : 20) === 0;

                                        return (
                                            <tr key={item.id} className="border-b border-gray-100 hover:bg-row-hover duration-300">
                                                <td className="p-4 md:p-6">
                                                    <div className="size-20 bg-card-lighter flex items-center justify-center overflow-hidden">
                                                        <img src={item.image} alt={item.name} className="size-[85%] object-contain" />
                                                    </div>
                                                </td>
                                                <td className="p-4 md:p-6">
                                                    <div className="flex flex-col gap-1">
                                                        <Link to={`/product/${slugify(item.name)}`}>
                                                            <TitleComponent type="h4" className="text-dark hover:text-amber duration-300 font-bold font-playfairDisplay leading-tight mb-1">
                                                                {item.name}
                                                            </TitleComponent>
                                                        </Link>
                                                        {renderStockIndicator(item)}
                                                    </div>
                                                </td>
                                                <td className="p-4 md:p-6">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-lg font-black text-dark">${item.price.toFixed(2)}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 md:p-6">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-1.5">
                                                            <StarIcon size={18} weight="fill" className="text-amber" />
                                                            <span className="text-base font-semibold text-dark">{item.rating.toFixed(1)}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 md:p-6">
                                                    <div className="flex justify-center items-center gap-3">
                                                        <ThemeButton
                                                            variant="dark"
                                                            className="text-sm tracking-widest uppercase px-6"
                                                            disabled={isOutOfStock}
                                                            onClick={() => addToCart(item)}
                                                            icon={<ShoppingCartIcon size={14} weight="bold" />}
                                                        >
                                                            Add to Cart
                                                        </ThemeButton>
                                                        <button
                                                            onClick={() => removeFromWishlist(item.id)}
                                                            className="size-10 border border-gray-200 flex items-center justify-center text-dark/40 hover:border-red-300 hover:text-red-400 hover:bg-red-50 duration-300 flex-shrink-0"
                                                        >
                                                            <XIcon size={18} weight="bold" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="lg:hidden flex flex-col gap-4 mb-12 md:mb-16">
                            {items.map((item) => {
                                const isOutOfStock = (item.stock !== undefined ? item.stock : 20) === 0;
                                return (
                                    <div key={item.id} className="border border-gray-100 p-4 md:p-6 bg-white flex flex-col gap-4">
                                        <div className="flex gap-4">
                                            <div className="size-20 md:size-24 bg-card-lighter flex-shrink-0 flex items-center justify-center">
                                                <img src={item.image} alt={item.name} className="size-[85%] object-contain" />
                                            </div>
                                            <div className="flex-1 flex flex-col min-w-0">
                                                <Link to={`/product/${slugify(item.name)}`}>
                                                    <TitleComponent type="h4" className="text-dark font-bold font-playfairDisplay leading-tight !mb-1 line-clamp-2 max-lg:text-xl">
                                                        {item.name}
                                                    </TitleComponent>
                                                </Link>
                                                <div className="flex flex-wrap items-center gap-3 mt-auto">
                                                    <span className="text-lg md:text-xl font-black text-dark">${item.price.toFixed(2)}</span>
                                                    <div className="flex items-center gap-1.5 ml-auto">
                                                        <StarIcon size={14} weight="fill" className="text-amber" />
                                                        <span className="text-sm font-semibold text-dark/60">{item.rating.toFixed(1)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-gray-50">
                                            <ThemeButton
                                                variant="dark"
                                                className="w-full sm:flex-1 !py-3.5 text-xs tracking-widest uppercase"
                                                disabled={isOutOfStock}
                                                onClick={() => addToCart(item)}
                                                icon={<ShoppingCartIcon size={16} weight="bold" />}
                                            >
                                                Add to Cart
                                            </ThemeButton>
                                            <button
                                                onClick={() => removeFromWishlist(item.id)}
                                                className="w-full sm:w-14 h-12 border border-gray-200 flex items-center justify-center text-dark/40 flex-shrink-0 hover:bg-red-50 hover:text-red-400 duration-300"
                                            >
                                                <XIcon size={20} weight="bold" className="sm:size-5" />
                                                <span className="sm:hidden ml-2 font-bold uppercase text-[10px] tracking-widest">Remove Item</span>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="bg-off-white py-4 px-6 mb-12 md:mb-20 flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                            <ShoppingBagIcon size={16} className="text-dark/40 flex-shrink-0" />
                            <TitleComponent size="small" className="text-dark/40 !mb-0 leading-relaxed">
                                Tip: Click Add to Cart on any row to add it directly to your bag.
                            </TitleComponent>
                        </div>

                        <div className="flex justify-center mb-24 md:mb-32">
                            <Link to="/shop" className="w-full sm:w-auto">
                                <ThemeButton variant="dark" className="px-10 w-full sm:w-auto" icon="ArrowRightIcon">
                                    Continue Shopping
                                </ThemeButton>
                            </Link>
                        </div>

                        <div className="border-t border-gray-100 pt-16 md:pt-24 lg:pt-32">
                            <SectionTitle
                                title="You May Also Like"
                                headingLevel="h2"
                                className="mb-10 md:mb-16"
                            />

                            <Swiper
                                modules={[Autoplay]}
                                loop={true}
                                autoplay={{
                                    delay: 4500,
                                    pauseOnMouseEnter: true
                                }}
                                slidesPerView={1}
                                spaceBetween={20}
                                breakpoints={{
                                    0: { slidesPerView: 1, spaceBetween: 15 },
                                    480: { slidesPerView: 2, spaceBetween: 20 },
                                    768: { slidesPerView: 3, spaceBetween: 24 },
                                    1024: { slidesPerView: 4, spaceBetween: 30 }
                                }}
                            >
                                {recommendedProducts.map(product => (
                                    <SwiperSlide key={product.id} className="h-auto">
                                        <ProductCard product={product} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="py-16 md:py-32 lg:py-40">
                    <div className="container">
                        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-32">
                            <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-dark leading-[1.1] mb-4 md:mb-6 font-playfairDisplay">
                                    Your Wishlist Cart is <br className="hidden md:block" /> Empty.
                                </h2>
                                <p className="text-dark/40 text-base md:text-xl mb-8 md:mb-10 font-medium max-w-sm">
                                    You don't have any pending transaction.
                                </p>
                                <Link to="/" className="w-full sm:w-auto">
                                    <ThemeButton variant="primary" className="w-full sm:px-12 font-bold !py-4">
                                        Back to Home
                                    </ThemeButton>
                                </Link>
                            </div>

                            <div className="flex justify-center items-center order-1 lg:order-2">
                                <div className="relative w-full max-w-[280px] md:max-w-[450px] aspect-square">
                                    <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl animate-float">
                                        <path
                                            d="M250 450L215 418C90 305 10 232 10 143C10 70 67 13 140 13C181 13 220 32 250 62C280 32 319 13 360 13C433 13 490 70 490 143C490 232 410 305 285 418L250 450Z"
                                            fill="#111111"
                                        />
                                        <mask id="wavy-mask">
                                            <path d="M250 0H500V500H250C250 500 350 400 250 250C150 100 250 0 250 0Z" fill="white" />
                                        </mask>
                                        <path
                                            mask="url(#wavy-mask)"
                                            d="M250 450L215 418C90 305 10 232 10 143C10 70 67 13 140 13C181 13 220 32 250 62C280 32 319 13 360 13C433 13 490 70 490 143C490 232 410 305 285 418L250 450Z"
                                            fill="#ffbd2e"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default WishlistPage;
