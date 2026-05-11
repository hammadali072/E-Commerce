import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ArrowRightIcon } from '@phosphor-icons/react';
import TitleComponent from '../titleComponent/titleComponent';
import ProductCard from '../productCard/productCard';

const RelatedProducts = ({ currentProduct, AllProducts }) => {
    const related = AllProducts
        .filter(p => p.subCategory === currentProduct.subCategory && p.id !== currentProduct.id)
        .slice(0, 4);

    if (related.length === 0) return null;

    return (
        <section className="w-full py-12 md:py-20 bg-light-bg-alt">
            <div className="container">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 md:mb-12">
                    <div>
                        <TitleComponent type="h2" className="text-2xl sm:text-3xl md:text-5xl font-bold text-dark mb-3 md:mb-4 tracking-tight">
                            You May Also Like
                        </TitleComponent>
                        <div className="w-16 md:w-20 h-1 bg-amber" />
                    </div>
                    <Link
                        to="/shop"
                        className="flex items-center gap-2 text-xs md:text-sm font-bold text-amber uppercase tracking-widest hover:text-dark duration-300 self-start sm:self-auto"
                    >
                        View All <ArrowRightIcon size={14} className="md:w-4 md:h-4" weight="bold" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {related.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

RelatedProducts.propTypes = {
    currentProduct: PropTypes.shape({
        id: PropTypes.number,
        subCategory: PropTypes.string
    }).isRequired,
    AllProducts: PropTypes.array.isRequired
};

export default RelatedProducts;
