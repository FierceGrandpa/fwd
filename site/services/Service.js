import cookie from 'js-cookie';
import getConfig from 'next/config';
import { fetchWrapper } from '../helpers';

const { serverRuntimeConfig } = getConfig();

if (process.browser === false) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
}

function API({
  route,
}) {
  const baseUrl = `${apiUrl}/${route}`;

  const jwt = () => cookie.get('jwt');

  async function request(url, options = {}) {
    try {
      const response = await fetch(baseUrl, options);

      if (response.ok) {
        return { response, json: await response.json() };
      }

      return {
        response,
        json: JSON.parse(response.body && (await response.text())),
      };
    } catch (e) {
      return {
        response: {
          ok: false,
          error: e,
        },
        json: undefined,
      };
    }
  }

  function post(url, data = {}) {
    return this.request(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  function put(url, data = {}) {
    return this.request(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  function get(url, params = {}) {
    return this.request(
      FetchAPI.urlWithParams(url, params),
    );
  }

  function  deleteRequest(url, params) {
    return this.request(
      FetchAPI.urlWithParams(url, params),
      {
        method: 'DELETE',
      },
    );
  }

  const getAll = () => fetchWrapper.get(baseUrl);
  const getById = (id) => fetchWrapper.get(`${baseUrl}/${id}`);
  const create = (params) => fetchWrapper.post(baseUrl, params);
  const update = (id, params) => fetchWrapper.put(`${baseUrl}/${id}`, params);
  const remove = (id) => fetchWrapper.delete(`${baseUrl}/${id}`);
}


export default FetchAPI;
