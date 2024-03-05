import React from 'react';
import './App.css';
import SignUp from './components/auth/SignUp';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';
import LayoutResponsive from './components/layout/LayoutResponsive';
import Balance from './pages/Balance';
import Home from './pages/Home';
import Expenses from './pages/Expenses';
import Incomes from './pages/Incomes';
import Purchase from './pages/Purchase';
import DepositCheck from './pages/DepositCheck';
import Checks from './pages/Checks';
import CheckList from './pages/CheckList';
import CheckDetails from './pages/CheckDetails';
import { MessageProvider } from './context/MessageContext';
import MessagePopup from './components/messsage-popup/MessagePopup';

function App() {
  return (
    <MessageProvider>
      <MessagePopup />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<Login />} />
            <Route element={<ProtectedRoute allowedRoles={['customer']} redirectTo="/login" />} >
              <Route path='/' element={<LayoutResponsive />} >
                <Route index element={<Balance />} />
                <Route path="expenses" element={<Expenses />} />
                <Route path="incomes" element={<Incomes />} />
                <Route path="purchase" element={<Purchase />} />
                <Route path="deposit-check" element={<DepositCheck />} />
                <Route path="checks" element={<Checks />} />
              </Route>
            </Route>
            <Route element={<ProtectedRoute allowedRoles={['admin']} redirectTo="/admin/login" />} >
              <Route path='/admin' element={<LayoutResponsive />} >
                <Route index element={<CheckList />} />
                <Route path="check-details/:id" element={<CheckDetails />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </MessageProvider>
  );
}

export default App;
