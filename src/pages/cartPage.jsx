import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import {
    TrashIcon,
    MinusIcon,
    PlusIcon,
    HeartIcon,
    XIcon,
    ArrowRightIcon,
    LockIcon,
    TruckIcon,
    ArrowUUpLeftIcon,
    ShoppingCartIcon
} from '@phosphor-icons/react';
import clsx from 'clsx';
import 'swiper/css';

import InnerHero from '../components/innerHero/innerHero';
import TitleComponent from '../components/titleComponent/titleComponent';
import SectionTitle from '../components/sectionTitle/sectionTitle';
import ProductCard from '../components/productCard/productCard';
import ThemeButton from '../components/themeButton/themeButton';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { slugify } from '../utils/slugify';

import { AllProducts } from '../Data';

const CartPage = () => {
    const {
        items,
        removeFromCart,
        updateQuantity,
        clearCart,
        getSubtotal,
        getDiscount,
        getTotal,
        couponCode,
        couponDiscount,
        applyCoupon,
        removeCoupon,
        shippingMethod,
        setShippingMethod,
        shippingFee
    } = useCart();

    const { addToWishlist, isInWishlist } = useWishlist();
    const [couponInput, setCouponInput] = useState('');
    const [couponError, setCouponError] = useState('');
    const [couponSuccess, setCouponSuccess] = useState('');

    const recommendedProducts = useMemo(() => {
        return AllProducts
            .filter(product => !items.some(item => item.id === product.id))
            .slice(0, 8);
    }, [items]);

    const handleApplyCoupon = () => {
        setCouponError('');
        setCouponSuccess('');
        if (!couponInput.trim()) return;

        const result = applyCoupon(couponInput);
        if (result.error) {
            setCouponError(result.error);
        } else {
            setCouponSuccess(`Coupon applied! You saved $${result.discount.toFixed(2)}`);
            setCouponInput('');
        }
    };

    const handleMoveToWishlist = (item) => {
        addToWishlist(item);
        removeFromCart(item.id);
    };

    return (
        <>
            <InnerHero
                title="Shopping Cart"
                subtitle="YOUR SELECTIONS"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: 'Cart', active: true }
                ]}
            />

            {items.length > 0 ? (
                <section className="py-12 md:py-20 lg:py-24">
                    <div className="container">
                        <div className="flex flex-col xl:flex-row gap-10 lg:gap-12 xl:gap-16">
                            {/* Left Column — Cart Items */}
                            <div className="xl:w-2/3">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-gray-100 gap-4">
                                    <TitleComponent type="h3" className="text-dark font-bold !mb-0 text-xl md:text-2xl">
                                        Cart Items ({items.length})
                                    </TitleComponent>
                                    <ThemeButton
                                        variant="outline"
                                        onClick={clearCart}
                                        className="px-5 !py-2.5 text-xs uppercase tracking-widest w-full sm:w-auto"
                                        icon={<TrashIcon size={14} weight="bold" />}
                                    >
                                        Clear Cart
                                    </ThemeButton>
                                </div>

                                {/* Desktop Table */}
                                <div className="hidden md:block overflow-hidden mb-12">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-table-header">
                                                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-widest text-dark/40">Product</th>
                                                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-widest text-dark/40">Details</th>
                                                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-widest text-dark/40 text-center">Quantity</th>
                                                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-widest text-dark/40">Price</th>
                                                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-widest text-dark/40 text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.map((item) => {
                                                const linePrice = item.price * item.quantity;
                                                const savings = item.oldPrice ? (item.oldPrice - item.price) * item.quantity : 0;
                                                const stock = item.stock !== undefined ? item.stock : 20;

                                                return (
                                                    <tr key={item.id} className="border-b border-gray-100 hover:bg-row-hover duration-300">
                                                        <td className="p-4">
                                                            <Link to={`/product/${slugify(item.name)}`}>
                                                                <div className="size-20 lg:size-[80px] bg-card-lighter flex items-center justify-center overflow-hidden">
                                                                    <img src={item.image} alt={item.name} className="size-[85%] object-contain" />
                                                                </div>
                                                            </Link>
                                                        </td>
                                                        <td className="p-4">
                                                            <div className="flex flex-col gap-1.5 max-w-[200px] xl:max-w-[280px]">
                                                                <Link to={`/product/${slugify(item.name)}`}>
                                                                    <TitleComponent type="h4" className="text-dark hover:text-amber duration-300 font-semibold font-playfairDisplay leading-tight !mb-0 text-sm md:text-base lg:text-lg">
                                                                        {item.name}
                                                                    </TitleComponent>
                                                                </Link>
                                                                <span className="inline-block self-start px-2 py-0.5 bg-amber/10 text-amber text-xs uppercase tracking-widest font-semibold">
                                                                    {item.subCategory}
                                                                </span>
                                                                {(item.selectedSize || item.selectedColor) && (
                                                                    <div className="flex items-center gap-3 mt-1">
                                                                        {item.selectedSize && <span className="text-[10px] text-dark/40 font-semibold uppercase tracking-wider">Size: {item.selectedSize}</span>}
                                                                        {item.selectedColor && (
                                                                            <div className="flex items-center gap-1.5">
                                                                                <span className="text-[10px] text-dark/40 font-semibold uppercase tracking-wider">Color:</span>
                                                                                <div className="size-2.5 rounded-full border border-dark/10" style={{ backgroundColor: item.selectedColor }} />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="p-4">
                                                            <div className="flex items-center border border-gray-200 h-10 w-fit mx-auto bg-white">
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                    disabled={item.quantity <= 1}
                                                                    className="size-10 flex items-center justify-center text-dark/40 hover:text-amber duration-300 disabled:opacity-20"
                                                                >
                                                                    <MinusIcon size={12} weight="bold" />
                                                                </button>
                                                                <span className="w-10 text-center font-semibold text-dark text-sm">{item.quantity}</span>
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                    disabled={item.quantity >= stock}
                                                                    className="size-10 flex items-center justify-center text-dark/40 hover:text-amber duration-300 disabled:opacity-20"
                                                                >
                                                                    <PlusIcon size={12} weight="bold" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="p-4">
                                                            <div className="flex flex-col gap-0.5 min-w-[100px]">
                                                                <span className="text-[10px] text-dark/40 font-semibold uppercase tracking-wider">${item.price.toFixed(2)} ea</span>
                                                                <span className="text-lg lg:text-xl font-bold text-dark tracking-tight">${linePrice.toFixed(2)}</span>
                                                                {savings > 0 && <span className="text-[10px] text-green-600 font-semibold uppercase tracking-wider">Save ${savings.toFixed(2)}</span>}
                                                            </div>
                                                        </td>
                                                        <td className="p-4">
                                                            <div className="flex items-center justify-center gap-3">
                                                                <button
                                                                    onClick={() => handleMoveToWishlist(item)}
                                                                    className={clsx(
                                                                        "size-10 border border-gray-200 flex items-center justify-center duration-300 hover:bg-amber/10 hover:text-amber",
                                                                        isInWishlist(item.id) ? "text-amber border-amber/30 bg-amber/5" : "text-dark/40"
                                                                    )}
                                                                    title={isInWishlist(item.id) ? "In Wishlist" : "Move to Wishlist"}
                                                                >
                                                                    <HeartIcon size={18} weight={isInWishlist(item.id) ? "fill" : "bold"} />
                                                                </button>
                                                                <button
                                                                    onClick={() => removeFromCart(item.id)}
                                                                    className="size-10 border border-gray-200 flex items-center justify-center text-dark/40 duration-300 hover:bg-red-50 hover:text-red-400 hover:border-red-300"
                                                                    title="Remove from Cart"
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

                                {/* Mobile Cards */}
                                <div className="md:hidden flex flex-col gap-4 mb-12">
                                    {items.map((item) => {
                                        const stock = item.stock !== undefined ? item.stock : 20;
                                        return (
                                            <div key={item.id} className="border border-gray-100 p-4 sm:p-6 bg-white flex flex-col gap-5">
                                                <div className="flex gap-4 sm:gap-6">
                                                    <Link to={`/product/${slugify(item.name)}`} className="size-20 sm:size-24 bg-card-lighter flex-shrink-0 flex items-center justify-center">
                                                        <img src={item.image} alt={item.name} className="size-[85%] object-contain" />
                                                    </Link>
                                                    <div className="flex-1 flex flex-col min-w-0">
                                                        <Link to={`/product/${slugify(item.name)}`}>
                                                            <TitleComponent type="h4" className="text-dark font-semibold font-playfairDisplay leading-tight !mb-1 text-base sm:text-lg line-clamp-2">
                                                                {item.name}
                                                            </TitleComponent>
                                                        </Link>
                                                        <span className="text-lg sm:text-xl font-bold text-dark mt-auto">${(item.price * item.quantity).toFixed(2)}</span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-gray-50">
                                                    <div className="flex items-center border border-gray-200 h-10 w-full sm:w-fit bg-white">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}
                                                            className="flex-1 sm:size-10 flex items-center justify-center text-dark/40"
                                                        >
                                                            <MinusIcon size={12} weight="bold" />
                                                        </button>
                                                        <span className="w-10 text-center font-semibold text-dark text-sm">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            disabled={item.quantity >= stock}
                                                            className="flex-1 sm:size-10 flex items-center justify-center text-dark/40"
                                                        >
                                                            <PlusIcon size={12} weight="bold" />
                                                        </button>
                                                    </div>

                                                    <div className="flex items-center gap-3 w-full sm:w-auto sm:ml-auto">
                                                        <button
                                                            onClick={() => handleMoveToWishlist(item)}
                                                            className={clsx(
                                                                "flex-1 sm:size-10 h-11 border border-gray-200 flex items-center justify-center rounded-sm",
                                                                isInWishlist(item.id) ? "text-amber bg-amber/5" : "text-dark/40"
                                                            )}
                                                        >
                                                            <HeartIcon size={20} weight={isInWishlist(item.id) ? "fill" : "bold"} />
                                                            <span className="sm:hidden ml-2 font-semibold uppercase text-xs tracking-widest">To Wishlist</span>
                                                        </button>
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="flex-1 sm:size-10 h-11 border border-gray-200 flex items-center justify-center text-dark/40"
                                                        >
                                                            <XIcon size={20} weight="bold" />
                                                            <span className="sm:hidden ml-2 font-semibold uppercase text-xs tracking-widest">Remove</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Right Column — Order Summary */}
                            <div className="xl:w-1/3">
                                <div className="lg:sticky lg:top-24 h-fit bg-white border border-gray-100 p-4 sm:p-6 md:p-8">
                                    <TitleComponent type="h4" className="text-dark font-bold font-playfairDisplay mb-5 md:mb-8 text-xl md:text-2xl">
                                        Order Summary
                                    </TitleComponent>

                                    <div className="flex flex-col gap-2 md:gap-3 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-gray-100">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm md:text-base text-dark/60 font-semibold uppercase tracking-wider">Subtotal</span>
                                            <span className="font-bold text-dark">${getSubtotal().toFixed(2)}</span>
                                        </div>
                                        {getDiscount() > 0 && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm md:text-base text-green-600 font-semibold uppercase tracking-wider">You Save</span>
                                                <span className="font-bold text-green-600">-${getDiscount().toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm md:text-base text-dark/60 font-semibold uppercase tracking-wider">Shipping</span>
                                            <span className="font-bold text-dark">${shippingFee.toFixed(2)}</span>
                                        </div>
                                        {couponCode && (
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-sm text-amber font-medium">Coupon ({couponCode})</span>
                                                    <button onClick={removeCoupon} className="text-amber hover:text-dark duration-300">
                                                        <XIcon size={14} weight="bold" />
                                                    </button>
                                                </div>
                                                <span className="font-bold text-amber">-${couponDiscount.toFixed(2)}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-6 md:mb-8">
                                        <TitleComponent size="small" className="text-dark/60 font-bold uppercase tracking-widest mb-3 md:mb-4">
                                            Delivery Speed
                                        </TitleComponent>
                                        <div className="flex flex-col gap-2">
                                            <label className={clsx(
                                                "flex items-center justify-between p-3 md:p-4 border cursor-pointer duration-300",
                                                shippingMethod === 'standard' ? "border-amber bg-amber/5" : "border-gray-100 hover:border-amber/30"
                                            )}>
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="radio"
                                                        className="sr-only"
                                                        checked={shippingMethod === 'standard'}
                                                        onChange={() => setShippingMethod('standard')}
                                                    />
                                                    <div className="size-4 border-2 border-gray-200 rounded-full flex items-center justify-center">
                                                        <div className={clsx("size-2 bg-amber rounded-full duration-300", shippingMethod === 'standard' ? "scale-100" : "scale-0")} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-semibold text-dark uppercase tracking-wider">Standard</span>
                                                        <span className="text-xs text-dark/40 font-medium">3-5 Business Days</span>
                                                    </div>
                                                </div>
                                                <span className="text-xs font-semibold text-dark">$5.00</span>
                                            </label>
                                            <label className={clsx(
                                                "flex items-center justify-between p-3 md:p-4 border cursor-pointer duration-300",
                                                shippingMethod === 'urgent' ? "border-amber bg-amber/5" : "border-gray-100 hover:border-amber/30"
                                            )}>
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="radio"
                                                        className="sr-only"
                                                        checked={shippingMethod === 'urgent'}
                                                        onChange={() => setShippingMethod('urgent')}
                                                    />
                                                    <div className="size-4 border-2 border-gray-200 rounded-full flex items-center justify-center">
                                                        <div className={clsx("size-2 bg-amber rounded-full duration-300", shippingMethod === 'urgent' ? "scale-100" : "scale-0")} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-semibold text-dark uppercase tracking-wider">Urgent</span>
                                                        <span className="text-xs text-dark/40 font-medium">1-2 Business Days</span>
                                                    </div>
                                                </div>
                                                <span className="text-xs font-semibold text-dark">$15.00</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="mb-6 md:mb-10">
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-dark text-base md:text-lg">Total</span>
                                            <span className="font-bold text-dark text-xl md:text-3xl tracking-tighter">${getTotal().toFixed(2)}</span>
                                        </div>
                                    </div>

                                    {/* Coupon Block */}
                                    <div className="mb-6 md:mb-10">
                                        <TitleComponent size="small" className="text-dark/60 font-bold uppercase tracking-widest mb-4">
                                            Coupon Code
                                        </TitleComponent>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={couponInput}
                                                onChange={(e) => setCouponInput(e.target.value)}
                                                placeholder="Enter code"
                                                className="flex-1 border border-gray-200 px-4 py-3 text-sm font-medium text-dark focus:border-amber duration-300 uppercase placeholder:normal-case placeholder:text-dark/30 outline-none w-full"
                                            />
                                            <ThemeButton variant="dark" className="px-6 text-xs uppercase font-semibold" onClick={handleApplyCoupon}>
                                                Apply
                                            </ThemeButton>
                                        </div>
                                        {couponError && <p className="text-[11px] text-red-500 mt-2.5 font-medium">{couponError}</p>}
                                        {couponSuccess && <p className="text-[11px] text-green-600 mt-2.5 font-medium">{couponSuccess}</p>}
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <Link to="/checkout" className="w-full">
                                            <ThemeButton variant="dark" className="w-full py-4.5 text-sm tracking-widest uppercase font-bold" icon={<ArrowRightIcon size={18} weight="bold" />}>
                                                Proceed to Checkout
                                            </ThemeButton>
                                        </Link>
                                        <Link to="/shop" className="w-full">
                                            <ThemeButton variant="outline" className="w-full py-4 text-xs uppercase tracking-widest font-bold">
                                                Continue Shopping
                                            </ThemeButton>
                                        </Link>
                                    </div>

                                    <div className="flex gap-4 md:gap-6 justify-center mt-6 md:mt-10 pt-6 md:pt-10 border-t border-gray-100 flex-wrap">
                                        <div className="flex flex-col items-center gap-2 text-center">
                                            <LockIcon size={18} className="text-amber" weight="bold" />
                                            <span className="text-xs text-dark/30 font-semibold uppercase tracking-wider">Secure Checkout</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2 text-center">
                                            <TruckIcon size={18} className="text-amber" weight="bold" />
                                            <span className="text-xs text-dark/30 font-semibold uppercase tracking-wider">Global Shipping</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2 text-center">
                                            <ArrowUUpLeftIcon size={18} className="text-amber" weight="bold" />
                                            <span className="text-xs text-dark/30 font-semibold uppercase tracking-wider">Easy Returns</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="py-20">
                    <div className="container">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                            {/* Left Side: Text Content */}
                            <div className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
                                <h1 className="text-dark font-bold text-4xl md:text-5xl lg:text-6xl font-playfairDisplay leading-tight mb-6">
                                    Your Shopping Cart is Empty.
                                </h1>
                                <p className="text-dark/40 text-base md:text-lg lg:text-xl mb-10">
                                    You don't have any pending transaction.
                                </p>
                                <Link to="/" className="inline-block">
                                    <ThemeButton
                                        variant="dark"
                                        className="px-10 py-4.5 text-xs tracking-widest uppercase font-bold bg-amber hover:bg-dark text-dark hover:text-white border-none"
                                    >
                                        Back to Home
                                    </ThemeButton>
                                </Link>
                            </div>

                            {/* Right Side: SVG Graphic */}
                            <div className="w-full lg:w-1/2 flex items-center justify-center order-1 lg:order-2">
                                <div className="w-full max-w-[450px] aspect-square border border-gray-100 flex items-center justify-center p-8 md:p-12">
                                    <svg width="100%" height="100%" viewBox="0 0 508 489" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                                        <mask id="mask0_184_21" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="508" height="489">
                                            <path d="M506.766 116.281L478.172 273.078C475.813 286.031 468.986 297.746 458.878 306.182C448.771 314.619 436.025 319.244 422.859 319.25H150.984L161.297 375.5H413.25C424.375 375.5 435.251 378.799 444.501 384.98C453.751 391.161 460.961 399.946 465.218 410.224C469.476 420.502 470.59 431.812 468.419 442.724C466.249 453.635 460.891 463.658 453.025 471.525C445.158 479.392 435.135 484.749 424.224 486.919C413.312 489.09 402.002 487.976 391.724 483.718C381.446 479.461 372.661 472.251 366.48 463.001C360.299 453.751 357 442.875 357 431.75C357.002 425.357 358.112 419.013 360.281 413H222.469C224.638 419.013 225.748 425.357 225.75 431.75C225.767 440.826 223.588 449.77 219.398 457.821C215.209 465.872 209.133 472.789 201.691 477.983C194.249 483.177 185.66 486.493 176.658 487.648C167.656 488.803 158.509 487.762 149.996 484.615C141.484 481.469 133.859 476.309 127.773 469.576C121.687 462.844 117.32 454.739 115.045 445.953C112.771 437.167 112.656 427.961 114.71 419.121C116.765 410.281 120.928 402.07 126.844 395.188L61.9219 38H19.5C14.5272 38 9.75805 36.0246 6.24175 32.5083C2.72544 28.9919 0.75 24.2228 0.75 19.25C0.75 14.2772 2.72544 9.50805 6.24175 5.99175C9.75805 2.47544 14.5272 0.5 19.5 0.5H61.9219C70.6744 0.519146 79.1444 3.59923 85.8648 9.20665C92.5851 14.8141 97.1324 22.5956 98.7187 31.2031L110.203 94.25H488.25C490.987 94.2557 493.689 94.8682 496.161 96.0435C498.634 97.2188 500.814 98.9276 502.547 101.047C504.36 103.1 505.682 105.538 506.413 108.178C507.144 110.817 507.264 113.588 506.766 116.281Z" fill="#FFBD2E" />
                                        </mask>
                                        <g mask="url(#mask0_184_21)">
                                            <path d="M695.466 166.949C667.251 119.566 625.768 112.088 586.632 111.719C477.03 110.686 463.472 72.7582 382.309 32.0819C285.615 -16.2619 231.714 53.1722 225.234 124.068C222.823 153.331 221.912 184.524 199.922 206.932C182.808 224.42 153.052 232.014 130.985 243.024C51.0431 283.277 29.2261 389.904 148.285 466.216C218.757 511.342 276.362 503.692 356.083 496.575C431.241 489.867 488.011 516.599 551.551 554.053C702.991 643.422 898.273 541.14 714.328 299.141C685.638 261.345 718.315 205.059 695.466 166.949Z" fill="#FFBD2E" />
                                            <path d="M332.431 133.955C312.168 82.6648 272.418 68.6414 233.845 62.0109C125.823 43.441 118.513 3.83133 44.911 -49.3163C-42.7946 -112.519 -107.118 -52.6121 -124.867 16.3316C-131.932 44.8307 -137.826 75.4749 -163.121 94.0731C-182.814 108.595 -213.402 111.327 -236.948 118.66C-322.303 145.594 -360.912 247.351 -255.61 341.743C-193.272 397.571 -135.186 399.244 -55.354 404.983C19.9089 410.398 71.666 445.875 128.388 493.02C263.564 605.485 472.704 535.792 329.883 267.462C307.615 225.559 348.883 175.232 332.431 133.955Z" fill="#16181C" />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Recommendations Section */}
            <section className="py-16 md:py-24 lg:py-32 border-t border-gray-100">
                <div className="container">
                    <SectionTitle
                        title="You May Also Like"
                        headingLevel="h2"
                        className="mb-10 md:mb-16"
                    />

                    <Swiper
                        modules={[Autoplay]}
                        loop={true}
                        autoplay={{
                            delay: 4000,
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
            </section>
        </>
    );
};

export default CartPage;
