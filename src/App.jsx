import { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom"

import Header from "./components/header/header"
import Footer from "./components/footer/footer"

import HomePage from "./pages/homePage"
import ShopPage from "./pages/shopPage"
import WishlistPage from "./pages/wishlistPage"
import ProductDetailPage from "./pages/productDetailPage"
import CartPage from "./pages/cartPage"
import CheckoutPage from "./pages/checkoutPage"
import OrderSuccessPage from "./pages/orderSuccessPage"
import ProfilePage from "./pages/profilePage"
import LoginPage from "./pages/loginPage"
import SignupPage from "./pages/signupPage"

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isAuthPage = pathname === '/login' || pathname === '/signup';

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
      </Routes>
      {!isAuthPage && <Footer />}
    </>
  )
}

export default App
