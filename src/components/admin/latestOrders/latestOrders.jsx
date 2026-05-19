import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@phosphor-icons/react';
import DataTable from 'react-data-table-component';
import clsx from 'clsx';
import TitleComponent from '../../titleComponent/titleComponent';

const MOCK_ORDERS = [
    { id: '#ORD-7749', customer: 'Alex Johnson', date: 'May 16, 2026', items: 3, total: '$249.00', status: 'Processing' },
    { id: '#ORD-7748', customer: 'Maria Garcia', date: 'May 16, 2026', items: 1, total: '$125.50', status: 'Delivered' },
    { id: '#ORD-7747', customer: 'James Smith', date: 'May 15, 2026', items: 2, total: '$89.00', status: 'Shipped' },
    { id: '#ORD-7746', customer: 'Sarah Wilson', date: 'May 15, 2026', items: 5, total: '$540.00', status: 'Pending' },
    { id: '#ORD-7745', customer: 'Robert Brown', date: 'May 14, 2026', items: 2, total: '$199.00', status: 'Cancelled' },
    { id: '#ORD-7744', customer: 'Emily Davis', date: 'May 14, 2026', items: 1, total: '$45.00', status: 'Delivered' },
    { id: '#ORD-7743', customer: 'Michael Chen', date: 'May 13, 2026', items: 4, total: '$380.00', status: 'Processing' },
];

const STATUS_BADGES = {
    'Pending': 'bg-amber/10 text-amber',
    'Processing': 'bg-blue-50 text-blue-600',
    'Shipped': 'bg-purple-50 text-purple-600',
    'Delivered': 'bg-green-50 text-green-600',
    'Cancelled': 'bg-red-50 text-red-500'
};

const columns = [
    {
        name: 'Order ID',
        selector: row => row.id,
        sortable: true,
        cell: row => <span className="font-bold text-dark">{row.id}</span>,
        // width: '120px'
    },
    {
        name: 'Customer',
        selector: row => row.customer,
        sortable: true,
        cell: row => <span className="font-semibold text-dark/70">{row.customer}</span>,
    },
    {
        name: 'Date',
        selector: row => row.date,
        sortable: true,
        cell: row => <span className="font-medium text-dark/40">{row.date}</span>,
    },
    {
        name: 'Items',
        selector: row => row.items,
        sortable: true,
        cell: row => <span className="font-bold text-dark w-full text-center">{row.items}</span>,
        // width: '100px'
    },
    {
        name: 'Total',
        selector: row => row.total,
        sortable: true,
        cell: row => <span className="font-black text-dark">{row.total}</span>,
    },
    {
        name: 'Status',
        selector: row => row.status,
        sortable: true,
        cell: row => (
            <span className={clsx(
                "px-4 py-1.5 rounded-full text-xs font-medium inline-block whitespace-nowrap",
                STATUS_BADGES[row.status]
            )}>
                {row.status}
            </span>
        ),
    }
];

const customStyles = {
    headRow: {
        style: {
            backgroundColor: 'rgba(249, 250, 251, 0.5)',
            borderBottomWidth: '1px',
            borderBottomColor: '#f3f4f6',
        },
    },
    headCells: {
        style: {
            backgroundColor: '#97979733',
            fontSize: '14px',
            fontWeight: '900',
            color: '#16181c',
            paddingLeft: '32px',
            paddingRight: '32px',
        },
    },
    cells: {
        style: {
            fontSize: '13px',
            fontWeight: '500',
            color: '#202224',
            paddingLeft: '32px',
            paddingRight: '32px',
            paddingTop: '16px',
            paddingBottom: '16px',
            whiteSpace: 'nowrap',
        },
    },
    rows: {
        style: {
            '&:not(:last-child)': {
                borderBottom: '1px solid #f3f4f6',
            },
            '&:hover': {
                backgroundColor: 'rgba(249, 250, 251, 0.3)',
                transitionDuration: '0.3s',
            },
        },
    },
};

const LatestOrders = () => {
    // Handling possible CJS/ESM interop issues with DataTable
    const DataTableComponent = DataTable.default || DataTable;

    return (
        <div className="bg-white border border-grey-100/50 shadow-1 overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-gray-50 flex items-center justify-between flex-wrap gap-2">
                <div>
                    <TitleComponent type="h4" className="font-playfairDisplay font-black text-dark">Latest Orders</TitleComponent>
                    <TitleComponent size="small-medium" className="text-dark/40 mt-2">Review your most recent transactions</TitleComponent>
                </div>
                <Link to="/admin/orders" className="flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 duration-300">
                    View All <ArrowRightIcon size={14} weight="bold" />
                </Link>
            </div>

            <div className="custom-datatable">
                {typeof DataTableComponent === 'function' || typeof DataTableComponent === 'object' ? (
                    <DataTableComponent
                        columns={columns}
                        data={MOCK_ORDERS}
                        customStyles={customStyles}
                        responsive
                        highlightOnHover
                        noHeader
                    />
                ) : (
                    <div className="p-10 text-center text-dark/20 uppercase text-xs font-bold">
                        Loading table component...
                    </div>
                )}
            </div>
        </div>
    );
};

export default LatestOrders;
