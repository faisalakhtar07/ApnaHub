import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import useTheme from "./hooks/useTheme";

import Home from "./pages/Home";
import Businesses from "./pages/Businesses";
import BusinessDetails from "./pages/BusinessDetails";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import BuySell from "./pages/BuySell";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import SearchResults from "./pages/Search";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import PostAd from "./pages/PostAd";
import MyAccount from "./pages/MyAccount";
import NotFound from "./pages/NotFound";

/** Customer-facing shell: navbar + page content + footer. */
function CustomerLayout({ children, dark, toggle }) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0B1120] transition-colors duration-300">
      <Navbar dark={dark} toggleTheme={toggle} />
      {children}
      <Footer />
    </div>
  );
}

export default function App() {
  const { dark, toggle } = useTheme();

  return (
    <CustomerLayout dark={dark} toggle={toggle}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/businesses" element={<Businesses />} />
        <Route path="/businesses/:id" element={<BusinessDetails />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/buy-sell" element={<BuySell />} />
        <Route path="/buy-sell/:id" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post-ad" element={<PostAd />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CustomerLayout>
  );
}
