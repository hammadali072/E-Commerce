import ThemeButton from "../components/themeButton/themeButton";
import { ShoppingBag, ArrowRight, User, Heart } from "@phosphor-icons/react";

const HomePage = () => {
    return (
        <main className="min-h-screen py-24 bg-light-bg selection:bg-primary selection:text-dark">
            <div className="container">
                <div className="flex flex-col items-center text-center mb-20">
                    <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">New Design System</span>
                    <h1 className="text-5xl md:text-8xl font-playfairDisplay mb-8 text-dark tracking-tight leading-none">The Signature Button</h1>
                    <div className="w-32 h-1.5 bg-primary mb-10"></div>
                    <p className="text-dark-65 max-w-2xl text-lg md:text-xl leading-relaxed font-roboto">
                        Experience our redefined primary action component. Minimalist, bold, and engineered for high-conversion interactions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    {/* Primary Variant */}
                    <div className="flex flex-col items-center p-12 bg-white shadow-box-shadow-1 hover:shadow-box-shadow-2 transition-all duration-700">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-dark-40 font-bold mb-8 block">Primary Action</span>
                        <ThemeButton variant="primary" icon={<ShoppingBag size={24} weight="bold" />}>Add to Cart</ThemeButton>
                        <p className="mt-8 text-dark-40 text-xs text-center italic leading-relaxed px-4">
                            "The signature primary button with secondary color scale interaction."
                        </p>
                    </div>

                    {/* Secondary Variant */}
                    <div className="flex flex-col items-center p-12 bg-white shadow-box-shadow-1 hover:shadow-box-shadow-2 transition-all duration-700">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-dark-40 font-bold mb-8 block">Secondary Action</span>
                        <ThemeButton variant="secondary" icon={<ArrowRight size={18} weight="bold" />}>Subscribe</ThemeButton>
                        <p className="mt-8 text-dark-40 text-xs text-center italic leading-relaxed px-4">
                            "Inverted aesthetic: dark base with primary color scale interaction."
                        </p>
                    </div>

                    {/* Outline Variant */}
                    <div className="flex flex-col items-center p-12 bg-white shadow-box-shadow-1 hover:shadow-box-shadow-2 transition-all duration-700">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-dark-40 font-bold mb-8 block">Outline Style</span>
                        <ThemeButton variant="outline" icon={<ArrowRight size={18} weight="bold" />}>Discover More</ThemeButton>
                        <p className="mt-8 text-dark-40 text-xs text-center italic leading-relaxed px-4">
                            "Elegant border variant that fills with primary color on interaction."
                        </p>
                    </div>
                </div>

                <div className="mt-24 p-16 bg-dark relative overflow-hidden flex flex-col items-center text-center">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-5 rounded-full -mr-48 -mt-48 blur-[120px]"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary opacity-5 rounded-full -ml-48 -mb-48 blur-[120px]"></div>

                    <h2 className="text-4xl md:text-5xl text-white mb-8 font-playfairDisplay relative z-10">Premium Craftsmanship</h2>
                    <p className="text-white/50 mb-12 max-w-xl mx-auto relative z-10 leading-relaxed">
                        Every pixel is meticulously placed to ensure your e-commerce journey feels luxurious and effortless.
                    </p>

                    <div className="flex flex-wrap justify-center gap-8 relative z-10">
                        <ThemeButton icon={<User size={18} weight="bold" />}>Create Account</ThemeButton>
                        <ThemeButton icon={<Heart size={18} weight="bold" />}>Wishlist</ThemeButton>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default HomePage;
