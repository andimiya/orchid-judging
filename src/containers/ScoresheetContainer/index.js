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
  }

  render() {
    return (
      <div className="transaction-container outer">
        <div>
          {flowerFormData.flowers.map((flowerFormData, index) => (
            <div key={index}>
              <h2>Flower: {flowerFormData.flower}</h2>
              {flowerFormData.formSections.map((formSections, index) => (
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
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, {
  getDatabaseUserInfo
})(ScoresheetContainer);
