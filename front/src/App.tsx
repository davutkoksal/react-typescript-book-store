import React  from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Order from "./pages/Order";


function App() {


  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </div>
  );
}

export default App;
