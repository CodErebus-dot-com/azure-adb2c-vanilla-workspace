// const axios = require('axios');
// const { uriBuilder } = require('auth/authService');

// const url = uriBuilder();
// console.log(url);

// exports.handler = async function(event, ctx) {
//   try {
//     const response = await axios({
//       // method: event.httpMethod,
//       // url, // Replace with your Azure AD B2C endpoint URL
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
//         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
//       },
//       // data: event.body,
//     });

//     return {
//       statusCode: response.status,
//       headers: response.headers,
//       body: response.data,
//     };
//   } catch (error) {
//     return {
//       statusCode: error.response.status,
//       headers: error.response.headers,
//       body: error.response.data,
//     };
//   }
// };
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    },
    body: JSON.stringify({ message: "Hello from Netlify Functions!" }),
  };
};