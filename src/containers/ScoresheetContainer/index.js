import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDatabaseUserInfo } from '../../redux/auth';
import { updateFlowerScores, getFlowerScores } from '../../redux/scores';
import flowerFormData from '../../data/flowerFormData';
import FieldSet from '../../components/FieldSet';

function mapStateToProps(state) {
  return {
    databaseUserInfo: state.auth.userInformation,
    updateFlowerScores: state.scores.flowerScores,
    flowerScores: state.scores.flowerScores
  };
}

class ScoresheetContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formSelected: 'Cattleya',
      flower: 'Cattleya',
      formBody: {
        formSections: [
          {
            formTitle: 'Form of Flower',
            totalSectionScore: 30,
            grading: [
              {
                criteria: 'Over-all Form',
                maxPoints: 15
              },
              { criteria: 'Sepals', maxPoints: 5 },
              { criteria: 'Petals', maxPoints: 5 },
              { criteria: 'Labellum (*Pouch)', maxPoints: 5 }
            ]
          },
          {
            formTitle: 'Color of Flower',
            totalSectionScore: 30,
            grading: [
              { criteria: 'Harmony', maxPoints: 10 },
              { criteria: 'Brilliance and Purity', maxPoints: 10 },
              { criteria: 'Sepals and Petals', maxPoints: 5 },
              { criteria: 'Labellum (*Pouch)', maxPoints: 5 }
            ]
          },
          {
            formTitle: 'Flower and Stem Characteristics',
            totalSectionScore: 40,
            grading: [
              { criteria: 'Size of Flower', maxPoints: 10 },
              { criteria: 'Substance', maxPoints: 10 },
              { criteria: 'Texture', maxPoints: 10 },
              { criteria: 'Habit of Stem', maxPoints: 5 },
              { criteria: 'Floriferousness', maxPoints: 5 }
            ]
          }
        ]
      }
    };

    this.selectForm = this.selectForm.bind(this);
  }

  selectForm(e) {
    this.setState({ formSelected: e.target.value });
    let formBody = flowerFormData.flowers.find(
      flowers => flowers.flower === e.target.value
    );
    this.setState({ formBody: formBody });
  }

  componentDidMount() {
    let formBody = flowerFormData.flowers.find(
      flowers => flowers.flower === 'Cattleya'
    );
    this.setState({ formBody: formBody });
    this.props.updateFlowerScores(this.state.formBody);
  }

  render() {
    console.log(this.state, 'state');
    console.log(this.props, 'props');
    return (
      <div className="transaction-container outer">
        <div>
          {flowerFormData.flowers.map((flowerFormData, index) => (
            <div key={index}>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flower-radio"
                  id={index}
                  value={flowerFormData.flower}
                  onClick={this.selectForm}
                />
                <label className="form-check-label" htmlFor={index}>
                  {flowerFormData.flower}
                </label>
              </div>
            </div>
          ))}
          <h2>{this.state.formBody.flower}</h2>
          {this.state.formBody.formSections.map((formSections, index) => (
            <div key={index}>
              <h3>{formSections.formTitle}</h3>
              {formSections.grading.map((grading, index) => (
                <div key={index}>
                  {grading.criteria}
                  <FieldSet
                    points={grading.maxPoints}
                    flower={this.state.formBody.flower}
                    formSection={formSections.formTitle}
                    updateFlowerScores={this.props.updateFlowerScores}
                  />
                </div>
              ))}
              <h3>Form Total Score: {formSections.totalSectionScore}</h3>
            </div>
          ))}
        </div>
        <button>Submit</button>
      </div>
    );
  }
}

export default connect(mapStateToProps, {
  getDatabaseUserInfo,
  updateFlowerScores
})(ScoresheetContainer);
