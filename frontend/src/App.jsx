import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SimpleResume from "./pages/SimpleResume";
import IntermediateResume from "./pages/IntermediateResume";
import About from "./pages/About";
import Contact  from "./pages/Contact";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/simple-resume" element={<SimpleResume />} />
        <Route path="/intermediate-resume" element={<IntermediateResume />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
