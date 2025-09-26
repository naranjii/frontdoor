import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem('token');

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// ================= Staff API =================
export const staffAPI = {
  register: (data: { username: string, name: string; password: string; role: 'ADMIN' | 'STAFF' }) =>
    api.post('/staff/register', data),
  login: (data: { username: string; password: string }) => api.post('/staff/login', data),
  getAll: () => api.get('/staff'),
};

// ================= Patient API =================
export const patientAPI = {
  create: (data: { name: string; healthcare: string; age?: number }) => api.post('/patients', data),
  getAll: (filters?: { name?: string; healthcare?: string }) => api.get('/patients', { params: filters }),
  getById: (id: string) => api.get(`/patients/${id}`),
  update: (id: string, data: { name?: string; healthcare?: string; age?: number }) =>
    api.put(`/patients/${id}`, data),
  delete: (id: string) => api.delete(`/patients/${id}`),
};

// ================= Guest API =================
export const guestAPI = {
  create: (data: { name: string; note?: string }) => api.post('/guests', data),
  getAll: (filters?: { name?: string }) => api.get('/guests', { params: filters }),
  getById: (id: string) => api.get(`/guests/${id}`),
  update: (id: string, data: { name?: string; note?: string }) => api.put(`/guests/${id}`, data),
  delete: (id: string) => api.delete(`/guests/${id}`),
};

// ================= Logbook API =================
export const logbookAPI = {
  create: (data: { staffId: string; patientId?: string; guestId?: string; action: string }) =>
    api.post('/logbook', data),
  getAll: (filters?: { staffId?: string; patientId?: string; guestId?: string }) =>
    api.get('/logbook', { params: filters }),
  getById: (id: string) => api.get(`/logbook/${id}`),
  update: (id: string, data: { action?: string; staffId?: string; patientId?: string; guestId?: string }) =>
    api.put(`/logbook/${id}`, data),
  delete: (id: string) => api.delete(`/logbook/${id}`),
};
