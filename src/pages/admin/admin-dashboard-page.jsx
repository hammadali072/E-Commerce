import React from 'react';
import TitleComponent from '../../components/titleComponent/titleComponent';
import StatsGrid from '../../components/admin/statsGrid/statsGrid';
import SalesChart from '../../components/admin/salesChart/salesChart';
import LatestOrders from '../../components/admin/latestOrders/latestOrders';
import TopSelling from '../../components/admin/topSelling/topSelling';
import LowStockAlert from '../../components/admin/lowStockAlert/lowStockAlert';

const AdminDashboardPage = () => {
    return (
        <div className="space-y-6 sm:space-y-8 pb-10">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <TitleComponent type="h2" className="tracking-tight uppercase text-xl sm:text-2xl">Dashboard</TitleComponent>
                    <TitleComponent size="small-medium" className="text-dark/40 mt-1">
                        Performance overview & real-time insights
                    </TitleComponent>
                </div>
            </div>

            {/* Step 4: Analytics Cards Row */}
            <StatsGrid />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
                {/* Step 5: Sales Chart (Left/Center) */}
                <div className="xl:col-span-2">
                    <SalesChart />
                </div>

                {/* Step 7: Top Selling Products (Right) */}
                <div className="h-full">
                    <TopSelling />
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
                {/* Step 6: Latest Orders Table (Left/Center) */}
                <div className="xl:col-span-2">
                    <LatestOrders />
                </div>

                {/* Step 8: Low Stock Alert Widget (Right) */}
                <div className="h-full">
                    <LowStockAlert />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
