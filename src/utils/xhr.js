// /* xhr function used for all API requests */
// import $ from 'jquery';
// import CognitoService from '../cognito';
// import {
//   COGNITO_USER_POOL_ID,
//   COGNITO_CLIENT_ID,
//   INFERNO_APP_API_ENDPOINT
// } from '../constants';

// function apiService({
//   endpoint = INFERNO_APP_API_ENDPOINT,
//   path = '/',
//   filter,
//   method = 'GET',
//   body,
//   authToken
// }) {
//   let options = {
//     method,
//     contentType: 'application/json; charset=utf-8',
//     data: JSON.stringify(body)
//   };
//   if (authToken) {
//     options = {
//       ...options,
//       headers: {
//         Authorization: authToken
//       }
//     };
//   }
//   let url = `${endpoint}${path}`;

//   if (filter) {
//     url = `${url}?filter=${encodeURI(JSON.stringify(filter))}`;
//   }
//   return $.ajax(url, options).then(
//     function resolve(data, textStatus, jqXHR) {
//       return data;
//     },
//     function reject(jqXHR, textStatus, errorThrown) {
//       const result = jqXHR.responseJSON
//         ? jqXHR.responseJSON.error
//         : errorThrown;

//       // Sometimes `errorThrown` is a string, which would pose problems
//       //   displaying the error if we didn't turn it into an Error object
//       if (typeof result === 'string') {
//         throw new Error(result);
//       }
//       throw result;
//     }
//   );
// }
