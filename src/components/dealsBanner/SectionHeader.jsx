import React from 'react';

const SectionHeader = ({ title }) => {
    return (
        <div className="bg-[#00B59C] rounded-[10px] flex items-center justify-between px-8 py-5 mb-6">
            <h2 className="text-white text-[22px] font-bold tracking-wide uppercase">{title}</h2>
            <a href="#" className="flex items-center text-white/90 hover:text-white text-[15px] font-medium transition-colors">
                View All
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </a>
        </div>
    );
};

export default SectionHeader;
