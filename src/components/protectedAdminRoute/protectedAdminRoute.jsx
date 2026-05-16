import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useAdminAuth } from '../../context/AdminAuthContext';

const ProtectedAdminRoute = ({ children }) => {
    const { isAdminLoggedIn } = useAdminAuth();

    if (!isAdminLoggedIn) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

ProtectedAdminRoute.propTypes = {
    children: PropTypes.node.isRequired
};

export default ProtectedAdminRoute;
