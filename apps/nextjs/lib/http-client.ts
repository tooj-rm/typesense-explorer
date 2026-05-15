import { useConnectStore } from "@/store/connectStore";

const handleResponse = async (res: Response) => {
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message ?? res.statusText);
  }

  return data;
};

const buildHeaders = () => {
  const { apiKey } = useConnectStore.getState();

  return {
    "x-typesense-api-key": apiKey,
    "Content-Type": "application/json",
  };
};

export const httpClient = {
  get: async (url: string) => {
    const res = await fetch(url, { headers: buildHeaders() });
    return handleResponse(res);
  },

  post: async (url: string, data: any) => {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: buildHeaders(),
    });
    return handleResponse(res);
  },

  put: async (url: string, data: any) => {
    const res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: buildHeaders(),
    });
    return handleResponse(res);
  },

  delete: async (url: string) => {
    const res = await fetch(url, {
      method: "DELETE",
      headers: buildHeaders(),
    });
    return handleResponse(res);
  },
};