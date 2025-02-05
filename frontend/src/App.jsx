import "./App.css";
import SimpleResume from "./pages/SimpleResume";
import Header from "./components/Header";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import IntermediateResume from "./pages/IntermediateResume"
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Header />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/simple-resume" element={<SimpleResume />} />
        <Route path="/intermediate-resume" element={<IntermediateResume />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
