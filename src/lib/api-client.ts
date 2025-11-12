import axios, { AxiosInstance } from 'axios';
import { Configuration } from './api-sdk';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://quiika.alwaysdata.net";

class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;
  private configuration: Configuration;

  private constructor() {
    // Create axios instance with your exact current config
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 20000,
      withCredentials: true,
    });

    this.configuration = new Configuration({
      basePath: BASE_URL,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    const MAX_RETRIES = 3;
    const INITIAL_RETRY_DELAY_MS = 1000;

    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Add any auth headers here if needed
        console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor with retry logic
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const { config } = error;

        if (!config) {
          return Promise.reject(error);
        }

        const configWithRetry = config as typeof config & { _retryCount?: number };

        if (!error.response) {
          configWithRetry._retryCount = configWithRetry._retryCount || 0;

          if (configWithRetry._retryCount < MAX_RETRIES) {
            configWithRetry._retryCount += 1;

            const delay = INITIAL_RETRY_DELAY_MS * Math.pow(2, configWithRetry._retryCount - 1);
            await new Promise((resolve) => setTimeout(resolve, delay));

            return this.axiosInstance(configWithRetry);
          }
        }

        if (error.response?.status === 401) {
          console.error('Unauthorized access');
          // You can redirect to login here if needed
        }
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  public getConfig(): Configuration {
    return this.configuration;
  }

  public setAuthToken(token: string) {
    this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  public clearAuthToken() {
    delete this.axiosInstance.defaults.headers.common['Authorization'];
  }
}

export const apiClient = ApiClient.getInstance();