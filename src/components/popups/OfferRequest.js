import React, { useState } from "react";

function OfferRequest({ setShow, onSend, skilluserId }) {
  const [exchangeSkill, setExchangeSkill] = useState("");
  const handleSend = () => {
    if (!exchangeSkill) return;
    onSend({
      skilluserId,
      exchangeSkill,
    });
  };
  return (
    <div className="bg-primary fixed inset-0 flex items-center justify-center">
      <div className="bg-background p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          Offer your Skill set for exchange
        </h2>
        <div className="mb-4">
          <label
            htmlFor="skillName"
            className="block font-medium text-foreground"
          >
            Skill Name
          </label>
          <input
            id="skillName"
            type="text"
            value={exchangeSkill}
            onChange={(e) => setExchangeSkill(e.target.value)}
            className="text-black w-full px-3 py-2 border border-foreground rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="flex justify-between">
          <button
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => setShow(false)}
          >
            Cancel
          </button>
          <button
            className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500"
            onClick={handleSend}
          >
            send
          </button>
        </div>
      </div>
    </div>
  );
}

export default OfferRequest;
