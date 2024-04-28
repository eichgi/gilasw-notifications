import axios, {type AxiosResponse, type InternalAxiosRequestConfig} from "axios";

type AxiosConfigWithMetadata = InternalAxiosRequestConfig & {
  metadata?: {
    axiosId: string;
  }
}

const requestInterceptor = (config: AxiosConfigWithMetadata) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.metadata = {
    axiosId: Date.now().toString(36)
  };

  console.warn("config request", config);

  return config;
};

const successResponseInterceptor = (response: AxiosResponse) => {
  //return response.data; simplify response
  return response;
};

const interceptErrorResponse = (error: any) => {

  if (error.code === "ERR_NETWORK") {
    console.warn("Unable to reach server");
  }

  if (error?.response) {
    switch (error.response.status) {
      case 500:
        console.warn("Internal Server Error");
        break;
      case 403:
        // We can delete or unset auth tokens to force re-authentication
        console.warn("Unauthenticated, please login again.");
        break;
      default:
        console.warn("An error happened");
        break;
    }
  }

  return Promise.reject(error);
};

const httpClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    "Content-Type": "application/json"
  }
});
httpClient.interceptors.request.use(requestInterceptor);
httpClient.interceptors.response.use(successResponseInterceptor, interceptErrorResponse);

export {httpClient};