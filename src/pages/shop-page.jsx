import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    CaretDownIcon,
    GridFourIcon,
    ListIcon,
    StarIcon,
    XIcon
} from '@phosphor-icons/react';
import clsx from 'clsx';

import InnerHero from '../components/innerHero/innerHero';
import TitleComponent from '../components/titleComponent/titleComponent';
import ProductCard from '../components/productCard/productCard';

import { AllProducts, pageHeroConfig } from '../Data';

const ShopPage = () => {
    const { pathname } = useLocation();
    const heroConfig = pageHeroConfig[pathname] || pageHeroConfig['/shop'];

    const [priceRange, setPriceRange] = useState([0, 15000]);
    const [viewMode, setViewMode] = useState('grid');
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(() => {
        const config = pageHeroConfig[pathname];
        if (!config) return [];
        if (config.filterCategories) return config.filterCategories;
        if (config.filterCategory && config.filterCategory !== 'All'
            && !['hot-sale', 'new-arrival'].includes(config.filterCategory)) {
            return [config.filterCategory];
        }
        return [];
    });
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [sortBy, setSortBy] = useState("Best Selling");
    const [filteredProducts, setFilteredProducts] = useState(AllProducts);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const config = pageHeroConfig[pathname];
        if (!config) return;

        handleClearAll();

        if (config.filterCategories) {
            setSelectedCategories(config.filterCategories);
        } else if (config.filterCategory &&
            config.filterCategory !== 'All' &&
            !['hot-sale', 'new-arrival'].includes(config.filterCategory)) {
            setSelectedCategories([config.filterCategory]);
        }
    }, [pathname]);

    useEffect(() => {
        let result = [...AllProducts];

        // Tag-based route filter (new-arrivals, sale)
        const config = pageHeroConfig[pathname];
        if (config?.filterCategory === 'hot-sale') {
            result = result.filter(p => p.tags.includes('hot-sale'));
        } else if (config?.filterCategory === 'new-arrival') {
            result = result.filter(p => p.tags.includes('new-arrival'));
        }

        if (selectedCategories.length > 0 && !selectedCategories.includes("All")) {
            result = result.filter(p => {
                const subCatKey = p.subCategory.replace('-', ' ');
                return selectedCategories.some(c => c.toLowerCase() === subCatKey || c.toLowerCase() === p.category);
            });
        }

        result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        if (selectedColor) {
            result = result.filter(p => p.colors?.includes(selectedColor.toLowerCase()));
        }

        if (selectedSizes.length > 0) {
            result = result.filter(p => p.sizes?.some(s => selectedSizes.includes(s)));
        }

        if (selectedRatings.length > 0) {
            const minRating = Math.min(...selectedRatings);
            result = result.filter(p => p.rating >= minRating);
        }
        if (sortBy === "Price: Low to High") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === "Latest") {
            result.sort((a, b) => b.id - a.id);
        } else if (sortBy === "Featured") {
            result = result.filter(p => p.tags.includes('featured'));
        }

        setFilteredProducts(result);
    }, [selectedCategories, priceRange, selectedColor, selectedSizes, selectedRatings, sortBy, pathname]);

    const handleClearAll = () => {
        setSelectedCategories([]);
        setPriceRange([0, 15000]);
        setSelectedColor(null);
        setSelectedSizes([]);
        setSelectedRatings([]);
        setSortBy("Best Selling");
    };

    const handleRatingToggle = (stars) => {
        setSelectedRatings(prev =>
            prev.includes(stars)
                ? prev.filter(r => r !== stars)
                : [...prev, stars]
        );
    };

    const handleSizeToggle = (size) => {
        setSelectedSizes(prev =>
            prev.includes(size)
                ? prev.filter(s => s !== size)
                : [...prev, size]
        );
    };

    const handleCategoryToggle = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    // Smart Filter Config
    const categories = ["All", "Shirts", "Pants", "Formal Shoes", "Sneakers", "Joggers"];

    const sizeGroups = [
        {
            id: 'alpha',
            label: 'Clothing Size',
            options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            show: selectedCategories.some(c => ["Shirts", "Joggers"].includes(c))
        },
        {
            id: 'waist',
            label: 'Waist Size',
            options: ['28', '30', '32', '34', '36', '38'],
            show: selectedCategories.includes("Pants")
        },
        {
            id: 'shoe',
            label: 'Shoe Size (EU)',
            options: ['38', '39', '40', '41', '42', '43', '44'],
            show: selectedCategories.some(c => ["Formal Shoes", "Sneakers"].includes(c))
        }
    ];

    const colors = [
        { name: "black", class: "bg-black" },
        { name: "white", class: "bg-white border border-gray-200" },
        { name: "navy", class: "bg-blue-900" },
        { name: "brown", class: "bg-amber-900" },
        { name: "gray", class: "bg-gray-500" },
        { name: "tan", class: "bg-tan" }
    ];

    return (
        <div className="min-h-screen">
            <InnerHero
                title={heroConfig.title}
                subtitle={heroConfig.subtitle}
                breadcrumbs={heroConfig.breadcrumbs}
            />

            <div className="container">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 py-10 md:py-16 lg:py-20">

                    {/* Mobile Sidebar Overlay */}
                    <div
                        className={clsx(
                            "fixed inset-0 z-[100] duration-300",
                            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                        )}
                    >
                        <div className="absolute inset-0 bg-dark/40 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
                        <aside className={clsx(
                            "absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl duration-500 transform p-6 md:p-8 overflow-y-auto",
                            isSidebarOpen ? "translate-x-0" : "translate-x-full"
                        )}>
                            <div className='flex items-center justify-between mb-8 pb-4 border-b border-gray-100'>
                                <TitleComponent type="h3" className="text-dark !text-xl md:!text-2xl">Filters</TitleComponent>
                                <button
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="size-10 flex items-center justify-center bg-gray-50 rounded-full text-dark/40 hover:text-dark duration-300"
                                >
                                    <XIcon size={20} weight="bold" />
                                </button>
                            </div>

                            {/* Sidebar Content (Reused) */}
                            <SidebarContent
                                categories={categories}
                                selectedCategories={selectedCategories}
                                handleCategoryToggle={handleCategoryToggle}
                                handleClearAll={handleClearAll}
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                                selectedColor={selectedColor}
                                setSelectedColor={setSelectedColor}
                                colors={colors}
                                sizeGroups={sizeGroups}
                                selectedSizes={selectedSizes}
                                handleSizeToggle={handleSizeToggle}
                                selectedRatings={selectedRatings}
                                handleRatingToggle={handleRatingToggle}
                            />
                        </aside>
                    </div>

                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:flex w-1/4 flex-col lg:sticky lg:top-10 h-fit">
                        <div className='flex items-center justify-between mb-6'>
                            <TitleComponent type="h3" className="text-dark">Filters</TitleComponent>
                            <button
                                onClick={handleClearAll}
                                className="text-xs font-bold uppercase tracking-widest text-amber hover:text-dark duration-300"
                            >
                                Clear All
                            </button>
                        </div>
                        <SidebarContent
                            categories={categories}
                            selectedCategories={selectedCategories}
                            handleCategoryToggle={handleCategoryToggle}
                            handleClearAll={handleClearAll}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            selectedColor={selectedColor}
                            setSelectedColor={setSelectedColor}
                            colors={colors}
                            sizeGroups={sizeGroups}
                            selectedSizes={selectedSizes}
                            handleSizeToggle={handleSizeToggle}
                            selectedRatings={selectedRatings}
                            handleRatingToggle={handleRatingToggle}
                        />
                    </aside>

                    <main className="w-full lg:w-3/4 flex flex-col gap-6 md:gap-8">

                        <div className="bg-table-header px-4 md:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3 md:gap-4">
                                <span className="hidden sm:inline-block text-sm md:text-base font-medium text-dark/60">Sort By:</span>
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none bg-white border border-gray-200 px-3 md:px-4 pr-8 md:pr-10 py-2 md:py-2.5 text-sm md:text-base font-semibold text-dark focus:outline-none cursor-pointer min-w-[110px] md:min-w-[120px]"
                                    >
                                        <option>Best Selling</option>
                                        <option>Featured</option>
                                        <option>Latest</option>
                                        <option>Price: Low to High</option>
                                    </select>
                                    <div className="absolute right-2.5 md:right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <CaretDownIcon size={12} weight="bold" className="text-dark/60" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 md:gap-3">
                                <button
                                    onClick={() => setIsSidebarOpen(true)}
                                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-sm font-bold text-dark hover:bg-amber hover:border-amber duration-300"
                                >
                                    <span>Filters</span>
                                </button>

                                <div className="flex items-center gap-2 md:gap-3">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={clsx(
                                            "size-9 md:size-11 flex items-center justify-center duration-300",
                                            viewMode === 'grid' ? "bg-card-dark text-amber" : "bg-white text-dark/40 hover:text-dark"
                                        )}
                                        title="Grid View"
                                    >
                                        <GridFourIcon size={20} weight="regular" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={clsx(
                                            "size-9 md:size-11 flex items-center justify-center duration-300",
                                            viewMode === 'list' ? "bg-card-dark text-amber" : "bg-white text-dark/40 hover:text-dark"
                                        )}
                                        title="List View"
                                    >
                                        <ListIcon size={20} weight="regular" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className={clsx(
                            "grid gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-12 duration-500 ease-in-out",
                            viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                        )}>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} layout={viewMode} />
                                ))
                            ) : (
                                <div className="col-span-full py-16 md:py-20 text-center border border-dashed border-gray-200 bg-off-white">
                                    <p className="text-dark/40 font-medium italic mb-4 text-sm md:text-base px-4">No products match your current filters.</p>
                                    <button
                                        onClick={handleClearAll}
                                        className="text-amber font-bold uppercase text-xs tracking-widest hover:text-dark duration-300 border-b-2 border-amber"
                                    >
                                        Reset All Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

// Helper component to avoid duplication
const SidebarContent = ({
    categories,
    selectedCategories,
    handleCategoryToggle,
    priceRange,
    setPriceRange,
    selectedColor,
    setSelectedColor,
    colors,
    sizeGroups,
    selectedSizes,
    handleSizeToggle,
    selectedRatings,
    handleRatingToggle
}) => (
    <>
        {/* Categories Box */}
        <div className="border border-gray-100 p-5 md:p-6 mb-6">
            <TitleComponent type="h5" className="text-dark mb-3 md:mb-4">Categories</TitleComponent>
            <div className="flex flex-col gap-3 md:gap-4">
                {categories.map((cat, idx) => (
                    <label key={idx} className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative">
                            <input
                                type="checkbox"
                                className="peer sr-only"
                                checked={selectedCategories.includes(cat)}
                                onChange={() => handleCategoryToggle(cat)}
                            />
                            <div className="size-3.5 border border-gray-200 rounded-sm bg-white duration-300 peer-checked:bg-amber peer-checked:border-amber group-hover:border-amber" />
                        </div>
                        <span className="text-xs md:text-sm font-medium text-dark/60 group-hover:text-dark duration-300">
                            {cat}
                        </span>
                    </label>
                ))}
            </div>
        </div>

        {/* Price Range Box */}
        <div className="border border-gray-100 p-5 md:p-6 mb-6">
            <TitleComponent type="h5" className="text-dark mb-3 md:mb-4">Price</TitleComponent>
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <div className="flex-1 flex items-center bg-off-white h-10 md:h-11 border border-transparent focus-within:border-gray-200 duration-300">
                    <div className="w-8 md:w-10 h-full flex items-center justify-center border-r border-gray-200">
                        <span className="text-xs font-black text-dark/40">$</span>
                    </div>
                    <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        className="w-full bg-transparent border-none text-xs md:text-sm font-bold text-dark/60 text-center focus:ring-0"
                    />
                </div>
                <span className="text-dark/40 font-bold">-</span>
                <div className="flex-1 flex items-center bg-off-white h-10 md:h-11 border border-transparent focus-within:border-gray-200 duration-300">
                    <div className="w-8 md:w-10 h-full flex items-center justify-center border-r border-gray-200">
                        <span className="text-xs font-black text-dark/40">$</span>
                    </div>
                    <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                        className="w-full bg-transparent border-none text-xs md:text-sm font-bold text-dark/60 text-center focus:ring-0"
                    />
                </div>
            </div>
        </div>

        {/* Colors Box */}
        <div className="border border-gray-100 p-5 md:p-6 mb-6">
            <TitleComponent type="h5" className="text-dark mb-3 md:mb-4">Colors</TitleComponent>
            <div className="flex flex-wrap gap-2 md:gap-3">
                {colors.map((color) => (
                    <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={clsx(
                            "size-5 rounded-sm relative",
                            color.class,
                            selectedColor === color.name && "ring-2 ring-offset-2 ring-amber"
                        )}
                    />
                ))}
            </div>
        </div>

        {/* Smart Size Filters */}
        {sizeGroups.map(group => group.show && (
            <div key={group.id} className="border border-gray-100 p-5 md:p-6 mb-6">
                <TitleComponent type="h5" className="text-dark mb-3 md:mb-4">{group.label}</TitleComponent>
                <div className="flex flex-col gap-2 md:gap-3">
                    {group.options.map((size) => (
                        <label key={size} className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    checked={selectedSizes.includes(size)}
                                    onChange={() => handleSizeToggle(size)}
                                />
                                <div className="size-3.5 md:size-4 bg-gray-100 duration-300 peer-checked:bg-amber group-hover:bg-amber/50" />
                            </div>
                            <span className="text-xs md:text-sm font-medium text-dark/60 group-hover:text-dark duration-300">{size}</span>
                        </label>
                    ))}
                </div>
            </div>
        ))}

        {/* Ratings Box */}
        <div className="border border-gray-100 p-5 md:p-6 mb-6">
            <TitleComponent type="h5" className="text-dark mb-3 md:mb-4">Ratings</TitleComponent>
            <div className="flex flex-col gap-3 md:gap-4">
                {[5, 4, 3, 2, 1].map((stars) => (
                    <label key={stars} className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                            <input
                                type="checkbox"
                                className="peer sr-only"
                                checked={selectedRatings.includes(stars)}
                                onChange={() => handleRatingToggle(stars)}
                            />
                            <div className="size-3.5 md:size-4 bg-gray-100 duration-300 peer-checked:bg-amber group-hover:bg-amber/50" />
                        </div>
                        <div className="flex items-center gap-0.5 md:gap-1">
                            {[...Array(5)].map((_, i) => (
                                <StarIcon key={i} size={14} weight="fill" className={clsx(i < stars ? "text-amber" : "text-gray-200")} />
                            ))}
                        </div>
                        <span className="text-xs font-bold text-dark/40 ml-auto">{stars.toFixed(1)}</span>
                    </label>
                ))}
            </div>
        </div>
    </>
);

export default ShopPage;
