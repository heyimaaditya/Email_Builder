import React from 'react';

const NodePalette = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside style={{ borderRight: '1px solid #ddd', padding: '10px', background: '#f0f0f0' }}>
      <div style={{ marginBottom: '10px' }}><strong>Node Palette</strong></div>
      <div
        style={{
          padding: '10px',
          border: '1px solid #ddd',
          marginBottom: '10px',
          cursor: 'grab',
          background: '#e0f7fa',
          borderRadius: '3px'
        }}
        onDragStart={(event) => onDragStart(event, 'leadSource')}
        draggable
      >
        Lead Source
      </div>
      <div
        style={{
          padding: '10px',
          border: '1px solid #ddd',
          marginBottom: '10px',
          cursor: 'grab',
          background: '#ffecb3',
          borderRadius: '3px'
        }}
        onDragStart={(event) => onDragStart(event, 'coldEmail')}
        draggable
      >
        Cold Email
      </div>
       <div
        style={{
          padding: '10px',
          border: '1px solid #ddd',
          marginBottom: '10px',
          cursor: 'grab',
          background: '#c8e6c9',
          borderRadius: '3px'
        }}
        onDragStart={(event) => onDragStart(event, 'wait')}
        draggable
      >
        Wait/Delay
      </div>
    </aside>
  );
};

export default NodePalette;