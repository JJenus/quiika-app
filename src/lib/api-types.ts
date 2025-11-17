// Re-export commonly used types from the SDK
export type {
    Transaction,
    TransactionDto,
    WithdrawalRequest,
    WithdrawalUpdateDto,
    Quid,
    QuidStatusDto,
    QuidClaimResponse,
    Rule,
    RuleDTO,
    BankDto as Bank,
    ResolveBank,
    QuiikaResponse,
    UserDto,
    Pageable,
    EcdhCompleteRequest
  } from './api-sdk';
  
  // Custom types that match your existing structure
  export interface LoadingState {
    isLoading: boolean;
    message?: string;
  }
  
  export interface ErrorState {
    hasError: boolean;
    message?: string;
  }
  
  // Pagination helper
  export interface PaginationParams {
    page?: number;
    size?: number;
    sort?: string[];
  }
  
  export const createPageable = (params: PaginationParams) => ({
    page: params.page || 0,
    size: params.size || 20,
    sort: params.sort || [],
  });