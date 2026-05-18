import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import TitleComponent from '../../titleComponent/titleComponent';
import ThemeButton from '../../themeButton/themeButton';
import { UploadSimpleIcon, XIcon, CheckIcon, TrashIcon, WarningIcon } from '@phosphor-icons/react';
import clsx from 'clsx';

const CATEGORIES = {
    Clothing: ['Shirts', 'Pants', 'Jackets'],
    Shoes: ['Formal Shoes', 'Sneakers', 'Joggers']
};

const SIZE_TYPES = {
    Alpha: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    Waist: ['28', '30', '32', '34', '36', '38', '40'],
    'Shoe EU': ['38', '39', '40', '41', '42', '43', '44', '45']
};

const PRESET_COLORS = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#ffffff' },
    { name: 'Navy', hex: '#0a192f' },
    { name: 'Brown', hex: '#5c4033' },
    { name: 'Gray', hex: '#808080' },
    { name: 'Tan', hex: '#d2b48c' },
    { name: 'Red', hex: '#ff0000' },
    { name: 'Olive', hex: '#808000' }
];

const COLLECTIONS = [
    'Featured', 'Hot Sale', 'Premium', 'New Arrival', 'Top Rated', 'Bestseller'
];

const ProductForm = ({ initialData, isEditMode = false, onSubmit, onDelete, onCancel, title, subtitle }) => {
    const navigate = useNavigate();
    const { isCollapsed } = useOutletContext() || { isCollapsed: false };
    const [isLoading, setIsLoading] = useState(true);

    const product = initialData;

    // State initialization
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Clothing');
    const [subCategory, setSubCategory] = useState('');

    const [regularPrice, setRegularPrice] = useState('');
    const [salePrice, setSalePrice] = useState('');

    const [stock, setStock] = useState('');
    const [sizeType, setSizeType] = useState('Alpha');
    const [lowStock, setLowStock] = useState('5');
    const [selectedSizes, setSelectedSizes] = useState([]);

    const [selectedColors, setSelectedColors] = useState([]);
    const [customColorHex, setCustomColorHex] = useState('#000000');
    const [customColorName, setCustomColorName] = useState('');

    const [specs, setSpecs] = useState({ fit: 'Regular', collar: 'Button-down', fabric: '', rise: 'Mid-rise', sole: '', closure: '', upper: '' });

    // SEO State
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [imageAltText, setImageAltText] = useState('');

    const [imageUrl, setImageUrl] = useState('');
    const [currentImage, setCurrentImage] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [isFeatured, setIsFeatured] = useState(false);
    const [badgeLabel, setBadgeLabel] = useState('');
    const [selectedCollections, setSelectedCollections] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (product) {
            const rawData = product.fullData || {};
            setName(product.name || '');
            setDescription(rawData.description || '');
            setCategory(product.category || 'Clothing');
            setSubCategory(rawData.subCategory || (product.category === 'Shoes' ? 'Formal Shoes' : 'Shirts'));

            const pStr = product.price ? product.price.replace('$', '') : '';
            const oStr = product.oldPrice ? product.oldPrice.replace('$', '') : '';
            setRegularPrice(rawData.regularPrice || oStr || pStr);
            setSalePrice(rawData.salePrice || (oStr ? pStr : ''));

            setStock(product.stock?.toString() || '0');
            setSizeType(rawData.sizeType || 'Alpha');
            setLowStock(rawData.lowStock || '5');
            setSelectedSizes(rawData.selectedSizes || []);

            setSelectedColors(rawData.selectedColors || []);
            setCustomColorHex(rawData.customColorHex || '#000000');
            setCustomColorName(rawData.customColorName || '');

            setSpecs(rawData.specs || { fit: 'Regular', collar: 'Button-down', fabric: '', rise: 'Mid-rise', sole: '', closure: '', upper: '' });

            setImageUrl('');
            setCurrentImage(product.img || '');
            setIsActive(rawData.isActive ?? true);
            setIsFeatured(product.tags?.includes('Featured') || false);
            const explicitBadge = product.tags?.find(t => t !== 'Featured' && t !== 'New');
            setBadgeLabel(rawData.badgeLabel || explicitBadge || '');
            setSelectedCollections(rawData.selectedCollections || []);

            setMetaTitle(rawData.metaTitle || '');
            setMetaDescription(rawData.metaDescription || '');
            setImageAltText(rawData.imageAltText || '');

            setIsLoading(false);
        } else if (!isEditMode) {
            setSubCategory(CATEGORIES['Clothing'][0]);
            setIsLoading(false);
        } else {
            // Product not found, maybe redirect
            navigate('/admin/products');
        }
    }, [product, navigate, isEditMode]);

    // Derived State
    const discount = (regularPrice && salePrice && Number(regularPrice) > Number(salePrice))
        ? (((Number(regularPrice) - Number(salePrice)) / Number(regularPrice)) * 100).toFixed(0)
        : 0;

    const handleSave = () => {
        const productData = {
            name, description, category, subCategory, regularPrice, salePrice, stock, sizeType, lowStock, selectedSizes, selectedColors, customColorHex, customColorName, specs, imageUrl: imageUrl || currentImage, isActive, isFeatured, badgeLabel, selectedCollections, metaTitle, metaDescription, imageAltText
        };
        if (onSubmit) onSubmit(productData);
    };

    const handleDeletePermanently = () => {
        setIsModalOpen(false);
        if (onDelete) onDelete();
    };

    if (isLoading) return null;

    const handleCategoryChange = (e) => {
        const newCat = e.target.value;
        setCategory(newCat);
        setSubCategory(CATEGORIES[newCat][0]);
        if (newCat === 'Shoes') setSizeType('Shoe EU');
        else setSizeType('Alpha');
        setSelectedSizes([]);
    };

    const toggleSize = (size) => {
        if (selectedSizes.includes(size)) {
            setSelectedSizes(selectedSizes.filter(s => s !== size));
        } else {
            setSelectedSizes([...selectedSizes, size]);
        }
    };

    const toggleColor = (hex) => {
        if (selectedColors.includes(hex)) {
            setSelectedColors(selectedColors.filter(c => c !== hex));
        } else {
            setSelectedColors([...selectedColors, hex]);
        }
    };

    const toggleCollection = (col) => {
        if (selectedCollections.includes(col)) {
            setSelectedCollections(selectedCollections.filter(c => c !== col));
        } else {
            setSelectedCollections([...selectedCollections, col]);
        }
    };

    return (
        <div className="relative pb-24 min-h-screen flex flex-col">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 px-4 sm:px-8 pt-8">
                <div>
                    <TitleComponent type="h2" className="text-dark">{title}</TitleComponent>
                    {subtitle}
                </div>
                <div className="flex items-center gap-3">
                    <ThemeButton
                        variant="secondary"
                        onClick={onCancel || (() => navigate('/admin/products'))}
                        className="py-4 !text-sm"
                    >
                        Cancel
                    </ThemeButton>
                    {isEditMode && onDelete && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-4 py-2.5 border border-red-500 text-red-500 flex items-center justify-center hover:bg-red-50 duration-300"
                            title="Delete Product"
                        >
                            <TrashIcon size={18} weight="bold" />
                        </button>
                    )}
                    <ThemeButton
                        variant="primary"
                        onClick={handleSave}
                        className="py-4 !text-sm"
                    >
                        {isEditMode ? 'Save Changes' : 'Save Product'}
                    </ThemeButton>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="flex-1 px-4 sm:px-8 flex flex-col lg:flex-row gap-6">

                {/* Left Column - Form Fields */}
                <div className="w-full lg:w-2/3 space-y-6">

                    {/* Section 1: Basic Info */}
                    <div className="bg-white border border-gray-100 p-6 shadow-1">
                        <TitleComponent type="h5" className="text-dark mb-6 font-bold">Basic Information</TitleComponent>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-dark uppercase tracking-widest mb-2">Product Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Classic White Oxford Shirt"
                                    className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm font-medium text-dark focus:border-amber focus:bg-white duration-300"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-dark uppercase tracking-widest mb-2">Description</label>
                                <textarea
                                    rows="4"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Describe the product..."
                                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-sm font-medium text-dark focus:border-amber focus:bg-white duration-300 custom-scrollbar resize-y"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-dark uppercase tracking-widest mb-2">Category</label>
                                    <select
                                        value={category}
                                        onChange={handleCategoryChange}
                                        className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm font-medium text-dark cursor-pointer focus:border-amber focus:bg-white duration-300"
                                    >
                                        <option value="Clothing">Clothing</option>
                                        <option value="Shoes">Shoes</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-dark uppercase tracking-widest mb-2">Sub-Category</label>
                                    <select
                                        value={subCategory}
                                        onChange={(e) => setSubCategory(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm font-medium text-dark cursor-pointer focus:border-amber focus:bg-white duration-300"
                                    >
                                        {CATEGORIES[category].map(sub => (
                                            <option key={sub} value={sub}>{sub}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Pricing */}
                    <div className="bg-white border border-gray-100 p-6 shadow-1">
                        <TitleComponent type="h5" className="font-bold text-dark mb-6">Pricing</TitleComponent>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                            <div>
                                <label className="block text-xs font-bold text-dark uppercase tracking-widest mb-2">Regular Price ($)</label>
                                <input
                                    type="number"
                                    value={regularPrice}
                                    onChange={(e) => setRegularPrice(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm font-medium text-dark focus:border-amber focus:bg-white duration-300"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-xs font-bold text-dark uppercase tracking-widest">Sale Price ($)</label>
                                    <span className="text-xs text-dark/40 font-bold">Leave empty if no discount</span>
                                </div>
                                <input
                                    type="number"
                                    value={salePrice}
                                    onChange={(e) => setSalePrice(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm font-medium text-dark focus:border-amber focus:bg-white duration-300"
                                />
                            </div>
                        </div>

                        {discount > 0 && (
                            <div className="mt-4 flex items-center gap-3 p-3 bg-green-50 border border-green-100">
                                <span className="text-sm font-bold text-dark">Discount Applied:</span>
                                <span className="bg-green-500 text-white text-xs font-black px-2 py-0.5">{discount}% OFF</span>
                            </div>
                        )}
                    </div>

                    {/* Section 3: Inventory */}
                    <div className="bg-white border border-gray-100 p-6 shadow-1">
                        <TitleComponent type="h5" className="font-bold text-dark mb-6">Inventory</TitleComponent>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                            <div>
                                <label className="block text-xs font-bold text-dark uppercase tracking-widest mb-2">Stock Quantity</label>
                                <input
                                    type="number"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm font-medium text-dark focus:border-amber focus:bg-white duration-300"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-dark uppercase tracking-widest mb-2">Size Type</label>
                                <select
                                    value={sizeType}
                                    onChange={(e) => {
                                        setSizeType(e.target.value);
                                        setSelectedSizes([]);
                                    }}
                                    className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm font-medium text-dark cursor-pointer focus:border-amber focus:bg-white duration-300"
                                >
                                    {Object.keys(SIZE_TYPES).map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-dark uppercase tracking-widest mb-2">Low Stock Threshold</label>
                                <input
                                    type="number"
                                    value={lowStock}
                                    onChange={(e) => setLowStock(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm font-medium text-dark focus:border-amber focus:bg-white duration-300"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-dark uppercase tracking-widest mb-3">Available Sizes</label>
                            <div className="flex flex-wrap gap-2">
                                {SIZE_TYPES[sizeType].map(size => {
                                    const isSelected = selectedSizes.includes(size);
                                    return (
                                        <button
                                            key={size}
                                            onClick={() => toggleSize(size)}
                                            className={clsx(
                                                "min-w-[40px] px-3 py-1.5 text-xs font-bold duration-300 border",
                                                isSelected
                                                    ? "bg-dark text-white border-dark shadow-md"
                                                    : "bg-white text-dark/70 border-gray-200 hover:border-dark"
                                            )}
                                        >
                                            {size}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Colors */}
                    <div className="bg-white border border-gray-100 p-6 shadow-1">
                        <TitleComponent type="h5" className="font-bold text-dark mb-6">Colors</TitleComponent>

                        <div className="mb-6">
                            <label className="block text-xs font-bold text-dark uppercase tracking-widest mb-3">Preset Colors</label>
                            <div className="flex flex-wrap gap-3">
                                {PRESET_COLORS.map(color => {
                                    const isSelected = selectedColors.includes(color.hex);
                                    return (
                                        <button
                                            key={color.hex}
                                            onClick={() => toggleColor(color.hex)}
                                            title={color.name}
                                            className={clsx(
                                                "size-8 rounded-full border-2 duration-300 ring-2 ring-offset-2",
                                                isSelected ? "border-white ring-amber" : "border-gray-200 ring-transparent hover:ring-gray-200",
                                                color.hex === '#ffffff' && "bg-white"
                                            )}
                                            style={{ backgroundColor: color.hex !== '#ffffff' ? color.hex : undefined }}
                                        >
                                            {isSelected && color.hex !== '#ffffff' && <CheckIcon size={16} weight="bold" className="text-white mx-auto" />}
                                            {isSelected && color.hex === '#ffffff' && <CheckIcon size={16} weight="bold" className="text-dark mx-auto" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-dark uppercase tracking-widest mb-3">Custom Color</label>
                            <div className="flex gap-3 max-w-sm">
                                <div className="size-10 shrink-0 border border-gray-200 overflow-hidden p-0.5 bg-white">
                                    <input
                                        type="color"
                                        value={customColorHex}
                                        onChange={(e) => setCustomColorHex(e.target.value)}
                                        className="w-full h-full cursor-pointer border-0 p-0 block"
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Color Name (e.g. Midnight Blue)"
                                    value={customColorName}
                                    onChange={(e) => setCustomColorName(e.target.value)}
                                    className="flex-1 bg-gray-50 border border-gray-200 px-4 py-2 text-sm font-medium text-dark focus:border-amber focus:bg-white duration-300"
                                />
                                <button className="px-4 py-2 bg-gray-100 text-dark text-xs font-bold uppercase tracking-widest border border-gray-200 hover:bg-gray-200 duration-300">
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Section 5: Specifications */}
                    <div className="bg-white border border-gray-100 p-6 shadow-1">
                        <TitleComponent type="h5" className="font-bold text-dark mb-6">Specifications</TitleComponent>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {(subCategory === 'Shirts' || subCategory === 'Pants') && (
                                <div>
                                    <label className="block text-xs font-bold text-dark uppercase tracking-widest mb-2">Fit</label>
                                    <select
                                        value={specs.fit}
                                        onChange={(e) => setSpecs({ ...specs, fit: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm font-medium text-dark cursor-pointer focus:border-amber focus:bg-white duration-300"
                                    >
                                        <option>Regular</option>
                                        <option>Slim</option>
                                        <option>Tailored</option>
                                    </select>
                                </div>
                            )}

                            {subCategory === 'Shirts' && (
                                <div>
                                    <label className="block text-xs font-bold text-dark uppercase tracking-widest mb-2">Collar</label>
                                    <select
                                        value={specs.collar}
                                        onChange={(e) => setSpecs({ ...specs, collar: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm font-medium text-dark cursor-pointer focus:border-amber focus:bg-white duration-300"
                                    >
                                        <option>Spread</option>
                                        <option>Button-down</option>
                                    </select>
                                </div>
                            )}

                            {subCategory === 'Pants' && (
                                <div>
                                    <label className="block text-xs font-bold text-dark uppercase tracking-widest mb-2">Rise</label>
                                    <select
                                        value={specs.rise}
                                        onChange={(e) => setSpecs({ ...specs, rise: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm font-medium text-dark cursor-pointer focus:border-amber focus:bg-white duration-300"
                                    >
                                        <option>Mid-rise</option>
                                        <option>High-rise</option>
                                        <option>Low-rise</option>
                                    </select>
                                </div>
                            )}

                            {(subCategory === 'Shirts' || subCategory === 'Pants') && (
                                <div>
                                    <label className="block text-xs font-bold text-dark uppercase tracking-widest mb-2">Fabric</label>
                                    <input
                                        type="text"
                                        value={specs.fabric}
                                        onChange={(e) => setSpecs({ ...specs, fabric: e.target.value })}
                                        placeholder="e.g. 100% Cotton"
                                        className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm font-medium text-dark focus:border-amber focus:bg-white duration-300"
                                    />
                                </div>
                            )}

                            {category === 'Shoes' && (
                                <>
                                    <div>
                                        <label className="block text-xs font-bold text-dark uppercase tracking-widest mb-2">Sole</label>
                                        <input
                                            type="text"
                                            value={specs.sole}
                                            onChange={(e) => setSpecs({ ...specs, sole: e.target.value })}
                                            placeholder="e.g. Rubber"
                                            className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm font-medium text-dark focus:border-amber focus:bg-white duration-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-dark uppercase tracking-widest mb-2">Closure</label>
                                        <select
                                            value={specs.closure}
                                            onChange={(e) => setSpecs({ ...specs, closure: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm font-medium text-dark cursor-pointer focus:border-amber focus:bg-white duration-300"
                                        >
                                            <option>Lace-up</option>
                                            <option>Slip-on</option>
                                            <option>Velcro</option>
                                        </select>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-bold text-dark uppercase tracking-widest mb-2">Upper Material</label>
                                        <input
                                            type="text"
                                            value={specs.upper}
                                            onChange={(e) => setSpecs({ ...specs, upper: e.target.value })}
                                            placeholder="e.g. Genuine Leather"
                                            className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm font-medium text-dark focus:border-amber focus:bg-white duration-300"
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Section 6: SEO */}
                    <div className="bg-white border border-gray-100 p-6 shadow-1">
                        <div className="flex items-center justify-between mb-6">
                            <TitleComponent type="h5" className="font-bold text-dark">Search Engine Optimization</TitleComponent>
                            <span className="bg-primary/10 text-primary text-xs uppercase tracking-widest font-bold px-2 py-0.5">SEO</span>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-xs font-bold text-dark uppercase tracking-widest">Meta Title</label>
                                    <span className={clsx("text-xs font-bold", metaTitle.length > 60 ? "text-red-500" : "text-dark/40")}>
                                        {metaTitle.length} / 60
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    value={metaTitle}
                                    onChange={(e) => setMetaTitle(e.target.value)}
                                    placeholder={name || "e.g. Classic White Oxford Shirt | E-SHOP"}
                                    className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm font-medium text-dark focus:border-amber focus:bg-white duration-300"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-xs font-bold text-dark uppercase tracking-widest">Meta Description</label>
                                    <span className={clsx("text-xs font-bold", metaDescription.length > 160 ? "text-red-500" : "text-dark/40")}>
                                        {metaDescription.length} / 160
                                    </span>
                                </div>
                                <textarea
                                    rows="3"
                                    value={metaDescription}
                                    onChange={(e) => setMetaDescription(e.target.value)}
                                    placeholder="Brief description for search results..."
                                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-sm font-medium text-dark focus:border-amber focus:bg-white duration-300 custom-scrollbar resize-y"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-xs font-bold text-dark uppercase tracking-widest">Image Alt Text</label>
                                    <span className="text-xs text-dark/40 font-bold">Improves accessibility & image search</span>
                                </div>
                                <input
                                    type="text"
                                    value={imageAltText}
                                    onChange={(e) => setImageAltText(e.target.value)}
                                    placeholder={name ? `${name} product image` : "Describe the image content..."}
                                    className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm font-medium text-dark focus:border-amber focus:bg-white duration-300"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Sidebar Panels */}
                <div className="w-full lg:w-1/3 space-y-6">

                    {/* Panel 1: Product Image */}
                    <div className="bg-white border border-gray-100 p-6 shadow-1">
                        <TitleComponent type="h5" className="font-bold text-dark mb-4">Product Image</TitleComponent>

                        {currentImage && (
                            <div className="mb-4">
                                <div className="h-52 bg-card-lighter border border-gray-200 p-2 overflow-hidden flex items-center justify-center">
                                    <img src={currentImage} alt="Current" className="max-w-full max-h-full object-contain" />
                                </div>
                                <p className="text-xs text-dark/40 font-bold uppercase tracking-widest mt-2">Current Image</p>
                            </div>
                        )}

                        <div className="border-2 border-dashed border-gray-200 p-8 flex flex-col items-center justify-center text-center hover:border-amber/50 hover:bg-amber/5 duration-300 cursor-pointer mb-4">
                            <UploadSimpleIcon size={32} weight="regular" className="text-dark/20 mb-3" />
                            <p className="text-sm font-semibold text-dark/70 mb-1">
                                Drop image to replace or <span className="text-amber">browse</span>
                            </p>
                            <p className="text-xs text-dark/30 font-bold uppercase tracking-widest">PNG, JPG up to 2MB</p>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="Or paste new image URL"
                                className="w-full bg-white border border-gray-200 px-4 py-2.5 text-sm font-medium text-dark focus:border-amber duration-300"
                            />
                        </div>

                        {imageUrl && (
                            <div className="mt-4 relative size-20 border border-gray-200 bg-gray-50 flex items-center justify-center group overflow-hidden">
                                <img src={imageUrl} alt="Preview" className="w-full h-full object-contain p-1" onError={(e) => e.target.style.display = 'none'} />
                                <button
                                    onClick={() => setImageUrl('')}
                                    className="absolute -top-1 -right-1 size-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300 hover:scale-110  shadow-1"
                                >
                                    <XIcon size={10} weight="bold" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Panel 2: Status */}
                    <div className="bg-white border border-gray-100 p-6 shadow-1">
                        <TitleComponent type="h5" className="font-bold text-dark mb-4">Status</TitleComponent>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-bold text-dark cursor-pointer select-none" onClick={() => setIsActive(!isActive)}>Active / Visible</label>
                                <button
                                    onClick={() => setIsActive(!isActive)}
                                    className={clsx(
                                        "w-10 h-5 rounded-full p-0.5 flex items-center duration-300",
                                        isActive ? "bg-amber justify-end" : "bg-gray-200 justify-start"
                                    )}
                                >
                                    <span className="szie-4 rounded-full bg-white shadow-1" />
                                </button>
                            </div>

                            <hr className="border-gray-100" />

                            <div className="flex items-center justify-between">
                                <label className="text-sm font-bold text-dark cursor-pointer select-none" onClick={() => setIsFeatured(!isFeatured)}>Featured Badge</label>
                                <button
                                    onClick={() => setIsFeatured(!isFeatured)}
                                    className={clsx(
                                        "w-10 h-5 rounded-full p-0.5 flex items-center duration-300",
                                        isFeatured ? "bg-amber justify-end" : "bg-gray-200 justify-start"
                                    )}
                                >
                                    <span className="size-4 rounded-full bg-white shadow-1" />
                                </button>
                            </div>

                            {isFeatured && (
                                <div className="pt-2 animate-fadeIn">
                                    <label className="block text-[10px] font-bold text-dark uppercase tracking-widest mb-1.5">Badge Label</label>
                                    <input
                                        type="text"
                                        value={badgeLabel}
                                        onChange={(e) => setBadgeLabel(e.target.value)}
                                        placeholder="e.g. New, Hot, Premium"
                                        className="w-full bg-gray-50 border border-gray-200 px-3 py-2 text-xs font-medium text-dark focus:border-amber focus:bg-white duration-300"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Panel 3: Collections */}
                    <div className="bg-white border border-gray-100 p-6 shadow-1">
                        <TitleComponent type="h5" className="font-bold text-dark mb-4">Collections</TitleComponent>

                        <div className="space-y-3">
                            {COLLECTIONS.map(col => (
                                <label key={col} className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedCollections.includes(col)}
                                            onChange={() => toggleCollection(col)}
                                            className="peer appearance-none size-4 border-2 border-gray-300 rounded-sm checked:bg-amber checked:border-amber shrink-0 cursor-pointer duration-200"
                                        />
                                        <CheckIcon size={10} weight="bold" className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none duration-200" />
                                    </div>
                                    <span className="text-sm font-semibold text-dark/70 group-hover:text-dark duration-300 select-none">
                                        {col}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Panel 4: Quick Summary */}
                    <div className="bg-row-hover border border-gray-100 p-6 shadow-1">
                        <TitleComponent type="h5" className="font-bold text-dark mb-4">Summary</TitleComponent>

                        <div className="space-y-4">
                            <div>
                                <TitleComponent size="small-bold" className='text-dark/40 uppercase tracking-widest mb-1'>Preview</TitleComponent>
                                <TitleComponent size="large-bold" className='font-playfairDisplay text-dark leading-tight'>
                                    {name || <span className="text-dark/20 italic">Product Name</span>}
                                </TitleComponent>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <span className="bg-amber/10 text-amber text-xs uppercase tracking-widest font-bold px-2 py-0.5">
                                    {subCategory}
                                </span>
                                {badgeLabel && isFeatured && (
                                    <span className="bg-dark text-white text-xs uppercase tracking-widest font-bold px-2 py-0.5">
                                        {badgeLabel}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-end gap-2">
                                <span className="font-bold text-xl text-dark">
                                    ${salePrice || regularPrice || '0.00'}
                                </span>
                                {salePrice && regularPrice && (
                                    <span className="text-sm text-dark/40 line-through mb-0.5 font-medium">
                                        ${regularPrice}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center justify-between border-t border-gray-200/50 pt-4 mt-2">
                                <span className="text-xs font-bold text-dark/60 uppercase tracking-widest">Stock: {stock}</span>
                                <span className="text-xs font-bold text-dark/60 uppercase tracking-widest">
                                    Status: <span className={isActive ? "text-green-600" : "text-gray-400"}>{isActive ? 'Active' : 'Hidden'}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Action Bar */}
            <div
                className={clsx(
                    "fixed bottom-0 right-0 bg-white border-t border-gray-100 px-4 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 z-40 shadow-action-bar duration-300",
                    isCollapsed ? "left-0 lg:left-20" : "left-0 lg:left-64 xl:left-72"
                )}
            >
                <ThemeButton
                    variant="secondary"
                    onClick={onCancel || (() => navigate('/admin/products'))}
                    className="py-4 !text-sm"
                >
                    Cancel
                </ThemeButton>
                <ThemeButton
                    variant="primary"
                    onClick={handleSave}
                    className="py-4 !text-sm"
                >
                    {isEditMode ? 'Save Changes' : 'Save Product'}
                </ThemeButton>
            </div>

            {/* Delete Confirmation Modal */}
            <div className={clsx(
                "fixed inset-0 bg-dark/50 z-50 flex items-center justify-center p-4 duration-300",
                isModalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}>
                <div className={clsx(
                    "bg-white p-8 max-w-md w-full text-center duration-300 transform",
                    isModalOpen ? "scale-100" : "scale-95"
                )}>
                    <div className="size-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <WarningIcon size={32} weight="fill" className="text-red-500" />
                    </div>
                    <TitleComponent type="h3" className="font-playfairDisplay font-bold text-dark mb-2">Delete Product?</TitleComponent>
                    <p className="text-dark/50 text-sm mb-8">
                        This action cannot be undone. The product will be permanently removed from your catalog.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 px-4 py-2.5 border border-gray-200 text-dark font-bold text-sm hover:bg-gray-50 duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDeletePermanently}
                            className="flex-1 px-4 py-2.5 bg-red-500 text-white font-bold text-sm hover:bg-red-600 duration-300"
                        >
                            Yes, Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
