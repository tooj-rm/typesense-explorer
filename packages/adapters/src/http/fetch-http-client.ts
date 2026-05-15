import { HttpClient } from "@typesense_inspector/core";

export class FetchHttpClient implements HttpClient {
  constructor(private readonly headers: HeadersInit) {
  }

  async delete<O>(url: string): Promise<O> {
    const res = await fetch(url, {
      method: "DELETE",
      headers: this.headers,
    });
    return handleResponse(res);
  }

  async get<O>(url: string): Promise<O> {
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    return handleResponse(res);
  }

  async post<O, I>(url: string, data: I): Promise<O> {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: this.headers,
    });
    return handleResponse(res);
  }

  async put<O, I>(url: string, data: I): Promise<O> {
    const res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: this.headers,
    });
    return handleResponse(res);
  }
}

const handleResponse = async (res: Response) => {
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message ?? res.statusText);
  }

  return data;
};