import { apiUrl } from 'config';
import { fetchWrapper } from 'helpers';

export const marksService = {
  getAll, getById, create, update, remove,
};

const baseUrl = `${apiUrl}/marks`;

const getAll = () => fetchWrapper.get(baseUrl);
const getById = (id) => fetchWrapper.get(`${baseUrl}/${id}`);
const create = (params) => fetchWrapper.post(baseUrl, params);
const update = (id, params) => fetchWrapper.put(`${baseUrl}/${id}`, params);
const remove = (id) => fetchWrapper.delete(`${baseUrl}/${id}`);
