import { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { StarIcon, XIcon } from '@phosphor-icons/react';
import TitleComponent from '../titleComponent/titleComponent';
import { RatingBreakdown, GetMockReviews } from '../../Data';

const ReviewCard = ({ review }) => {
    const [previewIndex, setPreviewIndex] = useState(null);

    const handleThumb = (idx) => {
        setPreviewIndex(prev => (prev === idx ? null : idx));
    };

    return (
        <div className="py-6 md:py-10">
            <div className="flex items-start justify-between gap-4 mb-4 md:mb-5">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="size-9 md:size-11 bg-amber/10 flex items-center justify-center text-amber font-semibold text-xs md:text-sm flex-shrink-0">
                        {review.initials}
                    </div>
                    <div className="flex flex-col gap-0.5 md:gap-1">
                        <span className="text-xs md:text-sm font-semibold text-dark">{review.user}</span>
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

            <TitleComponent type="h5" className="text-dark mb-1.5 md:mb-2 text-sm md:text-base font-semibold">{review.title}</TitleComponent>
            <TitleComponent size="small" className="text-dark/50 leading-relaxed mb-5">{review.comment}</TitleComponent>

            {review.images && review.images.length > 0 && (
                <div className="flex flex-col gap-4">
                    <div className="flex gap-3 flex-wrap">
                        {review.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleThumb(idx)}
                                className={clsx(
                                    "size-16 md:size-20 lg:size-24 bg-card-lighter border-2 overflow-hidden flex-shrink-0 duration-300",
                                    previewIndex === idx ? 'border-amber shadow-md' : 'border-transparent hover:border-amber/40'
                                )}
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

                    {previewIndex !== null && (
                        <div className="relative bg-card-lighter border border-gray-100 flex items-center justify-center p-3 md:p-6 lg:p-8 animate-fadeIn">
                            <button
                                onClick={() => setPreviewIndex(null)}
                                className="absolute top-3 right-3 size-8 bg-white border border-gray-200 flex items-center justify-center text-dark/40 hover:text-dark hover:border-dark duration-300 z-10"
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

const ReviewsSection = ({ product }) => {
    const reviews = GetMockReviews(product.image);
    const totalReviews = RatingBreakdown.reduce((acc, curr) => acc + curr.count, 0);

    return (
        <section className="w-full py-12 md:py-20 bg-white">
            <div className="container">
                <div className="flex flex-col mb-10 md:mb-16">
                    <TitleComponent type="h2" className="text-2xl sm:text-3xl md:text-5xl font-bold text-dark mb-3 md:mb-4 tracking-tight">
                        Customer Reviews
                    </TitleComponent>
                    <div className="w-20 h-1 bg-amber" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-12 md:mb-20 p-5 sm:p-8 md:p-12 bg-card-lighter">
                    <div className="flex flex-col items-center justify-center lg:items-start lg:border-r lg:border-gray-200">
                        <span className="text-5xl sm:text-7xl md:text-8xl font-bold text-dark mb-3 md:mb-4 leading-none">
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
                        <span className="text-xs text-dark/30 font-semibold uppercase tracking-widest">
                            Based on {product.reviewCount || 0} reviews
                        </span>
                    </div>

                    <div className="flex flex-col justify-center gap-3">
                        {RatingBreakdown.map((item) => (
                            <div key={item.stars} className="flex items-center gap-4">
                                <StarRow count={item.stars} />
                                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-amber rounded-full duration-700"
                                        style={{
                                            width: totalReviews > 0 ? `${(item.count / totalReviews) * 100}%` : '0%',
                                        }}
                                    />
                                </div>
                                <span className="text-xs font-semibold text-dark/40 w-6 text-right">{item.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

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
