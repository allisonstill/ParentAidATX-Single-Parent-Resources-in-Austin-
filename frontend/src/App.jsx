import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import Childcare from "./pages/Childcare.jsx";
import Searchpage from "./pages/Searchpage.jsx";
//import Programs from "./pages/Programs.jsx";
import Books from "./pages/Books.jsx";
import Housing from "./pages/Housing.jsx";
//import Government from "./pages/Government.jsx";
import IndividualBook from "./pages/IndividualBook.jsx";
import ChildcareService from "./pages/Childcare_Service.jsx";
import HousingComplex from "./pages/HousingComplex.jsx";
import Visualizations from './pages/Visualizations.jsx'
import DeveloperVisualizations from "./pages/DeveloperVisualizations.jsx"
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
          <Route path="/books" element={<Books />} />
          <Route path="/housing" element={<Housing />} />
          <Route path="/childcare" element={<Childcare />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Searchpage />} />
          <Route path="/books/:id" element={<IndividualBook />} />
          <Route path="/childcare/:id" element={<ChildcareService />} />
          <Route path="/housing/:id" element={<HousingComplex />} />
          <Route path="/visualizations" element={<Visualizations />} />
          <Route path="/developer-visualizations" element={<DeveloperVisualizations />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
