// src/components/Flow/Flow.tsx
import React, { useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap, Node, Edge, useNodesState, useEdgesState, addEdge, Connection } from 'react-flow-renderer';

interface FlowProps {
  initialNodes: Node[];
  initialEdges: Edge[];
}

const Flow: React.FC<FlowProps> = ({ initialNodes, initialEdges }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div style={{ height: 600, width: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default Flow;
