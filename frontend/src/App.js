// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";


// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ReviewerPage from "./pages/ReviewerPage/ReviewerPage";
import ArtistPage from "./pages/ArtistPage/ArtistPage";
// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {


  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/reviewer-page"
          element={
            <PrivateRoute>
              <ReviewerPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/artist-page"
          element={
            <PrivateRoute>
              <ArtistPage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
