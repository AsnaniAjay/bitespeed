import React from 'react';

// Panel to edit the text of the currently selected node
const SettingsPanel = ({ selectedNode, onChange }) => {
  if (!selectedNode) return null; // don't show if nothing is selected

  return (
    <div className="p-4 border-b bg-gray-50">
      <h2 className="font-semibold mb-2">Message</h2>

      {/* textarea updates the label of the selected node */}
      <textarea
        value={selectedNode.data.label}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded resize-none text-sm mb-4"
        rows={5}
      />
    </div>
  );
};

export default SettingsPanel;
