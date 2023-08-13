// components/Layout.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"; // Path to your authService.js
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import CreateGroupForm from "./popups/CreateGroupForm";
import { logoutUser } from "../reducer/userAuthSlice";
import defaultPic from "../assets/default_pic.jpg";

const Layout = ({ children, user, profile }) => {
  const [openGroupModal, SetOpenGroupModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const handleGroupModal = () => SetOpenGroupModal(true);
  const handleCloseGroupModal = () => SetOpenGroupModal(false);

  const handleLogout = async () => {
    try {
      console.log("logged out");
      await dispatch(logoutUser());
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className="dark:bg-background dark:text-foreground transition-colors">
      {/* Header/Navbar */}
      <header className=" shadow-md">
        <nav className="flex justify-between items-center p-4 bg-primary">
          <Link to="/">
            <h1 className="text-2xl font-bold text-secondary">SkillFusion</h1>
          </Link>
          <ul className="flex items-center space-x-4">
            <li>
              {/* <HomeRoundedIcon fontSize="24px" mr={2} /> */}
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
                  <Link to="/groups">Groups</Link>
                </li>
                <li>
                  <Link to="/chats">Chats</Link>
                </li>
                <button
                  onClick={handleGroupModal}
                  className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500"
                >
                  Create Group
                </button>
                {openGroupModal && (
                  <CreateGroupForm
                    onClose={handleCloseGroupModal}
                    currentUser={user}
                  />
                )}
                <div className="relative">
                  <NotificationsIcon />
                </div>
                {/* User Profile Picture / Avatar */}
                <div className="relative">
                  <Avatar
                    alt="User Avatar"
                    src={profile?.photo || defaultPic}
                    className="cursor-pointer"
                    onClick={handleClick}
                    sx={{ width: 36, height: 36 }}
                  />
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    PaperProps={{
                      className: "bg-white dark:bg-gray-700 rounded shadow-md",
                    }}
                    sx={{ mt: 1 }}
                  >
                    <ul className="space-y-2 p-3">
                      <li className="flex items-center justify-between text-white">
                        <PersonRoundedIcon />
                        <Link to="/profile" className=" block py-2">
                          Profile
                        </Link>
                      </li>
                      <li
                        onClick={handleLogout}
                        className="text-red-500 cursor-pointer"
                      >
                        <LogoutRoundedIcon /> Logout
                      </li>
                    </ul>
                  </Popover>
                </div>
              </>
            )}
          </ul>
        </nav>
      </header>

      {/* Body */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
