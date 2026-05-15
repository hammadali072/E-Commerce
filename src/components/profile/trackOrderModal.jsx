import { useEffect } from 'react';
import {
    XIcon, PackageIcon, TruckIcon, CheckCircleIcon,
    WarehouseIcon, MapPinIcon, CopyIcon, QuestionIcon,
    CalendarBlankIcon
} from '@phosphor-icons/react';
import clsx from 'clsx';
import TitleComponent from '../titleComponent/titleComponent';

const TrackOrderModal = ({ isOpen, onClose, order }) => {
    // Prevent body scroll when modal is open
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

    if (!isOpen || !order) return null;

    const steps = [
        {
            label: 'Order Placed',
            icon: PackageIcon,
            date: order.date,
            desc: 'We have received your order and it is being prepared.',
            key: 'placed'
        },
        {
            label: 'In Warehouse',
            icon: WarehouseIcon,
            date: order.status === 'Processing' ? 'Currently Here' : 'Processed',
            desc: 'Your items are being packed and quality checked.',
            key: 'warehouse'
        },
        {
            label: 'Shipped',
            icon: TruckIcon,
            date: order.status === 'Shipped' ? 'In Transit' : (order.status === 'Delivered' ? 'Completed' : 'Pending'),
            desc: 'Your package is on its way to the delivery hub.',
            key: 'shipped'
        },
        {
            label: 'Delivered',
            icon: CheckCircleIcon,
            date: order.status === 'Delivered' ? 'Delivered' : 'Expected soon',
            desc: 'Package has been dropped off at your location.',
            key: 'delivered'
        },
    ];

    const getStepStatus = (index) => {
        if (order.status === 'Delivered') return 'done';
        if (order.status === 'Shipped' && index <= 2) return 'done';
        if (order.status === 'Processing' && index <= 1) return 'done';
        if (index === 0) return 'done';
        return 'pending';
    };

    const trackingNumber = "ESH-" + order.id.split('-')[1] + "X7Y";

    const copyTracking = () => {
        navigator.clipboard.writeText(trackingNumber);
        // Could add a toast here
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-dark/60 backdrop-blur-sm duration-500 animate-fadeIn"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white w-full max-w-2xl shadow-2xl animate-scaleIn overflow-hidden rounded-sm flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <div className="size-12 bg-amber/10 flex items-center justify-center rounded-sm shrink-0">
                            <TruckIcon size={24} weight="duotone" className="text-amber" />
                        </div>
                        <div>
                            <p className="text-[10px] text-amber font-bold uppercase tracking-[0.2em] mb-0.5">Shipment Tracking</p>
                            <TitleComponent type="h3" className="font-playfairDisplay font-bold text-dark">
                                {order.id}
                            </TitleComponent>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-50 rounded-full duration-300 group"
                    >
                        <XIcon size={24} weight="bold" className="text-dark group-hover:text-amber duration-300" />
                    </button>
                </div>

                {/* Body Content (Scrollable) */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {/* Quick Summary Bar */}
                    <div className="bg-light-bg px-8 py-6 flex flex-wrap items-center justify-between gap-6 border-b border-gray-100">
                        <div className="flex items-center gap-4">
                            <img src={order.image} alt="" className="size-14 object-contain bg-white border border-gray-100 p-1" />
                            <div>
                                <p className="text-[10px] text-dark/40 font-bold uppercase tracking-widest mb-1">Item tracking</p>
                                <p className="text-sm font-bold text-dark line-clamp-1">{order.products[0]}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="hidden sm:block">
                                <p className="text-[10px] text-dark/40 font-bold uppercase tracking-widest mb-1">Estimated Delivery</p>
                                <div className="flex items-center gap-2 text-dark font-bold">
                                    <CalendarBlankIcon size={16} className="text-amber" />
                                    <span className="text-sm">{order.status === 'Delivered' ? 'Delivered' : 'May 24, 2026'}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] text-dark/40 font-bold uppercase tracking-widest mb-1">Tracking ID</p>
                                <div className="flex items-center gap-2 bg-white border border-gray-200 px-2 py-1 rounded-sm group">
                                    <span className="text-xs font-bold text-dark">{trackingNumber}</span>
                                    <button onClick={copyTracking} title="Copy ID" className="text-dark/20 hover:text-amber duration-300">
                                        <CopyIcon size={14} weight="bold" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stepper Section */}
                    <div className="p-8 sm:p-12">
                        <div className="flex flex-col gap-0 relative">
                            <div className="absolute left-[23px] top-6 bottom-6 w-px bg-gray-100" />

                            {steps.map((step, index) => {
                                const status = getStepStatus(index);
                                const isDone = status === 'done';
                                const isNextDone = index < steps.length - 1 && getStepStatus(index + 1) === 'done';
                                const StepIcon = step.icon;

                                return (
                                    <div key={step.key} className="flex gap-8 pb-12 last:pb-0 relative group">
                                        {/* Icon Container */}
                                        <div className="relative z-10">
                                            <div className={clsx(
                                                "size-12 flex items-center justify-center border-2 duration-700 rounded-sm",
                                                isDone ? "bg-amber border-amber text-dark shadow-[0_0_20px_rgba(245,166,35,0.2)]" : "bg-white border-gray-100 text-dark/20"
                                            )}>
                                                <StepIcon size={22} weight={isDone ? "fill" : "bold"} />
                                            </div>
                                            {/* Progress Line Overlay */}
                                            {isDone && index < steps.length - 1 && (
                                                <div className={clsx(
                                                    "absolute top-12 left-1/2 -translate-x-1/2 w-px z-0 duration-1000",
                                                    isNextDone ? "h-12 bg-amber" : "h-0 bg-transparent"
                                                )} />
                                            )}
                                        </div>

                                        {/* Content Area */}
                                        <div className="flex flex-col flex-1">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <p className={clsx(
                                                        "text-sm font-bold uppercase tracking-widest duration-300",
                                                        isDone ? "text-dark" : "text-dark/20"
                                                    )}>
                                                        {step.label}
                                                    </p>
                                                    <p className={clsx(
                                                        "text-[11px] font-semibold mt-1",
                                                        isDone ? "text-amber font-bold" : "text-dark/10"
                                                    )}>
                                                        {step.date}
                                                    </p>
                                                </div>
                                                {isDone && index === steps.filter((_, i) => getStepStatus(i) === 'done').length - 1 && (
                                                    <span className="bg-dark text-white text-[8px] font-bold px-2 py-1 uppercase tracking-[0.2em] animate-pulse rounded-full">
                                                        Current
                                                    </span>
                                                )}
                                            </div>
                                            <p className={clsx(
                                                "text-xs mt-3 leading-relaxed max-w-sm duration-500",
                                                isDone ? "text-dark/60" : "text-dark/10"
                                            )}>
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gray-100 sticky bottom-0 z-20">
                    <div className="flex flex-col gap-4 w-full sm:w-auto">
                        <div className="flex items-center gap-4">
                            <div className="size-10 bg-white border border-gray-100 flex items-center justify-center text-dark/40 shadow-sm">
                                <MapPinIcon size={20} weight="bold" />
                            </div>
                            <div>
                                <p className="text-[10px] text-dark/30 font-bold uppercase tracking-widest">Ship to</p>
                                <p className="text-xs font-bold text-dark">Hammad Ali, 123 Fashion Ave, NY</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest text-dark/60 hover:text-amber duration-300">
                            <QuestionIcon size={18} weight="bold" />
                            Need Help?
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 sm:flex-none px-10 py-3.5 bg-dark text-white text-xs font-bold uppercase tracking-widest hover:bg-amber hover:text-dark duration-500 shadow-lg shadow-dark/10"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackOrderModal;
