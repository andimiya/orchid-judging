import React from 'react';

const WorkShowcase = props => {
  return (
    <div className="showcase-container">
      <div className="showcase-image-block" style={{backgroundImage: `url(${props.workSample})`}}>
      </div>
      <div className="showcase-text-container">
        <div className="showcase-title">
          <h1>{props.title}</h1>
        </div>
        <div className="showcase-subtext">
          {props.description}
        </div>
      </div>
    </div>
  );
};

export default WorkShowcase;
