import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SimpleResume from "./pages/SimpleResume";
import IntermediateResume from "./pages/IntermediateResume";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/simple-resume" element={<PrivateRoute><SimpleResume /></PrivateRoute>} />
        <Route path="/intermediate-resume" element={<PrivateRoute><IntermediateResume /></PrivateRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
