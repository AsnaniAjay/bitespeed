import React from 'react';
import { Handle, Position } from 'reactflow';

// Custom node component for message type
const MessageNode = ({ data }) => {
  return (
    <div className="bg-green-100 border border-green-400 rounded shadow p-2 w-40">
      {/* Node title */}
      <div className="font-semibold text-sm mb-1">Send Message</div>

      {/* Text content of the node which is editable via settingspanel) */}
      <div className="text-sm">{data.label}</div>

      {/* Handles define where edges can connect */}
      <Handle type="target" position={Position.Left} className="w-2 h-2 bg-gray-500" />
      <Handle type="source" position={Position.Right} className="w-2 h-2 bg-gray-500" />
    </div>
  );
};

export default MessageNode;
