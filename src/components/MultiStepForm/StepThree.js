import React from "react";

const StepThree = ({ formData, handleChange }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Step 3: Skills</h2>
      <div className="mb-4">
        <label className="block mb-2">
          Receive Email Notifications:
          <input
            type="checkbox"
            name="receive_email_notifications"
            checked={formData.receive_email_notifications}
            onChange={handleChange("receive_email_notifications")}
            className="ml-2 text-black"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2">
          Receive Push Notifications:
          <input
            type="checkbox"
            name="receive_push_notifications"
            checked={formData.receive_push_notifications}
            onChange={handleChange("receive_push_notifications")}
            className="ml-2 text-black"
          />
        </label>
      </div>
    </div>
  );
};

export default StepThree;
