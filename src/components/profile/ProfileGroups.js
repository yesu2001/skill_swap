// src/components/UserGroups.js

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserGroups,
  deleteGroup,
} from "../../reducer/communityGroupsSlice";
import { auth } from "../../firebase/firebaseConfig";
import CreateGroupForm from "../popups/CreateGroupForm";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { green, red } from "@mui/material/colors";

const ProfileGroups = () => {
  const currentUser = auth.currentUser;
  const userGroups = useSelector((state) => state.groups.data);
  const dispatch = useDispatch();
  const [groupMenuStates, setGroupMenuStates] = useState({});
  const [edit, setEdit] = useState(false);
  const [toEditData, setToEditData] = useState({});
  // Function to open/close the menu for a specific group
  const handleCloseEditGroupForm = () => setEdit(false);
  const handleToggleMenu = (group) => {
    setGroupMenuStates((prevState) => ({
      ...prevState,
      [group.group_id]: !prevState[group.group_id], // Toggle the menu state for the specific group
    }));
  };

  // console.log(userGroups);

  useEffect(() => {
    dispatch(fetchUserGroups(currentUser.uid));
  }, [dispatch, currentUser, userGroups]);

  const handleDeleteGroup = (groupId) => {
    dispatch(deleteGroup(groupId));
  };

  const handleEditGroup = (id) => {
    const filteredData = userGroups?.filter((group) => group.group_id === id);
    setToEditData(filteredData[0]);
    setEdit(true);
  };
  const handleViewGroup = (id) => {};

  return (
    <div className="mt-6 bg-primary p-6 rounded-md">
      <h2 className="text-3xl font-bold mb-4">Your Groups</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {userGroups.map((group) => (
          <div
            key={group.group_id}
            className="bg-background p-6 rounded-lg shadow-md mb-4 relative"
          >
            <div
              className="cursor-pointer absolute top-0 right-0 p-2"
              onClick={() => handleToggleMenu(group)}
            >
              {/* Replace this with your three-dots icon */}
              <div>...</div>
            </div>

            {/* Menu with delete and edit options */}
            {groupMenuStates[group.group_id] && ( // Check the menu state for the specific group
              <div className="absolute top-6 right-6 bg-primary p-2 rounded-lg shadow-md">
                <div
                  onClick={() => handleEditGroup(group.group_id)}
                  style={{ margin: 1, cursor: "pointer" }}
                >
                  Edit
                </div>
                <div
                  onClick={() => handleDeleteGroup(group.group_id)}
                  style={{ margin: 1, cursor: "pointer" }}
                >
                  Delete
                </div>
              </div>
            )}
            {edit && (
              <CreateGroupForm
                edit={edit}
                close={handleCloseEditGroupForm}
                group={toEditData}
              />
            )}
            <h3
              className="text-xl font-semibold text-white"
              onClick={() => handleViewGroup(group.id)}
            >
              {group.name}
            </h3>
            <p className="text-foreground mt-2">{group.description}</p>
            {/* <div className="mt-4">
              <EditIcon
                onClick={() => handleEditGroup(group.id)}
                sx={{ color: green[500] }}
              />
              <DeleteIcon
                onClick={() => handleDeleteGroup(group.id)}
                sx={{ color: red[500] }}
              />
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileGroups;
