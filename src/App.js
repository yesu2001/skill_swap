import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

// Helper functions
import firebase, { auth } from "./firebase/firebaseConfig"; // Path to your firebaseConfig.js

// Components
import Layout from "./components/Layout";
import Groups from "./pages/Groups";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Loader from "./components/Loader";
import UserProfile from "./pages/UserProfile";
import AllSkills from "./pages/AllSkills";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Listen for auth state changes (logged in or logged out)

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Unsubscribe from the listener when component unmounts
    return () => unsubscribe();
  }, []);

  // Helper function to check if the user is authenticated
  const isAuthenticated = () => {
    return user !== null;
  };

  if (loading) {
    // Render a loading component while we check authentication state
    return <Loader />;
  }

  return (
    <Router>
      <Layout user={user} isAuthenticated={isAuthenticated}>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/all_skills" element={<AllSkills />} />
          <Route
            path="/register"
            element={
              <Register
                isAuthenticated={isAuthenticated}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            }
          />
          {/* <ProtectedRoute path="/skills" element={<Skills />} /> */}
          <Route
            path="/login"
            element={<Login isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/profile"
            element={
              <Profile
                user={user}
                isAuthenticated={isAuthenticated}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}
