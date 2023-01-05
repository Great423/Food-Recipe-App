import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Cuisine from "./Cuisine";
import Searched from "./Searched";
import Recipe from "./Recipe";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

function Pages() {
  const location = useLocation();
  return (
    <div>
        <AnimatePresence>
          <Routes Location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/cuisine/:type" element={<Cuisine />} />
            <Route path="/searched/:search" element={<Searched />} />
            <Route path="/recipe/:name" element={<Recipe />} />
          </Routes>
        </AnimatePresence>
    </div>
  );
}

export default Pages;
 