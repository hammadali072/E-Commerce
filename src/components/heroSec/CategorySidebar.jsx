import React from 'react';

const CategorySidebar = () => {
    const categories = [
        {
            name: 'Laptops',
            count: 1,
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="2" y1="20" x2="22" y2="20"></line>
                </svg>
            )
        },
        {
            name: 'PC & Computers',
            count: 2,
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
            )
        },
        {
            name: 'Cell Phones',
            count: 3,
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
            )
        },
        {
            name: 'Tablets',
            count: 4,
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
            )
        },
        {
            name: 'Cameras',
            count: 5,
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                </svg>
            )
        }
    ];

    return (
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-50 h-full">
            <h2 className="text-[28px] font-bold text-[#2D3F50] mb-4">Category</h2>
            <div className="flex mb-8">
                <div className="w-16 h-[2px] bg-[#A3E6D8]"></div>
                <div className="flex-1 h-[2px] bg-gray-100"></div>
            </div>

            <ul className="space-y-4">
                {categories.map((category, index) => (
                    <li key={index}>
                        <a
                            href="#"
                            className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:shadow-md hover:border-[#A3E6D8] transition-all group bg-white"
                        >
                            <div className="flex items-center gap-4">
                                <div className="text-[#00B59C] flex items-center justify-center">
                                    {category.icon}
                                </div>
                                <span className="font-bold text-gray-900 text-[15px] group-hover:text-[#00B59C] transition-colors">
                                    {category.name}
                                </span>
                            </div>
                            <span className="w-[34px] h-[34px] bg-[#8BDAD2] text-[#2D3F50] rounded-full flex items-center justify-center text-sm font-medium">
                                {category.count}
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategorySidebar;
