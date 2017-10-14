import React from 'react';
import { Link } from 'react-router-dom';

const GridTile = props => {
  return (
    <div className="grid-container-outer">
      <div className="grid-container">
        <div className="grid-image-block" style={{backgroundImage: `url(${props.workSample})`}}>
          <Link to={`/work/${props.slug}`} onClick={props.handleResourceClick}>
            <div id={props.id} className="grid-hover"></div>
          </Link>
        </div>
        <div className="grid-subtext">
          <div className="caption-title">
            <p>{props.title}</p>
          </div>
          <div className="caption-subtext">
            <p>{props.position}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridTile;
