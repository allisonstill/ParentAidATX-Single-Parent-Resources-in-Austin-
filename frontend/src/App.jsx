import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import Childcare from "./pages/Childcare.jsx";
import Programs from "./pages/Programs.jsx";
import Housing from "./pages/Housing.jsx";
//import "./components/Navbar.css"
import "bootstrap/dist/css/bootstrap.min.css";
//import InstanceCard from "./components/Card";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
    <>
      {/*Navigation Bar*/}
      <Navbar />

      <div>
        {/*Routes*/}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/housing" element={<Housing />} />
          <Route path="/childcare" element={<Childcare />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
