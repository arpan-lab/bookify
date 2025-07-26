import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useFirebase } from "./context/Firebase";
import './App.css';

// Pages
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import HomePage from "./pages/Home";
import ListingPage from "./pages/List";

import "bootstrap/dist/css/bootstrap.min.css";
import MyNavbar from "./components/Navbar";
import BookDetailPage from "./pages/Detail";
import ViewOrderDetails from "./pages/ViewOrderDetail";
import ViewOrders from "./pages/ViewOrder";

function App() {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If user is not logged in and accessing protected routes, redirect to login
    const isProtectedRoute =
      location.pathname === "/" ||
      location.pathname.startsWith("/book");

    if (!firebase.isLoggedIn && isProtectedRoute) {
      navigate("/login");
    }

    // If user is logged in and on login/register, redirect to home
    if (
      firebase.isLoggedIn &&
      (location.pathname === "/login" || location.pathname === "/register")
    ) {
      navigate("/");
    }
  }, [firebase.isLoggedIn, location.pathname, navigate]);

  // Hide Navbar on login and register pages
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <MyNavbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/book/list" element={<ListingPage />} />
        <Route path="/book/view/:bookId" element={<BookDetailPage />} />
        <Route path="/book/orders" element={<ViewOrders />} />

        <Route path="/books/orders/:bookId" element={<ViewOrderDetails />} />
      </Routes>
    </>
  );
}

export default App;
