import React, { useState } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer
} from 'recharts';
import clsx from 'clsx';
import TitleComponent from '../../titleComponent/titleComponent';

const MOCK_DATA = {
    '7D': [
        { name: 'Mon', sales: 4000 },
        { name: 'Tue', sales: 3000 },
        { name: 'Wed', sales: 2000 },
        { name: 'Thu', sales: 2780 },
        { name: 'Fri', sales: 1890 },
        { name: 'Sat', sales: 2390 },
        { name: 'Sun', sales: 3490 },
    ],
    '30D': [
        { name: 'Week 1', sales: 12000 },
        { name: 'Week 2', sales: 19000 },
        { name: 'Week 3', sales: 15000 },
        { name: 'Week 4', sales: 22000 },
    ],
    '90D': [
        { name: 'Jan', sales: 45000 },
        { name: 'Feb', sales: 52000 },
        { name: 'Mar', sales: 48000 },
    ]
};

const SalesChart = () => {
    const [range, setRange] = useState('7D');

    return (
        <div className="bg-white border border-grey-100/50 shadow-1 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <TitleComponent type="h4" className="font-black text-dark">Sales Analytics</TitleComponent>
                    <TitleComponent size="small-medium" className="text-dark/40 mt-1">Revenue performance over time</TitleComponent>
                </div>

                <div className="flex bg-gray-50 p-1 border border-grey-100">
                    {['7 Days', '30 Days', '90 Days'].map((r) => (
                        <button
                            key={r}
                            onClick={() => setRange(r)}
                            className={clsx(
                                "px-4 py-1.5 text-xs border border-transparent font-medium duration-300",
                                range === r ? "bg-white text-primary !border-primary" : "text-dark/40 hover:text-dark"
                            )}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-80 w-full min-h-[320px]">
                <ResponsiveContainer width="100%" height="100%" debounce={100}>
                    <AreaChart data={MOCK_DATA[range]}>
                        <defs>
                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#999', fontSize: 12, fontWeight: 600 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#999', fontSize: 12, fontWeight: 600 }}
                            tickFormatter={(value) => `$${value / 1000}k`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#16181c',
                                border: 'none',
                                borderRadius: '4px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                            }}
                            itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                            labelStyle={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', marginBottom: '4px', fontWeight: 'bold', textTransform: 'uppercase' }}
                            cursor={{ stroke: 'var(--color-primary)', strokeWidth: 1 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="sales"
                            stroke="var(--color-primary)"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorSales)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SalesChart;
