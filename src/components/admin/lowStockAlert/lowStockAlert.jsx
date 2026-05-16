import React from 'react';
import { Link } from 'react-router-dom';
import { WarningIcon, ArrowRightIcon } from '@phosphor-icons/react';
import TitleComponent from '../../titleComponent/titleComponent';
import clsx from 'clsx';

const MOCK_LOW_STOCK = [
    { name: 'Leather Wallet', sku: 'ACC-WLT-01', stock: 3, img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=100' },
    { name: 'Silk Necktie', sku: 'ACC-TIE-04', stock: 2, img: 'https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?auto=format&fit=crop&q=80&w=100' },
    { name: 'White T-Shirt', sku: 'CLO-TSH-09', stock: 5, img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=100' },
    { name: 'Canvas Tote Bag', sku: 'BAG-TOT-22', stock: 4, img: 'https://images.unsplash.com/photo-1544816153-12ad5d7132a1?auto=format&fit=crop&q=80&w=100' },
];

const LowStockAlert = () => {
    return (
        <div className="bg-white border border-grey-100/50 shadow-1 p-6 sm:p-8 h-full flex flex-col">
            <div className="flex items-center justify-between flex-wrap gap-2 md:mb-8 mb-4">
                <div>
                    <TitleComponent type="h4" className="font-black text-dark flex items-center gap-2">
                        Stock Alerts
                    </TitleComponent>
                    <TitleComponent size="small-medium" className="text-dark/40 mt-2">Products running out of stock</TitleComponent>
                </div>
                <Link to="/admin/inventory" className="text-sm font-semibold text-dark/40 hover:text-dark duration-300">
                    Manage
                </Link>
            </div>

            <div className="flex flex-col flex-1">
                {MOCK_LOW_STOCK.map((item, i) => (
                    <div key={i} className={clsx(
                        "flex items-center gap-4 py-4 group duration-300",
                        i !== MOCK_LOW_STOCK.length - 1 && "border-b border-grey-100"
                    )}>
                        <div className="size-12 overflow-hidden flex-shrink-0">
                            <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 duration-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <TitleComponent size="base-semibold" className="text-dark truncate leading-tight">{item.name}</TitleComponent>
                            <TitleComponent size="extra-small-medium" className="text-dark/30 sm:text-sm mt-1">SKU: {item.sku}</TitleComponent>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <TitleComponent size="extra-small-semibold" className="text-red-600">{item.stock} Left</TitleComponent>
                            <div className="w-16 h-1 bg-red-100 rounded-full mt-2 overflow-hidden">
                                <div className="h-full bg-red-500 duration-1000" style={{ width: `${(item.stock / 10) * 100}%` }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Link to="/admin/inventory" className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-center gap-2 text-sm font-semibold text-primary hover:gap-3 duration-300">
                View All Inventory <ArrowRightIcon size={14} weight="bold" />
            </Link>
        </div>
    );
};

export default LowStockAlert;
