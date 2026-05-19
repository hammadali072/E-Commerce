import { useState } from 'react';
import clsx from 'clsx';
import {
    UserIcon, PackageIcon, MapPinIcon, CreditCardIcon,
    GearIcon, SignOutIcon, CaretRightIcon,
} from '@phosphor-icons/react';

import InnerHero from '../components/innerHero/innerHero';
import ProfileInfo from '../components/profile/profileInfo';
import ProfileOrders from '../components/profile/profileOrders';
import ProfileAddresses from '../components/profile/profileAddresses';
import ProfilePayments from '../components/profile/profilePayments';
import ProfileSettings from '../components/profile/profileSettings';

const TABS = [
    { id: 'profile', label: 'My Profile', icon: UserIcon, component: ProfileInfo },
    { id: 'orders', label: 'Orders', icon: PackageIcon, component: ProfileOrders },
    { id: 'addresses', label: 'Addresses', icon: MapPinIcon, component: ProfileAddresses },
    { id: 'payments', label: 'Payment Methods', icon: CreditCardIcon, component: ProfilePayments },
    { id: 'settings', label: 'Settings', icon: GearIcon, component: ProfileSettings },
];

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('orders');

    const ActiveComponent = TABS.find(t => t.id === activeTab)?.component ?? ProfileOrders;

    return (
        <div className="animate-fadeIn bg-white min-h-screen">
            <InnerHero
                title="My Account"
                subtitle="MANAGE YOUR PROFILE & ORDERS"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: 'Profile', active: true }
                ]}
            />

            <section className="py-12 md:py-20 lg:py-24">
                <div className="container">
                    <div className="flex flex-col lg:flex-row gap-8 xl:gap-16">

                        {/* ── Sidebar ── */}
                        <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0 lg:sticky lg:top-32 h-fit">
                            {/* Desktop Nav (vertical) */}
                            <nav className="hidden lg:flex flex-col border border-gray-100 overflow-hidden shadow-sm">
                                {TABS.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={clsx(
                                            'flex items-center justify-between px-6 py-4 duration-300 group border-b border-gray-100 last:border-0',
                                            activeTab === tab.id
                                                ? 'bg-dark text-white'
                                                : 'text-dark/55 hover:bg-light-bg hover:text-dark'
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <tab.icon size={18} weight={activeTab === tab.id ? 'fill' : 'bold'} />
                                            <span className="text-xs font-bold uppercase tracking-widest">{tab.label}</span>
                                        </div>
                                        <CaretRightIcon size={14} weight="bold" className={clsx(
                                            'duration-300',
                                            activeTab === tab.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                                        )} />
                                    </button>
                                ))}
                                <button className="flex items-center gap-4 px-6 py-4 text-red-500 hover:bg-red-50 duration-300 border-t border-gray-100">
                                    <SignOutIcon size={18} weight="bold" />
                                    <span className="text-xs font-bold uppercase tracking-widest">Log Out</span>
                                </button>
                            </nav>

                            {/* Mobile Nav (horizontal) */}
                            <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
                                {TABS.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={clsx(
                                            'flex items-center gap-3 px-5 py-3 text-xs font-bold uppercase tracking-widest whitespace-nowrap flex-shrink-0 border duration-300',
                                            activeTab === tab.id
                                                ? 'bg-dark text-white border-dark'
                                                : 'border-gray-200 text-dark/50 hover:border-dark/30 hover:text-dark bg-white'
                                        )}
                                    >
                                        <tab.icon size={16} weight={activeTab === tab.id ? 'fill' : 'bold'} />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </aside>

                        {/* ── Main Content ── */}
                        <main className="flex-1 min-w-0">
                            <ActiveComponent />
                        </main>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProfilePage;
