import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    CheckCircleIcon,
    ShoppingBagIcon,
    HouseIcon,
    ReceiptIcon
} from '@phosphor-icons/react';

import InnerHero from '../components/innerHero/innerHero';
import ThemeButton from '../components/themeButton/themeButton';
import TitleComponent from '../components/titleComponent/titleComponent';
import { useCart } from '../context/CartContext';

const OrderSuccessPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { items: orderedItems, total } = location.state || { items: [], total: 0 };

    const { clearCart } = useCart();

    // Generate a mock order ID
    const orderId = React.useMemo(() => {
        return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }, []);

    // If someone accesses success page directly without order data, redirect to shop
    useEffect(() => {
        if (!location.state) {
            navigate('/shop', { replace: true });
        } else {
            // Clear the cart once the success page is successfully reached
            clearCart();
        }
    }, [location.state, navigate, clearCart]);

    if (!location.state) return null;

    return (
        <div className="bg-white">
            <InnerHero
                title="Order Completed"
                subtitle="THANK YOU FOR YOUR PURCHASE"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: 'Checkout', path: '/checkout' },
                    { label: 'Success', active: true }
                ]}
            />

            <section className="py-12 sm:py-20 md:py-32">
                <div className="container">
                    <div className="max-w-4xl mx-auto flex flex-col items-center px-0">
                        <div className="relative mb-8 md:mb-10 text-center">
                            <div className="size-20 md:size-32 bg-green-50 rounded-full flex items-center justify-center animate-pulse mx-auto">
                                <div className="size-12 md:size-20 bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-green-200">
                                    <CheckCircleIcon size={40} weight="fill" className="md:size-12" />
                                </div>
                            </div>
                            <div className="absolute -top-2 left-1/2 translate-x-12 size-4 bg-amber rounded-full animate-bounce delay-100" />
                            <div className="absolute top-10 left-1/2 -translate-x-20 size-3 bg-primary rounded-full animate-bounce delay-300" />
                        </div>

                        <div className="text-center mb-12">
                            <TitleComponent type="h2" className="text-3xl md:text-5xl font-bold text-dark mb-6">
                                Order Placed Successfully!
                            </TitleComponent>

                            <p className="text-dark/40 text-sm md:text-base font-medium max-w-lg mx-auto leading-relaxed">
                                Your order <span className="text-dark font-semibold">#{orderId}</span> has been confirmed.
                                We've sent a confirmation email with your order details and tracking link to your inbox.
                            </p>
                        </div>

                        <div className="w-full bg-off-white border border-gray-100 p-5 sm:p-8 mb-10 md:mb-12 animate-fadeIn">
                            <div className="flex items-center justify-between mb-6 md:mb-8 pb-4 md:pb-6 border-b border-gray-100">
                                <h4 className="text-base font-semibold text-dark uppercase tracking-widest">Order Summary</h4>
                                <span className="text-xs text-dark/40 tracking-widest font-semibold">{orderedItems.length} Items</span>
                            </div>

                            <div className="flex flex-col gap-6 mb-10">
                                {orderedItems.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between gap-3 md:gap-4">
                                        <div className="flex items-center gap-3 md:gap-4 min-w-0">
                                            <div className="size-14 md:size-16 bg-white border border-gray-200 flex items-center justify-center p-2 flex-shrink-0">
                                                <img src={item.image} alt={item.name} className="size-full object-contain" />
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <h5 className="text-sm md:text-lg font-bold text-dark line-clamp-1">{item.name}</h5>
                                                <p className="text-xs text-dark/40 font-semibold uppercase tracking-widest">
                                                    Qty: {item.quantity} {item.size && `• Size: ${item.size}`}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-semibold text-dark">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                                <span className="text-lg font-bold text-dark uppercase tracking-tighter">Total Paid</span>
                                <span className="text-2xl md:text-3xl font-semibold text-dark tracking-tighter">${total.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Order Status Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 w-full mb-10 md:mb-12">
                            <div className="bg-white p-4 md:p-6 border border-gray-100 flex flex-col items-center gap-3 duration-300 hover:border-amber/20 shadow-sm">
                                <div className="size-10 bg-off-white flex items-center justify-center text-amber">
                                    <ReceiptIcon size={20} weight="bold" />
                                </div>
                                <div className="flex flex-col text-center">
                                    <span className="text-xs font-semibold text-dark/30 uppercase tracking-[0.2em]">Estimated Delivery</span>
                                    <span className="text-sm font-bold text-dark">May 20, 2026 - May 24, 2026</span>
                                </div>
                            </div>
                            <div className="bg-white p-4 md:p-6 border border-gray-100 flex flex-col items-center gap-3 duration-300 hover:border-amber/20 shadow-sm">
                                <div className="size-10 bg-off-white flex items-center justify-center text-amber">
                                    <ShoppingBagIcon size={20} weight="bold" />
                                </div>
                                <div className="flex flex-col text-center">
                                    <span className="text-xs font-semibold text-dark/30 uppercase tracking-[0.2em]">Order Status</span>
                                    <span className="text-sm font-bold text-dark">Processing</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                            <ThemeButton
                                variant="dark"
                                className="w-full sm:w-64 py-4.5 text-xs tracking-[0.2em] uppercase font-semibold"
                                onClick={() => navigate('/shop')}
                                icon={<ShoppingBagIcon size={18} weight="bold" />}
                            >
                                Continue Shopping
                            </ThemeButton>
                            <ThemeButton
                                variant="outline"
                                className="w-full sm:w-64 py-4 text-xs tracking-[0.2em] uppercase font-semibold border-2"
                                onClick={() => navigate('/')}
                                icon={<HouseIcon size={18} weight="bold" />}
                            >
                                Back to Home
                            </ThemeButton>
                        </div>

                        {/* Trust Footer */}
                        <div className="mt-12 md:mt-20 pt-8 md:pt-10 border-t border-gray-100 w-full flex flex-col items-center">
                            <p className="text-xs text-dark/30 font-semibold uppercase tracking-[0.3em] mb-4 md:mb-6">Need help with your order?</p>
                            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                                <Link to="/contact" className="text-xs font-semibold text-dark hover:text-amber duration-300 uppercase tracking-widest">Contact Support</Link>
                                <Link to="/faq" className="text-xs font-semibold text-dark hover:text-amber duration-300 uppercase tracking-widest">Shipping Policy</Link>
                                <Link to="/terms" className="text-xs font-semibold text-dark hover:text-amber duration-300 uppercase tracking-widest">Returns & Refunds</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OrderSuccessPage;
