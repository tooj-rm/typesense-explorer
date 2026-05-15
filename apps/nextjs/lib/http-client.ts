const headers = {
  'x-typesense-api-key': 'xyz',
}

const handleResponse = async (res: Response) => {
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message ?? res.statusText);
  }

  return data;
};

export const httpClient = {
  get: async (url: string) => {
    const res = await fetch(url, { headers });
    return handleResponse(res);
  },

  post: async (url: string, data: any) => {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers,
    });
    return handleResponse(res);
  },

  put: async (url: string, data: any) => {
    const res = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers,
    });
    return handleResponse(res);
  },

  delete: async (url: string) => {
    const res = await fetch(url, {
      method: 'DELETE',
      headers,
    });
    return handleResponse(res);
  },
};