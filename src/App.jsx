import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom"
import Header from "./components/header/header"
import HomePage from "./pages/home-page"
import ShopPage from "./pages/shop-page"
import Footer from "./components/footer/footer"

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
