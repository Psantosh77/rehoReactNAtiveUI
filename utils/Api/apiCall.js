import { Alert } from 'react-native';
import axios from './ApiConfig';
import { Toast } from 'toastify-react-native';




//const BASE_URL = 'https://backendwithnode-hxvv.onrender.com/';
const BASE_URL = 'https://api-u2lu.onrender.com/';
//const BASE_URL = 'http://localhost:9000/'
const ApiService = {

  request: async ({ method, endpoint, payload, onSuccess, onError }) => {
    const url = BASE_URL + endpoint;


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
        onSuccess(response.data);
        console.log({
          url,
          response
        })
      })
      .catch((error) => {
        onError({
          url,
          payload,
          error: error.message
        });
        if (error.response && error.response.status === 401) {
          console.log('Error message:', error.response.data.message);
          Toast.error(error.response.data.message)
        } else {
          console.log('Another error occurred:', error.message);
          Toast.error(error.message)
        }

        console.log(error)
      });
  },
};

export default ApiService;
