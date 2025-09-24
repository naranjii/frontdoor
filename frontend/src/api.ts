import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // will hit the proxy
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example endpoints
export const getUsers = async () => {
  const res = await api.get('/users');
  return res.data;
};

export const createUser = async (userData: { name: string; email: string }) => {
  const res = await api.post('/users', userData);
  return res.data;
};

export default api;
