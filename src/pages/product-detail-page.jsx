import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@phosphor-icons/react';

import { allProducts } from '../Data';
import { slugify } from '../utils/slugify';
import ImageGallery from '../components/productDetail/ImageGallery';
import ProductInfo from '../components/productDetail/ProductInfo';
import ProductTabs from '../components/productDetail/ProductTabs';
import ReviewsSection from '../components/productDetail/ReviewsSection';
import RelatedProducts from '../components/productDetail/RelatedProducts';
import InnerHero from '../components/innerHero/innerHero';

const ProductDetailPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const product = allProducts.find(p => slugify(p.name) === slug);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white text-center px-4">
                <h1 className="text-6xl font-black text-dark/10">404</h1>
                <p className="text-xl font-bold text-dark">Product Not Found</p>
                <p className="text-dark/40 text-sm max-w-xs">The product you're looking for doesn't exist or has been removed.</p>
                <button
                    onClick={() => navigate('/shop')}
                    className="mt-4 h-12 px-10 bg-dark text-white text-xs font-bold uppercase tracking-widest hover:bg-amber hover:text-dark duration-300"
                >
                    Back to Shop
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Inner Hero / Breadcrumb Banner */}
            <InnerHero
                title={product.name}
                subtitle={product.subCategory}
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: 'Shop', path: '/shop' },
                    { label: product.subCategory, path: '/shop' },
                    { label: product.name, active: true }
                ]}
            />

            {/* Main Product Section */}
            <section className="py-10 sm:py-16 md:py-24">
                <div className="container">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-dark/40 hover:text-amber duration-300 mb-8 md:mb-12"
                    >
                        <ArrowLeftIcon size={14} className="md:w-4 md:h-4" weight="bold" />
                        Back
                    </button>

                    {/* Gallery + Info Side by Side */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 xl:gap-24">
                        <ImageGallery
                            images={product.image}
                            badge={product.badge}
                        />
                        <ProductInfo product={product} />
                    </div>
                </div>
            </section>

            {/* Tabs: Description / Specs / Shipping */}
            <ProductTabs product={product} />

            {/* Reviews */}
            <ReviewsSection product={product} />

            {/* Related Products */}
            <RelatedProducts currentProduct={product} allProducts={allProducts} />
        </div>
    );
};

export default ProductDetailPage;
