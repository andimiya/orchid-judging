import React from 'react';

const FieldSet = props => {
  let pointsArray = [];
  for (var i = 1; i < props.points + 1; i++) {
    pointsArray.push(i);
  }

  return (
    <fieldset>
      <div
        className="btn-group"
        id="scores"
        data-toggle="buttons"
        onClick={props.adder}
      >
        {pointsArray.map(point => {
          return (
            <label className="btn btn-info" key={point}>
              <input
                type="radio"
                name="options"
                id={`options${point}`}
                value={point}
                autoComplete="off"
              />
              {point}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};

export default FieldSet;
