import React from 'react';
import FieldSet from '../FieldSet';

const FlowerForm = props => {
  return (
    <div>
      <form className="form-of-flower-form">
        <legend>
          <label>Form of Flower - Total: {props.flowerFormScore}</label>
        </legend>
        <label>Over-all Form</label>
        <FieldSet points={15} adder={props.flowerFormScoreAdder} />
        <label>Sepals</label>
        <FieldSet points={5} adder={props.flowerFormScoreAdder} />
        <label>Petals</label>
        <FieldSet points={5} adder={props.flowerFormScoreAdder} />
        <label>Labellum (*Pouch)</label>
        <FieldSet points={5} adder={props.flowerFormScoreAdder} />
      </form>
    </div>
  );
};

export default FlowerForm;
