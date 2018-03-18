import React, { Component } from 'react';

const Notice = props => {
  return (
    <div className={props.noticeContainerClass}>
      <div className={props.statusClass}>
        <p>{props.status}</p>
      </div>
    </div>
  );
};

export default Notice;
