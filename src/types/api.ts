// API Response Types
export interface QuiikaResponse {
  message: string;
  accessKey: string;
}

export interface Transaction {
  id: number;
  email: string;
  amount: number;
  currency: string;
  quid: string;
  reference: string;
  transactionId: string;
  status: TransactionStatus;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionDto {
  quid?: string;
  email: string;
  amount: number;
  sessionId?: string;
  authorizationUrl?: string;
  transactionId?: string;
  status?: TransactionStatus;
  blocked?: boolean;
}

export interface WithdrawalRequest {
  id: number;
  quid: string;
  transaction: Transaction;
  accountName: string;
  accountNumber: string;
  amount: number;
  bank: string;
  bankCode: string;
  reference: string;
  currency: Currency;
  status: TransactionStatus;
  accessKey: string;
  createdAt: string;
  updatedAt: string;
}

export interface WithdrawalUpdateDto {
  quid: string;
  status: TransactionStatus;
}

export interface Quid {
  id: number;
  quid: string;
  amount: number;
  currency: string;
  status: QuidStatus;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QuidStatusDto {
  status: QuidStatus;
}

export interface QuidClaimResponse {
  quid: Quid;
  allowAccess: boolean;
  message: string;
  accessKey: string;
}

export interface Rule {
  id: number;
  quid: Quid;
  nthPerson: number;
  startTime: string;
  endTime: string;
  totalSplits: number;
  totalAmount: number;
  splits: Split[];
}

export interface RuleDTO {
  quid: string;
  nthPerson?: number;
  totalSplits?: number;
  startTime?: string;
  endTime?: string;
  splits?: SplitDTO[];
}

export interface Split {
  id: number;
  amount: number;
  percentage: number;
  rule: Rule;
}

export interface SplitDTO {
  percentage: number;
}

export interface PayStackTransactionDto {
  amount: number;
  email: string;
  callback_url: string;
  reference: string;
}

export interface PayStackAuthorizationResponse {
  status: boolean;
  message: string;
  data: {
    reference: string;
    authorization_url: string;
    access_code: string;
  };
}

export interface Bank {
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string;
  pay_with_bank: boolean;
  supports_transfer: boolean;
  active: boolean;
  is_deleted: boolean;
  country: string;
  currency: string;
  type: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface ResolveBank {
  accountNumber: string;
  bankCode: string;
  accountName?: string;
}

// Enums
export type TransactionStatus = 
  | 'PENDING' 
  | 'PROCESSING' 
  | 'SUCCESS' 
  | 'COMPLETED' 
  | 'FAILED' 
  | 'UNKNOWN_STATUS';

export type QuidStatus = 
  | 'ACTIVE' 
  | 'SPLIT' 
  | 'CLAIMED' 
  | 'BLOCKED' 
  | 'EXPIRED' 
  | 'CONFLICTED';

export type Currency = 'GHS' | 'NGN' | 'ZAR' | 'KES';

// Form Types
export interface CreateGiftForm {
  amount: number;
  email: string;
  isAnonymous?: boolean;
  password?: string;
}

export interface ClaimGiftForm {
  quid: string;
  password?: string;
}

export interface WithdrawForm {
  accountNumber: string;
  bankCode: string;
  amount: number;
}

// UI Types
export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export interface ErrorState {
  hasError: boolean;
  message?: string;
  code?: string;
}

interface TransactionResponse {
  currency: Currency;
  amount: number;
  quid: string;
  transactionId: string;
  status: TransactionStatus;
  timestamp: Date;
}

// SSE Types
export interface SSEMessage {
  type: "TRANSACTION" | "WITHDRAWAL" | "MESSAGE";
  data: TransactionResponse | any; //"PAYMENT" | "WITHDRAWAL" = TransactionResponse
  timestamp: string;
}