import Flow from '../models/flow.model.js';
import agendaService from '../services/agenda.service.js'; 

const saveFlow = async (userId, flowData) => {
  const flow = new Flow({
    userId,
    name: flowData.name || 'Untitled Flow',
    nodes: flowData.nodes,
    edges: flowData.edges
  });
  await flow.save();
  return flow;
};

const getFlows = async (userId) => {

  const flow = await Flow.findOne({ userId }).sort({ createdAt: -1 });
  return flow;
};


const processFlowAndSchedule = async (userId, flowData) => {
    const { nodes, edges } = flowData;
    const saveTime = new Date(); 
  
    const nodesMap = new Map(nodes.map(node => [node.id, node]));
    const adjacencyList = new Map(); 
  
 
    const incomingEdges = new Set();
    edges.forEach(edge => {
      if (!adjacencyList.has(edge.source)) {
        adjacencyList.set(edge.source, []);
      }
      adjacencyList.get(edge.source).push({ target: edge.target, edgeId: edge.id });
      incomingEdges.add(edge.target);
    });
  
    const sourceNodes = nodes.filter(node => node.type === 'leadSource' && !incomingEdges.has(node.id));
  
    if (sourceNodes.length === 0) {
      console.warn('No starting "Lead Source" node found. No emails will be scheduled.');
      return;
    }
  
   
    const arrivalTimes = new Map();
    const queue = []; // For BFS-like traversal
  
   
    sourceNodes.forEach(sourceNode => {
      arrivalTimes.set(sourceNode.id, saveTime.getTime());
      queue.push(sourceNode.id);
    });
  
   
    const visitedNodes = new Set();
  
  
    while (queue.length > 0) {
     
      const nodeId = queue.shift();
      const currentNode = nodesMap.get(nodeId);
  
 
       if (visitedNodes.has(nodeId)) {
         
            continue;
       }
      visitedNodes.add(nodeId);
  
  
      let currentTime = arrivalTimes.get(nodeId);
  

      if (typeof currentTime !== 'number' || !Number.isFinite(currentTime)) {
           console.error(`Skipping processing for node ${nodeId} due to invalid calculated time: ${currentTime}`);
           continue; 
      }
  
  
      console.log(`Processing node ${nodeId} (type: ${currentNode.type}) at time: ${new Date(currentTime).toISOString()}`);
  
  
      if (currentNode.type === 'coldEmail') {
        const { recipient, subject, body } = currentNode.data || {}; 
         if (recipient && subject && body) {
             
              const scheduleTime = new Date(currentTime);
              console.log(`- Scheduling email job for ${recipient} at ${scheduleTime.toISOString()}`);
            
              await agendaService.scheduleEmail(scheduleTime, { to: recipient, subject, body });
         } else {
             console.warn(`- Cold Email node ${nodeId} is missing recipient, subject, or body. Skipping scheduling.`);
         }
      }
  
     
      let exitTime = currentTime;
  
      if (currentNode.type === 'wait') {
         
          const duration = currentNode.data?.duration; // Access safely
          
          if (typeof duration === 'number' && Number.isFinite(duration) && duration > 0) {
               exitTime += duration;
               console.log(`- Wait node ${nodeId} adds ${duration}ms delay. New exit time: ${new Date(exitTime).toISOString()}`);
          } else {
           
              console.warn(`- Wait node ${nodeId} has invalid, non-finite, or zero duration (${duration}). No delay added.`);
          }
      }
  
  
      const neighbors = adjacencyList.get(nodeId) || [];
      neighbors.forEach(({ target }) => {
        const targetNode = nodesMap.get(target);
        if (!targetNode) {
            console.warn(`Edge points to unknown node: ${target}. Skipping.`);
            return;
        }
  
      
        const existingArrivalTime = arrivalTimes.get(target);
        if (existingArrivalTime === undefined || exitTime < existingArrivalTime) {
         
          console.log(`- Updating arrival time for node ${target} from ${existingArrivalTime ? new Date(existingArrivalTime).toISOString() : 'undefined'} to ${new Date(exitTime).toISOString()}`);
          arrivalTimes.set(target, exitTime);
        
          visitedNodes.delete(target); // Allow reprocessing
          queue.push(target);
        } else {
             console.log(`- Node ${target} already has an earlier or equal arrival time (${new Date(existingArrivalTime).toISOString()}). Not updating.`);
        }
      });
    }
     console.log('Flow processing complete.');
  };
  
  


export default {
  saveFlow,
  getFlows,
  processFlowAndSchedule
};