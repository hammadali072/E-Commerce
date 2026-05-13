import { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import TitleComponent from '../titleComponent/titleComponent';
import { ProductTabs as ProductTabsData, ProductHighlights, ShippingCards } from '../../Data';

const ProductTabs = ({ product }) => {
    const [activeTab, setActiveTab] = useState('Description');

    const staticSpecs = [
        { label: 'Category', value: product.category },
        { label: 'Sub-category', value: product.subCategory },
        ...Object.entries(product.specs || {}).map(([key, value]) => ({ label: key, value })),
        { label: 'Care', value: 'Dry Clean Only / Wipe with Damp Cloth' },
    ];

    return (
        <section className="w-full py-12 md:py-16 lg:py-24 border-t border-gray-100">
            <div className="container">
                <div className="flex gap-4 md:gap-8 lg:gap-12 mb-8 md:mb-12 border-b border-gray-100 overflow-x-auto scrollbar-hide">
                    {ProductTabsData.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={clsx(
                                "pb-3 md:pb-4 text-xs md:text-sm lg:text-base font-semibold uppercase tracking-[0.15em] md:tracking-[0.2em] relative duration-300 whitespace-nowrap flex-shrink-0",
                                activeTab === tab ? 'text-dark' : 'text-dark/40 hover:text-dark/60'
                            )}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-amber" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="w-full">
                    {activeTab === 'Description' && (
                        <div className="animate-fadeIn">
                            <div className="mb-10 md:mb-16">
                                <TitleComponent size="small" className='text-dark/60 md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6'>Redefining contemporary style with a focus on heritage craftsmanship. This {product.name} is meticulously engineered for the modern individual who demands both performance and aesthetic excellence.</TitleComponent>
                                <TitleComponent size="small" className='text-dark/60 md:text-base lg:text-lg leading-relaxed'>Whether you're navigating the urban landscape or attending a high-stakes meeting, this piece offers the versatility and durability required for a demanding lifestyle. Made from premium materials sourced from the world's finest suppliers.</TitleComponent>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
                                {ProductHighlights.map(({ icon: Icon, title, desc }) => (
                                    <div key={title} className="flex flex-col items-start">
                                        <div className="size-10 md:size-12 bg-primary/10 border border-amber/20 flex items-center justify-center mb-4 md:mb-6">
                                            <Icon size={20} className="text-amber" weight="bold" />
                                        </div>
                                        <TitleComponent type="h5" className="text-dark mb-2 md:mb-3 text-sm md:text-base">{title}</TitleComponent>
                                        <TitleComponent size="extra-small" className='text-dark/40 md:text-sm leading-relaxed'>{desc}</TitleComponent>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'Specifications' && (
                        <div className="animate-fadeIn w-full md:max-w-2xl">
                            <div className="flex flex-col border border-gray-100 divide-y divide-gray-100">
                                {staticSpecs.map(({ label, value }, idx) => (
                                    <div key={label} className={clsx(
                                        "flex p-3 md:p-4",
                                        idx % 2 === 0 ? 'bg-card-lighter' : 'bg-white'
                                    )}>
                                        <span className="w-1/3 text-xs md:text-sm font-semibold text-dark/40 uppercase tracking-widest capitalize">{label}</span>
                                        <span className="w-2/3 text-xs md:text-sm font-semibold text-dark capitalize">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'Shipping & Returns' && (
                        <div className="animate-fadeIn">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                                {ShippingCards.map(({ icon: Icon, title, desc, badge }) => (
                                    <div key={title} className="flex flex-col p-5 md:p-8 bg-card-lighter border border-gray-100 duration-300 hover:bg-white hover:border-primary">
                                        <div className="size-11 md:size-14 bg-amber/10 flex items-center justify-center mb-4 md:mb-6">
                                            <Icon size={22} className="text-amber" weight="regular" />
                                        </div>
                                        <TitleComponent type="h5" className="text-dark mb-2 md:mb-3 text-sm md:text-base">{title}</TitleComponent>
                                        <p className="text-dark/40 text-xs md:text-sm leading-relaxed">{desc}</p>
                                        <span className="mt-3 md:mt-4 text-xs font-semibold uppercase tracking-widest text-amber">{badge}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

ProductTabs.propTypes = {
    product: PropTypes.shape({
        name: PropTypes.string,
        category: PropTypes.string,
        subCategory: PropTypes.string,
        specs: PropTypes.object
    }).isRequired
};

export default ProductTabs;
