import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    // Initialize from localStorage
    useEffect(() => {
        const loggedIn = localStorage.getItem('eshop-admin-logged-in') === 'true';
        setIsAdminLoggedIn(loggedIn);
    }, []);

    const adminLogin = (password) => {
        if (password === 'admin123') {
            setIsAdminLoggedIn(true);
            localStorage.setItem('eshop-admin-logged-in', 'true');
            return { success: true };
        }
        return { success: false, message: 'Invalid Admin Password' };
    };

    const adminLogout = () => {
        setIsAdminLoggedIn(false);
        localStorage.removeItem('eshop-admin-logged-in');
    };

    return (
        <AdminAuthContext.Provider value={{ isAdminLoggedIn, adminLogin, adminLogout }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => {
    const context = useContext(AdminAuthContext);
    if (!context) {
        throw new Error('useAdminAuth must be used within an AdminAuthProvider');
    }
    return context;
};
