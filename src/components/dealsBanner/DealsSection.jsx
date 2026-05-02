import React from 'react';
import SectionHeader from './SectionHeader';
import DealCard from './DealCard';
import PromoBanners from './PromoBanners';

const DealsSection = () => {
    return (
        <section className="bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Side: Deals of the Day (9 columns) */}
                    <div className="lg:col-span-9 flex flex-col">
                        <SectionHeader title="DEALS OF THE DAY" />
                        <DealCard />
                    </div>

                    {/* Right Side: 3 Promo Images (3 columns) */}
                    <div className="lg:col-span-3">
                        <PromoBanners />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DealsSection;
