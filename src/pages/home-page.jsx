import { ArrowRightIcon } from "@phosphor-icons/react";

import ThemeButton from "../components/themeButton/themeButton";
import Newsletter from "../components/newsletter/newsletter";
import CategorySec from "../components/categorySec/categorySec";
import FeaturedProducts from "../components/featuredProducts/featuredProducts";
import HighlightSection from "../components/highlightSection/highlightSection";

const HomePage = () => {
    return (
        <main className="min-h-screen selection:bg-primary selection:text-dark">
            <section className="py-24 md:py-32 bg-white">
                <div className="container">
                    <div className="flex flex-col items-center text-center">
                        <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">New Season Collection</span>
                        <h1 className="text-5xl md:text-8xl font-playfairDisplay mb-8 text-dark tracking-tight leading-none max-w-4xl">
                            Elegance in Every Detail
                        </h1>
                        <div className="w-32 h-1.5 bg-primary mb-10"></div>
                        <p className="text-dark-65 max-w-2xl text-lg md:text-xl leading-relaxed font-roboto mb-10">
                            Discover our curated selection of premium clothing and footwear. Engineered for style, crafted for comfort.
                        </p>
                        <ThemeButton variant="primary" icon={<ArrowRightIcon size={20} weight="bold" />}>
                            Explore Shop
                        </ThemeButton>
                    </div>
                </div>
            </section>

            <CategorySec />
            <FeaturedProducts />
            <HighlightSection />
            <Newsletter />
        </main>
    );
};

export default HomePage;
