import React from 'react';
import FieldSet from './FieldSet';

const Dendrobium = props => {
  return (
    <div>
      <form className="form-of-flower-form">
        <legend>
          <label>Form of Flower - Total: {props.totalScore}</label>
        </legend>
        <label>Over-all Form</label>
        <FieldSet points={15} scoreAdder={props.scoreAdder} />
      </form>
    </div>
  );
};

export default Dendrobium;
