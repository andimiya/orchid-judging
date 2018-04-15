import React from 'react';
import FieldSet from './FieldSet';

const ScoreSheet = props => {
  return (
    <div>
      <form>
        <legend>
          <label>Form of Flower - Total: {props.totalScore}</label>
        </legend>
        <label>Over-all Form</label>
        <FieldSet points={15} scoreAdder={props.scoreAdder} />
        <label>Sepals</label>
        <FieldSet points={5} scoreAdder={props.scoreAdder} />
        <label>Petals</label>
        <FieldSet points={5} scoreAdder={props.scoreAdder} />
        <label>Labellum (*Pouch)</label>
        <FieldSet points={5} scoreAdder={props.scoreAdder} />
      </form>
    </div>
  );
};

export default ScoreSheet;
