// src/components/Flow/Flow.tsx
import React, { useCallback, useEffect } from 'react';
import ReactFlow, { Background, Controls, MiniMap, Node, Edge, useNodesState, useEdgesState, addEdge, Connection } from 'react-flow-renderer';
import dagre from 'dagre';
import { setNextCard, setPreviousCard } from '../../services/api';
import CardNode from './CardNode';
import { FlowContainer } from './Flow.styles';

interface FlowProps {
  initialNodes: Node[];
  initialEdges: Edge[];
  onNodeClick: (event: React.MouseEvent, node: Node) => void; // Add onNodeClick prop
  onExecute: (id: string) => void; // Add onExecute prop
}

const nodeWidth = 172;
const nodeHeight = 36;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
dagreGraph.setGraph({ rankdir: 'LR', nodesep: 100, ranksep: 100 });

const edgeOptions = {
  animated: true,
  style: { stroke: '#000' },
  arrowHeadType: 'arrowclosed',
};

const nodeTypes = {
  cardNode: CardNode,
};

const Flow: React.FC<FlowProps> = ({ initialNodes, initialEdges, onNodeClick, onExecute }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(async (params: Edge | Connection) => {
    const newEdge = { ...params, ...edgeOptions };
    setEdges((eds) => addEdge(newEdge, eds));

    const { source, target } = params;

    if (source && target) {
      try {
        await setNextCard(source, [target]);
        await setPreviousCard(target, [source]);
      } catch (error) {
        console.error('Error setting card links:', error);
      }
    }
  }, [setEdges]);

  useEffect(() => {
    initialNodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    initialEdges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = initialNodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
      node.type = 'cardNode';
      node.data = { ...node.data, onExecute }; // Pass onExecute callback to each node
      return node;
    });

    setNodes(layoutedNodes);
  }, [initialNodes, initialEdges]);

  return (
    <FlowContainer>
      <ReactFlow
        nodes={nodes}
        edges={edges.map(edge => ({ ...edge, ...edgeOptions }))}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick} // Pass the onNodeClick handler to ReactFlow
        fitView
        fitViewOptions={{ padding: 0.2 }}
        defaultZoom={0.8}
        nodeTypes={nodeTypes}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </FlowContainer>
  );
};

export default Flow;
