export interface HttpClient {
  get<O>(url: string): Promise<O>;

  post<O, I>(url: string, data: I): Promise<O>;

  put<O, I>(url: string, data: I): Promise<O>;

  delete<O>(url: string): Promise<O>;
}