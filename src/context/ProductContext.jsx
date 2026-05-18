import React, { createContext, useState, useEffect, useContext } from 'react';

const INITIAL_PRODUCTS = [
    { id: '1', name: 'Classic White Oxford Shirt', sku: 'CLO-SHRT-01', category: 'Clothing', price: '$45.00', oldPrice: '$60.00', stock: 12, tags: ['Featured', 'Premium', 'New'], img: 'https://images.unsplash.com/photo-1596755094514-f87e32f6b717?auto=format&fit=crop&q=80&w=150' },
    { id: '2', name: 'Premium Leather Loafers', sku: 'SHO-LOAF-04', category: 'Shoes', price: '$120.00', oldPrice: null, stock: 4, tags: ['Bestseller'], img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=150' },
    { id: '3', name: 'Slim Fit Denim Jeans', sku: 'CLO-PANT-09', category: 'Clothing', price: '$85.00', oldPrice: '$100.00', stock: 20, tags: ['Hot Sale', 'Featured'], img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=150' },
    { id: '4', name: 'Minimalist Canvas Sneakers', sku: 'SHO-SNEK-02', category: 'Shoes', price: '$65.00', oldPrice: null, stock: 0, tags: ['New Arrival'], img: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=150' },
    { id: '5', name: 'Vintage Wash Denim Jacket', sku: 'CLO-JACK-05', category: 'Clothing', price: '$110.00', oldPrice: '$140.00', stock: 8, tags: ['Premium', 'Limited'], img: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=150' },
    { id: '6', name: 'Casual Cotton T-Shirt', sku: 'CLO-TSHR-11', category: 'Clothing', price: '$25.00', oldPrice: null, stock: 45, tags: ['Basic'], img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=150' },
    { id: '7', name: 'Running Shoes X1', sku: 'SHO-RUN-08', category: 'Shoes', price: '$95.00', oldPrice: '$120.00', stock: 2, tags: ['Hot Sale'], img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150' },
    { id: '8', name: 'Winter Puffer Coat', sku: 'CLO-COAT-03', category: 'Clothing', price: '$150.00', oldPrice: '$180.00', stock: 0, tags: ['Featured'], img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=150' },
];

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem('admin_products');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return INITIAL_PRODUCTS;
            }
        }
        return INITIAL_PRODUCTS;
    });

    useEffect(() => {
        localStorage.setItem('admin_products', JSON.stringify(products));
    }, [products]);

    const addProduct = (productData) => {
        // Construct the list view object
        const newProduct = {
            id: Date.now().toString(),
            name: productData.name || 'Untitled Product',
            sku: `NEW-${Math.floor(Math.random() * 1000)}`,
            category: productData.category || 'Clothing',
            price: `$${productData.salePrice || productData.regularPrice || '0.00'}`,
            oldPrice: (productData.salePrice && productData.regularPrice && productData.salePrice !== productData.regularPrice) ? `$${productData.regularPrice}` : null,
            stock: Number(productData.stock) || 0,
            tags: [],
            img: productData.imageUrl || 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=150'
        };

        if (productData.isFeatured) newProduct.tags.push('Featured');
        if (productData.badgeLabel) newProduct.tags.push(productData.badgeLabel);
        if (newProduct.tags.length === 0) newProduct.tags.push('New');

        // We also want to store the full raw data so Edit can read it, but for now we'll just store list data + full data together
        const completeProduct = { ...newProduct, fullData: productData };

        setProducts(prev => [completeProduct, ...prev]);
    };

    const updateProduct = (id, productData) => {
        setProducts(prev => prev.map(p => {
            if (p.id === id) {
                return {
                    ...p,
                    name: productData.name || p.name,
                    category: productData.category || p.category,
                    price: `$${productData.salePrice || productData.regularPrice || p.price.replace('$', '')}`,
                    oldPrice: (productData.salePrice && productData.regularPrice && productData.salePrice !== productData.regularPrice) ? `$${productData.regularPrice}` : null,
                    stock: Number(productData.stock) ?? p.stock,
                    img: productData.imageUrl || p.img,
                    fullData: productData
                };
            }
            return p;
        }));
    };

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    const bulkDeleteProducts = (ids) => {
        setProducts(prev => prev.filter(p => !ids.includes(p.id)));
    };

    const getProductById = (id) => {
        return products.find(p => p.id === id);
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, bulkDeleteProducts, getProductById }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
