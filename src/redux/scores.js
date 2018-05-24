const UPDATE_FLOWER_SCORES = 'orchid-app/scores/UPDATE_FLOWER_SCORES';
const GET_FLOWER_SCORES = 'orchid-app/scores/GET_FLOWER_SCORES';

const initialState = {
  flowerScores: []
};

export default function reducer(scores = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_FLOWER_SCORES:
      return {
        ...scores,
        flowerScores: action.result

        // flowerScores: scores.map(score => {
        //   return score.flowerName === action.flowerScores.flowerName
        //     ? action.flowerScores
        //     : score;
        // })
      };
    default:
      return scores;
  }
}

export function updateFlowerScores(updateFlowerScores) {
  console.log(updateFlowerScores, 'redux update flower scores');
  return dispatch => {
    dispatch({ type: UPDATE_FLOWER_SCORES, scores: updateFlowerScores });
  };
}
