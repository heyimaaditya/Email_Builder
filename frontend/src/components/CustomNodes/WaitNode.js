import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const WaitNode = ({ data, isConnectable, id }) => {
  
    const handleDurationChange = (e) => {
         const value = parseInt(e.target.value) || 0;
     
         const durationInMs = value * 60 * 1000; 
        data.onChange({ ...data, duration: durationInMs, durationMinutes: value }); 
    };
 
   return (
     <div style={{
       padding: 10,
       border: '1px solid #ddd',
       borderRadius: 5,
       background: '#c8e6c9',
       textAlign: 'center',
       width: 150
     }}>
       <div><strong>Wait/Delay</strong></div>
       <Handle type="target" position={Position.Top} id="a" isConnectable={isConnectable} style={{ background: '#555' }} />
       <div>
           <label htmlFor={`duration-${id}`}>Duration (minutes):</label> {/* Changed label */}
           <input
             id={`duration-${id}`}
             name="durationMinutes" 
             type="number"
             value={data.durationMinutes || ''}
             onChange={handleDurationChange}
             className="nodrag"
             min="0"
             style={{ width: '80px' }}
           />
       </div>
       <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} style={{ background: '#555' }} />
     </div>
   );
 };
 
 export default memo(WaitNode);