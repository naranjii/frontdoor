import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem('token');

/**
 * Try to extract institutionName from the JWT token payload, falling back to
 * localStorage key 'institutionName' when available. Returns undefined when not found.
 */
const getInstitutionName = (): string | undefined => {
  try {
    const token = getToken();
    if (token) {
      const parts = token.split('.');
      if (parts.length >= 2) {
        const payload = JSON.parse(atob(parts[1]));
        if (payload && typeof payload.institution === 'string') return payload.institution;
      }
    }
  } catch (e) {
    // ignore and fallback to localStorage
  }

  const stored = localStorage.getItem('institution');
  return stored ?? undefined;
};

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
  // register will automatically attach institutionName when available
  register: (data: { username: string, name: string; password: string; role: 'ADMIN' | 'RECEPTIONIST' | 'COORDINATOR' }) => {
    const institution = getInstitutionName();
    const payload = institution ? { ...data, institution } : data;
    return api.post('/staff/register', payload);
  },
  login: (data: { username: string; password: string;  }) => api.post('/staff/login', data),
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
