import React from 'react';

// Panel on the right side with draggable nodes
const NodePanel = () => {
  // set drag data when dragging a node type
  const handleDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div>
      <h2 className="font-semibold mb-2">Message Nodes</h2>

      {/* Message Node use this to drag this onto canvas to create a new node */}
      <div
        className="border rounded cursor-pointer bg-white hover:bg-gray-100 px-4 py-2 text-center shadow text-sm"
        onDragStart={(e) => handleDragStart(e, 'message')}
        draggable
      >
        Message
      </div>
    </div>
  );
};

export default NodePanel;
