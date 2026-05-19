import { useState, useEffect, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
    DotsSixVerticalIcon, XIcon, StackIcon, MagnifyingGlassIcon, PlusSquareIcon
} from '@phosphor-icons/react';
import clsx from 'clsx';

import TitleComponent from '../../components/titleComponent/titleComponent';
import ThemeButton from '../../components/themeButton/themeButton';

import { AllProducts } from '../../Data';

const COLLECTIONS = [
    'Featured', 'Hot Sale', 'Premium', 'New Arrivals', 'Top Rated', 'Bestseller'
];

const tabToTag = {
    'Featured': 'featured',
    'Hot Sale': 'hot-sale',
    'Premium': 'premium',
    'New Arrivals': 'new-arrival',
    'Top Rated': 'top-rated',
    'Bestseller': 'bestseller'
};

const CollectionsManagerPage = () => {
    const { isCollapsed = false } = useOutletContext() || {};
    const [activeCollection, setActiveCollection] = useState('featured');
    const [searchQuery, setSearchQuery] = useState('');

    // Initialize collectionProducts from AllProducts filter based on activeCollection
    const [collectionProducts, setCollectionProducts] = useState(() =>
        AllProducts.filter(p => p.tags && p.tags.includes('featured'))
    );

    const [draggedIndex, setDraggedIndex] = useState(null);
    const [showToast, setShowToast] = useState(false);

    // Tab switching reset: resets search and loads fresh list from AllProducts
    useEffect(() => {
        const filtered = AllProducts.filter(p => p.tags && p.tags.includes(activeCollection));
        setCollectionProducts(filtered);
        setSearchQuery('');
    }, [activeCollection]);

    // Tab counts
    const getTabCount = (colName) => {
        const tag = tabToTag[colName];
        if (tag === activeCollection) {
            return collectionProducts.length;
        }
        return AllProducts.filter(p => p.tags && p.tags.includes(tag)).length;
    };

    // Right panel: products NOT in collectionProducts AND matches searchQuery (case-insensitive)
    const availableProducts = useMemo(() => {
        return AllProducts.filter(p => {
            const isAlreadyIn = collectionProducts.some(cp => cp.id === p.id);
            if (isAlreadyIn) return false;

            return p.name.toLowerCase().includes(searchQuery.toLowerCase());
        });
    }, [collectionProducts, searchQuery]);

    // Add product to collectionProducts state
    const handleAddProduct = (product) => {
        if (collectionProducts.some(cp => cp.id === product.id)) return;
        setCollectionProducts(prev => [...prev, product]);
    };

    // Remove product from collectionProducts state
    const handleRemoveProduct = (product) => {
        setCollectionProducts(prev => prev.filter(p => p.id !== product.id));
    };

    // HTML5 Drag-and-drop
    const handleDragStart = (e, index) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetIndex) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === targetIndex) return;

        const updated = [...collectionProducts];
        const [draggedItem] = updated.splice(draggedIndex, 1);
        updated.splice(targetIndex, 0, draggedItem);
        setCollectionProducts(updated);
        setDraggedIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    // Save order triggers console log and success toast
    const handleSaveOrder = () => {
        console.log(`Final order for collection "${activeCollection}":`, collectionProducts);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 2000);
    };

    // Helper for active label
    const activeLabel = useMemo(() => {
        return COLLECTIONS.find(col => tabToTag[col] === activeCollection) || 'Featured';
    }, [activeCollection]);

    return (
        <div className="pb-32 md:pb-24 pt-8 px-4 sm:px-8">
            {/* Header */}
            <div className="mb-6">
                <TitleComponent type="h2" className="text-dark font-bold tracking-tight">
                    Collections
                </TitleComponent>
                <TitleComponent size="small-medium" className="text-dark/40 mt-1">
                    Manage which products appear in each collection
                </TitleComponent>
            </div>

            {/* Collection Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-gray-100 pb-4 mb-6">
                {COLLECTIONS.map((col) => {
                    const tag = tabToTag[col];
                    const isActive = activeCollection === tag;
                    return (
                        <button
                            key={col}
                            onClick={() => setActiveCollection(tag)}
                            className={clsx(
                                "border border-transparent sm:px-6 px-4 sm:py-3 py-2.5 text-sm font-semibold duration-300 flex items-center",
                                isActive
                                    ? "bg-dark text-white"
                                    : "bg-white border-gray-200 text-dark/50 hover:border-dark"
                            )}
                        >
                            {col}
                            <span className="flex justify-center items-center bg-amber/20 text-amber text-xs font-bold ml-2 size-5">
                                {getTabCount(col)}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Content Columns */}
            <div className="flex flex-col lg:flex-row gap-6 items-start">

                {/* Left Panel: Products In Collection */}
                <div className="w-full lg:w-3/5 bg-white border border-gray-100 p-6 shadow-1">
                    <div className="flex items-center justify-between mb-6">
                        <TitleComponent type="h5" className="font-bold text-dark">
                            Products in {activeLabel}
                        </TitleComponent>
                        {collectionProducts.length > 0 && (
                            <span className="text-xs text-dark/50 font-medium flex items-center gap-1.5">
                                <DotsSixVerticalIcon size={16} weight="bold" />
                                Drag to reorder
                            </span>
                        )}
                    </div>

                    {/* Products List */}
                    <div className="min-h-60">
                        {collectionProducts.length > 0 ? (
                            collectionProducts.map((product, index) => (
                                <div
                                    key={product.id}
                                    draggable={true}
                                    onDragStart={(e) => handleDragStart(e, index)}
                                    onDragOver={(e) => handleDragOver(e, index)}
                                    onDrop={(e) => handleDrop(e, index)}
                                    onDragEnd={handleDragEnd}
                                    className={clsx(
                                        "flex items-center gap-4 sm:p-4 p-3 bg-white border border-gray-100 mb-3 hover:border-amber/30 duration-300 group",
                                        draggedIndex === index && "opacity-50"
                                    )}
                                >
                                    <div className="text-dark/20 cursor-grab active:cursor-grabbing hover:text-dark/50 duration-300">
                                        <DotsSixVerticalIcon size={18} weight="bold" />
                                    </div>
                                    <div className="size-14 bg-card-lighter border border-gray-100 shrink-0 overflow-hidden flex items-center justify-center">
                                        <img src={product.image || product.img} alt={product.name} className="w-full h-full object-contain p-1" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <TitleComponent type="h6" className='truncate max-sm:text-base text-dark'>{product.name}</TitleComponent>
                                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                            <span className="bg-amber/10 text-amber text-xs font-bold px-2 py-0.5 uppercase tracking-wider">
                                                {product.category}
                                            </span>
                                            <span className="text-xs text-dark/40 font-semibold">
                                                {typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveProduct(product)}
                                        className="sm:size-8 size-6 border border-gray-200 text-dark/30 flex items-center justify-center hover:border-red-300 hover:text-red-400 hover:bg-red-50 duration-300"
                                        title="Remove from collection"
                                    >
                                        <XIcon size={16} weight="bold" />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="py-16 flex flex-col items-center justify-center text-center">
                                <StackIcon size={48} className="text-dark/10 mb-4" weight="bold" />
                                <TitleComponent type="h6" className="text-dark">No products in this collection</TitleComponent>
                                <TitleComponent size='extra-small' className="text-dark/40 mt-1">Use the panel on the right to add products.</TitleComponent>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel: Add Products */}
                <div className="w-full lg:w-2/5 bg-white border border-gray-100 p-6 shadow-1">
                    <TitleComponent type="h5" className="text-dark mb-6">
                        Add to {activeLabel}
                    </TitleComponent>

                    {/* Search bar */}
                    <div className="flex items-center border border-gray-200 px-4 py-3 gap-2.5 mb-4 focus-within:border-amber group duration-300">
                        <MagnifyingGlassIcon size={18} weight="bold" className="text-dark/35 group-focus-within:text-amber duration-300" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products to add..."
                            className="w-full text-sm text-dark placeholder:text-dark/30 font-medium"
                        />
                    </div>

                    {/* Available Products List */}
                    <div className="max-h-128 overflow-y-auto custom-scrollbar divide-y divide-gray-50 border border-gray-100">
                        {availableProducts.length > 0 ? (
                            availableProducts.map((product) => (
                                <div
                                    key={product.id}
                                    onClick={() => handleAddProduct(product)}
                                    className="flex items-center gap-3 p-3 hover:bg-row-hover duration-300 group"
                                >
                                    <div className="size-10 bg-card-lighter border border-gray-100 shrink-0 overflow-hidden flex items-center justify-center">
                                        <img src={product.image || product.img} alt={product.name} className="w-full h-full object-contain p-1" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-bold text-dark truncate group-hover:text-amber duration-300">{product.name}</h4>
                                        <div className="flex flex-wrap items-center gap-2 mt-1">
                                            <p className="text-xs text-dark/40 font-bold bg-dark/5 px-1.5 py-0.5 uppercase">
                                                {product.category}
                                            </p>
                                            <p className="text-xs text-dark/50 font-bold">
                                                {typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price}
                                            </p>
                                        </div>
                                    </div>
                                    <PlusSquareIcon size={22} weight="regular" className="text-amber hover:text-dark duration-300 shrink-0" />
                                </div>
                            ))
                        ) : (
                            <div className="py-12">
                                <TitleComponent size="extra-small-semibold" className='text-center text-dark/30'>
                                    No matching products found
                                </TitleComponent>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            <div className={clsx(
                "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 sm:px-8 py-4 z-50 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 duration-300",
                isCollapsed ? "lg:left-20" : "lg:left-64 xl:left-72"
            )}>
                <TitleComponent size="small-semibold" className='text-dark text-center sm:text-left'>Changes are saved automatically when you add or remove products.</TitleComponent>
                <ThemeButton
                    onClick={handleSaveOrder}
                    className="w-full sm:w-auto"
                >
                    Save Collection Order
                </ThemeButton>
            </div>

            {showToast && (
                <div className="fixed bottom-6 right-6 bg-dark px-6 py-3 duration-300 z-50 animate-fadeIn shadow-lg">
                    <TitleComponent size='small-bold' className='text-white'>
                        Collection order saved!
                    </TitleComponent>
                </div>
            )}
        </div>
    );
};

export default CollectionsManagerPage;
