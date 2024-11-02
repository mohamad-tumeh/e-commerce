import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Products from '../pages/Products';
import ProductDetailPage from '../pages/ProductDetailPage';
import SignUpPage from '../pages/SignUpPage';
import SignInPage from '../pages/SignInPage';
import PrivateRoute from './PrivateRoute';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import AdminDashboard from '../pages/AdminDashboard';
import ErrorPage from '../pages/ErrorPage';

const AppRoutes: React.FC = () => (
    <Routes>
        <Route path="/unauthorized" element={<ErrorPage type="unauthorized" />} />
        <Route path="/404" element={<ErrorPage type="notfound" />} />
        <Route path="*" element={<Navigate to="/404" />} />

        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/cart" element={<PrivateRoute requiredRole="user" element={<CartPage />} />} />
        <Route path="/checkout" element={<PrivateRoute requiredRole="user" element={<CheckoutPage />} />} />
        <Route path="/dashboard" element={<PrivateRoute requiredRole="admin" element={<AdminDashboard />} />} />
    </Routes>
);

export default AppRoutes;
