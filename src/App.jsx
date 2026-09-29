import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Board from "./pages/Board";

import "./App.css";


/* =========================================================
   Scroll handling
   ========================================================= */

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return null;
}


/* =========================================================
   App
   ========================================================= */

function App() {
  return (
    <div className="site">
      <ScrollToHash />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </div>
  );
}

export default App;