import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  // Sign up
  signup: async (userData: { fullName: string; email: string; password: string }) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  // Login
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Get all users
  getUsers: async () => {
    const response = await api.get('/auth/users');
    return response.data;
  },
};

// User storage helpers
export const userStorage = {
  setUser: (userData: { token: string; fullName: string; email: string; _id: string }) => {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify({
      fullName: userData.fullName,
      email: userData.email,
      _id: userData._id,
    }));
  },

  getUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  clearUser: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

// CMS API - Public endpoints (no auth required)
export const cmsAPI = {
  // Get Hero content
  getHero: async () => {
    const response = await api.get('/cms/hero');
    return response.data;
  },

  // Get About content
  getAbout: async () => {
    const response = await api.get('/cms/about');
    return response.data;
  },

  // Get Why Choose content
  getWhyChoose: async () => {
    const response = await api.get('/cms/why-choose');
    return response.data;
  },

  // Get Contact content
  getContact: async () => {
    const response = await api.get('/cms/contact');
    return response.data;
  },

  // Get Leadership content
  getLeadership: async () => {
    const response = await api.get('/cms/leadership');
    return response.data;
  },

  // Get Projects content
  getProjects: async () => {
    const response = await api.get('/cms/projects');
    return response.data;
  },

  // Get Testimonials content
  getTestimonials: async () => {
    const response = await api.get('/cms/testimonials');
    return response.data;
  },

  // Get Special Offers content
  getSpecialOffers: async () => {
    const response = await api.get('/cms/special-offers');
    return response.data;
  },

  // Get Services content
  getServices: async () => {
    const response = await api.get('/cms/services');
    return response.data;
  },

  // Get News content
  getNews: async () => {
    const response = await api.get('/cms/news');
    return response.data;
  },

  // Get CSR content
  getCSR: async () => {
    const response = await api.get('/cms/csr');
    return response.data;
  },

  // Get Events content
  getEvents: async () => {
    const response = await api.get('/cms/events');
    return response.data;
  },

  // Get Careers content
  getCareers: async () => {
    const response = await api.get('/cms/careers');
    return response.data;
  },

  // Get Group Company content
  getGroupCompany: async () => {
    const response = await api.get('/cms/group-company');
    return response.data;
  },

  // Get Partnership content
  getPartnership: async () => {
    const response = await api.get('/cms/partnership');
    return response.data;
  },

  // Get Footer content
  getFooter: async () => {
    const response = await api.get('/cms/footer');
    return response.data;
  },

  // Admin endpoints (auth required)
  updateHero: async (data: any) => {
    const response = await api.put('/cms/hero', data);
    return response.data;
  },

  updateAbout: async (data: any) => {
    const response = await api.put('/cms/about', data);
    return response.data;
  },

  updateWhyChoose: async (data: any) => {
    const response = await api.put('/cms/why-choose', data);
    return response.data;
  },

  updateContact: async (data: any) => {
    const response = await api.put('/cms/contact', data);
    return response.data;
  },

  updateLeadership: async (data: any) => {
    const response = await api.put('/cms/leadership', data);
    return response.data;
  },

  updateProjects: async (data: any) => {
    const response = await api.put('/cms/projects', data);
    return response.data;
  },

  updateTestimonials: async (data: any) => {
    const response = await api.put('/cms/testimonials', data);
    return response.data;
  },

  updateSpecialOffers: async (data: any) => {
    const response = await api.put('/cms/special-offers', data);
    return response.data;
  },

  updateServices: async (data: any) => {
    const response = await api.put('/cms/services', data);
    return response.data;
  },

  updateNews: async (data: any) => {
    const response = await api.put('/cms/news', data);
    return response.data;
  },

  updateCSR: async (data: any) => {
    const response = await api.put('/cms/csr', data);
    return response.data;
  },

  updateEvents: async (data: any) => {
    const response = await api.put('/cms/events', data);
    return response.data;
  },

  updateCareers: async (data: any) => {
    const response = await api.put('/cms/careers', data);
    return response.data;
  },

  updateGroupCompany: async (data: any) => {
    const response = await api.put('/cms/group-company', data);
    return response.data;
  },

  updatePartnership: async (data: any) => {
    const response = await api.put('/cms/partnership', data);
    return response.data;
  },

  updateFooter: async (data: any) => {
    const response = await api.put('/cms/footer', data);
    return response.data;
  },
};

// CMS Items API - Individual item CRUD operations
export const cmsItemsAPI = {
  // ===== NEWS/BLOG ARTICLES =====
  getArticles: async (filters?: { category?: string; status?: string; search?: string }) => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.search) params.append('search', filters.search);
    const response = await api.get(`/cms-items/news/articles?${params}`);
    return response.data;
  },

  getArticle: async (id: string) => {
    const response = await api.get(`/cms-items/news/articles/${id}`);
    return response.data;
  },

  createArticle: async (data: any) => {
    const response = await api.post('/cms-items/news/articles', data);
    return response.data;
  },

  updateArticle: async (id: string, data: any) => {
    const response = await api.put(`/cms-items/news/articles/${id}`, data);
    return response.data;
  },

  deleteArticle: async (id: string) => {
    const response = await api.delete(`/cms-items/news/articles/${id}`);
    return response.data;
  },

  // ===== PROJECTS =====
  getProjects: async (filters?: { category?: string; status?: string; search?: string }) => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.search) params.append('search', filters.search);
    const response = await api.get(`/cms-items/projects/items?${params}`);
    return response.data;
  },

  getProject: async (id: string) => {
    const response = await api.get(`/cms-items/projects/items/${id}`);
    return response.data;
  },

  createProject: async (data: any) => {
    const response = await api.post('/cms-items/projects/items', data);
    return response.data;
  },

  updateProject: async (id: string, data: any) => {
    const response = await api.put(`/cms-items/projects/items/${id}`, data);
    return response.data;
  },

  deleteProject: async (id: string) => {
    const response = await api.delete(`/cms-items/projects/items/${id}`);
    return response.data;
  },

  // ===== SERVICES =====
  getServices: async (filters?: { category?: string; search?: string }) => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.search) params.append('search', filters.search);
    const response = await api.get(`/cms-items/services/items?${params}`);
    return response.data;
  },

  createService: async (data: any) => {
    const response = await api.post('/cms-items/services/items', data);
    return response.data;
  },

  updateService: async (id: string, data: any) => {
    const response = await api.put(`/cms-items/services/items/${id}`, data);
    return response.data;
  },

  deleteService: async (id: string) => {
    const response = await api.delete(`/cms-items/services/items/${id}`);
    return response.data;
  },

  // ===== TESTIMONIALS =====
  getTestimonials: async () => {
    const response = await api.get('/cms-items/testimonials/items');
    return response.data;
  },

  createTestimonial: async (data: any) => {
    const response = await api.post('/cms-items/testimonials/items', data);
    return response.data;
  },

  updateTestimonial: async (id: string, data: any) => {
    const response = await api.put(`/cms-items/testimonials/items/${id}`, data);
    return response.data;
  },

  deleteTestimonial: async (id: string) => {
    const response = await api.delete(`/cms-items/testimonials/items/${id}`);
    return response.data;
  },

  // ===== SPECIAL OFFERS =====
  getOffers: async (filters?: { status?: string }) => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    const response = await api.get(`/cms-items/special-offers/items?${params}`);
    return response.data;
  },

  getSpecialOffers: async (filters?: { status?: string }) => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    const response = await api.get(`/cms-items/special-offers/items?${params}`);
    return response.data;
  },

  createOffer: async (data: any) => {
    const response = await api.post('/cms-items/special-offers/items', data);
    return response.data;
  },

  createSpecialOffer: async (data: any) => {
    const response = await api.post('/cms-items/special-offers/items', data);
    return response.data;
  },

  updateOffer: async (id: string, data: any) => {
    const response = await api.put(`/cms-items/special-offers/items/${id}`, data);
    return response.data;
  },

  updateSpecialOffer: async (id: string, data: any) => {
    const response = await api.put(`/cms-items/special-offers/items/${id}`, data);
    return response.data;
  },

  deleteOffer: async (id: string) => {
    const response = await api.delete(`/cms-items/special-offers/items/${id}`);
    return response.data;
  },

  deleteSpecialOffer: async (id: string) => {
    const response = await api.delete(`/cms-items/special-offers/items/${id}`);
    return response.data;
  },

  // ===== FOOTER ITEMS =====
  getFooterItems: async () => {
    const response = await api.get('/cms-items/footer/items');
    return response.data;
  },

  createFooterItem: async (data: any) => {
    const response = await api.post('/cms-items/footer/items', data);
    return response.data;
  },

  updateFooterItem: async (id: string, data: any) => {
    const response = await api.put(`/cms-items/footer/items/${id}`, data);
    return response.data;
  },

  deleteFooterItem: async (id: string) => {
    const response = await api.delete(`/cms-items/footer/items/${id}`);
    return response.data;
  },

  // ===== CSR INITIATIVES =====
  getInitiatives: async () => {
    const response = await api.get('/cms-items/csr/initiatives');
    return response.data;
  },

  createInitiative: async (data: any) => {
    const response = await api.post('/cms-items/csr/initiatives', data);
    return response.data;
  },

  updateInitiative: async (id: string, data: any) => {
    const response = await api.put(`/cms-items/csr/initiatives/${id}`, data);
    return response.data;
  },

  deleteInitiative: async (id: string) => {
    const response = await api.delete(`/cms-items/csr/initiatives/${id}`);
    return response.data;
  },

  // ===== EVENTS =====
  getEvents: async (filters?: { status?: string }) => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    const response = await api.get(`/cms-items/events/items?${params}`);
    return response.data;
  },

  createEvent: async (data: any) => {
    const response = await api.post('/cms-items/events/items', data);
    return response.data;
  },

  updateEvent: async (id: string, data: any) => {
    const response = await api.put(`/cms-items/events/items/${id}`, data);
    return response.data;
  },

  deleteEvent: async (id: string) => {
    const response = await api.delete(`/cms-items/events/items/${id}`);
    return response.data;
  },

  // ===== CAREERS/JOB POSITIONS =====
  getPositions: async (filters?: { department?: string; type?: string }) => {
    const params = new URLSearchParams();
    if (filters?.department) params.append('department', filters.department);
    if (filters?.type) params.append('type', filters.type);
    const response = await api.get(`/cms-items/careers/positions?${params}`);
    return response.data;
  },

  createPosition: async (data: any) => {
    const response = await api.post('/cms-items/careers/positions', data);
    return response.data;
  },

  updatePosition: async (id: string, data: any) => {
    const response = await api.put(`/cms-items/careers/positions/${id}`, data);
    return response.data;
  },

  deletePosition: async (id: string) => {
    const response = await api.delete(`/cms-items/careers/positions/${id}`);
    return response.data;
  },

  // ===== LEADERSHIP TEAM =====
  getTeamMembers: async () => {
    const response = await api.get('/cms-items/leadership/members');
    return response.data;
  },

  createTeamMember: async (data: any) => {
    const response = await api.post('/cms-items/leadership/members', data);
    return response.data;
  },

  updateTeamMember: async (id: string, data: any) => {
    const response = await api.put(`/cms-items/leadership/members/${id}`, data);
    return response.data;
  },

  deleteTeamMember: async (id: string) => {
    const response = await api.delete(`/cms-items/leadership/members/${id}`);
    return response.data;
  },

  // ===== LEADERSHIP (NEW) =====
  getLeaders: async () => {
    const response = await api.get('/cms-items/leadership/items');
    return response.data;
  },

  createLeader: async (data: any) => {
    const response = await api.post('/cms-items/leadership/items', data);
    return response.data;
  },

  updateLeader: async (id: string, data: any) => {
    const response = await api.put(`/cms-items/leadership/items/${id}`, data);
    return response.data;
  },

  deleteLeader: async (id: string) => {
    const response = await api.delete(`/cms-items/leadership/items/${id}`);
    return response.data;
  },

  // ===== WHY CHOOSE US =====
  getWhyChooseReasons: async () => {
    const response = await api.get('/cms-items/why-choose/items');
    return response.data;
  },

  createWhyChooseReason: async (data: any) => {
    const response = await api.post('/cms-items/why-choose/items', data);
    return response.data;
  },

  updateWhyChooseReason: async (id: string, data: any) => {
    const response = await api.put(`/cms-items/why-choose/items/${id}`, data);
    return response.data;
  },

  deleteWhyChooseReason: async (id: string) => {
    const response = await api.delete(`/cms-items/why-choose/items/${id}`);
    return response.data;
  },

  // ===== LOCATION CARDS =====
  getLocationCards: async () => {
    const response = await api.get('/cms-items/location-cards/items');
    return response.data;
  },

  createLocationCard: async (data: any) => {
    const response = await api.post('/cms-items/location-cards/items', data);
    return response.data;
  },

  updateLocationCard: async (id: string, data: any) => {
    const response = await api.put(`/cms-items/location-cards/items/${id}`, data);
    return response.data;
  },

  deleteLocationCard: async (id: string) => {
    const response = await api.delete(`/cms-items/location-cards/items/${id}`);
    return response.data;
  },
};

// Upload API - Image upload to cloud storage
export const uploadAPI = {
  // Upload single image
  uploadSingle: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await api.post('/upload/single', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Upload multiple images
  uploadMultiple: async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });
    
    const response = await api.post('/upload/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete image
  deleteImage: async (imageUrl: string) => {
    const response = await api.delete('/upload/delete', {
      data: { imageUrl },
    });
    return response.data;
  },
};

export default api;
