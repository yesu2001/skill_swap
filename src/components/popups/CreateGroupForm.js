import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createGroup, updateGroup } from "../../reducer/communityGroupsSlice";
import generateCustomId from "../../helper/generateCustomId";
import { createMessage } from "../../reducer/groupMessagesSlice";

function CreateGroupForm({ onClose, currentUser, edit, close, group }) {
  const group_name = group?.name;
  const group_desc = group?.description;
  const [groupName, setGroupName] = useState(edit ? group_name : "");
  const [groupDescription, setGroupDescription] = useState(
    edit ? group_desc : ""
  );
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (edit) {
      console.log(groupName, groupDescription);
      try {
        await dispatch(
          updateGroup({ groupId: group.group_id, groupName, groupDescription })
        );
      } catch (err) {
        console.log(err);
      }
      close();
    } else {
      const groupData = {
        group_id: generateCustomId(),
        createdByuser: currentUser.name || currentUser.email,
        userId: currentUser.uid,
        members: [currentUser.uid],
        admin: [currentUser.uid],
        name: groupName,
        description: groupDescription,
        cover_image: "",
      };
      try {
        await dispatch(createGroup(groupData));
      } catch (err) {
        console.log(err);
      }
      onClose();
    }
  };

  const handleClose = () => {
    if (edit) {
      close();
    } else {
      onClose();
    }
  };

  return (
    <div className="bg-primary fixed inset-0 flex items-center justify-center z-50">
      <div className=" bg-background p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Create a New Group</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="groupName" className="block text-sm font-medium">
              Group Name
            </label>
            <input
              type="text"
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
              className="text-black block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none "
            />
          </div>
          <div>
            <label
              htmlFor="groupDescription"
              className="block text-sm font-medium"
            >
              Group Description
            </label>
            <textarea
              id="groupDescription"
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              required
              className="text-black block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none "
            ></textarea>
          </div>
          <div className="flex items-center justify-between mt-6">
            <button
              type="button"
              className=" bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-2 bg-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500"
            >
              {edit ? "Update" : "Create Group"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateGroupForm;
