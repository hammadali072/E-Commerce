import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { XIcon, TrashIcon } from '@phosphor-icons/react';
import clsx from 'clsx';
import ThemeButton from '../themeButton/themeButton';
import TitleComponent from '../titleComponent/titleComponent';

const SideDrawer = ({
    isOpen,
    onClose,
    title,
    items,
    onRemove,
    type = 'cart', // 'cart' or 'wishlist'
    subtotal = 0,
    viewAllPath = '/'
}) => {
    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            {/* Backdrop */}
            <div
                className={clsx(
                    "fixed inset-0 bg-dark/40 backdrop-blur-sm z-[100] duration-500",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Drawer */}
            <div className={clsx(
                "fixed right-0 top-0 h-full w-full sm:max-w-[400px] bg-white z-[101] shadow-2xl flex flex-col duration-500 ease-out",
                isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            )}>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <TitleComponent type="h4" className="font-bold uppercase tracking-widest text-dark">
                        {title}
                    </TitleComponent>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-50 rounded-full duration-300 group"
                    >
                        <XIcon size={24} weight="bold" className="text-dark group-hover:text-amber duration-300" />
                    </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
                    {items.length > 0 ? (
                        items.map((item, index) => (
                            <div key={`${item.id}-${index}`} className="flex gap-4 group">
                                {/* Image Container */}
                                <div className="relative size-24 bg-gray-50 shrink-0 overflow-hidden">
                                    <img
                                        src={item.image || item.img}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-110 duration-500"
                                    />
                                    <button
                                        onClick={() => onRemove(item.id)}
                                        className="absolute top-0 right-0 size-6 bg-amber flex items-center justify-center text-dark hover:bg-dark hover:text-white duration-300"
                                    >
                                        <XIcon size={12} weight="bold" />
                                    </button>
                                </div>

                                {/* Details */}
                                <div className="flex flex-col justify-center flex-1">
                                    <Link
                                        to={`/product/${item.slug || item.id}`}
                                        onClick={onClose}
                                        className="text-sm font-bold text-dark hover:text-amber duration-300 mb-1 line-clamp-1"
                                    >
                                        {item.name}
                                    </Link>
                                    <div className="flex flex-col gap-0.5">
                                        <p className="text-xs text-dark/40 font-medium">
                                            {item.selectedSize && `Size: ${item.selectedSize}`}
                                            {item.selectedSize && item.selectedColor && ' | '}
                                            {item.selectedColor && `Color: ${item.selectedColor}`}
                                        </p>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-sm font-bold text-dark">${item.price}</span>
                                            {type === 'cart' && (
                                                <span className="text-xs text-dark/40">Qty: {item.quantity}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center py-20">
                            <div className="size-20 bg-gray-50 flex items-center justify-center rounded-full mb-4">
                                {type === 'cart' ? (
                                    <TrashIcon size={32} weight="thin" className="text-dark/20" />
                                ) : (
                                    <XIcon size={32} weight="thin" className="text-dark/20" />
                                )}
                            </div>
                            <TitleComponent size="base" className="text-dark/40">
                                Your {type === 'cart' ? 'cart' : 'wishlist'} is empty.
                            </TitleComponent>
                            <Link to="/shop" onClick={onClose} className="mt-6 text-sm font-bold text-amber uppercase tracking-widest hover:text-dark duration-300">
                                Start Shopping
                            </Link>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex flex-col gap-4">
                        {type === 'cart' && (
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-dark/40 font-bold uppercase tracking-widest text-xs">Subtotal</span>
                                <span className="text-xl font-bold text-dark">${subtotal.toFixed(2)}</span>
                            </div>
                        )}

                        <div className="flex flex-col gap-3">
                            {type === 'cart' ? (
                                <>
                                    <Link to="/checkout" onClick={onClose} className="w-full">
                                        <ThemeButton variant="primary" className="w-full py-4 text-xs font-bold uppercase tracking-widest">
                                            Checkout Now
                                        </ThemeButton>
                                    </Link>
                                    <Link to="/cart" onClick={onClose} className="w-full">
                                        <button className="w-full py-4 bg-gray-100 text-dark text-xs font-bold uppercase tracking-widest hover:bg-dark hover:text-white duration-500">
                                            View Full Cart
                                        </button>
                                    </Link>
                                </>
                            ) : (
                                <Link to="/wishlist" onClick={onClose} className="w-full">
                                    <ThemeButton variant="primary" className="w-full py-4 text-xs font-bold uppercase tracking-widest">
                                        View Full Wishlist
                                    </ThemeButton>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default SideDrawer;
