import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, Auth, Checkout, ProductDetail } from "./pages";
import { Navbar } from "./components";
import AuthProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext";
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
