// components/Layout.js
import React from "react";
import { Link } from "react-router-dom";
import { checkLoggedInUser, logoutUser } from "../helper/auth"; // Path to your authService.js
import Footer from "./Footer";

const Layout = ({ children, user }) => {
  return (
    <div className="dark:bg-background dark:text-foreground transition-colors">
      {/* Header/Navbar */}
      <header className=" shadow-md">
        <nav className="flex justify-between items-center mb-8 p-4 bg-primary">
          <Link to="/">
            <h1 className="text-2xl font-bold text-secondary">SkillFusion</h1>
          </Link>
          <ul className="flex space-x-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            {!user ? (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={logoutUser}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>

      {/* Body */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
