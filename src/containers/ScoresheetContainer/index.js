import React, { Component } from 'react';
import { ajax } from 'jquery';
import { connect } from 'react-redux';
import { getDatabaseUserInfo } from '../../redux/auth';
import flowerFormData from '../../data/flowerFormData';
import FieldSet from '../../components/FieldSet';

function mapStateToProps(state) {
  return {
    databaseUserInfo: state.auth.userInformation
  };
}

class ScoresheetContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formSelected: 'Cattleya',
      formBody: {}
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

  componentWillMount() {
    let formBody = flowerFormData.flowers.find(
      flowers => flowers.flower === 'Cattleya'
    );
    this.setState({ formBody: formBody });
  }

  render() {
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
                  <FieldSet points={grading.maxPoints} />
                </div>
              ))}
              <h3>Form Total Score: {formSections.totalSectionScore}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, {
  getDatabaseUserInfo
})(ScoresheetContainer);
