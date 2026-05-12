import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBagIcon, HeartIcon, UserIcon, ListIcon, XIcon, CaretDownIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';
import clsx from 'clsx';

import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

import { MenuData } from '../../Data';

const Header = () => {
    const { items: wishlistItems } = useWishlist();
    const { getItemCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [isSearchCategoriesOpen, setIsSearchCategoriesOpen] = useState(false);
    const [selectedSearchCategory, setSelectedSearchCategory] = useState('All Categories');
    const [openIndex, setOpenIndex] = useState(null);
    const location = useLocation();

    const categoriesRef = useRef(null);
    const searchCategoriesRef = useRef(null);
    const contentRefs = useRef([]);
    const [contentHeights, setContentHeights] = useState([]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setOpenIndex(null);
    };

    const toggleCategories = () => {
        setIsCategoriesOpen(!isCategoriesOpen);
    };

    const toggleSearchCategories = () => {
        setIsSearchCategoriesOpen(!isSearchCategoriesOpen);
    };

    const handleSearchCategorySelect = (category) => {
        setSelectedSearchCategory(category);
        setIsSearchCategoriesOpen(false);
    };

    const toggleCollapse = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    useEffect(() => {
        const heights = contentRefs.current.map(ref => ref?.scrollHeight || 0);
        setContentHeights(heights);
    }, [MenuData]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
                setIsCategoriesOpen(false);
            }
            if (searchCategoriesRef.current && !searchCategoriesRef.current.contains(event.target)) {
                setIsSearchCategoriesOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isItemActive = (item) => {
        if (location.pathname === item.path) return true;
        if (item.submenu) {
            return item.submenu.some(sub => location.pathname === sub.path);
        }
        return false;
    };

    const allowedCategories = ['Clothing', 'Shoes', 'New Arrivals'];
    const filteredCategories = MenuData.filter(item => allowedCategories.includes(item.name));

    return (
        <>
            <div className={clsx(
                "fixed inset-0 z-[60] lg:hidden",
                !isMenuOpen && "pointer-events-none"
            )}>
                <div
                    className={clsx(
                        "absolute inset-0 bg-dark-65 backdrop-blur-sm duration-500",
                        isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 invisible pointer-events-none"
                    )}
                    onClick={toggleMenu}
                />

                <div className={clsx(
                    "absolute right-0 top-0 h-full max-w-xs sm:max-w-[320px] w-full bg-white shadow-2 flex flex-col p-6 overflow-y-auto duration-300 pointer-events-auto",
                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                )}>
                    <div className="flex items-center justify-between mb-10">
                        <Link to="/" onClick={toggleMenu} className="text-xl font-playfairDisplay font-bold text-dark">
                            E-SHOP
                        </Link>
                        <button onClick={toggleMenu} className="text-dark hover:text-primary duration-300">
                            <XIcon size={24} weight="bold" />
                        </button>
                    </div>

                    <ul className="flex flex-col gap-y-5">
                        {MenuData.map((item, index) => (
                            <li key={index} className="relative group">
                                {item.submenu ? (
                                    <>
                                        <button
                                            className="flex justify-between items-center w-full cursor-pointer duration-500 group"
                                            onClick={() => toggleCollapse(index)}
                                        >
                                            <span className={clsx(
                                                "text-lg font-medium tracking-wide duration-300",
                                                isItemActive(item) || openIndex === index ? "text-primary" : "text-dark group-hover:text-primary"
                                            )}>
                                                {item.name}
                                            </span>
                                            <CaretDownIcon
                                                size={18}
                                                weight="bold"
                                                className={clsx(
                                                    "duration-500",
                                                    openIndex === index ? "rotate-180 text-primary" : "text-dark group-hover:text-primary"
                                                )}
                                            />
                                        </button>
                                        <ul
                                            ref={(el) => (contentRefs.current[index] = el)}
                                            className="overflow-hidden duration-500 ease-in-out"
                                            style={{
                                                height: openIndex === index ? contentHeights[index] : "0px",
                                            }}
                                        >
                                            <div className="flex flex-col gap-y-3 pl-4 py-4">
                                                {item.submenu.map((sub, subIndex) => (
                                                    <li key={subIndex}>
                                                        <Link
                                                            className={clsx(
                                                                "text-base font-medium duration-300",
                                                                location.pathname === sub.path ? "text-primary" : "text-dark hover:text-primary"
                                                            )}
                                                            to={sub.path}
                                                            onClick={toggleMenu}
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </div>
                                        </ul>
                                    </>
                                ) : (
                                    <Link
                                        className={clsx(
                                            "text-lg font-medium tracking-wide duration-300 hover:text-primary",
                                            location.pathname === item.path ? "text-primary" : "text-dark"
                                        )}
                                        to={item.path}
                                        onClick={toggleMenu}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-auto pt-8 flex items-center justify-center gap-6 border-t border-grey-100">
                        <p className="text-xs text-dark-40 uppercase tracking-widest font-bold">Follow Us</p>
                    </div>
                </div>
            </div>

            <header className="sticky top-0 z-50 bg-white border-b border-grey-100 py-4 sm:py-5 duration-300">
                <div className="container">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-4">
                            <button onClick={toggleMenu} className="lg:hidden text-dark hover:text-primary duration-300">
                                <ListIcon size={24} className="sm:size-7" />
                            </button>
                            <Link to="/" className="text-2xl font-playfairDisplay font-bold tracking-tight text-dark whitespace-nowrap">
                                E-SHOP
                            </Link>
                        </div>

                        <nav className="hidden lg:flex">
                            <ul className="flex items-center gap-8">
                                {MenuData.map((item, index) => (
                                    <li key={index} className="relative group flex items-center">
                                        {item.submenu ? (
                                            <>
                                                <div className="flex items-center gap-1 cursor-pointer py-2 group">
                                                    <span className={clsx(
                                                        "xl:text-lg text-base font-medium tracking-wide duration-300 group-hover:text-primary",
                                                        isItemActive(item) ? "text-primary" : "text-dark"
                                                    )}>
                                                        {item.name}
                                                    </span>
                                                    <CaretDownIcon
                                                        size={14}
                                                        weight="bold"
                                                        className={clsx(
                                                            "duration-300 group-hover:rotate-180",
                                                            isItemActive(item) ? "text-primary" : "text-dark group-hover:text-primary"
                                                        )}
                                                    />
                                                </div>
                                                <ul className="absolute top-full left-0 opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 duration-300 z-50">
                                                    <div className="bg-white shadow-2 min-w-[220px] border border-grey-100">
                                                        {item.submenu.map((sub, subIndex) => (
                                                            <li key={subIndex}>
                                                                <Link
                                                                    className={clsx(
                                                                        "block px-6 py-3 text-base duration-300 hover:bg-light-bg hover:text-primary",
                                                                        location.pathname === sub.path ? "text-primary bg-light-bg/50" : "text-dark"
                                                                    )}
                                                                    to={sub.path}
                                                                >
                                                                    {sub.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </div>
                                                </ul>
                                            </>
                                        ) : (
                                            <Link
                                                className={clsx(
                                                    "xl:text-lg text-base font-medium tracking-wide duration-300 hover:text-primary",
                                                    location.pathname === item.path ? "text-primary" : "text-dark"
                                                )}
                                                to={item.path}
                                            >
                                                {item.name}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div className="flex items-center gap-3 sm:gap-6">
                            <Link to="/wishlist" className="relative text-dark hover:text-primary duration-300">
                                <HeartIcon size={24} className="sm:size-7" />
                                <span className="absolute -top-1.5 -right-1.5 size-4 sm:size-5 bg-primary text-dark text-[9px] sm:text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                                    {wishlistItems.length}
                                </span>
                            </Link>
                            <Link to="/cart" className="relative text-dark hover:text-primary duration-300">
                                <ShoppingBagIcon size={24} className="sm:size-7" />
                                <span className="absolute -top-1.5 -right-1.5 size-4 sm:size-5 bg-primary text-dark text-[9px] sm:text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                                    {getItemCount()}
                                </span>
                            </Link>
                            <Link to="/profile" className="text-dark hover:text-primary duration-300">
                                <UserIcon size={24} className="sm:size-7" />
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="bg-white border-b border-grey-100 py-3 md:py-4">
                <div className="container">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 lg:gap-6">
                        <div className="relative w-full md:w-auto" ref={categoriesRef}>
                            <button
                                onClick={toggleCategories}
                                className={clsx(
                                    "flex items-center gap-3 px-6 md:px-8 py-3.5 w-full md:min-w-[240px] cursor-pointer duration-300",
                                    isCategoriesOpen ? "bg-primary text-dark" : "bg-dark text-white hover:bg-dark-65"
                                )}
                            >
                                {isCategoriesOpen ? (
                                    <XIcon size={20} weight="bold" />
                                ) : (
                                    <ListIcon size={20} weight="bold" />
                                )}
                                <span className="text-base font-semibold tracking-wider">Categories</span>
                            </button>

                            <ul className={clsx(
                                "absolute top-full left-0 w-full bg-white shadow-2 duration-300 z-40 border border-grey-100",
                                isCategoriesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-4"
                            )}>
                                {filteredCategories.map((item, index) => (
                                    <li key={index} className="relative group/sub">
                                        <Link
                                            to={item.path}
                                            className={clsx(
                                                "flex items-center justify-between px-6 py-4 duration-300",
                                                isItemActive(item)
                                                    ? "bg-primary text-dark font-bold"
                                                    : "text-dark hover:bg-light-bg hover:text-primary"
                                            )}
                                            onClick={() => setIsCategoriesOpen(false)}
                                        >
                                            <span className="text-base font-medium">{item.name}</span>
                                            {item.submenu && <CaretDownIcon size={14} weight="bold" className="-rotate-90" />}
                                        </Link>

                                        {item.submenu && (
                                            <ul className="absolute top-0 left-full w-full bg-white shadow-2 opacity-0 invisible translate-x-4 group-hover/sub:opacity-100 group-hover/sub:visible group-hover/sub:translate-x-0 duration-300 border border-grey-100 hidden md:block">
                                                {item.submenu.map((sub, subIndex) => (
                                                    <li key={subIndex}>
                                                        <Link
                                                            to={sub.path}
                                                            className={clsx(
                                                                "block px-6 py-4 text-base duration-300",
                                                                location.pathname === sub.path ? "bg-primary text-dark font-bold" : "text-dark hover:bg-light-bg hover:text-primary"
                                                            )}
                                                            onClick={() => setIsCategoriesOpen(false)}
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex-1 flex items-center bg-light-bg w-full">
                            <input
                                type="text"
                                placeholder="What are you looking for?"
                                className="flex-1 bg-transparent px-4 md:px-6 py-3.5 text-base text-dark placeholder:text-dark-40 outline-none min-w-0"
                            />

                            <div className="relative px-3 md:px-6 border-l border-dark/10" ref={searchCategoriesRef}>
                                <button
                                    onClick={toggleSearchCategories}
                                    className="flex items-center gap-2 text-base font-bold text-dark cursor-pointer py-3.5 whitespace-nowrap"
                                >
                                    <span>{selectedSearchCategory}</span>
                                    <CaretDownIcon size={14} weight="bold" className={clsx("duration-300", isSearchCategoriesOpen && "rotate-180")} />
                                </button>

                                <ul className={clsx(
                                    "absolute top-full right-0 min-w-[150px] md:min-w-[180px] bg-white shadow-2 duration-300 z-40 border border-grey-100",
                                    isSearchCategoriesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-4"
                                )}>
                                    {['All Categories', 'Featured', 'Best Selling', 'Latest'].map((cat) => (
                                        <li key={cat}>
                                            <button
                                                onClick={() => handleSearchCategorySelect(cat)}
                                                className={clsx(
                                                    "w-full text-left px-6 py-3 text-sm md:text-base duration-300",
                                                    selectedSearchCategory === cat ? "bg-primary text-dark font-bold" : "text-dark hover:bg-light-bg hover:text-primary"
                                                )}
                                            >
                                                {cat}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Search Button */}
                            <button className="bg-dark text-white p-3.5 md:p-4 duration-300 hover:bg-primary hover:text-dark">
                                <MagnifyingGlassIcon size={20} weight="bold" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
