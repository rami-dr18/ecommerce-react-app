import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, Auth, Checkout } from "./pages";
import { Navbar } from "./components";
import AuthProvider from "./context/AuthContext";
function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
