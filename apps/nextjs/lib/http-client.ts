const headers = {
  'x-typesense-api-key': 'xyz',
}

export const httpClient = {
  get: async (url: string) => {
    const res = await fetch(url, { headers });
    return res.json();
  },
  post: async (url: string, data: any) => {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers
    });
    return res.json();
  },
  put: async (url: string, data: any) => {
    const res = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers
    });
    return res.json();
  },
  delete: async (url: string) => {
    const res = await fetch(url, {
      method: 'DELETE',
      headers
    });
    return res.json();
  },
};