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

/**
 * Try to extract the current staff id from the JWT token payload.
 */
// Note: `createdById` should be supplied by callers (from AuthContext). We
// intentionally avoid extracting it here to keep side-effects explicit.

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
  login: (data: { username: string; password: string; }) => api.post('/staff/login', data),
  getAll: async () => {
    const res = await api.get('/staff');
    return res.data.data; // já retorna array puro
  },
  deactivate: (id: string) => api.put(`/staff/${id}`, { isActive: false }),
  update: (id: string, data: { name?: string; role?: 'ADMIN' | 'RECEPTIONIST' | 'COORDINATOR'; isActive?: boolean }) => api.put(`/staff/${id}`, data),
  getById: (id: string) => api.get(`/staff/${id}`),
};

// ================= Patient API =================
export const patientAPI = {
  create: (data: { name: string; age?: number; healthcare?: string; patientCode?: number; supportLevel?: number; driveLink?: string; notes?: string; createdById: string }) => {
    // Caller must pass createdById (from AuthContext) — attach if present.
    const payload = data.createdById ? { ...data, createdById: data.createdById } : data;
    return api.post('/patients', payload);
  },
  getAll: (filters?: { name?: string; healthcare?: string; supportLevel?: number }) => api.get('/patients', { params: { isActive: true, ...filters } }),
  getById: (id: string) => api.get(`/patients/${id}`),
  update: (id: string, data: { isActive?: boolean; name?: string; healthcare?: string; age?: number; patientCode?: number; supportLevel?: number; driveLink?: string; notes?: string }) =>
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

// ================= Appointment API =================

export const appointmentAPI = {
  create: (data: { createdById: string; patientId: string; appointmentAt: Date; therapist?: string; notes?: string; }) => {
    return api.post('/appointments', data);
  },
  getAll: (filters?: Record<string, unknown>) => api.get('/appointments', { params: filters }),
  getById: (id: string) => api.get(`/appointments/${id}`),
  update: (id: string, data: {
    createdById: string;
    patientId: string;
    appointmentAt: Date;
    therapist?: string;
    notes?: string;
  }) => api.put(`/appointments/${id}`, data),
  delete: (id: string) => api.delete(`/appointments/${id}`),
};
