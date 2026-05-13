import { useState } from 'react';
import clsx from 'clsx';
import {
    UserIcon, PackageIcon, MapPinIcon, CreditCardIcon,
    GearIcon, SignOutIcon, CaretRightIcon
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
        <>
            <InnerHero
                title="My Account"
                subtitle="MANAGE YOUR PROFILE & ORDERS"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: 'Profile', active: true }
                ]}
            />

            <section className="py-8 sm:py-16 md:py-24">
                <div className="container px-4 sm:px-6 md:px-8">
                    <div className="flex flex-col lg:flex-row gap-6 md:gap-10 xl:gap-16">

                        {/* ── Sidebar ── */}
                        <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0">
                            {/* Avatar Card */}
                            <div className="bg-off-white border border-gray-100 p-5 mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="size-12 bg-white border border-gray-100 flex items-center justify-center text-dark/20 overflow-hidden shadow-sm flex-shrink-0">
                                        <UserIcon size={24} weight="duotone" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-dark uppercase tracking-wider truncate">Hammad Ali</p>
                                        <span className="text-[10px] text-amber font-semibold uppercase tracking-widest">Premium Member</span>
                                    </div>
                                </div>
                            </div>

                            {/* Desktop Nav (vertical) */}
                            <nav className="hidden lg:flex flex-col bg-off-white border border-gray-100 overflow-hidden">
                                {TABS.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={clsx(
                                            'flex items-center justify-between px-5 py-3.5 duration-300 group border-b border-gray-100 last:border-0',
                                            activeTab === tab.id
                                                ? 'bg-dark text-white'
                                                : 'text-dark/55 hover:bg-white hover:text-dark'
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <tab.icon size={17} weight={activeTab === tab.id ? 'fill' : 'bold'} />
                                            <span className="text-[11px] font-semibold uppercase tracking-[0.12em]">{tab.label}</span>
                                        </div>
                                        <CaretRightIcon size={13} weight="bold" className={clsx(
                                            'duration-300',
                                            activeTab === tab.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                                        )} />
                                    </button>
                                ))}
                                <button className="flex items-center gap-3 px-5 py-3.5 text-red-400 hover:bg-red-50 hover:text-red-600 duration-300 border-t border-gray-100">
                                    <SignOutIcon size={17} weight="bold" />
                                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em]">Log Out</span>
                                </button>
                            </nav>

                             <div className="lg:hidden flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
                                {TABS.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={clsx(
                                            'flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-widest whitespace-nowrap flex-shrink-0 border duration-300',
                                            activeTab === tab.id
                                                ? 'bg-dark text-white border-dark'
                                                : 'border-gray-200 text-dark/50 hover:border-dark/30 hover:text-dark bg-white'
                                        )}
                                    >
                                        <tab.icon size={15} weight={activeTab === tab.id ? 'fill' : 'bold'} />
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
        </>
    );
};

export default ProfilePage;
