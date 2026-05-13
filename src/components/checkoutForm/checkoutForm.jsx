import { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
    CreditCardIcon,
    PaypalLogoIcon,
    BankIcon,
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    GlobeIcon
} from '@phosphor-icons/react';

import TitleComponent from '../titleComponent/titleComponent';

const FormField = ({ label, icon: Icon, type = 'text', placeholder, className, required = true }) => (
    <div className={clsx("flex flex-col gap-2", className)}>
        <label className="text-xs font-semibold uppercase tracking-[0.15em] text-dark/40 ml-1">
            {label} {required && <span className="text-amber">*</span>}
        </label>
        <div className="relative group">
            {Icon && (
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/20 group-focus-within:text-amber duration-300">
                    <Icon size={18} weight="bold" />
                </div>
            )}
            <input
                type={type}
                placeholder={placeholder}
                className={clsx(
                    "w-full h-12 md:h-14 bg-off-white border-b border-gray-100 px-4 py-3 text-sm font-medium text-dark duration-300 outline-none focus:bg-white focus:border-amber",
                    Icon && "pl-12"
                )}
                required={required}
            />
        </div>
    </div>
);

FormField.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.elementType,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    required: PropTypes.bool
};

const CheckoutForm = () => {
    const [activePayment, setActivePayment] = useState('stripe');
    const [sameAsBilling, setSameAsBilling] = useState(true);

    return (
        <div className="flex flex-col gap-8 md:gap-16">
            <div className="flex flex-col gap-8 animate-fadeIn">
                <div className="flex items-center gap-5">
                    <div className="size-10 md:size-12 bg-dark text-white flex items-center justify-center font-playfairDisplay text-xl md:text-2xl font-bold rounded-full shadow-lg shadow-dark/10">1</div>
                    <div className="flex flex-col">
                        <TitleComponent type="h3" className="!mb-0 text-xl md:text-2xl font-bold text-dark">Billing Information</TitleComponent>
                        <p className="text-xs text-dark/40 font-semibold uppercase tracking-widest mt-1">Personal and contact details</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-surface p-4 sm:p-6 md:p-8 border border-gray-100">
                    <FormField label="First Name" icon={UserIcon} placeholder="John" />
                    <FormField label="Last Name" icon={UserIcon} placeholder="Doe" />
                    <FormField label="Email Address" icon={EnvelopeIcon} type="email" placeholder="john@example.com" className="md:col-span-2" />
                    <FormField label="Phone Number" icon={PhoneIcon} type="tel" placeholder="+1 (555) 000-0000" />
                    <FormField label="Country / Region" icon={GlobeIcon} placeholder="United States" />
                    <FormField label="Street Address" icon={MapPinIcon} placeholder="House number and street name" className="md:col-span-2" />
                    <FormField label="Town / City" icon={MapPinIcon} placeholder="City name" />
                    <FormField label="ZIP Code" icon={MapPinIcon} placeholder="90210" />

                    <div className="md:col-span-2 mt-4 pt-6 border-t border-gray-50">
                        <label className="flex items-center gap-3 cursor-pointer group self-start">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={sameAsBilling}
                                    onChange={() => setSameAsBilling(!sameAsBilling)}
                                />
                                <div className="size-5 border-2 border-gray-200 group-hover:border-amber duration-300 flex items-center justify-center">
                                    <div className={clsx(
                                        "size-2.5 bg-amber duration-300",
                                        sameAsBilling ? "scale-100 opacity-100" : "scale-0 opacity-0"
                                    )} />
                                </div>
                            </div>
                            <span className="text-xs md:text-sm font-semibold text-dark/60 uppercase tracking-widest group-hover:text-dark duration-300">Shipping address is same as billing</span>
                        </label>

                        {!sameAsBilling && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-8 mt-8 border-t border-dashed border-gray-200 animate-fadeIn">
                                <FormField label="Shipping Full Name" icon={UserIcon} placeholder="John Doe" className="md:col-span-2" />
                                <FormField label="Shipping Address" icon={MapPinIcon} placeholder="House number and street name" className="md:col-span-2" />
                                <FormField label="Town / City" icon={MapPinIcon} placeholder="City name" />
                                <FormField label="ZIP Code" icon={MapPinIcon} placeholder="90210" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="flex flex-col gap-8 animate-fadeIn">
                <div className="flex items-center gap-5">
                    <div className="size-10 md:size-12 bg-dark text-white flex items-center justify-center font-playfairDisplay text-xl md:text-2xl font-bold rounded-full shadow-lg shadow-dark/10">2</div>
                    <div className="flex flex-col">
                        <TitleComponent type="h3" className="!mb-0 text-xl md:text-2xl font-bold text-dark">Payment Method</TitleComponent>
                        <p className="text-xs text-dark/40 font-semibold uppercase tracking-widest mt-1">Secure payment gateway</p>
                    </div>
                </div>

                <div className="flex flex-col gap-3 md:gap-4 bg-surface p-4 sm:p-6 md:p-8 border border-gray-100">
                    <div className="flex flex-col gap-4">
                        {/* Stripe Option */}
                        <div className={clsx(
                            "flex flex-col border duration-500",
                            activePayment === 'stripe' ? "border-amber bg-white" : "border-gray-100 bg-off-white/30"
                        )}>
                            <button
                                onClick={() => setActivePayment('stripe')}
                                className="flex items-center gap-4 p-4 sm:p-5 md:p-6 cursor-pointer w-full text-left"
                            >
                                <div className="size-5 border-2 border-gray-200 rounded-full flex items-center justify-center duration-300">
                                    <div className={clsx(
                                        "size-2.5 bg-amber rounded-full duration-300",
                                        activePayment === 'stripe' ? "scale-100 opacity-100" : "scale-0 opacity-0"
                                    )} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <CreditCardIcon size={20} weight="bold" className={activePayment === 'stripe' ? "text-amber" : "text-dark/40"} />
                                    <span className="text-sm font-semibold text-dark uppercase tracking-wider">Stripe (Cards)</span>
                                </div>
                                <div className="ml-auto h-5 hidden sm:block">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-full" />
                                </div>
                            </button>
                            {activePayment === 'stripe' && (
                                <div className="p-4 sm:p-6 md:p-8 border-t border-gray-100 animate-slideDown">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                                        <FormField label="Card Number" placeholder="0000 0000 0000 0000" className="md:col-span-2" />
                                        <FormField label="Expiry Date" placeholder="MM / YY" />
                                        <FormField label="CVV Code" placeholder="000" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* MasterCard Option */}
                        <div className={clsx(
                            "flex flex-col border duration-500",
                            activePayment === 'mastercard' ? "border-amber bg-white" : "border-gray-100 bg-off-white/30"
                        )}>
                            <button
                                onClick={() => setActivePayment('mastercard')}
                                className="flex items-center gap-4 p-4 sm:p-5 md:p-6 cursor-pointer w-full text-left"
                            >
                                <div className="size-5 border-2 border-gray-200 rounded-full flex items-center justify-center duration-300">
                                    <div className={clsx(
                                        "size-2.5 bg-amber rounded-full duration-300",
                                        activePayment === 'mastercard' ? "scale-100 opacity-100" : "scale-0 opacity-0"
                                    )} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <CreditCardIcon size={20} weight="bold" className={activePayment === 'mastercard' ? "text-amber" : "text-dark/40"} />
                                    <span className="text-sm font-semibold text-dark uppercase tracking-wider">MasterCard</span>
                                </div>
                                <div className="ml-auto h-6 hidden sm:block">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-full" />
                                </div>
                            </button>
                            {activePayment === 'mastercard' && (
                                <div className="p-4 sm:p-6 md:p-8 border-t border-gray-100 animate-slideDown">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                                        <FormField label="MasterCard Number" placeholder="5100 0000 0000 0000" className="md:col-span-2" />
                                        <FormField label="Expiry Date" placeholder="MM / YY" />
                                        <FormField label="CVV Code" placeholder="000" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* PayPal Option */}
                        <div className={clsx(
                            "flex flex-col border duration-500",
                            activePayment === 'paypal' ? "border-amber bg-white" : "border-gray-100 bg-off-white/30"
                        )}>
                            <button
                                onClick={() => setActivePayment('paypal')}
                                className="flex items-center gap-4 p-4 sm:p-5 md:p-6 cursor-pointer w-full text-left"
                            >
                                <div className="size-5 border-2 border-gray-200 rounded-full flex items-center justify-center duration-300">
                                    <div className={clsx(
                                        "size-2.5 bg-amber rounded-full duration-300",
                                        activePayment === 'paypal' ? "scale-100 opacity-100" : "scale-0 opacity-0"
                                    )} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <PaypalLogoIcon size={20} weight="bold" className={activePayment === 'paypal' ? "text-amber" : "text-dark/40"} />
                                    <span className="text-sm font-semibold text-dark uppercase tracking-wider">PayPal</span>
                                </div>
                                <div className="ml-auto h-4 hidden sm:block">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-full" />
                                </div>
                            </button>
                            {activePayment === 'paypal' && (
                                <div className="p-4 md:p-8 border-t border-gray-100 animate-slideDown text-center">
                                    <p className="text-sm text-dark/60 font-medium mb-4">You will be redirected to PayPal to complete your purchase securely.</p>
                                    <div className="h-10 opacity-60 flex justify-center">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-full" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Cash on Delivery Option */}
                        <div className={clsx(
                            "flex flex-col border duration-500",
                            activePayment === 'cod' ? "border-amber bg-white" : "border-gray-100 bg-off-white/30"
                        )}>
                            <button
                                onClick={() => setActivePayment('cod')}
                                className="flex items-center gap-4 p-4 sm:p-5 md:p-6 cursor-pointer w-full text-left"
                            >
                                <div className="size-5 border-2 border-gray-200 rounded-full flex items-center justify-center duration-300">
                                    <div className={clsx(
                                        "size-2.5 bg-amber rounded-full duration-300",
                                        activePayment === 'cod' ? "scale-100 opacity-100" : "scale-0 opacity-0"
                                    )} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <BankIcon size={20} weight="bold" className={activePayment === 'cod' ? "text-amber" : "text-dark/40"} />
                                    <span className="text-sm font-semibold text-dark uppercase tracking-wider">Cash on Delivery</span>
                                </div>
                            </button>
                            {activePayment === 'cod' && (
                                <div className="p-4 sm:p-6 md:p-8 border-t border-gray-100 animate-slideDown">
                                    <div className="bg-amber/5 p-4 md:p-5 border-l-4 border-amber">
                                        <p className="text-xs md:text-sm text-dark/60 font-medium leading-relaxed">
                                            Pay with cash upon delivery. Please ensure you have the exact amount ready for our delivery partner.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Notes */}
            <div className="flex flex-col gap-3 md:gap-4 bg-off-white p-4 sm:p-6 md:p-8 border border-gray-100">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-dark/40 ml-1">
                    Order Notes <span className="text-dark/20 font-medium">(Optional)</span>
                </label>
                <textarea
                    placeholder="Notes about your order, e.g. special notes for delivery."
                    className="w-full min-h-[100px] md:min-h-[120px] bg-white border-b border-gray-100 p-4 md:p-5 text-sm font-medium text-dark duration-300 outline-none focus:border-amber resize-none"
                />
            </div>
        </div>
    );
};

export default CheckoutForm;
