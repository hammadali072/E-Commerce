import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-2xl p-5 border border-gray-50 shadow-sm hover:shadow-md transition-shadow relative flex flex-col h-full group cursor-pointer">
            {/* Badges and Actions */}
            <div className="flex justify-between items-start mb-2 relative z-10">
                {product.saveAmount ? (
                    <div className="bg-[#00B59C] text-white px-2 py-1 rounded-[6px] flex flex-col items-center shadow-sm">
                        <span className="text-[9px] uppercase font-bold tracking-wider leading-none mb-0.5">Save</span>
                        <span className="text-[12px] font-bold leading-tight">${product.saveAmount}</span>
                    </div>
                ) : (
                    <div></div>
                )}
                <button className="w-8 h-8 rounded-full bg-[#EEF1F5] flex items-center justify-center text-gray-400 hover:text-[#00B59C] transition-colors">
                    {/* Circle icon placeholder */}
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" fill="#E5E7EB" />
                    </svg>
                </button>
            </div>

            {/* Image */}
            <div className="flex-1 flex items-center justify-center mb-6 relative">
                <img 
                    src={product.image} 
                    alt={product.title} 
                    className="max-h-[160px] object-contain group-hover:scale-[1.03] transition-transform duration-300" 
                />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1">
                {/* Rating */}
                {product.reviews !== undefined && (
                    <div className="flex justify-center mb-1">
                        <span className="text-gray-400 text-[13px] font-medium">({product.reviews})</span>
                    </div>
                )}

                {/* Title */}
                <h3 className="text-[15px] font-bold text-gray-900 text-center mb-4 line-clamp-3 min-h-[66px] leading-[1.4]">
                    {product.title}
                </h3>

                {/* Pricing */}
                <div className="flex items-end justify-center gap-2 mb-5 mt-auto">
                    {product.price ? (
                        <>
                            <span className="text-[20px] font-bold text-[#00B59C] leading-none">${product.price}</span>
                            {product.originalPrice && (
                                <span className="text-[14px] text-gray-400 line-through font-semibold mb-0.5">${product.originalPrice}</span>
                            )}
                        </>
                    ) : (
                        <span className="text-[17px] font-bold text-gray-900 leading-none">{product.priceRange}</span>
                    )}
                </div>

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                    <div className="flex justify-center gap-2 mb-5 flex-wrap">
                        {product.tags.map((tag, idx) => (
                            <span key={idx} className="bg-[#E6F8F5] text-[#00B59C] px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                
                {product.shippingCost && (
                    <div className="flex justify-center mb-5">
                        <span className="bg-[#F3F4F6] text-gray-600 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
                            {product.shippingCost} SHIPPING
                        </span>
                    </div>
                )}

                {/* Status */}
                <div className="flex justify-center items-center mt-auto pb-1 min-h-[24px]">
                    {product.status === 'In stock' && (
                        <div className="flex items-center gap-2 text-gray-600 text-[13px] font-medium">
                            <div className="w-[18px] h-[18px] rounded-full bg-[#00B59C] text-white flex items-center justify-center">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <span>In stock</span>
                        </div>
                    )}
                    {product.status === 'Out of stock' && (
                        <div className="flex items-center gap-2 text-gray-600 text-[13px] font-medium">
                            <div className="w-[18px] h-[18px] rounded-full bg-[#00B59C] text-white flex items-center justify-center">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </div>
                            <span>Out of stock</span>
                        </div>
                    )}
                    {product.status === 'PRE - ORDER' && (
                        <span className="text-gray-600 text-[12px] font-bold uppercase tracking-wide">PRE - ORDER</span>
                    )}
                    {product.status === 'Contact' && (
                        <span className="text-gray-700 text-[13px] font-medium">Contact</span>
                    )}
                </div>

                {/* Thumbnails if available */}
                {product.variants && (
                    <div className="flex justify-center gap-2 mt-4 pt-4 border-t border-gray-100">
                        {product.variants.map((variant, idx) => (
                            <div key={idx} className={`w-9 h-9 rounded-lg border flex items-center justify-center cursor-pointer transition-colors ${idx === 0 ? 'border-gray-300 bg-white' : 'border-transparent bg-gray-50 hover:border-gray-200'}`}>
                                <img src={variant} alt="variant" className="w-6 h-6 object-contain mix-blend-multiply" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
