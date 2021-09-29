const apiUrl = 'http://4x4-spb.ru/api';

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

export class Api {
  constructor(route) {
    this.url = `${apiUrl}/${route}`;
  }

  getAll() {
    return fetch(this.url, {
      method: 'GET',
    }).then(handleResponse);
  }

  getById(id) {
    return fetch(`${this.url}/${id}`, {
      method: 'GET',
    }).then(handleResponse);
  }

  create(params) {
    return fetch(this.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    }).then(handleResponse);
  }

  update(id, params) {
    return fetch(`${this.url}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    }).then(handleResponse);
  }

  remove(id) {
    return fetch(`${this.url}/${id}`, {
      method: 'DELETE',
    }).then(handleResponse);
  }
}
