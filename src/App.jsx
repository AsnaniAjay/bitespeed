import React, { useState } from "react";
import { ReactFlowProvider } from "reactflow";
import FlowCanvas from "./components/FlowCanvas";
import SettingsPanel from "./components/SettingsPanel";
import NodePanel from "./components/NodePanel";

const App = () => {
  const [selectedNode, setSelectedNode] = useState(null); // track selected node
  const [handleTextChange, setHandleTextChange] = useState(() => () => {}); // handler from FlowCanvas

  return (
    <ReactFlowProvider>
      <div className="flex h-screen">
        {/* Main canvas area */}
        <div className="w-4/5 h-full">
          <FlowCanvas
            setSelectedNode={setSelectedNode}
            setHandleTextChange={setHandleTextChange}
          />
        </div>

        {/* Right sidebar switches between Settings and Node Panel */}
        <div className="w-1/5 h-full flex flex-col border-l bg-gray-50">
          {selectedNode ? (
            // Show settings if a node is selected
            <div className="p-4 border-b">
              <SettingsPanel
                selectedNode={selectedNode}
                onChange={handleTextChange}
              />
            </div>
          ) : (
            // Otherwise show the available node types
            <div className="p-4 flex-1 overflow-y-auto">
              <NodePanel />
            </div>
          )}
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default App;
