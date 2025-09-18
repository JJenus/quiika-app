import axios, { AxiosResponse } from 'axios';
import type {
  Transaction,
  TransactionDto,
  WithdrawalRequest,
  WithdrawalUpdateDto,
  Quid,
  QuidStatusDto,
  QuidClaimResponse,
  Rule,
  RuleDTO,
  PayStackTransactionDto,
  PayStackAuthorizationResponse,
  Bank,
  ResolveBank,
  QuiikaResponse,
} from '../types/api';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://quiika.alwaysdata.net";

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000,
});

// Request interceptor for adding auth tokens if needed
api.interceptors.request.use(
  (config) => {
    // Add any auth headers here if needed
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error('Unauthorized access');
    }
    return Promise.reject(error);
  }
);

// Transaction API
export const transactionAPI = {
  initTransaction: (data: TransactionDto): Promise<AxiosResponse<TransactionDto>> =>
    api.post('/transactions', data),

  findAll: (): Promise<AxiosResponse<Transaction[]>> =>
    api.get('/transactions'),

  findTransaction: (transactionId: string): Promise<AxiosResponse<TransactionDto>> =>
    api.get(`/transactions/${transactionId}`),

  verifyTransactionRef: (ref: string): Promise<AxiosResponse<TransactionDto>> =>
    api.get(`/transactions/reference/${ref}`),

  verifyTransaction: (quid: string): Promise<AxiosResponse<TransactionDto>> =>
    api.get(`/transactions/verify/${quid}`),

  verifyQuidTransaction: (quid: string): Promise<AxiosResponse<QuidClaimResponse>> =>
    api.get(`/transactions/quid/${quid}/verify`),

  getBanks: (): Promise<AxiosResponse<Bank[]>> =>
    api.get('/transactions/banks'),

  resolveBank: (data: ResolveBank): Promise<AxiosResponse<ResolveBank>> =>
    api.post('/transactions/banks/resolve-name', data),

  withdraw: (): Promise<AxiosResponse<void>> =>
    api.get('/transactions/withdraw'),
};

// Withdrawal API
export const withdrawalAPI = {
  fetchAllRequests: (): Promise<AxiosResponse<WithdrawalRequest[]>> =>
    api.get('/withdrawal-request'),

  fetchRequest: (quid: string): Promise<AxiosResponse<WithdrawalRequest>> =>
    api.get(`/withdrawal-request/${quid}`),

  initiateRequest: (data: WithdrawalRequest): Promise<AxiosResponse<Record<string, string>>> =>
    api.post('/withdrawal-request', data),

  updateRequest: (data: WithdrawalUpdateDto): Promise<AxiosResponse<void>> =>
    api.put('/withdrawal-request', data),
};

// Quid API
export const quidAPI = {
  getQuid: (quid: string): Promise<AxiosResponse<Quid>> =>
    api.get(`/quid/${quid}`),

  updateQuidStatus: (quid: string, data: QuidStatusDto): Promise<AxiosResponse<QuiikaResponse>> =>
    api.put(`/quid/${quid}/status`, data),

  setQuidActive: (quid: string): Promise<AxiosResponse<QuiikaResponse>> =>
    api.put(`/quid/${quid}/status/activate`),
};

// Rules API
export const rulesAPI = {
  allRules: (): Promise<AxiosResponse<Rule[]>> =>
    api.get('/rules'),

  getRule: (quid: string): Promise<AxiosResponse<Rule>> =>
    api.get(`/rules/${quid}`),

  createRule: (data: RuleDTO): Promise<AxiosResponse<Rule>> =>
    api.post('/rules', data),

  claim: (quid: string): Promise<AxiosResponse<QuiikaResponse>> =>
    api.post(`/rules/claim?quid=${quid}`),
};

// Paystack API
export const paystackAPI = {
  initializePayment: (data: PayStackTransactionDto): Promise<AxiosResponse<PayStackAuthorizationResponse>> =>
    api.post('/paystack/transaction/initialize', data),

  handleWebhook: (signature: string, data: any): Promise<AxiosResponse<void>> =>
    api.post('/paystack/webhook', data, {
      headers: {
        'x-paystack-signature': signature,
      },
    }),
};

// SSE API
export const sseAPI = {
  connect: (sessionId: string) => {
    return new EventSource(`${BASE_URL}/sse/connect/${sessionId}`);
  },

  sendMessage: (userId: string, message: string): Promise<AxiosResponse<string>> =>
    api.get(`/sse/send?userId=${userId}&message=${message}`),
};

export default api;