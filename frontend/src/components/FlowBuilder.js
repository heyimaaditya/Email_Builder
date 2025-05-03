import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow, 
} from 'reactflow';
import 'reactflow/dist/style.css';

import LeadSourceNode from './CustomNodes/LeadSourceNode';
import ColdEmailNode from './CustomNodes/ColdEmailNode';
import WaitNode from './CustomNodes/WaitNode';
import NodePalette from './NodePalette';

import api from '../api/api';
import useAuth from '../hooks/useAuth';


const nodeTypes = {
  leadSource: LeadSourceNode,
  coldEmail: ColdEmailNode,
  wait: WaitNode,
};



const FlowBuilder = () => {
  const { isAuthenticated } = useAuth();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { project, setViewport } = useReactFlow(); 

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  
  const handleNodeDataChange = useCallback((id, newData) => {
      setNodes((nds) =>
          nds.map((node) =>
              node.id === id ? { ...node, data: { ...node.data, ...newData } } : node
          )
      );
  }, [setNodes]);


   const specificNodeTypes = React.useMemo(() => ({
       leadSource: (props) => <LeadSourceNode {...props} data={{...props.data, onChange: (d) => handleNodeDataChange(props.id, d)}} />,
       coldEmail: (props) => <ColdEmailNode {...props} data={{...props.data, onChange: (d) => handleNodeDataChange(props.id, d)}} />,
       wait: (props) => <WaitNode {...props} data={{...props.data, onChange: (d) => handleNodeDataChange(props.id, d)}} />,
   }), [handleNodeDataChange]); 


  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = event.target.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: `${type}-${Date.now()}`, 
        type,
        position,
        data: {},
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [project, setNodes],
  );

  const handleSaveFlow = async () => {
      if (!isAuthenticated) {
           alert('Please log in to save the flow.');
           return;
      }
      try {
        
          const nodesToSave = nodes.map(node => {
              const { onChange, ...restData } = node.data;
              return { ...node, data: restData };
          });

          const flowData = { nodes: nodesToSave, edges };
          await api.post('/flows', flowData);
          alert('Flow saved and scheduling started!');
      } catch (error) {
          console.error('Error saving flow:', error);
          alert('Failed to save flow.');
      }
  };

   const handleLoadFlow = async () => {
       if (!isAuthenticated) {
           alert('Please log in to load the flow.');
           return;
       }
       try {
           const response = await api.get('/flows/latest'); 
           if (response.data) {
               setNodes(response.data.nodes);
               setEdges(response.data.edges);
               
               setTimeout(() => { 
                 setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 800 });
               }, 50);

               alert('Flow loaded!');
           } else {
               alert('No saved flow found.');
               setNodes([]); 
               setEdges([]);
           }
       } catch (error) {
           console.error('Error loading flow:', error);
           alert('Failed to load flow.');
       }
   };


   useEffect(() => {
       if (isAuthenticated) {
           handleLoadFlow();
       } else {
     
            setNodes([]);
            setEdges([]);
       }
   }, [isAuthenticated, setNodes, setEdges]);


  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 60px)' }}> {/* Adjust height based on header/footer */}
        <NodePalette />
        <div style={{ flexGrow: 1, height: '100%', position: 'relative' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodeTypes={specificNodeTypes} 
                fitView 
            >
                <Background />
                <Controls />
            </ReactFlow>
             <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>
                <button onClick={handleSaveFlow} disabled={!isAuthenticated}>Save Flow</button>
                <button onClick={handleLoadFlow} disabled={!isAuthenticated} style={{ marginLeft: '10px' }}>Load Flow</button>
            </div>
        </div>
    </div>
  );
};

export default FlowBuilder;