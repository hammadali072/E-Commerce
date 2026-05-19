import { useState, useEffect, useMemo } from 'react';

import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import {
    MagnifyingGlassIcon, EyeIcon, PencilIcon, TrashIcon,
    CaretLeftIcon, CaretRightIcon, CaretDownIcon, WarningIcon, XIcon
} from '@phosphor-icons/react';
import clsx from 'clsx';

import TitleComponent from '../../components/titleComponent/titleComponent';
import ThemeButton from '../../components/themeButton/themeButton';
import CustomDropdown from '../../components/admin/customDropdown/customDropdown';
import { useProducts } from '../../context/ProductContext';

const ProductsListPage = () => {
    const navigate = useNavigate();
    const { products, deleteProduct, bulkDeleteProducts } = useProducts();
    const { isCollapsed } = useOutletContext() || { isCollapsed: false };
    const [selectedIds, setSelectedIds] = useState([]);

    // Modal State
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [productToView, setProductToView] = useState(null);

    // Filter & Pagination State
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('Category: All');
    const [statusFilter, setStatusFilter] = useState('Status: All');
    const [sortBy, setSortBy] = useState('Sort By: Name A-Z');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Derived Data (Filtering & Sorting)
    const filteredAndSortedProducts = useMemo(() => {
        let result = products.filter(product => {
            // Search
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.sku.toLowerCase().includes(searchQuery.toLowerCase());

            // Category
            const categoryValue = categoryFilter.replace('Category: ', '');
            const matchesCategory = categoryValue === 'All' || product.category === categoryValue;

            // Status
            const statusValue = statusFilter.replace('Status: ', '');
            let matchesStatus = true;
            if (statusValue === 'In Stock') matchesStatus = product.stock > 5;
            else if (statusValue === 'Low Stock') matchesStatus = product.stock > 0 && product.stock <= 5;
            else if (statusValue === 'Out of Stock') matchesStatus = product.stock === 0;

            return matchesSearch && matchesCategory && matchesStatus;
        });

        // Sorting
        result.sort((a, b) => {
            const sortValue = sortBy.replace('Sort By: ', '');
            if (sortValue === 'Name A-Z') {
                return a.name.localeCompare(b.name);
            } else if (sortValue === 'Price Low-High') {
                const priceA = parseFloat(a.price.replace('$', ''));
                const priceB = parseFloat(b.price.replace('$', ''));
                return priceA - priceB;
            } else if (sortValue === 'Stock Low-High') {
                return a.stock - b.stock;
            } else if (sortValue === 'Newest') {
                return parseInt(b.id) - parseInt(a.id);
            }
            return 0;
        });

        return result;
    }, [searchQuery, categoryFilter, statusFilter, sortBy]);

    // Pagination Logic
    const totalItems = filteredAndSortedProducts.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [totalItems, currentPage, totalPages]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredAndSortedProducts.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const toggleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(paginatedProducts.map(p => p.id));
        } else {
            setSelectedIds([]);
        }
    };

    const toggleSelect = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(itemId => itemId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const confirmDelete = () => {
        if (productToDelete === 'bulk') {
            bulkDeleteProducts(selectedIds);
            setSelectedIds([]);
        } else if (productToDelete) {
            deleteProduct(productToDelete);
            setSelectedIds(selectedIds.filter(id => id !== productToDelete));
        }
        setDeleteModalOpen(false);
        setProductToDelete(null);
    };

    const openViewModal = (product) => {
        setProductToView(product);
        setViewModalOpen(true);
    };

    const getStockColor = (stock) => {
        if (stock === 0) return 'text-red-500 bg-red-500';
        if (stock <= 5) return 'text-amber bg-amber';
        return 'text-green-600 bg-green-600';
    };

    const totalProductsCount = filteredAndSortedProducts.length;
    const inStockCount = filteredAndSortedProducts.filter(p => p.stock > 5).length;
    const lowStockCount = filteredAndSortedProducts.filter(p => p.stock > 0 && p.stock <= 5).length;
    const outOfStockCount = filteredAndSortedProducts.filter(p => p.stock === 0).length;

    return (
        <div className="relative pb-24">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 px-4 sm:px-8 pt-8">
                <div>
                    <TitleComponent type="h2" className="text-dark font-bold ">Products</TitleComponent>
                    <TitleComponent size="small-medium" className="text-dark/40 mt-1">Manage your product catalog</TitleComponent>
                </div>
                <ThemeButton
                    variant="dark"
                    onClick={() => navigate('/admin/products/add')}
                    className="py-4 !text-sm shadow-lg shadow-dark/5 whitespace-nowrap"
                >
                    Add New Product +
                </ThemeButton>
            </div>

            {/* Toolbar */}
            <div className="bg-table-header py-3 px-4 sm:px-8 flex flex-col lg:flex-row gap-4 mb-6">
                <div className="flex-1 flex items-center bg-white border border-gray-200 p-4 focus-within:border-primary/50 duration-300">
                    <MagnifyingGlassIcon size={18} weight="bold" className="text-dark/40 mr-2" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products by name..."
                        className="w-full text-sm text-dark placeholder:text-dark/30"
                    />
                </div>
                <div className="flex flex-wrap sm:flex-nowrap gap-3">
                    <CustomDropdown
                        options={['Category: All', 'Clothing', 'Shoes']}
                        value={categoryFilter}
                        onChange={setCategoryFilter}
                        className="min-w-[150px] w-full sm:w-auto z-30"
                    />
                    <CustomDropdown
                        options={['Status: All', 'In Stock', 'Low Stock', 'Out of Stock']}
                        value={statusFilter}
                        onChange={setStatusFilter}
                        className="min-w-[150px] w-full sm:w-auto z-20"
                    />
                    <CustomDropdown
                        options={['Sort By: Name A-Z', 'Price Low-High', 'Stock Low-High', 'Newest']}
                        value={sortBy}
                        onChange={setSortBy}
                        className="min-w-[180px] w-full sm:w-auto z-10"
                    />
                </div>
            </div>

            {/* Stats Strip */}
            <div className="flex flex-wrap items-center gap-3 mb-6 px-4 sm:px-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 text-sm font-bold text-dark shadow-1">
                    Total: {totalProductsCount} products
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 text-sm font-bold text-dark shadow-1">
                    <div className="size-2 rounded-full bg-green-600" /> In Stock: {inStockCount}
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 text-sm font-bold text-dark shadow-1">
                    <div className="size-2 rounded-full bg-amber" /> Low Stock: {lowStockCount}
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 text-sm font-bold text-dark shadow-1">
                    <div className="size-2 rounded-full bg-red-500" /> Out of Stock: {outOfStockCount}
                </div>
            </div>

            {/* Products Table */}
            <div className="mx-4 sm:mx-8 bg-white border border-gray-100 overflow-hidden shadow-1">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left min-w-max border-collapse">
                        <thead>
                            <tr className="bg-table-header">
                                <th className="px-6 py-4 w-12">
                                    <input
                                        type="checkbox"
                                        className="size-4 cursor-pointer accent-primary"
                                        checked={selectedIds.length === paginatedProducts.length && paginatedProducts.length > 0}
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-dark/70 w-1/3">Product</th>
                                <th className="px-6 py-4 text-sm font-semibold text-dark/70">Category</th>
                                <th className="px-6 py-4 text-sm font-semibold text-dark/70">Price</th>
                                <th className="px-6 py-4 text-sm font-semibold text-dark/70 w-32">Stock</th>
                                <th className="px-6 py-4 text-sm font-semibold text-dark/70 w-48">Tags</th>
                                <th className="px-6 py-4 text-sm font-semibold text-dark/70 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginatedProducts.length > 0 ? paginatedProducts.map((product) => {
                                const stockColors = getStockColor(product.stock).split(' ');
                                const textColor = stockColors[0];
                                const bgColor = stockColors[1];

                                return (
                                    <tr key={product.id} className="hover:bg-row-hover duration-300 group border-b border-gray-100 last:border-0">
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                className="size-4 cursor-pointer accent-primary"
                                                checked={selectedIds.includes(product.id)}
                                                onChange={() => toggleSelect(product.id)}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="size-14 bg-card-lighter overflow-hidden shrink-0 border border-gray-100">
                                                    <img src={product.img} alt={product.name} className="w-full h-full object-contain p-1" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-semibold text-dark text-sm truncate hover:text-primary duration-300 cursor-pointer">{product.name}</p>
                                                    <p className="text-xs text-dark/40 mt-0.5">SKU: {product.sku}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-block bg-gray-100 text-dark/70 text-xs font-medium px-2.5 py-1">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="font-semibold text-dark text-sm">{product.price}</span>
                                            {product.oldPrice && (
                                                <span className="ml-2 text-dark/40 line-through text-xs">{product.oldPrice}</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className={clsx("font-bold text-sm mb-1.5", textColor)}>{product.stock}</p>
                                            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={clsx("h-full rounded-full", bgColor)}
                                                    style={{ width: `${Math.min((product.stock / 25) * 100, 100)}%` }}
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1.5">
                                                {product.tags.slice(0, 2).map((tag, idx) => (
                                                    <span key={idx} className="text-xs uppercase font-bold px-2 py-0.5 bg-dark/5 text-dark/50">
                                                        {tag}
                                                    </span>
                                                ))}
                                                {product.tags.length > 2 && (
                                                    <span className="text-xs uppercase font-bold px-2 py-0.5 bg-dark/5 text-dark/50">
                                                        +{product.tags.length - 2} more
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex gap-2 justify-end">
                                                <button
                                                    onClick={() => openViewModal(product)}
                                                    className="size-8 border border-gray-200 flex items-center justify-center text-dark/40 hover:border-amber hover:text-amber duration-300 bg-white"
                                                >
                                                    <EyeIcon size={16} weight="bold" />
                                                </button>
                                                <Link
                                                    to={`/admin/products/edit/${product.id}`}
                                                    className="size-8 border border-gray-200 flex items-center justify-center text-dark/40 hover:border-amber hover:text-amber duration-300 bg-white"
                                                >
                                                    <PencilIcon size={16} weight="bold" />
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        setProductToDelete(product.id);
                                                        setDeleteModalOpen(true);
                                                    }}
                                                    className="size-8 border border-gray-200 flex items-center justify-center text-red-400 hover:border-red-500 hover:text-red-500 duration-300 bg-white"
                                                >
                                                    <TrashIcon size={16} weight="bold" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-dark/40 font-medium">
                                        No products found matching your filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 sm:p-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm font-medium text-dark/40">
                        Showing {totalItems === 0 ? 0 : startIndex + 1}-{Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} products
                    </p>
                    {totalPages > 1 && (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="size-8 flex items-center justify-center border border-gray-200 text-dark/40 hover:border-amber hover:text-amber duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                            >
                                <CaretLeftIcon size={14} weight="bold" />
                            </button>

                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={clsx(
                                        "size-8 flex items-center justify-center text-sm font-bold duration-300",
                                        currentPage === i + 1
                                            ? "bg-dark text-white"
                                            : "border border-gray-200 text-dark hover:border-amber hover:text-amber bg-white"
                                    )}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="size-8 flex items-center justify-center border border-gray-200 text-dark/40 hover:border-amber hover:text-amber duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                            >
                                <CaretRightIcon size={14} weight="bold" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Bulk Action Bar */}
            <div className={clsx(
                "fixed bottom-0 lg:left-64 xl:left-72 right-0 bg-dark text-white px-8 py-4 z-50 flex items-center justify-between duration-300",
                selectedIds.length > 0 ? "translate-y-0" : "translate-y-full"
            )}>
                <div className="text-sm font-semibold text-white">
                    {selectedIds.length} products selected
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setSelectedIds([])}
                        className="px-6 py-2.5 border border-white/20 text-white text-sm font-bold hover:bg-white/10 duration-300 cursor-pointer"
                    >
                        Clear Selection
                    </button>
                    <button
                        onClick={() => {
                            setProductToDelete('bulk');
                            setDeleteModalOpen(true);
                        }}
                        className="bg-red-500 text-white px-6 py-2.5 text-sm font-bold hover:bg-red-600 duration-300 cursor-pointer"
                    >
                        Delete Selected
                    </button>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <div className={clsx(
                "fixed inset-0 bg-dark/50 z-50 flex items-center justify-center p-4 duration-300",
                deleteModalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}>
                <div className={clsx(
                    "bg-white p-8   max-w-md w-full text-center duration-300 transform",
                    deleteModalOpen ? "scale-100" : "scale-95"
                )}>
                    <div className="size-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <WarningIcon size={32} weight="fill" className="text-red-500" />
                    </div>
                    <TitleComponent type="h3" className=" text-dark mb-2 font-bold">Are you sure?</TitleComponent>
                    <TitleComponent size="small" className="text-dark/50 mb-8">
                        {productToDelete === 'bulk'
                            ? `You are about to delete ${selectedIds.length} selected product(s). This action cannot be undone.`
                            : "This action cannot be undone. The product will be permanently removed from your catalog."}
                    </TitleComponent>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={() => {
                                setDeleteModalOpen(false);
                                setProductToDelete(null);
                            }}
                            className="flex-1 px-4 py-2.5 border border-gray-200 text-dark font-bold text-sm hover:bg-gray-50 duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmDelete}
                            className="flex-1 px-4 py-2.5 bg-red-500 text-white font-bold text-sm hover:bg-red-600 duration-300"
                        >
                            Yes, Delete
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick View Modal */}
            <div className={clsx(
                "fixed inset-0 bg-dark/50 z-50 flex items-center justify-center p-4 duration-300",
                viewModalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}>
                <div className={clsx(
                    "relative flex flex-col md:flex-row bg-white max-w-2xl w-full duration-300 transform overflow-hidden",
                    viewModalOpen ? "scale-100" : "scale-95"
                )}>
                    <button
                        onClick={() => {
                            setViewModalOpen(false);
                            setTimeout(() => setProductToView(null), 300); // clear after animation
                        }}
                        className="absolute top-4 right-4 size-8 bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-dark/60 hover:text-dark hover:border-dark duration-300 z-10"
                    >
                        <XIcon size={16} weight="bold" />
                    </button>

                    {productToView && (
                        <>
                            <div className="md:w-2/5 bg-[#F5F5F5] p-8 flex items-center justify-center border-r border-gray-100 min-h-[250px] md:min-h-0">
                                <img src={productToView.img} alt={productToView.name} className="max-w-full max-h-[300px] object-contain drop-shadow-xl" />
                            </div>
                            <div className="md:w-3/5 p-8 flex flex-col justify-center">
                                <div className="mb-2 flex items-center gap-2">
                                    <span className="bg-gray-100 text-dark/70 text-xs font-bold uppercase tracking-widest px-2 py-1">
                                        {productToView.category}
                                    </span>
                                    <span className="text-xs text-dark/40 uppercase tracking-widest font-bold">SKU: {productToView.sku}</span>
                                </div>
                                <h3 className="text-dark font-bold text-2xl mb-4 leading-tight">{productToView.name}</h3>

                                <div className="flex items-end gap-3 mb-6">
                                    <span className="font-bold text-dark text-2xl">{productToView.price}</span>
                                    {productToView.oldPrice && (
                                        <span className="text-dark/40 line-through text-sm mb-1 font-medium">{productToView.oldPrice}</span>
                                    )}
                                </div>

                                <div className="space-y-4 border-t border-gray-100 pt-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-dark/50 uppercase tracking-widest">Inventory Status</span>
                                        <span className={clsx("text-sm font-bold", getStockColor(productToView.stock).split(' ')[0])}>
                                            {productToView.stock > 0 ? `${productToView.stock} in stock` : 'Out of Stock'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="block text-xs font-bold text-dark/50 uppercase tracking-widest mb-2">Applied Tags</span>
                                        <div className="flex flex-wrap gap-2">
                                            {productToView.tags.map(tag => (
                                                <span key={tag} className="border border-gray-200 text-dark/60 text-xs font-bold uppercase tracking-widest px-2 py-1  ">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-100 flex gap-3">
                                    <Link
                                        to={`/admin/products/edit/${productToView.id}`}
                                        className="flex-1 px-4 py-2.5 bg-dark text-white text-sm font-bold text-center hover:bg-primary duration-300"
                                    >
                                        Edit Product
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
};

export default ProductsListPage;
