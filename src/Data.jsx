import {
    InstagramLogoIcon,
    FacebookLogoIcon,
    TwitterLogoIcon,
    YoutubeLogoIcon,
    LightningIcon,
    RulerIcon,
    StarIcon,
    TruckIcon,
    ClockIcon,
    ArrowClockwiseIcon,
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

// Master Product List - One Source of Truth
export const allProducts = [
    // SHIRTS
    {
        id: 1,
        name: 'Classic White Oxford Shirt',
        category: 'clothing',
        subCategory: 'shirts',
        price: 45.00,
        oldPrice: 60.00,
        image: shirtsImg,
        rating: 3.8,
        reviewCount: 24,
        badge: 'Bestseller',
        tags: ['bestseller', 'featured', 'hot-sale'],
        colors: ['white', 'blue', 'gray'],
        sizes: ['S', 'M', 'L', 'XL'],
        sizeType: 'alpha',
        stock: 20,
        specs: { fit: 'slim', collar: 'spread', fabric: '100% Cotton' }
    },
    {
        id: 6,
        name: 'Sartorial Oxford Shirt',
        category: 'clothing',
        subCategory: 'shirts',
        price: 185.00,
        image: shirtsImg,
        rating: 4.8,
        reviewCount: 12,
        badge: 'Premium',
        tags: ['premium', 'featured'],
        colors: ['white', 'light-blue'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        sizeType: 'alpha',
        stock: 3,
        specs: { fit: 'tailored', collar: 'button-down', fabric: 'Egyptian Cotton' }
    },
    {
        id: 11,
        name: 'Heritage Cotton Oxford Shirt',
        category: 'clothing',
        subCategory: 'shirts',
        price: 65.00,
        oldPrice: 85.00,
        image: shirtsImg,
        rating: 4.8,
        reviewCount: 45,
        badge: 'Hot',
        tags: ['new-arrival', 'hot-sale'],
        colors: ['white', 'navy'],
        sizes: ['S', 'M', 'L', 'XL'],
        sizeType: 'alpha',
        stock: 0,
        specs: { fit: 'regular', fabric: 'Organic Cotton' }
    },

    // PANTS
    {
        id: 2,
        name: 'Slim Fit Navy Chinos',
        category: 'clothing',
        subCategory: 'pants',
        price: 55.00,
        oldPrice: 75.00,
        image: pantImg,
        rating: 4.6,
        reviewCount: 18,
        badge: 'New',
        tags: ['new-arrival', 'featured'],
        colors: ['navy', 'gray', 'black'],
        sizes: ['30', '32', '34', '36'],
        sizeType: 'waist',
        stock: 15,
        specs: { fit: 'slim', fabric: 'Cotton Blend', rise: 'mid-rise' }
    },
    {
        id: 7,
        name: 'Bespoke Tailored Trousers',
        category: 'clothing',
        subCategory: 'pants',
        price: 295.00,
        image: pantImg,
        rating: 4.9,
        reviewCount: 8,
        badge: 'Premium',
        tags: ['premium', 'featured'],
        colors: ['charcoal', 'black'],
        sizes: ['32', '34', '36', '38'],
        sizeType: 'waist',
        stock: 2,
        specs: { fit: 'custom', fabric: 'Italian Wool', rise: 'mid-rise' }
    },
    {
        id: 12,
        name: 'Urban Slim Fit Chinos',
        category: 'clothing',
        subCategory: 'pants',
        price: 75.00,
        image: pantImg,
        rating: 4.9,
        reviewCount: 31,
        badge: 'Top Rated',
        tags: ['top-rated', 'featured'],
        colors: ['tan', 'olive', 'black'],
        sizes: ['30', '32', '34', '36'],
        sizeType: 'waist',
        stock: 0,
        specs: { fit: 'slim', fabric: 'Twill' }
    },

    // FORMAL SHOES
    {
        id: 3,
        name: 'Handcrafted Leather Oxfords',
        category: 'shoes',
        subCategory: 'formal-shoes',
        price: 120.00,
        oldPrice: 150.00,
        image: formalShoesImg,
        rating: 4.9,
        reviewCount: 56,
        badge: 'Premium',
        tags: ['premium', 'featured', 'top-rated'],
        colors: ['brown', 'black'],
        sizes: ['40', '41', '42', '43'],
        sizeType: 'shoe',
        stock: 8,
        specs: { sole: 'leather', closure: 'lace-up', upper: 'full-grain leather' }
    },
    {
        id: 8,
        name: 'Heritage Leather Brogues',
        category: 'shoes',
        subCategory: 'formal-shoes',
        price: 450.00,
        image: formalShoesImg,
        rating: 4.9,
        reviewCount: 5,
        badge: 'Limited Edition',
        tags: ['premium', 'featured'],
        colors: ['tan', 'mahogany'],
        sizes: ['41', '42', '43', '44'],
        sizeType: 'shoe',
        stock: 4,
        specs: { sole: 'goodyear welt', closure: 'lace-up', upper: 'calfskin' }
    },
    {
        id: 13,
        name: 'Classic Derby Shoes',
        category: 'shoes',
        subCategory: 'formal-shoes',
        price: 150.00,
        oldPrice: 190.00,
        image: formalShoesImg,
        rating: 4.7,
        reviewCount: 22,
        badge: 'Hot Sale',
        tags: ['hot-sale'],
        colors: ['black', 'brown'],
        sizes: ['40', '41', '42', '43'],
        sizeType: 'shoe',
        stock: 25,
        specs: { sole: 'rubber', closure: 'lace-up', upper: 'polished leather' }
    },

    // SNEAKERS
    {
        id: 5,
        name: 'Swift-Step Modern Sneakers',
        category: 'shoes',
        subCategory: 'sneakers',
        price: 85.00,
        oldPrice: 110.00,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
        rating: 4.7,
        reviewCount: 91,
        badge: 'Hot',
        tags: ['hot-sale', 'featured'],
        colors: ['red', 'black', 'white'],
        sizes: ['40', '41', '42', '43'],
        sizeType: 'shoe',
        stock: 1,
        specs: { sole: 'rubber', closure: 'lace-up', upper: 'mesh' }
    },
    {
        id: 10,
        name: 'Minimalist Sneakers',
        category: 'shoes',
        subCategory: 'sneakers',
        price: 120.00,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
        rating: 4.9,
        reviewCount: 114,
        badge: 'Top Rated',
        tags: ['top-rated', 'new-arrival'],
        colors: ['white', 'cream'],
        sizes: ['39', '40', '41', '42'],
        sizeType: 'shoe',
        stock: 12,
        specs: { sole: 'cupsole', closure: 'lace-up', upper: 'leather' }
    },

    // JOGGERS
    {
        id: 4,
        name: 'Urban Performance Joggers',
        category: 'shoes',
        subCategory: 'joggers',
        price: 35.00,
        oldPrice: 50.00,
        image: joggersImg,
        rating: 4.5,
        reviewCount: 33,
        badge: 'Sale',
        tags: ['hot-sale'],
        colors: ['gray', 'black', 'navy'],
        sizes: ['S', 'M', 'L', 'XL'],
        sizeType: 'alpha',
        stock: 0,
        specs: { sole: 'rubber', closure: 'drawstring', upper: 'synthetic' }
    },
    {
        id: 9,
        name: 'Performance Tech Joggers',
        category: 'shoes',
        subCategory: 'joggers',
        price: 55.00,
        image: joggersImg,
        rating: 4.7,
        reviewCount: 67,
        badge: 'New',
        tags: ['new-arrival', 'top-rated'],
        colors: ['black', 'olive'],
        sizes: ['M', 'L', 'XL'],
        sizeType: 'alpha',
        stock: 7,
        specs: { fabric: 'Polyester Blend', waistband: 'Elastic' }
    }
];

// Derived Lists (Section Filters)
export const featuredProductsData = allProducts.filter(p => p.tags.includes('featured'));
export const saleProductsData = allProducts.filter(p => p.tags.includes('hot-sale'));
export const newArrivalsProducts = allProducts.sort((a, b) => b.id - a.id).slice(0, 4);
export const topRatedProducts = allProducts.sort((a, b) => b.rating - a.rating).slice(0, 4);
export const premiumCollectionData = allProducts.filter(p => p.tags.includes('premium'));
export const featuredProducts = featuredProductsData; // Alias for consistency

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

export const sneakerSpotlightData = [
    {
        id: 1,
        name: 'Street Elite Low',
        price: 120.00,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: 2,
        name: 'Urban Glide 2.0',
        price: 145.00,
        image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: 3,
        name: 'Retro Pulse One',
        price: 110.00,
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=400'
    }
];

/* ─── Product Detail Page — Static Data ─── */

export const PRODUCT_TABS = ['Description', 'Specifications', 'Shipping & Returns'];

export const productHighlights = [
    {
        icon: LightningIcon,
        title: 'Premium Materials',
        desc: "Sourced from the world's most prestigious textile and leather suppliers.",
    },
    {
        icon: RulerIcon,
        title: 'Tailored Precision',
        desc: 'Engineered with anatomical precision to ensure a flawless, comfortable fit.',
    },
    {
        icon: StarIcon,
        title: 'Enduring Quality',
        desc: 'Reinforced construction techniques guarantee a lifetime of sophisticated wear.',
    },
];

export const shippingCards = [
    {
        icon: TruckIcon,
        title: 'Free Standard Delivery',
        desc: 'Complimentary shipping on all orders over $100. Delivery in 5-7 business days via premium couriers.',
        badge: '5-7 Business Days',
    },
    {
        icon: ClockIcon,
        title: 'Express Delivery',
        desc: 'Select Express Shipping at checkout for priority processing. Guaranteed tracking on every shipment.',
        badge: '2-3 Business Days',
    },
    {
        icon: ArrowClockwiseIcon,
        title: 'Hassle-Free Returns',
        desc: 'Free returns within 30 days of purchase. Use the prepaid label included in your package.',
        badge: '30-Day Window',
    },
];

export const ratingBreakdown = [
    { stars: 5, count: 42 },
    { stars: 4, count: 12 },
    { stars: 3, count: 2 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
];

export const getMockReviews = (productImage) => [
    {
        id: 1,
        user: 'James R.',
        initials: 'JR',
        rating: 5,
        date: 'Oct 12, 2024',
        title: 'Outstanding Quality and Fit',
        comment:
            'The leather quality is exceptional. They felt comfortable right out of the box and the color matches the photos perfectly. Highly recommend for business formal attire.',
        images: [productImage, productImage],
    },
    {
        id: 2,
        user: 'Michael S.',
        initials: 'MS',
        rating: 4,
        date: 'Sep 28, 2024',
        title: 'Very Stylish, Size up',
        comment:
            'Beautiful shoes, but they run slightly narrow. I had to exchange for a half size up. Once I got the right size, they\'re the best formal shoes I\'ve owned.',
        images: null,
    },
    {
        id: 3,
        user: 'David W.',
        initials: 'DW',
        rating: 5,
        date: 'Aug 15, 2024',
        title: 'Premium Experience',
        comment:
            'From the packaging to the product itself, everything feels premium. Worth every penny for the handcrafted quality you receive.',
        images: [productImage],
    },
];
