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
