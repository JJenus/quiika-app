/**
 * @deprecated This API client is deprecated and will be removed in version 3.0.0.
 * Please use the new API client from '@/lib/api-services' instead.
 * 
 * Migration guide: https://not-available.com/migration-guide
 */
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
  WithdrawalData,
} from '../../types/api';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://quiika.alwaysdata.net";

// Deprecation warning utility
const showDeprecationWarning = (methodName: string = '') => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      `DEPRECATED: ${methodName ? `Method ${methodName} is` : 'This API client is'} deprecated.\n` +
      'Please migrate to the new API client from "../../api/v2".\n' +
      'Migration guide: https://example.com/migration-guide'
    );
  }
};

/**
 * @deprecated This axios instance is deprecated. Use the new client from '@/lib/api-services'
 */
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
    showDeprecationWarning();
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
// const MAX_RETRIES = 3;
// const INITIAL_RETRY_DELAY_MS = 1000;

// api.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const { config } = error;

//     // Reject if no config is available, as we can't retry.
//     if (!config) {
//       return Promise.reject(error);
//     }

//     // Use a custom property to track retries.
//     const configWithRetry = config as typeof config & { _retryCount?: number };

//     // Only retry on network errors/timeouts, where no response was received from the server.
//     if (!error.response) {
//       configWithRetry._retryCount = configWithRetry._retryCount || 0;

//       if (configWithRetry._retryCount < MAX_RETRIES) {
//         configWithRetry._retryCount += 1;

//         // Implement exponential backoff.
//         const delay =
//           INITIAL_RETRY_DELAY_MS * Math.pow(2, configWithRetry._retryCount - 1);

//         await new Promise((resolve) => setTimeout(resolve, delay));

//         // Attempt to resend the request.
//         return api(configWithRetry);
//       }
//     }

//     if (error.response?.status === 401) {
//       // Handle unauthorized access
//       console.error('Unauthorized access');
//     }
//     return Promise.reject(error);
//   }
// );

/**
 * @deprecated TransactionAPI is deprecated. Use TransactionService from '@/lib/api-services'
 */
export const transactionAPI = {
  /** @deprecated */
  initTransaction: (data: TransactionDto): Promise<AxiosResponse<TransactionDto>> => {
    showDeprecationWarning('transactionAPI.initTransaction');
    return api.post('/transactions', data);
  },

  /** @deprecated */
  findAll: (): Promise<AxiosResponse<Transaction[]>> => {
    showDeprecationWarning('transactionAPI.findAll');
    return api.get('/transactions');
  },

  /** @deprecated */
  findTransaction: (transactionId: string): Promise<AxiosResponse<TransactionDto>> => {
    showDeprecationWarning('transactionAPI.findTransaction');
    return api.get(`/transactions/${transactionId}`);
  },

  /** @deprecated */
  verifyTransactionRef: (ref: string): Promise<AxiosResponse<TransactionDto>> => {
    showDeprecationWarning('transactionAPI.verifyTransactionRef');
    return api.get(`/transactions/reference/${ref}`);
  },

  /** @deprecated */
  verifyTransaction: (quid: string): Promise<AxiosResponse<TransactionDto>> => {
    showDeprecationWarning('transactionAPI.verifyTransaction');
    return api.get(`/transactions/verify/${quid}`);
  },

  /** @deprecated */
  verifyQuidTransaction: (quid: string): Promise<AxiosResponse<QuidClaimResponse>> => {
    showDeprecationWarning('transactionAPI.verifyQuidTransaction');
    return api.get(`/transactions/quid/${quid}/verify`);
  },

  /** @deprecated */
  getBanks: (): Promise<AxiosResponse<Bank[]>> => {
    showDeprecationWarning('transactionAPI.getBanks');
    return api.get('/transactions/banks');
  },

  /** @deprecated */
  resolveBank: (data: ResolveBank): Promise<AxiosResponse<ResolveBank>> => {
    showDeprecationWarning('transactionAPI.resolveBank');
    return api.post('/transactions/banks/resolve-name', data);
  },

  /** @deprecated */
  withdraw: (): Promise<AxiosResponse<void>> => {
    showDeprecationWarning('transactionAPI.withdraw');
    return api.get('/transactions/withdraw');
  },
};

/**
 * @deprecated WithdrawalAPI is deprecated. Use WithdrawalService from '@/lib/api-services'
 */
export const withdrawalAPI = {
  /** @deprecated */
  fetchAllRequests: (): Promise<AxiosResponse<WithdrawalRequest[]>> => {
    showDeprecationWarning('withdrawalAPI.fetchAllRequests');
    return api.get('/withdrawal-request');
  },

  /** @deprecated */
  fetchRequest: (quid: string): Promise<AxiosResponse<WithdrawalRequest>> => {
    showDeprecationWarning('withdrawalAPI.fetchRequest');
    return api.get(`/withdrawal-request/${quid}`);
  },

  /** @deprecated */
  initiateRequest: (data: WithdrawalData): Promise<AxiosResponse<QuiikaResponse>> => {
    showDeprecationWarning('withdrawalAPI.initiateRequest');
    return api.post('/withdrawal-request', data);
  },

  /** @deprecated */
  updateRequest: (data: WithdrawalUpdateDto): Promise<AxiosResponse<void>> => {
    showDeprecationWarning('withdrawalAPI.updateRequest');
    return api.put('/withdrawal-request', data);
  },
};

/**
 * @deprecated QuidAPI is deprecated. Use QuidService from '@/lib/api-services'
 */
export const quidAPI = {
  /** @deprecated */
  getQuid: (quid: string): Promise<AxiosResponse<Quid>> => {
    showDeprecationWarning('quidAPI.getQuid');
    return api.get(`/quid/${quid}`);
  },

  /** @deprecated */
  updateQuidStatus: (quid: string, data: QuidStatusDto): Promise<AxiosResponse<QuiikaResponse>> => {
    showDeprecationWarning('quidAPI.updateQuidStatus');
    return api.put(`/quid/${quid}/status`, data);
  },

  /** @deprecated */
  setQuidActive: (quid: string): Promise<AxiosResponse<QuiikaResponse>> => {
    showDeprecationWarning('quidAPI.setQuidActive');
    return api.put(`/quid/${quid}/status/activate`);
  },
};

/**
 * @deprecated RulesAPI is deprecated. Use RuleService from '@/lib/api-services'
 */
export const rulesAPI = {
  /** @deprecated */
  allRules: (): Promise<AxiosResponse<Rule[]>> => {
    showDeprecationWarning('rulesAPI.allRules');
    return api.get('/rules');
  },

  /** @deprecated */
  getRule: (quid: string): Promise<AxiosResponse<Rule>> => {
    showDeprecationWarning('rulesAPI.getRule');
    return api.get(`/rules/${quid}`);
  },

  /** @deprecated */
  createRule: (data: RuleDTO): Promise<AxiosResponse<Rule>> => {
    showDeprecationWarning('rulesAPI.createRule');
    return api.post('/rules', data);
  },

  /** @deprecated */
  claim: (quid: string): Promise<AxiosResponse<QuiikaResponse>> => {
    showDeprecationWarning('rulesAPI.claim');
    return api.post(`/rules/claim?quid=${quid}`);
  },
};

/**
 * @deprecated PaystackAPI is deprecated. Use PaymentService from '@/lib/api-services'
 */
export const paystackAPI = {
  /** @deprecated */
  initializePayment: (data: PayStackTransactionDto): Promise<AxiosResponse<PayStackAuthorizationResponse>> => {
    showDeprecationWarning('paystackAPI.initializePayment');
    return api.post('/paystack/transaction/initialize', data);
  },

  /** @deprecated */
  handleWebhook: (signature: string, data: any): Promise<AxiosResponse<void>> => {
    showDeprecationWarning('paystackAPI.handleWebhook');
    return api.post('/paystack/webhook', data, {
      headers: {
        'x-paystack-signature': signature,
      },
    });
  },
};

/**
 * @deprecated SSE API is deprecated. Use EventService from '@/lib/api-services'
 */
export const sseAPI = {
  /** @deprecated */
  connect: (sessionId: string) => {
    showDeprecationWarning('sseAPI.connect');
    return new EventSource(`${BASE_URL}/sse/connect/${sessionId}`);
  },

  /** @deprecated */
  sendMessage: (userId: string, message: string): Promise<AxiosResponse<string>> => {
    showDeprecationWarning('sseAPI.sendMessage');
    return api.get(`/sse/send?userId=${userId}&message=${message}`);
  },
};

/**
 * @deprecated Default export is deprecated. Use the new client from '@/lib/api-services'
 */
export default api;