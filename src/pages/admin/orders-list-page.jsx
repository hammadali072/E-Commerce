import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { createPortal } from 'react-dom';
import {
    DownloadIcon,
    MagnifyingGlassIcon,
    CalendarIcon,
    EyeIcon,
    PrinterIcon,
    CaretLeftIcon,
    CaretRightIcon,
    XIcon,
    CheckCircleIcon,
    ClockIcon,
    PackageIcon,
    TruckIcon,
    UserIcon,
    MapPinIcon,
    CreditCardIcon,
    ReceiptIcon,
    ChartLineUpIcon,
    TrendUpIcon,
    TrendDownIcon
} from '@phosphor-icons/react';
import clsx from 'clsx';

import TitleComponent from '../../components/titleComponent/titleComponent';
import ThemeButton from '../../components/themeButton/themeButton';
import CustomDropdown from '../../components/admin/customDropdown/customDropdown';
import { MockOrdersData } from '../../Data';

const OrdersListPage = () => {
    const navigate = useNavigate();
    const { id: routeId } = useParams();
    const { isCollapsed } = useOutletContext() || { isCollapsed: false };

    // Orders State
    const [orders, setOrders] = useState(MockOrdersData);
    const [selectedTab, setSelectedTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [dateRange, setDateRange] = useState('');
    const [sortBy, setSortBy] = useState('Sort By: Newest First');

    // Detail Modal State
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    // Body Scroll Lock when drawer is open
    useEffect(() => {
        if (isDetailModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isDetailModalOpen]);

    // Toast State
    const [toastMessage, setToastMessage] = useState(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Deep linking to order details drawer
    useEffect(() => {
        if (routeId) {
            const foundOrder = orders.find(o => o.id === routeId);
            if (foundOrder) {
                setSelectedOrder(foundOrder);
                setIsDetailModalOpen(true);
            }
        }
    }, [routeId, orders]);

    // Show Toast helper
    const showToast = (message) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(null), 3000);
    };

    // Export CSV handler
    const handleExportCSV = () => {
        showToast('Orders exported successfully as CSV!');
    };

    // Print Invoice handler
    const handlePrintInvoice = (orderId) => {
        showToast(`Invoice for ${orderId} sent to printer!`);
    };

    // Tab counts
    const tabCounts = useMemo(() => {
        const counts = {
            All: orders.length,
            Pending: orders.filter(o => o.status === 'Pending').length,
            Processing: orders.filter(o => o.status === 'Processing').length,
            Shipped: orders.filter(o => o.status === 'Shipped').length,
            Delivered: orders.filter(o => o.status === 'Delivered').length,
            Cancelled: orders.filter(o => o.status === 'Cancelled').length
        };
        return counts;
    }, [orders]);

    // Handle Status Change
    const handleStatusChange = (orderId, newStatus) => {
        setOrders(prevOrders =>
            prevOrders.map(order => {
                if (order.id === orderId) {
                    let paymentStatus = order.paymentStatus;
                    if (newStatus === 'Cancelled') {
                        paymentStatus = 'Failed';
                    } else if (newStatus === 'Delivered' || newStatus === 'Shipped' || newStatus === 'Processing') {
                        paymentStatus = 'Paid';
                    }
                    return { ...order, status: newStatus, paymentStatus };
                }
                return order;
            })
        );
        showToast(`Order ${orderId} updated to ${newStatus}`);
    };

    // Filter & Sort Logic
    const filteredAndSortedOrders = useMemo(() => {
        let result = orders.filter(order => {
            // Status Tab
            const matchesTab = selectedTab === 'All' || order.status === selectedTab;

            // Search Filter
            const matchesSearch =
                order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());

            // Date Filter
            const matchesDate = !dateRange || order.date === dateRange;

            return matchesTab && matchesSearch && matchesDate;
        });

        // Sorting
        result.sort((a, b) => {
            const sortVal = sortBy.replace('Sort By: ', '');
            if (sortVal === 'Newest First') {
                return new Date(`${b.date}T${b.time}`) - new Date(`${a.date}T${a.time}`);
            } else if (sortVal === 'Oldest First') {
                return new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`);
            } else if (sortVal === 'Highest Value') {
                return b.total - a.total;
            } else if (sortVal === 'Lowest Value') {
                return a.total - b.total;
            }
            return 0;
        });

        return result;
    }, [orders, selectedTab, searchQuery, dateRange, sortBy]);

    // Pagination calculations
    const totalItems = filteredAndSortedOrders.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [totalItems, currentPage, totalPages]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedOrders = filteredAndSortedOrders.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Detailed Modal trigger
    const openDetailModal = (order) => {
        setSelectedOrder(order);
        setIsDetailModalOpen(true);
        // Also allow router history change if desired
        window.history.pushState(null, '', `/admin/orders/${order.id}`);
    };

    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
        setSelectedOrder(null);
        window.history.pushState(null, '', '/admin/orders');
    };

    return (
        <div className="relative pb-24 animate-fadeIn">
            {/* Toast Alerts */}
            {toastMessage && (
                <div className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 bg-dark text-white px-5 sm:px-6 py-4 shadow-2 border-l-4 border-amber z-[100] flex items-center gap-3 animate-slideDown">
                    <CheckCircleIcon size={20} weight="fill" className="text-amber" />
                    <span className="text-sm font-semibold tracking-wider">{toastMessage}</span>
                </div>
            )}

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 pt-6 sm:pt-8 px-4 sm:px-8">
                <div>
                    <TitleComponent type="h2" className="text-dark font-bold">Orders</TitleComponent>
                    <TitleComponent size="small-medium" className="text-dark/40 mt-1">Track and manage all customer orders</TitleComponent>
                </div>
                <ThemeButton
                    variant="dark"
                    onClick={handleExportCSV}
                    icon={<DownloadIcon size={20} weight="bold" />}
                    iconPosition="left"
                    className="px-5 py-3 text-xs uppercase tracking-widest font-bold w-full sm:w-auto flex justify-center"
                >
                    Export CSV
                </ThemeButton>
            </div>

            {/* Summary Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8 px-4 sm:px-8">
                {[
                    { label: 'Total Orders', value: '247', change: '+8.2%', isUp: true, icon: ReceiptIcon, bg: 'bg-indigo-100/40', color: 'text-indigo-600' },
                    { label: 'Total Revenue', value: '$24,890.00', change: '+12.4%', isUp: true, icon: ChartLineUpIcon, bg: 'bg-green-100/40', color: 'text-green-600' },
                    { label: 'Avg Order Value', value: '$100.77', change: '-2.1%', isUp: false, icon: PackageIcon, bg: 'bg-amber-100/40', color: 'text-amber-600' },
                    { label: 'Pending Orders', value: '12', change: '-15.4%', isUp: false, icon: ClockIcon, bg: 'bg-yellow-100/40', color: 'text-yellow-600' },
                    { label: 'Cancelled Orders', value: '8', change: '+0.0%', isUp: true, icon: XIcon, bg: 'bg-red-100/40', color: 'text-red-600' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-5 border border-gray-100 shadow-1 group hover:border-amber/50 hover:shadow-2 duration-300 flex flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                                <TitleComponent size="extra-small-bold" className="text-dark/40 uppercase tracking-widest block mb-2 truncate">
                                    {stat.label}
                                </TitleComponent>
                                <TitleComponent size="large-bold" className="text-dark">
                                    {stat.value}
                                </TitleComponent>
                            </div>
                            <div className={clsx("size-10 flex items-center justify-center shrink-0 duration-500 group-hover:scale-110", stat.bg)}>
                                <stat.icon size={20} weight="bold" className={stat.color} />
                            </div>
                        </div>
                        <div className="flex items-center flex-wrap gap-1.5 mt-4 pt-3 border-t border-gray-50">
                            <div className={clsx("flex items-center gap-0.5 text-xs font-bold shrink-0", stat.isUp ? "text-green-600" : "text-red-500")}>
                                {stat.isUp ? <TrendUpIcon size={12} weight="bold" /> : <TrendDownIcon size={12} weight="bold" />}
                                {stat.change}
                            </div>
                            <span className="text-[10px] text-dark/30 font-semibold tracking-wider uppercase shrink-0">vs prev. month</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 px-4 sm:px-8 scrollbar-none snap-x snap-mandatory touch-pan-x">
                {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(tab => {
                    const isActive = selectedTab === tab;
                    const count = tabCounts[tab];
                    return (
                        <button
                            key={tab}
                            onClick={() => {
                                setSelectedTab(tab);
                                setCurrentPage(1);
                            }}
                            className={clsx(
                                "flex items-center gap-2 sm:px-5 px-4 sm:py-3 py-2.5 text-sm font-bold duration-300 shrink-0 select-none snap-start",
                                isActive
                                    ? "bg-dark text-white"
                                    : "border border-gray-200 text-dark/50 hover:border-dark bg-white"
                            )}
                        >
                            <span>{tab}</span>
                            <span className={clsx(
                                "text-xs font-semibold px-2 py-0.5",
                                isActive ? "bg-white/20 text-white" : "bg-gray-100 text-dark/65"
                            )}>
                                {count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Toolbar Row */}
            <div className="bg-table-header py-3.5 px-4 sm:px-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-6 border-b border-gray-100">
                {/* Search */}
                <div className="flex-1 flex items-center bg-white border border-gray-200 p-4 focus-within:border-amber group duration-300">
                    <MagnifyingGlassIcon size={18} weight="bold" className="text-dark/40 mr-2 shrink-0 group-focus-within:text-amber duration-300" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by order ID or customer name..."
                        className="w-full text-sm text-dark placeholder:text-dark/30"
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full lg:w-auto">
                    {/* Date Picker */}
                    <div className="relative w-full sm:w-auto shrink-0">
                        <input
                            type="date"
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="w-full sm:min-w-[180px] bg-white border border-gray-200 p-4 text-sm font-semibold text-dark/60 focus:border-amber cursor-pointer duration-300 premium-date-input"
                        />
                        {!dateRange ? (
                            <CalendarIcon size={16} weight="bold" className="absolute right-4 top-1/2 -translate-y-1/2 text-dark/30 pointer-events-none" />
                        ) : (
                            <button
                                onClick={() => setDateRange('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-dark/40 hover:text-dark duration-300 z-10"
                            >
                                <XIcon size={14} weight="bold" />
                            </button>
                        )}
                    </div>
                    {/* Sort Dropdown */}
                    <CustomDropdown
                        options={['Sort By: Newest First', 'Sort By: Oldest First', 'Sort By: Highest Value', 'Sort By: Lowest Value']}
                        value={sortBy}
                        onChange={setSortBy}
                        className="min-w-[180px] w-full sm:w-auto z-10"
                    />
                </div>
            </div>

            {/* Orders Table */}
            <div className="mx-4 sm:mx-8 bg-white border border-gray-100 overflow-hidden shadow-1">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left min-w-max border-collapse">
                        <thead>
                            <tr className="bg-table-header">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-dark/40">Order ID</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-dark/40">Customer</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-dark/40">Date</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-dark/40 text-center">Items</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-dark/40">Total</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-dark/40">Payment</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-dark/40">Status</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-dark/40 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginatedOrders.length > 0 ? (
                                paginatedOrders.map((order) => {
                                    // Status colors mapping
                                    const isPending = order.status === 'Pending';
                                    const isProcessing = order.status === 'Processing';
                                    const isShipped = order.status === 'Shipped';
                                    const isDelivered = order.status === 'Delivered';
                                    const isCancelled = order.status === 'Cancelled';

                                    const paymentColors =
                                        order.paymentStatus === 'Paid'
                                            ? 'bg-green-100 text-green-700'
                                            : order.paymentStatus === 'Pending'
                                                ? 'bg-amber/10 text-amber'
                                                : 'bg-red-100 text-red-500';

                                    const statusBorderColor =
                                        isPending
                                            ? 'focus:border-amber'
                                            : isProcessing
                                                ? 'focus:border-blue-500'
                                                : isShipped
                                                    ? 'focus:border-purple-500'
                                                    : isDelivered
                                                        ? 'focus:border-green-600'
                                                        : 'focus:border-red-500';

                                    return (
                                        <tr key={order.id} className="hover:bg-row-hover duration-300 group border-b border-gray-100 last:border-0">
                                            {/* Order ID */}
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-mono text-sm font-bold text-dark">{order.id}</span>
                                                    <span className="text-xs text-dark/30 mt-0.5">{order.date}</span>
                                                </div>
                                            </td>

                                            {/* Customer */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="min-w-0">
                                                        <p className="font-bold text-dark text-sm truncate">{order.customer.name}</p>
                                                        <p className="text-xs text-dark/40 mt-0.5 truncate">{order.customer.email}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Date */}
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-dark/60 font-semibold">{order.date}</span>
                                                    <span className="text-xs text-dark/30 mt-0.5">{order.time}</span>
                                                </div>
                                            </td>

                                            {/* Items */}
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-sm font-bold text-dark">{order.itemsCount}</span>
                                                    <span className="text-xs text-dark/40 mt-0.5">items</span>
                                                </div>
                                            </td>

                                            {/* Total */}
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-black text-dark">${order.total.toFixed(2)}</span>
                                                    {order.couponApplied && (
                                                        <span className="text-xs text-green-600 font-bold mt-0.5">Coupon applied</span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Payment Badge */}
                                            <td className="px-6 py-4">
                                                <span className={clsx(
                                                    "inline-block text-xs font-bold tracking-wider px-2 py-1 select-none",
                                                    paymentColors
                                                )}>
                                                    {order.paymentStatus}
                                                </span>
                                            </td>

                                            {/* Status Dropdown */}
                                            <td className="px-6 py-4">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                    className={clsx(
                                                        "bg-white border border-gray-200 text-xs font-bold px-2 py-1.5 cursor-pointer duration-300",
                                                        statusBorderColor,
                                                        isPending && "text-amber",
                                                        isProcessing && "text-blue-500",
                                                        isShipped && "text-purple-500",
                                                        isDelivered && "text-green-600",
                                                        isCancelled && "text-red-500"
                                                    )}
                                                >
                                                    <option value="Pending" className="text-amber font-medium">Pending</option>
                                                    <option value="Processing" className="text-blue-500 font-medium">Processing</option>
                                                    <option value="Shipped" className="text-purple-500 font-medium">Shipped</option>
                                                    <option value="Delivered" className="text-green-600 font-medium">Delivered</option>
                                                    <option value="Cancelled" className="text-red-500 font-medium">Cancelled</option>
                                                </select>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => openDetailModal(order)}
                                                        className="size-8 border border-gray-200 flex items-center justify-center text-dark/40 hover:border-amber hover:text-amber duration-300 bg-white"
                                                        title="View Details"
                                                    >
                                                        <EyeIcon size={16} weight="bold" />
                                                    </button>
                                                    <button
                                                        onClick={() => handlePrintInvoice(order.id)}
                                                        className="size-8 border border-gray-200 flex items-center justify-center text-dark/40 hover:border-amber hover:text-amber duration-300 bg-white"
                                                        title="Print Invoice"
                                                    >
                                                        <PrinterIcon size={16} weight="bold" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="8" className="px-6 py-12 text-center text-dark/40 font-medium font-playfairDisplay italic">
                                        No orders found matching your filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 sm:p-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm font-medium text-dark/40">
                        Showing {totalItems === 0 ? 0 : startIndex + 1}-{Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} orders
                    </p>
                    {totalPages > 1 && (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="size-8 flex items-center justify-center border border-gray-200 text-dark/40 hover:border-amber hover:text-amber duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                            >
                                <CaretLeftIcon size={14} weight="bold" />
                            </button>

                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={clsx(
                                        "size-8 flex items-center justify-center text-sm font-bold duration-300",
                                        currentPage === i + 1
                                            ? "bg-dark text-white"
                                            : "border border-gray-200 text-dark hover:border-amber hover:text-amber bg-white"
                                    )}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="size-8 flex items-center justify-center border border-gray-200 text-dark/40 hover:border-amber hover:text-amber duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                            >
                                <CaretRightIcon size={14} weight="bold" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Order Details Drawer / Modal (Wow Factor) */}
            {createPortal(
                <div className={clsx(
                    "fixed inset-0 bg-dark/60 backdrop-blur-sm z-[9999] flex items-center justify-end duration-300 overflow-hidden",
                    isDetailModalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}>
                    <div
                        className="absolute inset-0"
                        onClick={closeDetailModal}
                    />
                    <aside className={clsx(
                        "relative w-full max-w-2xl bg-white h-full max-h-screen shadow-2xl flex flex-col justify-between duration-500 transform overflow-hidden",
                        isDetailModalOpen ? "translate-x-0" : "translate-x-full"
                    )}>
                        {selectedOrder && (
                            <>
                                {/* Modal Header */}
                                <div className="h-20 border-b border-gray-100 px-6 sm:px-8 flex items-center justify-between shrink-0">
                                    <div className="flex items-center gap-3">
                                        <ReceiptIcon size={24} weight="fill" className="text-amber" />
                                        <div>
                                            <TitleComponent type="h3" className="text-lg sm:text-xl font-bold text-dark leading-tight">Order Details</TitleComponent>
                                            <TitleComponent size="extra-small" className='text-dark/40 mt-0.5'>{selectedOrder.id}</TitleComponent>
                                        </div>
                                    </div>
                                    <button
                                        onClick={closeDetailModal}
                                        className="size-10 flex items-center justify-center bg-gray-50 hover:bg-dark duration-300 group"
                                    >
                                        <XIcon size={20} weight="bold" className='text-dark/40 duration-300 group-hover:text-white' />
                                    </button>
                                </div>

                                {/* Modal Body */}
                                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-8 space-y-5 sm:space-y-6">
                                    {/* Order Overview Cards */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-gray-50 border border-gray-100 flex flex-col justify-center">
                                            <TitleComponent size="extra-small-bold" className="text-dark/40 uppercase tracking-wider block mb-1">Placement Date</TitleComponent>
                                            <span className="text-sm font-bold text-dark flex items-center gap-1.5 flex-wrap">
                                                <CalendarIcon size={16} className="shrink-0" />
                                                <span className="truncate">{selectedOrder.date}</span>
                                            </span>
                                        </div>
                                        <div className="p-4 bg-gray-50 border border-gray-100 flex flex-col justify-center">
                                            <TitleComponent size="extra-small-bold" className="text-dark/40 uppercase tracking-wider block mb-1">Status</TitleComponent>
                                            <select
                                                value={selectedOrder.status}
                                                onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                                                className="text-sm font-bold text-amber cursor-pointer bg-transparent outline-none w-full"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Customer & Shipping Info */}
                                    <div className="space-y-4">
                                        <TitleComponent type="h4" className="text-xs font-bold text-dark/40 uppercase tracking-widest border-b border-gray-50 pb-2">Customer & Shipping Information</TitleComponent>

                                        <div className="flex items-start gap-3">
                                            <UserIcon size={18} className="text-dark/40 mt-0.5 shrink-0" />
                                            <div className="min-w-0">
                                                <TitleComponent size="small-bold" className='text-dark truncate'>{selectedOrder.customer.name}</TitleComponent>
                                                <TitleComponent size="extra-small" className='text-dark/40 truncate'>{selectedOrder.customer.email}</TitleComponent>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <MapPinIcon size={18} className="text-dark/40 mt-0.5 shrink-0" />
                                            <div className="min-w-0">
                                                <TitleComponent size="extra-small-bold" className="text-dark/40 uppercase tracking-wider mb-1">Shipping Address</TitleComponent>
                                                <TitleComponent size="small-medium" className='text-dark/65 leading-relaxed'>{selectedOrder.shippingAddress}</TitleComponent>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <CreditCardIcon size={18} className="text-dark/40 mt-0.5 shrink-0" />
                                            <div className="min-w-0">
                                                <TitleComponent size="extra-small-bold" className="text-dark/40 uppercase tracking-wider mb-1">Payment Information</TitleComponent>
                                                <TitleComponent size="small-medium" className='text-dark/65 truncate'>{selectedOrder.paymentMethod} — <span className="font-bold text-green-600">Paid</span></TitleComponent>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Items Summary */}
                                    <div className="space-y-4">
                                        <TitleComponent type="h4" className="text-xs font-bold text-dark/40 uppercase tracking-widest border-b border-gray-50 pb-2">Items Summary</TitleComponent>

                                        <div className="divide-y divide-gray-50">
                                            {selectedOrder.items.map((item, idx) => (
                                                <div key={idx} className="py-3 flex items-start justify-between gap-4">
                                                    <div className="min-w-0 flex-1">
                                                        <TitleComponent size="small-bold" className='text-dark truncate'>{item.name}</TitleComponent>
                                                        <TitleComponent size-="extra-small" className='text-dark/40 mt-0.5 truncate'>
                                                            Size: <span className="font-semibold text-dark/65 mr-2">{item.size}</span>
                                                            Color: <span className="font-semibold text-dark/65">{item.color}</span>
                                                        </TitleComponent>
                                                    </div>
                                                    <div className="text-right shrink-0">
                                                        <TitleComponent size="small-bold" className='text-dark'>${item.price.toFixed(2)} x {item.qty}</TitleComponent>
                                                        <TitleComponent size="extra-small" className='text-dark/40 mt-0.5'>Subtotal: ${(item.price * item.qty).toFixed(2)}</TitleComponent>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Order Summary Billing */}
                                    <div className="bg-gray-50 p-5 space-y-2 text-sm">
                                        <div className="flex items-center justify-between text-dark/60 font-semibold">
                                            <span>Subtotal</span>
                                            <span>${(selectedOrder.total - 15 + (selectedOrder.couponApplied ? 20 : 0)).toFixed(2)}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-dark/60 font-semibold">
                                            <span>Shipping & Handling</span>
                                            <span>$15.00</span>
                                        </div>
                                        {selectedOrder.couponApplied && (
                                            <div className="flex items-center justify-between text-green-600 font-bold">
                                                <span>Coupon Discount</span>
                                                <span>-$20.00</span>
                                            </div>
                                        )}
                                        <div className="h-px bg-gray-200 my-2" />
                                        <div className="flex items-center justify-between text-base font-black text-dark">
                                            <span>Total Amount</span>
                                            <span>${selectedOrder.total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="p-4 sm:p-8 border-t border-gray-100 flex flex-col sm:flex-row gap-3 shrink-0 bg-white">
                                    <ThemeButton
                                        variant="outline"
                                        onClick={() => handlePrintInvoice(selectedOrder.id)}
                                        icon={<PrinterIcon size={16} weight="bold" />}
                                        iconPosition="left"
                                        className="w-full sm:flex-1 border border-gray-200 py-3.5 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-dark hover:border-dark duration-300 bg-white"
                                    >
                                        Print Invoice
                                    </ThemeButton>
                                    <ThemeButton
                                        variant="dark"
                                        onClick={closeDetailModal}
                                        className="w-full sm:flex-1 py-3.5 flex items-center justify-center text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-dark duration-300"
                                    >
                                        Done
                                    </ThemeButton>
                                </div>
                            </>
                        )}
                    </aside>
                </div>,
                document.body
            )}
        </div>
    );
};

export default OrdersListPage;
