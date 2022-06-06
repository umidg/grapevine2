/* eslint-disable */
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// server
const baseUrl = 'https://admin.grapevine-app.co/api';
// localhost
// const baseUrl = "http://192.168.1.70:4000/api";
export const grapevineBackend = async (
  url,
  data,
  method,
  headers = '',
  params = ''
) => {
  let access_token = null;
  const loggedUser = JSON.parse(await AsyncStorage.getItem('user'));
  if (loggedUser) {
    access_token = loggedUser.token;
  }
  const config = {
    method: method || 'GET',
    url: `${baseUrl}${url}`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: access_token !== null ? `Bearer ${access_token}` : '',
      ...headers,
    },
    data,
    params,
  };

  return axios(config);
};
