enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

type Options = {
  method: METHOD;
  data?: any;
};

const baseUrl = "https://ya-praktikum.tech/api/v2";

class Http {
  async get<TResponse>(url: string, data?: {}): Promise<TResponse> {
    return this.request(url, { method: METHOD.GET, data });
  }

  async post<TResponse>(url: string, data: {}): Promise<TResponse> {
    return this.request(url, { method: METHOD.POST, data });
  }

  async put<TResponse>(url: string, data: {}): Promise<TResponse> {
    return this.request(url, { method: METHOD.PUT, data });
  }

  async delete<TResponse>(url: string, data: {}): Promise<TResponse> {
    return this.request(url, { method: METHOD.DELETE, data });
  }

  async request<TResponse>(
    url: string,
    options: Options = { method: METHOD.GET }
  ): Promise<TResponse> {
    return new Promise((resolve, reject) => {
      const { method, data } = options;

      const xhr = new XMLHttpRequest();

      if (method === METHOD.GET) {
        if (data) {
          url = `${url}?${Object.entries(data)
            .map(([key, value]: [key: string, value: any]): string => {
              return `${key}=${value}`;
            })
            .join("&")}`;
        }
      }

      xhr.open(method, baseUrl + url);
      xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      xhr.withCredentials = true;

      xhr.onload = function () {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject(JSON.parse(xhr.response));
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

export default new Http();
