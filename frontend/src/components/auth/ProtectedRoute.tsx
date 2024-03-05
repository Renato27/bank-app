// src/components/ProtectedRoute.tsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { Flex, Spin } from 'antd';
import { decodeToken } from '../../helpers/helpers';

interface ProtectedRouteProps {
  redirectTo: string;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ redirectTo, allowedRoles}: ProtectedRouteProps) => {
  const authContext = useContext(AuthContext);

  if (authContext?.loading) {
    return <Flex gap="small" vertical>
      <Spin tip="Loading..." />
    </Flex>
  }

  if (!authContext?.authToken) {
    return <Navigate to={redirectTo} replace />;
  }

  const decode = decodeToken();
 
  if (!decode) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!allowedRoles?.includes(decode.userType)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
