import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartModal from "./components/CartModal";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import AdminRoute from "./routes/AdminRoute";

import {
  CartProvider,
  CartContext
} from "./context/CartContext";
import { useContext } from "react";

function Layout(){
  const {
    openCart,
    setOpenCart
  } = useContext(CartContext);

  return (
    <>
      <Navbar />

      <CartModal
        isOpen={openCart}
        onClose={() => setOpenCart(false)}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminRoute />} />
      </Routes>

      <Footer />
    </>
  );
}

export default function App(){
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </CartProvider>
  );
}

