import React from 'react';
import {
    UsersIcon, ReceiptIcon, ChartLineUpIcon, ClockIcon,
    TrendUpIcon, TrendDownIcon
} from '@phosphor-icons/react';
import clsx from 'clsx';
import TitleComponent from '../../titleComponent/titleComponent';

const STATS_DATA = [
    { label: 'Total User', value: '40,689', change: '8.5%', isUp: true, icon: UsersIcon, bg: 'bg-indigo-100', color: 'text-indigo-600' },
    { label: 'Total Order', value: '10,293', change: '1.3%', isUp: true, icon: ReceiptIcon, bg: 'bg-yellow-100', color: 'text-yellow-600' },
    { label: 'Total Sales', value: '$89,000', change: '4.3%', isUp: false, icon: ChartLineUpIcon, bg: 'bg-green-100', color: 'text-green-600' },
    { label: 'Total Pending', value: '2,040', change: '1.8%', isUp: true, icon: ClockIcon, bg: 'bg-red-100', color: 'text-red-600' },
];

const StatsGrid = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {STATS_DATA.map((stat, i) => (
                <div key={i} className="bg-white p-5 sm:p-6 border border-grey-100/50 rounded-sm group hover:border-primary/50 hover:shadow-1 duration-300">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <TitleComponent type="p" size="small-semibold" className="text-dark/40 uppercase tracking-widest">
                                {stat.label}
                            </TitleComponent>
                            <h3 className='mt-3 text-[#202224] font-openSans font-bold text-2xl sm:text-3xl leading-none'>{stat.value}</h3>
                        </div>
                        <div className={clsx("size-12 flex items-center justify-center rounded-xl duration-500 group-hover:scale-110", stat.bg)}>
                            <stat.icon size={24} weight="bold" className={stat.color} />
                        </div>
                    </div>
                    <div className="flex items-center flex-wrap gap-2">
                        <div className={clsx("flex items-center gap-1 text-sm font-bold", stat.isUp ? "text-green-500" : "text-red-500")}>
                            {stat.isUp ? <TrendUpIcon size={16} weight="bold" /> : <TrendDownIcon size={16} weight="bold" />}
                            {stat.change}
                        </div>
                        <span className="text-[13px] text-dark/40 font-medium whitespace-nowrap">
                            {stat.isUp ? 'Up from last month' : 'Down from last month'}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsGrid;
