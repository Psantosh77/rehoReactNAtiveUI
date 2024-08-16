import axios from './ApiConfig';




//const BASE_URL = 'https://backendwithnode-hxvv.onrender.com/';
const BASE_URL = 'https://api-u2lu.onrender.com/';
//const BASE_URL = 'http://localhost:9000/'
const ApiService = {

  request: async({method, endpoint, payload, onSuccess, onError}) => {
    const url = BASE_URL + endpoint;

    console.log( url ,payload)
    await axios({
      method,
      url,
      data: payload,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log("res123",response)
        onSuccess(response.data);
      })
      .catch((error) => {
        onError(error.message);
      });
  },
};

export default ApiService;
