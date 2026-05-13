import { useState } from 'react';
import clsx from 'clsx';
import {
    PackageIcon, TruckIcon, CheckCircleIcon, XCircleIcon,
    ClockIcon, CaretDownIcon, ArrowRightIcon, MagnifyingGlassIcon
} from '@phosphor-icons/react';
import ThemeButton from '../themeButton/themeButton';

const STATUS_CONFIG = {
    Processing: { color: 'bg-amber/10 text-amber border-amber/20', icon: ClockIcon, label: 'Processing' },
    Shipped:    { color: 'bg-blue-50 text-blue-600 border-blue-100', icon: TruckIcon, label: 'Shipped' },
    Delivered:  { color: 'bg-green-50 text-green-600 border-green-100', icon: CheckCircleIcon, label: 'Delivered' },
    Cancelled:  { color: 'bg-red-50 text-red-500 border-red-100', icon: XCircleIcon, label: 'Cancelled' },
};

const MOCK_ORDERS = [
    {
        id: 'ORD-774921', date: 'May 12, 2026', total: 249.00, status: 'Processing', items: 3,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200',
        products: ['Nike Air Max 2026 – Qty 1', 'Running Socks Pack – Qty 2'],
        timeline: [
            { label: 'Order Placed', date: 'May 12, 2026', done: true },
            { label: 'Payment Confirmed', date: 'May 12, 2026', done: true },
            { label: 'Processing', date: 'May 13, 2026', done: true },
            { label: 'Shipped', date: '—', done: false },
            { label: 'Delivered', date: '—', done: false },
        ]
    },
    {
        id: 'ORD-662105', date: 'April 28, 2026', total: 125.50, status: 'Delivered', items: 1,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200',
        products: ['Luxury Watch – Qty 1'],
        timeline: [
            { label: 'Order Placed', date: 'Apr 28, 2026', done: true },
            { label: 'Payment Confirmed', date: 'Apr 28, 2026', done: true },
            { label: 'Processing', date: 'Apr 29, 2026', done: true },
            { label: 'Shipped', date: 'Apr 30, 2026', done: true },
            { label: 'Delivered', date: 'May 2, 2026', done: true },
        ]
    },
    {
        id: 'ORD-550392', date: 'March 15, 2026', total: 89.00, status: 'Cancelled', items: 2,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=200',
        products: ['Wireless Headphones – Qty 1', 'Phone Case – Qty 1'],
        timeline: [
            { label: 'Order Placed', date: 'Mar 15, 2026', done: true },
            { label: 'Payment Confirmed', date: 'Mar 15, 2026', done: true },
            { label: 'Cancelled', date: 'Mar 16, 2026', done: true },
        ]
    },
];

const STATUS_FILTERS = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function ProfileOrders() {
    const [filter, setFilter] = useState('All');
    const [expanded, setExpanded] = useState(null);
    const [search, setSearch] = useState('');

    const filtered = MOCK_ORDERS.filter(o => {
        const matchFilter = filter === 'All' || o.status === filter;
        const matchSearch = o.id.toLowerCase().includes(search.toLowerCase());
        return matchFilter && matchSearch;
    });

    return (
        <div className="animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-gray-100">
                <div>
                    <h3 className="text-xl md:text-2xl font-bold text-dark uppercase tracking-tight">Order History</h3>
                    <p className="text-xs text-dark/40 font-semibold mt-0.5">{MOCK_ORDERS.length} total orders</p>
                </div>
                <div className="relative">
                    <MagnifyingGlassIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark/30" weight="bold" />
                    <input
                        type="text"
                        placeholder="Search order ID…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="pl-9 pr-4 py-2.5 text-xs border border-gray-200 outline-none focus:border-amber duration-300 w-full sm:w-52 font-semibold text-dark bg-off-white"
                    />
                </div>
            </div>

            {/* Status Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1 mb-6 scrollbar-none">
                {STATUS_FILTERS.map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={clsx(
                            'px-3 py-1.5 text-xs font-semibold uppercase tracking-widest whitespace-nowrap border duration-300 flex-shrink-0',
                            filter === f ? 'bg-dark text-white border-dark' : 'border-gray-200 text-dark/50 hover:border-dark/30 hover:text-dark bg-white'
                        )}
                    >{f}</button>
                ))}
            </div>

            {/* Order Cards */}
            <div className="flex flex-col gap-4">
                {filtered.length === 0 && (
                    <div className="text-center py-16 text-dark/30">
                        <PackageIcon size={40} className="mx-auto mb-3" weight="duotone" />
                        <p className="text-sm font-semibold uppercase tracking-wider">No orders found</p>
                    </div>
                )}
                {filtered.map(order => {
                    const cfg = STATUS_CONFIG[order.status];
                    const StatusIcon = cfg.icon;
                    const isOpen = expanded === order.id;
                    return (
                        <div key={order.id} className="border border-gray-100 bg-white hover:shadow-md duration-300">
                            {/* Card Header */}
                            <div className="p-4 sm:p-5">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                    <img src={order.image} alt={order.id} className="size-16 sm:size-20 object-contain bg-off-white border border-gray-100 p-2 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex wrap items-center gap-2 mb-1">
                                            <span className="text-sm font-semibold text-dark tracking-wider">{order.id}</span>
                                            <span className={clsx('flex items-center gap-1 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest border', cfg.color)}>
                                                <StatusIcon size={10} weight="bold" />{cfg.label}
                                            </span>
                                        </div>
                                        <p className="text-[10px] text-dark/40 font-semibold uppercase tracking-widest">
                                            {order.date} · {order.items} {order.items > 1 ? 'Items' : 'Item'}
                                        </p>
                                        <p className="text-base font-semibold text-dark mt-1.5">${order.total.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap mt-4 sm:mt-0 ml-auto w-full sm:w-auto">
                                        {order.status !== 'Cancelled' && (
                                            <ThemeButton variant="outline" className="flex-1 sm:flex-none text-xs px-5 py-2.5 border tracking-widest font-semibold">
                                                Track
                                            </ThemeButton>
                                        )}
                                        {order.status === 'Delivered' && (
                                            <ThemeButton variant="dark" className="flex-1 sm:flex-none text-xs px-5 py-2.5 tracking-widest font-semibold">
                                                Reorder
                                            </ThemeButton>
                                        )}
                                        <button
                                            onClick={() => setExpanded(isOpen ? null : order.id)}
                                            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 h-10 px-4 text-xs font-semibold text-dark/50 hover:text-dark duration-300 uppercase tracking-widest border border-transparent hover:border-gray-100"
                                        >
                                            Details
                                            <CaretDownIcon size={12} weight="bold" className={clsx('duration-300', isOpen && 'rotate-180')} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Expanded Details */}
                            {isOpen && (
                                <div className="border-t border-gray-100 p-4 sm:p-5 bg-off-white animate-fadeIn">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Products */}
                                        <div className="flex-1">
                                            <p className="text-xs font-semibold text-dark/30 uppercase tracking-widest mb-3">Items Ordered</p>
                                            <ul className="flex flex-col gap-1.5">
                                                {order.products.map((p, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-xs font-semibold text-dark/70">
                                                        <ArrowRightIcon size={10} weight="bold" className="text-amber flex-shrink-0" />
                                                        {p}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        {/* Timeline */}
                                        <div className="flex-1">
                                            <p className="text-xs font-semibold text-dark/30 uppercase tracking-widest mb-3">Tracking</p>
                                            <div className="flex flex-col gap-0">
                                                {order.timeline.map((step, i) => (
                                                    <div key={i} className="flex items-start gap-3">
                                                        <div className="flex flex-col items-center flex-shrink-0">
                                                            <div className={clsx('size-3 rounded-full border-2 mt-1 flex-shrink-0', step.done ? 'bg-amber border-amber' : 'bg-white border-gray-200')} />
                                                            {i < order.timeline.length - 1 && <div className={clsx('w-px h-6 my-0.5', step.done ? 'bg-amber/30' : 'bg-gray-100')} />}
                                                        </div>
                                                        <div className="pb-4">
                                                            <p className={clsx('text-xs font-semibold leading-none', step.done ? 'text-dark' : 'text-dark/30')}>{step.label}</p>
                                                            <p className="text-[10px] text-dark/30 font-semibold mt-1">{step.date}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
