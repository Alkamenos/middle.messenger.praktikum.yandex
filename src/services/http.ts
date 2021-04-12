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

class Http {
  get<TResponse>(url: string, data: {}): Promise<TResponse> {
    return this.request(url, { method: METHOD.GET, data });
  }

  post<TResponse>(url: string, data: {}): Promise<TResponse> {
    return this.request(url, { method: METHOD.POST, data });
  }

  put<TResponse>(url: string, data: {}): Promise<TResponse> {
    return this.request(url, { method: METHOD.PUT, data });
  }

  delete<TResponse>(url: string, data: {}): Promise<TResponse> {
    return this.request(url, { method: METHOD.DELETE, data });
  }

  request<TResponse>(
    url: string,
    options: Options = { method: METHOD.GET }
  ): Promise<TResponse> {
    return new Promise((resolve, reject) => {
      const { method, data } = options;

      const xhr = new XMLHttpRequest();

      if (method === METHOD.GET) {
        url = `${url}?${Object.entries(data)
          .map(([key, value]: [key: string, value: any]): string => {
            return `${key}=${value}`;
          })
          .join("&")}`;
      }

      xhr.open(method, url);
      xhr.setRequestHeader("Content-Type", "text/plain");

      xhr.onload = function () {
        resolve(xhr.response);
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
