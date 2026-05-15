import { Link } from 'react-router-dom';
import {
    HouseIcon, ShoppingBagIcon
} from '@phosphor-icons/react';

import ThemeButton from '../components/themeButton/themeButton';
import TitleComponent from '../components/titleComponent/titleComponent';

const NotFoundPage = () => {
    return (
        <div className="animate-fadeIn bg-white">
            <section className="min-h-[70vh] md:min-h-[80vh] flex items-center justify-center py-12 md:py-20">
                <div className="container">
                    <div className="flex flex-col items-center text-center max-w-2xl mx-auto relative">
                        <h1 className="-mt-14 text-dark font-playfairDisplay font-black text-7xl md:text-8xl lg:text-9xl select-none">
                            404
                        </h1>

                        <div className="flex flex-col items-center mt-8 relative z-10 px-4 w-full">
                            <TitleComponent type="h2" className="text-dark font-playfairDisplay font-bold mb-4">
                                Page Not Found
                            </TitleComponent>
                            <div className="w-16 h-1 bg-amber mx-auto mb-6" />
                            <TitleComponent size="large" className="text-dark/40 max-w-md mb-12">
                                The page you're looking for doesn't exist, has been moved, or is temporarily unavailable.
                            </TitleComponent>
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <Link to="/" className="w-full sm:w-auto">
                                    <ThemeButton
                                        variant="dark"
                                        className="w-full sm:w-auto px-10 py-4 text-sm tracking-widest uppercase font-bold"
                                        icon={<HouseIcon size={18} weight="bold" />}
                                    >
                                        Back to Home
                                    </ThemeButton>
                                </Link>
                                <Link to="/shop" className="w-full sm:w-auto">
                                    <ThemeButton
                                        variant="outline"
                                        className="w-full sm:w-auto px-10 py-4 text-sm tracking-widest uppercase font-bold"
                                        icon={<ShoppingBagIcon size={18} weight="bold" />}
                                    >
                                        Browse Shop
                                    </ThemeButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NotFoundPage;
