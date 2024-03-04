// src/components/ProtectedRoute.tsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { Flex, Spin } from 'antd';

interface ProtectedRouteProps {
  redirectTo: string;
}

const ProtectedRoute = ({ redirectTo }: ProtectedRouteProps) => {
  const authContext = useContext(AuthContext);

  console.log('AuthContext em ProtectedRoute:', authContext);

  if (authContext?.loading) {
    return <Flex gap="small" vertical>
      <Spin tip="Loading..." />
    </Flex>
  }

  if (!authContext?.authToken) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
