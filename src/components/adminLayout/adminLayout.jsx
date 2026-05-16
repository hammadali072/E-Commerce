import React, { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import {
    HouseIcon, PackageIcon, SquaresFourIcon, ReceiptIcon,
    UsersIcon, TicketIcon, StackIcon, StarIcon,
    GearIcon, SignOutIcon, ListIcon, XIcon,
    BellIcon, MagnifyingGlassIcon, UserCircleIcon, CaretDownIcon
} from '@phosphor-icons/react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { useAdminAuth } from '../../context/AdminAuthContext';

const SIDEBAR_LINKS = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: HouseIcon, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Products', path: '/admin/products', icon: PackageIcon, color: 'text-amber', bg: 'bg-amber/10' },
    { label: 'Collections', path: '/admin/collections', icon: SquaresFourIcon, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Orders', path: '/admin/orders', icon: ReceiptIcon, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Users', path: '/admin/users', icon: UsersIcon, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Coupons', path: '/admin/coupons', icon: TicketIcon, color: 'text-pink-500', bg: 'bg-pink-50' },
    { label: 'Inventory', path: '/admin/inventory', icon: StackIcon, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { label: 'Reviews', path: '/admin/reviews', icon: StarIcon, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { label: 'Settings', path: '/admin/settings', icon: GearIcon, color: 'text-gray-500', bg: 'bg-gray-100' },
];

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { adminLogout } = useAdminAuth();

    const handleLogout = () => {
        adminLogout();
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-light-bg flex">
            {/* Sidebar Overlay (Mobile) */}
            <div
                className={clsx(
                    "fixed inset-0 bg-dark/60 backdrop-blur-sm z-40 lg:hidden duration-300",
                    isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar */}
            <aside className={clsx(
                "fixed top-0 left-0 h-full bg-white border-r border-grey-100 z-50 lg:z-30 duration-300 transform lg:translate-x-0 flex flex-col transition-all",
                isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full",
                isCollapsed ? "lg:w-20" : "lg:w-64 xl:w-72"
            )}>
                {/* Sidebar Header */}
                <div className={clsx(
                    "h-20 flex items-center shrink-0 border-b border-grey-100 duration-300",
                    isCollapsed ? "justify-center px-0" : "px-6"
                )}>
                    <Link to="/admin/dashboard" className="flex items-center gap-2">
                        {!isCollapsed ? (
                            <div className="text-2xl font-playfairDisplay font-bold tracking-tight text-dark whitespace-nowrap">
                                E-SHOP<span className="text-dark/40 font-inter text-xs ml-1">Admin</span>
                            </div>
                        ) : (
                            <div className="size-10 bg-dark text-white font-black flex items-center justify-center text-xl">E</div>
                        )}
                    </Link>
                </div>

                {/* Sidebar Links */}
                <nav className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
                    <div className="space-y-1">
                        {SIDEBAR_LINKS.map((link) => {
                            const isActive = location.pathname === link.path;
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsSidebarOpen(false)}
                                    title={isCollapsed ? link.label : ""}
                                    className={clsx(
                                        "flex items-center gap-3 px-4 py-3 text-sm font-semibold tracking-wider duration-300 group mb-1 transition-all",
                                        isActive
                                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                                            : "text-dark/40 hover:bg-gray-50 hover:text-dark",
                                        isCollapsed && "justify-center px-0 mx-auto w-12 rounded-sm"
                                    )}
                                >
                                    <Icon size={22} weight={isActive ? "fill" : "bold"} className={clsx("duration-300 shrink-0", isActive ? "text-white" : link.color)} />
                                    {!isCollapsed && <span className="whitespace-nowrap">{link.label}</span>}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-grey-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold tracking-widest text-red-400 hover:bg-red-400/10 duration-300 group"
                    >
                        <SignOutIcon size={20} weight="bold" className="group-hover:translate-x-1 duration-300" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className={clsx(
                "flex-1 flex flex-col duration-300 min-w-0 transition-all",
                isCollapsed ? "lg:pl-20" : "lg:pl-64 xl:pl-72"
            )}>
                {/* Top Header Bar */}
                <header className="h-20 bg-white border-b border-grey-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-20">
                    <div className="flex items-center gap-2 md:gap-4 flex-1">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2 text-dark hover:bg-gray-100 duration-300 rounded-sm"
                        >
                            <ListIcon size={24} weight="bold" />
                        </button>
                        
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="hidden lg:flex p-2 text-dark/30 hover:text-dark hover:bg-gray-100 duration-300 rounded-sm"
                        >
                            <ListIcon size={22} weight="bold" />
                        </button>

                        {/* Search Bar (Desktop) */}
                        <div className="hidden md:flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-sm max-w-md w-full border border-transparent focus-within:border-primary/30 focus-within:bg-white duration-300">
                            <MagnifyingGlassIcon size={20} weight="bold" className="text-dark/30" />
                            <input
                                type="text"
                                placeholder="Global search..."
                                className="text-sm font-medium text-dark placeholder:text-dark/30 w-full outline-none bg-transparent"
                            />
                        </div>
                        
                        {/* Mobile Search Toggle (Optional improvement) */}
                        <button className="md:hidden p-2 text-dark/40 hover:text-dark duration-300">
                            <MagnifyingGlassIcon size={22} weight="bold" />
                        </button>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-4">
                        <button className="relative p-2 text-dark/40 hover:text-primary duration-300 group hover:bg-primary/5 rounded-full">
                            <BellIcon size={24} weight="bold" />
                            <span className="absolute top-1 right-1 size-4 bg-primary text-[8px] text-white font-black flex items-center justify-center rounded-full border-2 border-white">6</span>
                        </button>

                        <div className="w-px h-6 bg-grey-100 mx-1 sm:mx-2" />

                        <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer pl-1">
                            <div className="size-9 sm:size-11 bg-purple-100 flex items-center justify-center rounded-full overflow-hidden border border-grey-100 shadow-sm group-hover:border-primary/30 duration-300">
                                <img
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
                                    alt="Admin"
                                    className="w-full h-full object-cover object-top group-hover:scale-110 duration-500"
                                />
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-xs sm:text-sm font-bold text-dark leading-none">Moni Roy</p>
                                <p className="text-[10px] sm:text-xs text-dark/40 font-medium mt-1">Admin</p>
                            </div>
                            <CaretDownIcon size={12} weight="bold" className="text-dark/20 group-hover:text-dark duration-300 hidden xs:block" />
                        </div>
                    </div>
                </header>

                {/* Main Viewport */}
                <main className="p-4 sm:p-8 flex-1">
                    <div className="animate-fadeIn">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
