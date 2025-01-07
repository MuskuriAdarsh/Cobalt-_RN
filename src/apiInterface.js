import { BASE_URL } from './config';

export const ApiInterface = {

AuthenticateUser: async (requestData) => {
        return apiCall('Account/AuthenticateUser', 'POST', requestData);
        },
 getIcons: async (requestData) => {
    return apiCall('member/GetIcons', 'POST', requestData);
    },

  getDashboard: async (requestData) => {
    return apiCall('member/GetDashboard', 'POST', requestData);
  },
  getReservation:async(requestData) => {
    return apiCall('dining/GetDiningDetailsFCFS', 'POST', requestData);
  },
  
};

// Utility function to handle API calls
const apiCall = async (endpoint, method = 'GET', body = null, headers = {}) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  console.log(endpoint+" Request:",body)

  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
};
