import React, { Component } from 'react';
import FieldSet from '../FieldSet';

class FlowerColor extends Component {
  constructor(props) {
    super(props);

    this.flowerColorScoreAdder = this.flowerColorScoreAdder.bind(this);

    this.state = {
      flowerFormScore: 0,

      error: ''
    };
  }

  flowerColorScoreAdder() {
    let length = document.getElementsByClassName('active').length;
    console.log(document.getElementsByClassName('active'), 'flower form');

    let flowerFormScore = 0;
    for (let i = 0; i < length; i++) {
      flowerFormScore += parseInt(
        document.getElementsByClassName('active')[i].children[0].value
      );
    }
    return this.setState({ flowerFormScore: flowerFormScore });
  }

  render() {
    return (
      <div>
        <form>
          <legend>
            <label>Color of Flower - Total: {this.flowerColorScore}</label>
          </legend>
          <label>Harmony</label>
          <FieldSet points={10} />

          <label>Brilliance</label>
          <FieldSet points={10} />
          <label>Purity</label>
          <FieldSet points={10} />
          <label>Sepals</label>
          <FieldSet points={5} />
          <label>Petals</label>
          <FieldSet points={5} />
          <label>Labellum (*Pouch)</label>
          <FieldSet points={5} />
        </form>
      </div>
    );
  }
}

export default FlowerColor;
