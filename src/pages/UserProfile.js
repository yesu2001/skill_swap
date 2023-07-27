import React from "react";
import { useParams } from "react-router";
function UserProfile() {
  const { id } = useParams();
  return <div>UserProfile</div>;
}

export default UserProfile;
