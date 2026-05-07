import {
    InstagramLogoIcon,
    FacebookLogoIcon,
    TwitterLogoIcon,
    YoutubeLogoIcon,
    TruckIcon,
    ShieldCheckIcon,
    ArrowUUpLeftIcon
} from '@phosphor-icons/react';

// Image Imports
import formalShoesImg from './assets/formal-shoes-img.png';
import joggersImg from './assets/jogger-img.png';
import pantImg from './assets/pant-img.png';
import shirtsImg from './assets/shirts-img.png';

export const MenuData = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    {
        name: 'Clothing',
        path: '/clothing',
        submenu: [
            { name: 'Shirts', path: '/clothing/shirts' },
            { name: 'Pants', path: '/clothing/pants' },
        ]
    },
    {
        name: 'Shoes',
        path: '/shoes',
        submenu: [
            { name: 'Formal Shoes', path: '/shoes/formal-shoes' },
            { name: 'Sneakers', path: '/shoes/sneakers' },
            { name: 'Joggers', path: '/shoes/joggers' },
        ]
    },
    { name: 'New Arrivals', path: '/new-arrivals' },
];

// Categories Data
export const categoriesData = [
    {
        name: 'Formal Shirts',
        img: shirtsImg,
        path: '/clothing/shirts',
        bgColor: 'bg-[#f7f0f9]',
        label: 'Classic Look'
    },
    {
        name: 'Formal Pant',
        img: pantImg,
        path: '/clothing/pants',
        bgColor: 'bg-[#fdf9e6]',
        label: 'Perfect Fit'
    },
    {
        name: 'Formal Shoes',
        img: formalShoesImg,
        path: '/shoes/formal-shoes',
        bgColor: 'bg-[#f0f4f7]',
        label: 'Step into Style'
    },
    {
        name: 'Joggers',
        img: joggersImg,
        path: '/shoes/joggers',
        bgColor: 'bg-[#f9f0f0]',
        label: 'Dynamic Comfort'
    },
];

// Featured Products Data
export const featuredProductsData = [
    {
        id: 1,
        name: 'Classic White Oxford Shirt',
        category: 'Formal Shirts',
        price: 45.00,
        oldPrice: 60.00,
        image: shirtsImg,
        rating: 3.8,
        badge: 'Bestseller'
    },
    {
        id: 2,
        name: 'Slim Fit Navy Chinos',
        category: 'Formal Pant',
        price: 55.00,
        oldPrice: 75.00,
        image: pantImg,
        rating: 4.6,
        badge: 'New'
    },
    {
        id: 3,
        name: 'Handcrafted Leather Oxfords',
        category: 'Formal Shoes',
        price: 120.00,
        oldPrice: 150.00,
        image: formalShoesImg,
        rating: 4.9,
        badge: 'Premium'
    },
    {
        id: 4,
        name: 'Urban Performance Joggers',
        category: 'Joggers',
        price: 35.00,
        oldPrice: 50.00,
        image: joggersImg,
        rating: 4.5,
        badge: 'Sale'
    },
    {
        id: 5,
        name: 'Swift-Step Modern Sneakers',
        category: 'Sneakers',
        price: 85.00,
        oldPrice: 110.00,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
        rating: 4.7,
        badge: 'Hot'
    }
];

// New Arrivals Data
export const newArrivalsProducts = [
    { id: 1, name: 'Cotton Oxford Shirt', category: 'Clothing', price: 55.00, image: shirtsImg, rating: 4.8 },
    { id: 2, name: 'Tapered Formal Pants', category: 'Clothing', price: 75.00, image: pantImg, rating: 4.5 },
    { id: 3, name: 'Minimalist Sneakers', category: 'Shoes', price: 120.00, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800', rating: 4.9 },
    { id: 4, name: 'Classic Derby Shoes', category: 'Shoes', price: 150.00, image: formalShoesImg, rating: 4.7 },
];

// Top Rated Data
export const topRatedProducts = [
    { id: 1, name: 'Premium Leather Oxfords', price: 145.00, rating: 4.9, image: formalShoesImg, isBestseller: true },
    { id: 2, name: 'Heritage Cotton Oxford Shirt', price: 65.00, rating: 4.8, image: shirtsImg },
    { id: 3, name: 'Urban Slim Fit Chinos', price: 75.00, rating: 4.9, image: pantImg },
    { id: 4, name: 'Performance Tech Joggers', price: 55.00, rating: 4.7, image: joggersImg },
];

// Hot Sale Data
export const saleProductsData = [
    { id: 1, name: 'Premium Oxford Shirt', price: 39.00, oldPrice: 65.00, image: shirtsImg, rating: 4.8 },
    { id: 2, name: 'Slim Chino Trousers', price: 45.00, oldPrice: 75.00, image: pantImg, rating: 4.6 },
    { id: 3, name: 'Athletic Joggers', price: 29.00, oldPrice: 55.00, image: joggersImg, rating: 4.4 },
    { id: 4, name: 'Leather Dress Shoes', price: 89.00, oldPrice: 140.00, image: formalShoesImg, rating: 4.9 },
];

// Premium Collection Data
export const premiumCollectionData = [
    { id: 1, name: 'Sartorial Oxford Shirt', price: 185.00, image: shirtsImg },
    { id: 2, name: 'Bespoke Tailored Trousers', price: 295.00, image: pantImg },
    { id: 3, name: 'Heritage Leather Brogues', price: 450.00, image: formalShoesImg },
];

// Trust Bar Data
export const trustFeatures = [
    {
        icon: <TruckIcon />,
        title: 'Global Delivery',
        desc: 'Fast and secure shipping to over 50 countries worldwide.'
    },
    {
        icon: <ShieldCheckIcon />,
        title: 'Secure Payment',
        desc: 'Fully encrypted transaction processing for your peace of mind.'
    },
    {
        icon: <ArrowUUpLeftIcon />,
        title: 'Easy Returns',
        desc: 'Hassle-free 30-day return policy on all eligible purchases.'
    }
];

// Footer Data
export const footerQuickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Sale', path: '/sale' }
];

export const footerCategoryLinks = [
    { name: 'Formal Shirts', path: '/clothing/shirts' },
    { name: 'Formal Pants', path: '/clothing/pants' },
    { name: 'Sneakers', path: '/shoes/sneakers' },
    { name: 'Joggers', path: '/shoes/joggers' },
    { name: 'Formal Shoes', path: '/shoes/formal-shoes' }
];

export const footerSocialLinks = [
    { icon: <InstagramLogoIcon size={24} weight="bold" />, path: '#' },
    { icon: <FacebookLogoIcon size={24} weight="bold" />, path: '#' },
    { icon: <TwitterLogoIcon size={24} weight="bold" />, path: '#' },
    { icon: <YoutubeLogoIcon size={24} weight="bold" />, path: '#' }
];

// Hero Slider Data
export const heroData = [
    {
        id: 1,
        label: "FORMAL COLLECTION 2025",
        heading: "Dress Sharp. Lead With Confidence.",
        subtext: "Premium formal shirts & tailored trousers for the modern man",
        primaryBtn: "Shop Collection",
        secondaryBtn: "View Lookbook",
        image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=1200",
        bgColor: "bg-white",
        theme: "light"
    },
    {
        id: 2,
        label: "FOOTWEAR COLLECTION",
        heading: "Step Into Something Extraordinary.",
        subtext: "Handcrafted formal shoes, sneakers & joggers built to last",
        primaryBtn: "Shop Shoes",
        secondaryBtn: "Explore All",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200",
        bgColor: "bg-[#FDF8F2]",
        theme: "light"
    },
    {
        id: 3,
        label: "LIMITED TIME OFFER",
        heading: "Up To 50% Off. Shop The Sale.",
        subtext: "Exclusive discounts on formal wear and footwear — ends soon",
        primaryBtn: "Shop Sale Now",
        secondaryBtn: "See All Deals",
        image: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?auto=format&fit=crop&q=80&w=1200",
        bgColor: "bg-[#1A1A1A]",
        theme: "dark"
    }
];
