import React from 'react';
import CategorySidebar from './CategorySidebar';
import HeroBanner from './HeroBanner';
import FeaturedBrands from './FeaturedBrands';
import TopCategories from './TopCategories';

const HeroSec = () => {
    return (
        <section className="bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left - Category Sidebar */}
                    <div className="lg:col-span-3">
                        <CategorySidebar />
                    </div>

                    {/* Right - Hero Banner with Background Image */}
                    <div className="lg:col-span-9">
                        <HeroBanner />
                    </div>
                </div>

                {/* Two Sections Below Hero */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    {/* Featured Brands Section */}
                    <FeaturedBrands />

                    {/* Top Categories Section */}
                    <TopCategories />
                </div>
            </div>
        </section>
    );
};

export default HeroSec;