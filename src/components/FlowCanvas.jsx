import React, { useCallback, useState, useEffect, useRef } from 'react';
import ReactFlow,
{
  addEdge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import MessageNode from './MessageNode';
import SaveButton from './SaveButton';

// Register custom node types
const nodeTypes = { message: MessageNode };

// helper for unique node ids
let id = 0;
const getId = () => `node_${id++}`;

const FlowCanvas = ({ setSelectedNode, setHandleTextChange }) => {
  // state for nodes and edges inside the canvas
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // state for showing error/success banners
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // access to reactflow's coordinate projection
  const { project } = useReactFlow();

  // keep track of selected node
  const selectedNodeRef = useRef(null);

  // handle connecting nodes with edges
  const onConnect = useCallback(
    (params) => {
      // allow only one outgoing edge from a source
      const alreadyConnected = edges.some((e) => e.source === params.source);
      if (!alreadyConnected) setEdges((eds) => addEdge(params, eds));
    },
    [edges, setEdges]
  );

  // handle drag + drop of new nodes onto canvas
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      // get mouse position relative to canvas
      const bounds = event.currentTarget.getBoundingClientRect();
      const position = project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      // create new node object
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: 'New Message' },
      };

      // add node into state
      setNodes((nds) => nds.concat(newNode));
    },
    [project, setNodes]
  );

  // allow dropping by preventing default dragover
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  // when a node is clicked, mark it as selected
  const onNodeClick = (_, node) => {
    selectedNodeRef.current = node;
    setSelectedNode(node);
  };

  // update label of selected node
  const handleTextChange = (newText) => {
    // update nodes array
    setNodes((nds) =>
      nds.map((n) =>
        n.id === selectedNodeRef.current?.id
          ? { ...n, data: { ...n.data, label: newText } }
          : n
      )
    );

    // update reference and selected state
    if (selectedNodeRef.current) {
      selectedNodeRef.current = {
        ...selectedNodeRef.current,
        data: { ...selectedNodeRef.current.data, label: newText },
      };
      setSelectedNode(selectedNodeRef.current);
    }
  };

  // expose handleTextChange to parent
  useEffect(() => {
    setHandleTextChange(() => handleTextChange);
  }, [setHandleTextChange]);

  // show error toast when flow invalid
  const handleInvalidSave = () => {
    setShowError(true);
    setTimeout(() => setShowError(false), 2000);
  };

  // show success toast when flow is valid and saved
  const handleSuccessSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="w-full h-full relative">
      {/* error banner */}
      {showError && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded z-50">
          Cannot save Flow
        </div>
      )}

      {/* success banner */}
      {showSuccess && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded z-50">
          Flow saved successfully
        </div>
      )}

      {/* Save button */}
      <SaveButton
        nodes={nodes}
        edges={edges}
        onInvalid={handleInvalidSave}
        onSuccess={handleSuccessSave}
      />

      {/* main ReactFlow canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onPaneClick={() => {
          // 👇 clear selection when clicking on empty space
          selectedNodeRef.current = null;
          setSelectedNode(null);
        }}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;
