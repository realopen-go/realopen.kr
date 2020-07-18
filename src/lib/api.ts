import ky from "ky";

const API_HOST = process.env.REAC_APP_API_HOST || "http://localhost:4000";

export default {
  get: (
    endpoint: string,
    {
      headers,
      params,
    }: {
      headers?: Headers | string[][] | Record<string, string>;
      params?: { [key: string]: string | number | boolean };
    } = {}
  ) => {
    return ky
      .get(`${API_HOST}/${endpoint}`, {
        credentials: "include",
        headers,
        searchParams: params,
      })
      .then((res) => res.json())
      .then((res) => {
        if (res.statusCode >= 300) throw res;
        return res;
      })
      .catch(async (e) => {
        throw await e.response.json();
      });
  },
  post: (
    endpoint: string,
    {
      body,
      headers,
    }: {
      body: { [key: string]: string | number | boolean };
      headers?: Headers | string[][] | Record<string, string>;
    }
  ): Promise<{ [key: string]: any }> => {
    return ky
      .post(`${API_HOST}/${endpoint}`, {
        headers,
        credentials: "include",
        json: body,
      })
      .then((res) => res.json())
      .catch(async (e) => {
        throw await e.response.json();
      });
  },
  put: (
    endpoint: string,
    {
      body,
      headers,
    }: {
      body: { [key: string]: string | number | boolean };
      headers?: Headers | string[][] | Record<string, string>;
    }
  ) => {
    return ky.put(`${API_HOST}/${endpoint}`, {
      credentials: "include",
      headers,
      json: body,
    });
  },
  delete: (
    endpoint: string,
    {
      headers,
    }: {
      headers?: Headers | string[][] | Record<string, string>;
    }
  ) => {
    return ky.delete(`${API_HOST}/${endpoint}`, {
      credentials: "include",
      headers,
    });
  },
};
