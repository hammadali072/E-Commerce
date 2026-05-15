import { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom"

import Header from "./components/header/header"
import Footer from "./components/footer/footer"

import HomePage from "./pages/home-page"
import ShopPage from "./pages/shop-page"
import WishlistPage from "./pages/wishlist-page"
import ProductDetailPage from "./pages/product-detail-page"
import CartPage from "./pages/cart-page"
import CheckoutPage from "./pages/checkout-page"
import OrderSuccessPage from "./pages/order-success-page"
import ProfilePage from "./pages/profile-page"
import LoginPage from "./pages/login-page"
import SignupPage from "./pages/signup-page"
import ForgotPasswordPage from "./pages/forgot-password-page"
import NotFoundPage from "./pages/not-found-page"

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password';

  return (
    <>
      {!isAuthPage && <Header />}
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />

        <Route path="/clothing">
          <Route index element={<ShopPage />} />
          <Route path="shirts" element={<ShopPage />} />
          <Route path="pants" element={<ShopPage />} />
        </Route>

        <Route path="/shoes">
          <Route index element={<ShopPage />} />
          <Route path="formal-shoes" element={<ShopPage />} />
          <Route path="sneakers" element={<ShopPage />} />
          <Route path="joggers" element={<ShopPage />} />
        </Route>

        <Route path="/new-arrivals" element={<ShopPage />} />
        <Route path="/sale" element={<ShopPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!isAuthPage && <Footer />}
    </>
  )
}

export default App
