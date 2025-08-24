import React from 'react';
import { isFlowValid } from '../utils/validateFlow';

// Button to save the flow 
const SaveButton = ({ nodes, edges, onInvalid, onSuccess }) => {
  const handleSave = () => {
    // validate flow before saving
    if (!isFlowValid(nodes, edges)) {
      onInvalid?.(); // show error message
      return;
    }
    onSuccess?.(); // show success message
  };

  return (
    <div className="absolute top-4 right-4 z-50">
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  );
};

export default SaveButton;
