import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StarIcon, XIcon } from '@phosphor-icons/react';
import TitleComponent from '../titleComponent/titleComponent';
import { ratingBreakdown, getMockReviews } from '../../Data';

/* ─── Individual Review Card ─── */
const ReviewCard = ({ review }) => {
    const [previewIndex, setPreviewIndex] = useState(null);

    const handleThumb = (idx) => {
        // Toggle: clicking the active thumb collapses the preview
        setPreviewIndex(prev => (prev === idx ? null : idx));
    };

    return (
        <div className="py-6 md:py-10">
            {/* User Meta Row */}
            <div className="flex items-start justify-between gap-4 mb-4 md:mb-5">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="size-9 md:size-11 rounded-full bg-amber/10 flex items-center justify-center text-amber font-black text-xs md:text-sm flex-shrink-0">
                        {review.initials}
                    </div>
                    <div className="flex flex-col gap-0.5 md:gap-1">
                        <span className="text-xs md:text-sm font-bold text-dark">{review.user}</span>
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <StarIcon
                                    key={i}
                                    size={11}
                                    weight={i < review.rating ? 'fill' : 'regular'}
                                    className="text-amber"
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <span className="text-[10px] md:text-xs font-medium text-dark/30 flex-shrink-0 mt-1">{review.date}</span>
            </div>

            {/* Review Content */}
            <TitleComponent type="h5" className="text-dark mb-1.5 md:mb-2 text-sm md:text-base font-bold">
                {review.title}
            </TitleComponent>
            <p className="text-dark/50 text-sm leading-relaxed mb-5">{review.comment}</p>

            {/* Review Image Thumbnails */}
            {review.images && review.images.length > 0 && (
                <div className="flex flex-col gap-4">
                    {/* Thumbnail Row */}
                    <div className="flex gap-3 flex-wrap">
                        {review.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleThumb(idx)}
                                className={`size-16 md:size-20 lg:size-24 bg-[#F5F5F5] border-2 overflow-hidden flex-shrink-0 transition-all duration-300 ${
                                    previewIndex === idx
                                        ? 'border-amber shadow-md'
                                        : 'border-transparent hover:border-amber/40'
                                }`}
                                title={`View image ${idx + 1}`}
                            >
                                <img
                                    src={img}
                                    alt={`Review image ${idx + 1}`}
                                    className="size-full object-contain p-1"
                                />
                            </button>
                        ))}
                    </div>

                    {/* Inline Preview Panel */}
                    {previewIndex !== null && (
                        <div className="relative bg-[#F5F5F5] border border-gray-100 flex items-center justify-center p-3 md:p-6 lg:p-8 animate-fadeIn">
                            {/* Close Button */}
                            <button
                                onClick={() => setPreviewIndex(null)}
                                className="absolute top-3 right-3 size-8 bg-white border border-gray-200 flex items-center justify-center text-dark/40 hover:text-dark hover:border-dark transition-all duration-300 z-10"
                                title="Close preview"
                            >
                                <XIcon size={16} weight="bold" />
                            </button>
                            <img
                                src={review.images[previewIndex]}
                                alt="Review preview"
                                className="max-h-80 md:max-h-[28rem] w-auto object-contain"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

ReviewCard.propTypes = {
    review: PropTypes.shape({
        id: PropTypes.number,
        user: PropTypes.string,
        initials: PropTypes.string,
        rating: PropTypes.number,
        date: PropTypes.string,
        title: PropTypes.string,
        comment: PropTypes.string,
        images: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
};

/* ─── Star Row helper ─── */
const StarRow = ({ count }) => (
    <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
            <StarIcon
                key={i}
                size={14}
                weight={i < count ? 'fill' : 'regular'}
                className="text-amber"
            />
        ))}
    </div>
);

StarRow.propTypes = { count: PropTypes.number.isRequired };

/* ─── Main Reviews Section ─── */
const ReviewsSection = ({ product }) => {
    const reviews = getMockReviews(product.image);
    const totalReviews = ratingBreakdown.reduce((acc, curr) => acc + curr.count, 0);

    return (
        <section className="w-full py-12 md:py-20 bg-white">
            <div className="container">
                {/* Header */}
                <div className="flex flex-col mb-10 md:mb-16">
                    <TitleComponent type="h2" className="text-2xl sm:text-3xl md:text-5xl font-bold text-dark mb-3 md:mb-4 tracking-tight">
                        Customer Reviews
                    </TitleComponent>
                    <div className="w-20 h-1 bg-amber" />
                </div>

                {/* Rating Summary Block */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-12 md:mb-20 p-5 sm:p-8 md:p-12 bg-[#FAFAFA]">
                    {/* Overall Score */}
                    <div className="flex flex-col items-center justify-center lg:items-start lg:border-r lg:border-gray-200">
                        <span className="text-5xl sm:text-7xl md:text-8xl font-black text-dark mb-3 md:mb-4 leading-none">
                            {product.rating?.toFixed(1) || '0.0'}
                        </span>
                        <div className="flex gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <StarIcon
                                    key={i}
                                    size={24}
                                    weight={i < Math.floor(product.rating || 0) ? 'fill' : 'regular'}
                                    className="text-amber"
                                />
                            ))}
                        </div>
                        <span className="text-sm text-dark/40 font-bold uppercase tracking-[0.2em]">
                            Based on {product.reviewCount || 0} reviews
                        </span>
                    </div>

                    {/* Bars Breakdown */}
                    <div className="flex flex-col justify-center gap-3">
                        {ratingBreakdown.map((item) => (
                            <div key={item.stars} className="flex items-center gap-4">
                                <StarRow count={item.stars} />
                                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-amber rounded-full transition-all duration-700"
                                        style={{
                                            width: totalReviews > 0 ? `${(item.count / totalReviews) * 100}%` : '0%',
                                        }}
                                    />
                                </div>
                                <span className="text-xs font-bold text-dark/40 w-6 text-right">{item.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reviews List */}
                <div className="flex flex-col divide-y divide-gray-100">
                    {reviews.length > 0 ? (
                        reviews.map((review) => <ReviewCard key={review.id} review={review} />)
                    ) : (
                        <div className="py-24 flex flex-col items-center text-center">
                            <StarIcon size={64} className="text-dark/5 mb-6" weight="thin" />
                            <TitleComponent type="h3" className="text-dark mb-2">No Reviews Yet</TitleComponent>
                            <p className="text-dark/40 text-sm">Be the first to review this product.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

ReviewsSection.propTypes = {
    product: PropTypes.shape({
        rating: PropTypes.number,
        reviewCount: PropTypes.number,
        image: PropTypes.string,
    }).isRequired,
};

export default ReviewsSection;
