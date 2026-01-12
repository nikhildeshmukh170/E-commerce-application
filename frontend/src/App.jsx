import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

export default function App() {
  // Cart structure: [{ product: {...}, quantity: 2 }, ...]
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const addToCart = (product, quantity) => {
    if (quantity <= 0 || !product._id) return;
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product._id === product._id);
      if (existingItem) {
        // Check if new quantity exceeds stock
        if (existingItem.quantity + quantity > product.stock) {
          alert(`Only ${product.stock} items available in stock!`);
          return prevCart;
        }
        return prevCart.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      // Check stock for new item
      if (quantity > product.stock) {
        alert(`Only ${product.stock} items available in stock!`);
        return prevCart;
      }
      
      return [...prevCart, { product, quantity }];
    });
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.product._id !== productId));
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.product._id === productId) {
          if (newQuantity > item.product.stock) {
            alert(`Only ${item.product.stock} items available!`);
            return item;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.product._id !== productId));
  };

  return (
    <BrowserRouter>
      <Navbar cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} setSearchTerm={setSearchTerm} />
      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm}/>} />
        <Route path="/product/:id" element={<Product onAddToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateCartQuantity} removeFromCart={removeFromCart} setCart={setCart} />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ zIndex: 9999 }}
      />
    </BrowserRouter>
  );
}
