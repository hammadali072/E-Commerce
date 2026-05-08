import Hero from "../components/hero/hero";
import CategorySec from "../components/categorySec/categorySec";
import HotSale from "../components/hotSale/hotSale";
import FeaturedProducts from "../components/featuredProducts/featuredProducts";
import PremiumCollection from "../components/premiumCollection/premiumCollection";
import HighlightSection from "../components/highlightSection/highlightSection";
import PromoBanner from "../components/promoBanner/promoBanner";
import SneakerSpotlight from "../components/sneakerSpotlight/sneakerSpotlight";
import NewArrivals from "../components/newArrivals/newArrivals";
import TopRated from "../components/topRated/topRated";
import TrustBar from "../components/trustBar/trustBar";
import Newsletter from "../components/newsletter/newsletter";

const HomePage = () => {
    return (
        <main className="min-h-screen selection:bg-primary selection:text-dark">
            {/* Main Hero Section */}
            <Hero />

            {/* Category Grid Section */}
            <CategorySec />

            {/* Premium Editorial Collection */}
            <PremiumCollection />

            {/* Hot Sale Section */}
            <HotSale />

            {/* Sneaker Spotlight Editorial */}
            <SneakerSpotlight />

            {/* Featured Products Section */}
            <FeaturedProducts />

            {/* Brand Highlight Section */}
            <HighlightSection />

            {/* Feature Promo Banner */}
            <PromoBanner />

            {/* New Arrivals Section */}
            <NewArrivals />

            {/* Top Rated Section */}
            <TopRated />

            {/* Trust Bar Section */}
            <TrustBar />

            {/* Newsletter Section */}
            <Newsletter />
        </main>
    );
};

export default HomePage;
