import api from './api';

const productService = {
  getAll: (page = 1, perPage = 15) => {
    return api.get('/products', { params: { page, per_page: perPage } });
  },

  getById: (id) => {
    return api.get(`/products/${id}`);
  },

  create: (data) => {
    return api.post('/products', data);
  },

  update: (id, data) => {
    return api.put(`/products/${id}`, data);
  },

  delete: (id) => {
    return api.delete(`/products/${id}`);
  },
};

export default productService;
