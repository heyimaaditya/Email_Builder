import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const LeadSourceNode = ({ data, isConnectable }) => {
  return (
    <div style={{
      padding: 10,
      border: '1px solid #ddd',
      borderRadius: 5,
      background: '#e0f7fa',
      textAlign: 'center'
    }}>
      <div>Lead Source</div>
      {/* Output handle at the bottom */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
        style={{ background: '#555' }}
      />
    </div>
  );
};

export default memo(LeadSourceNode);