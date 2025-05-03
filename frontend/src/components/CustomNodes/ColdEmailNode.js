import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const ColdEmailNode = ({ data, isConnectable, id }) => {
 
  const handleDataChange = (e) => {
    const { name, value } = e.target;
    data.onChange({ ...data, [name]: value });
  };

  return (
    <div style={{
      padding: 10,
      border: '1px solid #ddd',
      borderRadius: 5,
      background: '#ffecb3',
      width: 200
    }}>
      <div><strong>Cold Email</strong></div>
      {/* Input handle at the top */}
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        isConnectable={isConnectable}
        style={{ background: '#555' }}
      />
      <div>
         <label htmlFor={`recipient-${id}`}>To:</label>
         <input
           id={`recipient-${id}`}
           name="recipient"
           type="email"
           value={data.recipient || ''}
           onChange={handleDataChange}
           className="nodrag"
           style={{ width: '90%', marginBottom: '5px' }}
         />
      </div>
      <div>
         <label htmlFor={`subject-${id}`}>Subject:</label>
          <input
           id={`subject-${id}`}
           name="subject"
           type="text"
           value={data.subject || ''}
           onChange={handleDataChange}
           className="nodrag"
           style={{ width: '90%', marginBottom: '5px' }}
         />
      </div>
       <div>
         <label htmlFor={`body-${id}`}>Body:</label>
          <textarea
           id={`body-${id}`}
           name="body"
           value={data.body || ''}
           onChange={handleDataChange}
           className="nodrag"
           rows={3}
           style={{ width: '90%' }}
         />
      </div>
      {/* Output handle at the bottom */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
        style={{ background: '#555' }}
      />
    </div>
  );
};

export default memo(ColdEmailNode);