import api from './api';

const stockService = {
  getAll: (page = 1, perPage = 15) => {
    return api.get('/stocks', { params: { page, per_page: perPage } });
  },

  getById: (id) => {
    return api.get(`/stocks/${id}`);
  },

  create: (data) => {
    return api.post('/stocks', data);
  },

  update: (id, data) => {
    return api.put(`/stocks/${id}`, data);
  },

  delete: (id) => {
    return api.delete(`/stocks/${id}`);
  },
};

export default stockService;
