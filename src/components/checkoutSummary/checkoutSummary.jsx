import { Link, useNavigate } from 'react-router-dom';
import {
    ArrowRightIcon
} from '@phosphor-icons/react';

import TitleComponent from '../titleComponent/titleComponent';
import ThemeButton from '../themeButton/themeButton';
import { useCart } from '../../context/CartContext';
import { slugify } from '../../utils/slugify';

const CheckoutSummary = () => {
    const {
        items,
        getSubtotal,
        getDiscount,
        getTotal,
        couponCode,
        couponDiscount,
        clearCart,
        shippingFee
    } = useCart();

    const navigate = useNavigate();

    const handlePlaceOrder = () => {
        // Store items and total for the success page
        const orderSummary = {
            items: [...items],
            total: getTotal()
        };

        // Navigate to success page with order details
        // The cart will be cleared on the success page mount
        navigate('/order-success', { state: orderSummary });
    };

    return (
        <div className="lg:sticky lg:top-24 h-fit bg-white border border-gray-100 p-4 sm:p-6 md:p-8">
            <div className="flex items-center justify-between mb-6 md:mb-8 pb-4 md:pb-6 border-b border-gray-100">
                <TitleComponent type="h4" className="!mb-0 text-xl md:text-2xl font-bold text-dark">Your Order</TitleComponent>
                <div className="flex items-center gap-2 px-3 py-1 bg-dark text-white text-[10px] font-semibold uppercase tracking-widest">
                    <span>{items.length} Items</span>
                </div>
            </div>

            {/* Items List */}
            <div className="flex flex-col gap-4 md:gap-5 mb-6 md:mb-8 max-h-[260px] md:max-h-[350px] overflow-y-auto pr-2 scrollbar-thin">
                {items.map((item) => (
                    <div key={item.id} className="flex gap-3 md:gap-4 group">
                        <Link to={`/product/${slugify(item.name)}`} className="size-14 md:size-16 bg-card-lighter flex-shrink-0 flex items-center justify-center overflow-hidden">
                            <img src={item.image} alt={item.name} className="size-[85%] object-contain duration-500 group-hover:scale-110" />
                        </Link>
                        <div className="flex-1 flex flex-col justify-center">
                            <Link to={`/product/${slugify(item.name)}`}>
                                <h5 className="text-sm md:text-base font-bold text-dark line-clamp-1 hover:text-amber duration-300">
                                    {item.name}
                                </h5>
                            </Link>
                            <div className="flex items-center justify-between mt-1">
                                <span className="text-[10px] md:text-xs text-dark/40 font-semibold uppercase tracking-wider">Qty: {item.quantity}</span>
                                <span className="text-xs md:text-sm font-semibold text-dark">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Totals */}
            <div className="flex flex-col gap-2 md:gap-3 mb-8 md:mb-10 pb-6 md:pb-8 border-b border-gray-100">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-dark/60 font-medium">Subtotal</span>
                    <span className="text-dark font-bold">${getSubtotal().toFixed(2)}</span>
                </div>
                {getDiscount() > 0 && (
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-green-600 font-medium">Item Savings</span>
                        <span className="text-green-600 font-bold">-${getDiscount().toFixed(2)}</span>
                    </div>
                )}
                <div className="flex items-center justify-between text-sm">
                    <span className="text-dark/60 font-medium">Shipping</span>
                    <span className="text-dark font-bold">${shippingFee.toFixed(2)}</span>
                </div>
                {couponCode && (
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-amber font-medium">Coupon ({couponCode})</span>
                        <span className="text-amber font-bold">-${couponDiscount.toFixed(2)}</span>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-6 mb-10">
                <div className="flex items-center justify-between">
                    <span className="font-bold text-dark text-base md:text-xl uppercase tracking-tighter">Grand Total</span>
                    <span className="font-bold text-dark text-2xl md:text-4xl tracking-tighter">${getTotal().toFixed(2)}</span>
                </div>

                <div className="flex flex-col gap-4">
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="size-5 border-2 border-gray-200 mt-0.5 flex-shrink-0 flex items-center justify-center peer-checked:border-amber peer-checked:bg-amber duration-300">
                            <div className="size-2 bg-white scale-0 peer-checked:scale-100 duration-300" />
                        </div>
                        <span className="text-[11px] text-dark/50 font-medium leading-relaxed group-hover:text-dark duration-300">
                            I have read and agree to the website <span className="text-dark font-semibold underline cursor-pointer">terms and conditions</span>, <span className="text-dark font-semibold underline cursor-pointer">privacy policy</span> and <span className="text-dark font-semibold underline cursor-pointer">return policy</span>.
                        </span>
                    </label>

                    <ThemeButton
                        variant="dark"
                        className="w-full py-4 md:py-5 text-sm tracking-[0.2em] font-semibold uppercase shadow-lg shadow-dark/5"
                        icon={<ArrowRightIcon size={20} weight="bold" />}
                        onClick={handlePlaceOrder}
                    >
                        Place Order Now
                    </ThemeButton>
                </div>
            </div>

        </div>
    );
};

export default CheckoutSummary;
