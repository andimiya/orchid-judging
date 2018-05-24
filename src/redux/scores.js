const UPDATE_FLOWER_SCORES = 'orchid-app/scores/UPDATE_FLOWER_SCORES';
const GET_FLOWER_SCORES = 'orchid-app/scores/GET_FLOWER_SCORES';

const initialState = {
  flowerScores: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_FLOWER_SCORES:
      return {
        ...state,
        flowerScores: action.scores
      };
    case GET_FLOWER_SCORES:
      return state;

    // .map(score => {
    // console.log(score, 'score');
    //   return score.flowerName === action.flowerScores.flowerName
    //     ? action.flowerScores
    //     : score;
    // })

    // .catch(err => {
    //   throw err;
    // })
    // };
    default:
      return state;
  }
}

export function updateFlowerScores(formBody) {
  return dispatch => {
    dispatch({ type: UPDATE_FLOWER_SCORES, scores: formBody });
    return formBody;
  };
}
