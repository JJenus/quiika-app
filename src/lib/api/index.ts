// Main exports
export { apiService } from "../api-services";
export { apiClient } from "../api-client";
export { handleApiCall } from "../api-services";

// Individual service exports
export {
	transaction,
	withdrawal,
	quid,
	rules,
	payment,
	auth,
	admin,
	session,
} from "../api-services";

// Type exports
export type { ApiResponse } from "../api-services";
export type { LoadingState, ErrorState, PaginationParams } from "../api-types";

export { createPageable } from "../api-types";

// Re-export commonly used SDK types
export type {
	Transaction,
	TransactionDto,
	WithdrawalRequest,
	Quid,
	Rule,
	BankDto as Bank,
	ResolveBank,
	UserDto,
	AuditLogDto,
	UserDtoRoleEnum as UserRole,
	GetDashboardMetricsPeriodEnum as PERIOD,
	QuidDashboardMetricsDto as QuidMetrics,
	WithdrawalDashboardMetricsDto as WithdrawalMetrics,
	TransactionDashboardMetricsDto as TransactionMetrics,
	DashboardMetricsDto,
	PageWithdrawalRequestDto,
	WithdrawalRequestDto,
	UserSessionDetails,
	AdminSettingsManagementApiUpdateNotificationPreferencesRequest as UpdateNotificationPreferences,
	AdminSettingsManagementApiUpdateSecurityPreferencesRequest as UpdateSecurityPreferences,
	AdminSettingsManagementApiUpdateUIPreferencesRequest as UIPreferencesRequest,
	ChangePasswordRequest,
	UpdateAdminProfileRequest,
	AdminSettingsManagementApiUploadAvatarRequest as UploadAvatarRequest,
	NotificationPreferencesDto as NotificationPreferences,
	UIPreferencesDto as UIPreferences,
	SecurityPreferencesDto as SecurityPreferences
} from "../api-sdk";
