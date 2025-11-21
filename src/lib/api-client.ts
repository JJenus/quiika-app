import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { Configuration } from "./api-sdk";

const BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "https://quiika.alwaysdata.net";
const ENABLE_RETRY_LOGIC = import.meta.env.VITE_ENABLE_RETRY_LOGIC || "false"; // Default to true if not set

// Define authentication strategies
export enum AuthStrategy {
	BEARER_TOKEN = "BEARER_TOKEN",
	API_KEY = "API_KEY",
	NONE = "NONE",
}

// Map endpoints to their authentication strategies
const ENDPOINT_AUTH_STRATEGIES: Record<string, AuthStrategy> = {
	// Bearer token endpoints (protected user/admin routes)
	"/auth/": AuthStrategy.NONE,
	"/admin/": AuthStrategy.BEARER_TOKEN,
	"/sessions/": AuthStrategy.BEARER_TOKEN,
	"/withdrawal": AuthStrategy.API_KEY,
	"/quid/": AuthStrategy.API_KEY,
	"/rules/": AuthStrategy.API_KEY,
	"/transactions": AuthStrategy.API_KEY,

	// API key endpoints (public but rate-limited)
	"/payment/": AuthStrategy.API_KEY,
	"/welcome/": AuthStrategy.API_KEY,

	// Open endpoints (no auth required)
	"/public/": AuthStrategy.NONE,
	"/actuator/": AuthStrategy.NONE,
};

class ApiClient {
	private static instance: ApiClient;
	private axiosInstance: AxiosInstance;
	private configuration: Configuration;
	private authToken: string | null = null;
	private apiKey: string | null = null;
	private challenge: string | null = null;

	private enableRetry: boolean;

	private constructor() {
		this.enableRetry = ENABLE_RETRY_LOGIC === "true";

		this.axiosInstance = axios.create({
			baseURL: BASE_URL,
			headers: {
				"Content-Type": "application/json",
			},
			timeout: 20000,
			withCredentials: true,
		});

		this.configuration = new Configuration({
			basePath: BASE_URL,
		});

		this.setupInterceptors();
	}

	private getAuthStrategy(url: string): AuthStrategy {
		for (const [endpoint, strategy] of Object.entries(
			ENDPOINT_AUTH_STRATEGIES
		)) {
			if (url.includes(endpoint)) {
				return strategy;
			}
		}
		// Default to bearer token for security
		return AuthStrategy.API_KEY;
	}

	private setupInterceptors() {
		const MAX_RETRIES = 3;
		const INITIAL_RETRY_DELAY_MS = 1000;

		// Request interceptor - Add appropriate auth headers
		this.axiosInstance.interceptors.request.use(
			(config: InternalAxiosRequestConfig) => {
				if (!config.url) return config;

				const authStrategy = this.getAuthStrategy(config.url);
				console.log(config.url);

				switch (authStrategy) {
					case AuthStrategy.BEARER_TOKEN:
						if (this.authToken) {
							config.headers.Authorization = `Bearer ${this.authToken}`;
						}
						break;

					case AuthStrategy.API_KEY:
						if (this.apiKey) {
							console.log(
								"API Key and challenge added: ",
								this.apiKey,
								this.challenge
							);
							config.headers["X-Api-Key"] = this.apiKey;
							config.headers["X-Challenge"] = this.challenge;
						} else console.log("No API Key");
						break;

					case AuthStrategy.NONE:
						// No auth headers needed
						break;
				}

				console.log(
					`Making ${config.method?.toUpperCase()} request to: ${
						config.url
					} [Auth: ${authStrategy}, Retry: ${
						this.enableRetry ? "ON" : "OFF"
					}]`
				);
				return config;
			},
			(error) => Promise.reject(error)
		);

		// Response interceptor with configurable retry logic
		this.axiosInstance.interceptors.response.use(
			(response) => response,
			async (error) => {
				const { config } = error;

				if (!config) {
					return Promise.reject(error);
				}

				// Skip retry logic if disabled
				if (!this.enableRetry) {
					return Promise.reject(error);
				}

				const configWithRetry = config as typeof config & {
					_retryCount?: number;
				};

				if (!error.response) {
					configWithRetry._retryCount =
						configWithRetry._retryCount || 0;

					if (configWithRetry._retryCount < MAX_RETRIES) {
						configWithRetry._retryCount += 1;

						const delay =
							INITIAL_RETRY_DELAY_MS *
							Math.pow(2, configWithRetry._retryCount - 1);
						console.log(
							`Retry attempt ${configWithRetry._retryCount} for ${config.url} after ${delay}ms`
						);

						await new Promise((resolve) =>
							setTimeout(resolve, delay)
						);

						return this.axiosInstance(configWithRetry);
					}
				}

				if (error.response?.status === 401) {
					console.error("Unauthorized access");
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

	// Auth token methods
	public setAuthToken(token: string) {
		this.authToken = token;
	}

	public clearAuthToken() {
		this.authToken = null;
	}

	// API key methods
	public setApiKey(apiKey: string, challenge: string) {
		this.apiKey = apiKey;
		this.challenge = challenge;
	}

	public clearApiKey() {
		this.apiKey = null;
	}

	// Retry logic control
	public enableRetryLogic(enable: boolean) {
		this.enableRetry = enable;
		console.log(`Retry logic ${enable ? "enabled" : "disabled"}`);
	}

	public isRetryEnabled(): boolean {
		return this.enableRetry;
	}

	// Get current auth state
	public getAuthState() {
		return {
			hasAuthToken: !!this.authToken,
			hasApiKey: !!this.apiKey,
			retryEnabled: this.enableRetry,
		};
	}
}

export const apiClient = ApiClient.getInstance();
