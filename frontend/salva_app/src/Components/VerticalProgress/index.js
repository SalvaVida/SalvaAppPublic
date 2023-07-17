import React from 'react';
import './index.scss'; // Import CSS file for styling (optional)

const VerticalProgress = ({ items }) => {
    return (
      <div className="vertical-list">
        {items.map((item, index) => (
          <div key={index} className="list-item">
            <div className="circle" />
            <h6 className="fw-500 open-sans text-muted">{item}</h6>
            {index !== items.length - 1 && <div className="line" />}
          </div>
        ))}
      </div>
    );
  };

export default VerticalProgress;
