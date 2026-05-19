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

export const CategoriesData = [
    {
        name: 'Formal Shirts',
        img: shirtsImg,
        path: '/clothing/shirts',
        bgColor: 'bg-cat-shirts',
        label: 'Classic Look'
    },
    {
        name: 'Formal Pant',
        img: pantImg,
        path: '/clothing/pants',
        bgColor: 'bg-cat-pants',
        label: 'Perfect Fit'
    },
    {
        name: 'Formal Shoes',
        img: formalShoesImg,
        path: '/shoes/formal-shoes',
        bgColor: 'bg-cat-shoes',
        label: 'Step into Style'
    },
    {
        name: 'Joggers',
        img: joggersImg,
        path: '/shoes/joggers',
        bgColor: 'bg-cat-joggers',
        label: 'Dynamic Comfort'
    },
];

export const AllProducts = [
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

export const FeaturedProductsData = AllProducts.filter(p => p.tags.includes('featured'));
export const SaleProductsData = AllProducts.filter(p => p.tags.includes('hot-sale'));
export const NewArrivalsProducts = AllProducts.sort((a, b) => b.id - a.id).slice(0, 4);
export const TopRatedProducts = AllProducts.sort((a, b) => b.rating - a.rating).slice(0, 4);
export const PremiumCollectionData = AllProducts.filter(p => p.tags.includes('premium'));
export const FeaturedProducts = FeaturedProductsData;

export const TrustFeatures = [
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

export const FooterQuickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Sale', path: '/sale' }
];

export const FooterCategoryLinks = [
    { name: 'Formal Shirts', path: '/clothing/shirts' },
    { name: 'Formal Pants', path: '/clothing/pants' },
    { name: 'Sneakers', path: '/shoes/sneakers' },
    { name: 'Joggers', path: '/shoes/joggers' },
    { name: 'Formal Shoes', path: '/shoes/formal-shoes' }
];

export const FooterSocialLinks = [
    { icon: <InstagramLogoIcon size={24} weight="bold" />, path: '#' },
    { icon: <FacebookLogoIcon size={24} weight="bold" />, path: '#' },
    { icon: <TwitterLogoIcon size={24} weight="bold" />, path: '#' },
    { icon: <YoutubeLogoIcon size={24} weight="bold" />, path: '#' }
];

export const HeroData = [
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
        bgColor: "bg-cat-beige",
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
        bgColor: "bg-card-dark",
        theme: "dark"
    }
];

export const SneakerSpotlightData = [
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


export const ProductTabs = ['Description', 'Specifications', 'Shipping & Returns'];

export const ProductHighlights = [
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

export const ShippingCards = [
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

export const RatingBreakdown = [
    { stars: 5, count: 42 },
    { stars: 4, count: 12 },
    { stars: 3, count: 2 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
];

export const GetMockReviews = (productImage) => [
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

export const pageHeroConfig = {
    '/shop': {
        subtitle: 'DISCOVER OUR COLLECTION',
        title: 'Shop All Products',
        breadcrumbs: [
            { label: 'Home', path: '/' },
            { label: 'Shop', path: '/shop', active: true }
        ],
        filterCategory: 'All'
    },
    '/clothing': {
        subtitle: 'EXPLORE CLOTHING',
        title: 'Clothing Collection',
        breadcrumbs: [
            { label: 'Home', path: '/' },
            { label: 'Shop', path: '/shop' },
            { label: 'Clothing', path: '/clothing', active: true }
        ],
        filterCategory: null,
        filterCategories: ['Shirts', 'Pants']
    },
    '/clothing/shirts': {
        subtitle: 'CLASSIC LOOK',
        title: 'Formal Shirts Collection',
        breadcrumbs: [
            { label: 'Home', path: '/' },
            { label: 'Shop', path: '/shop' },
            { label: 'Clothing', path: '/clothing' },
            { label: 'Shirts', path: '/clothing/shirts', active: true }
        ],
        filterCategory: 'Shirts'
    },
    '/clothing/pants': {
        subtitle: 'PERFECT FIT',
        title: 'Formal Pants Collection',
        breadcrumbs: [
            { label: 'Home', path: '/' },
            { label: 'Shop', path: '/shop' },
            { label: 'Clothing', path: '/clothing' },
            { label: 'Pants', path: '/clothing/pants', active: true }
        ],
        filterCategory: 'Pants'
    },
    '/shoes': {
        subtitle: 'STEP INTO STYLE',
        title: 'Shoes Collection',
        breadcrumbs: [
            { label: 'Home', path: '/' },
            { label: 'Shop', path: '/shop' },
            { label: 'Shoes', path: '/shoes', active: true }
        ],
        filterCategory: null,
        filterCategories: ['Formal Shoes', 'Sneakers', 'Joggers']
    },
    '/shoes/formal-shoes': {
        subtitle: 'STEP INTO STYLE',
        title: 'Formal Shoes Collection',
        breadcrumbs: [
            { label: 'Home', path: '/' },
            { label: 'Shop', path: '/shop' },
            { label: 'Shoes', path: '/shoes' },
            { label: 'Formal Shoes', path: '/shoes/formal-shoes', active: true }
        ],
        filterCategory: 'Formal Shoes'
    },
    '/shoes/sneakers': {
        subtitle: 'FRESH KICKS',
        title: 'Sneakers Collection',
        breadcrumbs: [
            { label: 'Home', path: '/' },
            { label: 'Shop', path: '/shop' },
            { label: 'Shoes', path: '/shoes' },
            { label: 'Sneakers', path: '/shoes/sneakers', active: true }
        ],
        filterCategory: 'Sneakers'
    },
    '/shoes/joggers': {
        subtitle: 'DYNAMIC COMFORT',
        title: 'Joggers Collection',
        breadcrumbs: [
            { label: 'Home', path: '/' },
            { label: 'Shop', path: '/shop' },
            { label: 'Shoes', path: '/shoes' },
            { label: 'Joggers', path: '/shoes/joggers', active: true }
        ],
        filterCategory: 'Joggers'
    },
    '/new-arrivals': {
        subtitle: 'JUST DROPPED',
        title: 'New Arrivals',
        breadcrumbs: [
            { label: 'Home', path: '/' },
            { label: 'New Arrivals', path: '/new-arrivals', active: true }
        ],
        filterCategory: 'new-arrival'
    },
    '/sale': {
        subtitle: 'LIMITED TIME OFFER',
        title: 'Sale Collection',
        breadcrumbs: [
            { label: 'Home', path: '/' },
            { label: 'Sale', path: '/sale', active: true }
        ],
        filterCategory: 'hot-sale'
    }
};

export const MockOrdersData = [
    {
        id: 'ORD-8392',
        customer: {
            name: 'Sarah Jenkins',
            email: 'sarah.j@example.com',
            initials: 'SJ'
        },
        date: '2026-05-18',
        time: '14:32',
        itemsCount: 3,
        total: 245.99,
        couponApplied: true,
        paymentStatus: 'Paid',
        status: 'Processing',
        items: [
            { name: 'Classic Silk Shirt', size: 'M', color: 'Cream', qty: 1, price: 89.99 },
            { name: 'Tailored Wool Trousers', size: '30', color: 'Charcoal', qty: 1, price: 120.00 },
            { name: 'Ribbed Knit Tank', size: 'S', color: 'White', qty: 1, price: 36.00 }
        ],
        shippingAddress: '128 Fashion Ave, Apt 4B, New York, NY 10001',
        paymentMethod: 'Visa ending in 4242'
    },
    {
        id: 'ORD-2104',
        customer: {
            name: 'Michael Chen',
            email: 'm.chen@example.com',
            initials: 'MC'
        },
        date: '2026-05-18',
        time: '11:15',
        itemsCount: 1,
        total: 125.00,
        couponApplied: false,
        paymentStatus: 'Paid',
        status: 'Shipped',
        items: [
            { name: 'Minimalist Leather Sneakers', size: '42', color: 'White', qty: 1, price: 125.00 }
        ],
        shippingAddress: '742 Evergreen Terrace, Seattle, WA 98101',
        paymentMethod: 'Apple Pay'
    },
    {
        id: 'ORD-4821',
        customer: {
            name: 'Emma Rodriguez',
            email: 'emma.r@example.com',
            initials: 'ER'
        },
        date: '2026-05-17',
        time: '09:45',
        itemsCount: 2,
        total: 89.50,
        couponApplied: true,
        paymentStatus: 'Pending',
        status: 'Pending',
        items: [
            { name: 'Oversized Cotton Tee', size: 'L', color: 'Sage', qty: 2, price: 44.75 }
        ],
        shippingAddress: '984 Sunset Blvd, Los Angeles, CA 90026',
        paymentMethod: 'PayPal'
    },
    {
        id: 'ORD-9023',
        customer: {
            name: 'David Kim',
            email: 'david.kim@example.com',
            initials: 'DK'
        },
        date: '2026-05-17',
        time: '16:20',
        itemsCount: 4,
        total: 410.00,
        couponApplied: false,
        paymentStatus: 'Paid',
        status: 'Delivered',
        items: [
            { name: 'Suede Chelsea Boots', size: '43', color: 'Tan', qty: 1, price: 180.00 },
            { name: 'Heavyweight Hoodie', size: 'XL', color: 'Black', qty: 1, price: 95.00 },
            { name: 'Slim Fit Jeans', size: '32', color: 'Dark Wash', qty: 2, price: 67.50 }
        ],
        shippingAddress: '312 Pine St, San Francisco, CA 94104',
        paymentMethod: 'Mastercard ending in 8812'
    },
    {
        id: 'ORD-5512',
        customer: {
            name: 'Amanda Watson',
            email: 'amanda.w@example.com',
            initials: 'AW'
        },
        date: '2026-05-16',
        time: '10:05',
        itemsCount: 1,
        total: 75.00,
        couponApplied: false,
        paymentStatus: 'Failed',
        status: 'Cancelled',
        items: [
            { name: 'Linen Blend Shorts', size: 'S', color: 'Beige', qty: 1, price: 75.00 }
        ],
        shippingAddress: '556 Maple Court, Chicago, IL 60611',
        paymentMethod: 'Visa ending in 1099'
    },
    {
        id: 'ORD-7281',
        customer: {
            name: 'James Peterson',
            email: 'j.peterson@example.com',
            initials: 'JP'
        },
        date: '2026-05-16',
        time: '13:50',
        itemsCount: 2,
        total: 180.00,
        couponApplied: false,
        paymentStatus: 'Paid',
        status: 'Delivered',
        items: [
            { name: 'Leather Dress Belts', size: '34', color: 'Brown', qty: 2, price: 90.00 }
        ],
        shippingAddress: '1202 Oak Lane, Dallas, TX 75201',
        paymentMethod: 'Visa ending in 6643'
    },
    {
        id: 'ORD-3049',
        customer: {
            name: 'Elena Rostova',
            email: 'elena.r@example.com',
            initials: 'ER'
        },
        date: '2026-05-15',
        time: '18:10',
        itemsCount: 5,
        total: 395.20,
        couponApplied: true,
        paymentStatus: 'Paid',
        status: 'Delivered',
        items: [
            { name: 'Floral Print Maxi Dress', size: 'S', color: 'Multi', qty: 1, price: 145.00 },
            { name: 'Straw Sun Hat', size: 'One Size', color: 'Natural', qty: 1, price: 45.00 },
            { name: 'Strappy Leather Sandals', size: '38', color: 'Tan', qty: 1, price: 85.00 },
            { name: 'Gold Hoop Earrings Set', size: 'One Size', color: 'Gold', qty: 2, price: 60.10 }
        ],
        shippingAddress: '404 Ocean Ave, Miami Beach, FL 33139',
        paymentMethod: 'Amex ending in 3004'
    },
    {
        id: 'ORD-1192',
        customer: {
            name: 'William Turner',
            email: 'w.turner@example.com',
            initials: 'WT'
        },
        date: '2026-05-15',
        time: '08:30',
        itemsCount: 2,
        total: 210.00,
        couponApplied: false,
        paymentStatus: 'Paid',
        status: 'Shipped',
        items: [
            { name: 'Merino Wool Sweater', size: 'M', color: 'Navy', qty: 1, price: 135.00 },
            { name: 'Oxford Cotton Shirt', size: 'M', color: 'Light Blue', qty: 1, price: 75.00 }
        ],
        shippingAddress: '88 Harbour View Rd, Boston, MA 02110',
        paymentMethod: 'Apple Pay'
    },
    {
        id: 'ORD-6045',
        customer: {
            name: 'Chloe Bennett',
            email: 'chloe.b@example.com',
            initials: 'CB'
        },
        date: '2026-05-14',
        time: '15:45',
        itemsCount: 1,
        total: 65.00,
        couponApplied: false,
        paymentStatus: 'Pending',
        status: 'Pending',
        items: [
            { name: 'High-Waisted Joggers', size: 'XS', color: 'Heather Gray', qty: 1, price: 65.00 }
        ],
        shippingAddress: '233 Peachtree St, Atlanta, GA 30303',
        paymentMethod: 'PayPal'
    },
    {
        id: 'ORD-8830',
        customer: {
            name: 'Robert Miller',
            email: 'r.miller@example.com',
            initials: 'RM'
        },
        date: '2026-05-14',
        time: '12:00',
        itemsCount: 3,
        total: 198.50,
        couponApplied: true,
        paymentStatus: 'Paid',
        status: 'Delivered',
        items: [
            { name: 'Crewneck Sweatshirt', size: 'L', color: 'Forest Green', qty: 1, price: 68.00 },
            { name: 'Relaxed Fit Chinos', size: '34', color: 'Khaki', qty: 1, price: 78.00 },
            { name: 'Pima Cotton T-Shirt', size: 'L', color: 'Black', qty: 1, price: 52.50 }
        ],
        shippingAddress: '1564 Broadway, New York, NY 10036',
        paymentMethod: 'Visa ending in 9012'
    },
    {
        id: 'ORD-4493',
        customer: {
            name: 'Isabella Rossi',
            email: 'i.rossi@example.com',
            initials: 'IR'
        },
        date: '2026-05-13',
        time: '17:35',
        itemsCount: 2,
        total: 310.00,
        couponApplied: false,
        paymentStatus: 'Paid',
        status: 'Processing',
        items: [
            { name: 'Silk Midi Skirt', size: 'S', color: 'Emerald', qty: 1, price: 165.00 },
            { name: 'Cashmere Sleeveless Top', size: 'S', color: 'Oatmeal', qty: 1, price: 145.00 }
        ],
        shippingAddress: '23 Viale Regina, Rome, IT 00185',
        paymentMethod: 'Visa ending in 4491'
    },
    {
        id: 'ORD-2940',
        customer: {
            name: 'Marcus Aurelius',
            email: 'marcus.a@example.com',
            initials: 'MA'
        },
        date: '2026-05-13',
        time: '10:12',
        itemsCount: 1,
        total: 90.00,
        couponApplied: false,
        paymentStatus: 'Failed',
        status: 'Cancelled',
        items: [
            { name: 'Classic Leather Belt', size: '36', color: 'Black', qty: 1, price: 90.00 }
        ],
        shippingAddress: '1 Via dei Fori Imperiali, Rome, IT 00186',
        paymentMethod: 'Mastercard ending in 0021'
    }
];
