//src/lib/api-service
import { apiClient } from "./api-client";
import {
	// Import all the API classes you need
	TransactionsApi,
	WithdrawalRequestsApi,
	QuidApi,
	RulesApi,
	PaymentsApi,
	AuthenticationApi,
	AdminUsersApi,
	AdminTransactionManagementApi,
	AdminQuidManagementApi,
	AdminWithdrawalManagementApi,
	AdminDashboardApi,
	AdminLoggingApi,
	InviteUserApi,
	DynamicAPIKeyApi,
	SessionManagementApi,
	AdminSettingsManagementApi,

	// Import types as needed
	TransactionDto,
	ResolveBank,
	WithdrawalRequest,
	WithdrawalUpdateDto,
	QuidStatusDto,
	RuleDTO,
	InitializePaymentRequest,
	LoginRequest,
	RegisterRequest,
	GetDashboardMetricsPeriodEnum,
	GetDashboardTimeSeriesPeriodEnum,
	Pageable,
	InviteRequest,
	EcdhCompleteRequest,
	ChangePasswordRequest,
	UpdateAdminProfileRequest,
	AdminSettingsManagementApiUpdateNotificationPreferencesRequest,
	AdminSettingsManagementApiUpdateSecurityPreferencesRequest,
	AdminSettingsManagementApiUpdateUIPreferencesRequest,
	AdminSettingsManagementApiUploadAvatarRequest,
	UploadAvatarRequest,
} from "./api-sdk";

// Initialize API instances with our configured client
const config = apiClient.getConfig();
const axiosInstance = apiClient.getAxiosInstance();

// Create API instances - this is where we leverage the generated SDK
export const transactionsApi = new TransactionsApi(
	config,
	config.basePath,
	axiosInstance
);
export const withdrawalRequestsApi = new WithdrawalRequestsApi(
	config,
	config.basePath,
	axiosInstance
);
export const quidApi = new QuidApi(config, config.basePath, axiosInstance);
export const rulesApi = new RulesApi(config, config.basePath, axiosInstance);
export const paymentsApi = new PaymentsApi(
	config,
	config.basePath,
	axiosInstance
);
export const authenticationApi = new AuthenticationApi(
	config,
	config.basePath,
	axiosInstance
);
export const adminUsersApi = new AdminUsersApi(
	config,
	config.basePath,
	axiosInstance
);
export const adminTransactionManagementApi = new AdminTransactionManagementApi(
	config,
	config.basePath,
	axiosInstance
);
export const adminQuidManagementApi = new AdminQuidManagementApi(
	config,
	config.basePath,
	axiosInstance
);
export const adminWithdrawalManagementApi = new AdminWithdrawalManagementApi(
	config,
	config.basePath,
	axiosInstance
);
export const adminDashboardApi = new AdminDashboardApi(
	config,
	config.basePath,
	axiosInstance
);
export const adminLoggingApi = new AdminLoggingApi(
	config,
	config.basePath,
	axiosInstance
);
export const inviteUserApi = new InviteUserApi(
	config,
	config.basePath,
	axiosInstance
);
export const dynamicApiKey = new DynamicAPIKeyApi(
	config,
	config.basePath,
	axiosInstance
);
export const sessionApi = new SessionManagementApi(
	config,
	config.basePath,
	axiosInstance
);

export const adminSettings = new AdminSettingsManagementApi(
	config,
	config.basePath,
	axiosInstance
);

// Generic response handler
export type ApiResponse<T> = {
	data: T | null;
	error: string | null;
	status?: number;
};

export const handleApiCall = async <T>(
	apiCall: Promise<{ data: T }>
): Promise<ApiResponse<T>> => {
	try {
		const response = await apiCall;
		return {
			data: response.data,
			error: null,
		};
	} catch (error: any) {
		console.error("API Call failed:", error);

		const errorMessage =
			error.response?.data?.message ||
			error.response?.data?.error ||
			error.message ||
			"An unexpected error occurred";

		return {
			data: null,
			error: errorMessage,
			status: error.response?.status,
		};
	}
};

// Service layer that mirrors your current API structure but uses the generated SDK
export const apiService = {
	// Transaction services
	transaction: {
		initTransaction: (data: TransactionDto) =>
			handleApiCall(
				transactionsApi.initTransaction({ transactionDto: data })
			),

		findAll: () => handleApiCall(transactionsApi.findAll()),

		findTransaction: (transactionId: string) =>
			handleApiCall(transactionsApi.findTransaction({ transactionId })),

		verifyTransactionRef: (ref: string) =>
			handleApiCall(transactionsApi.findTransactionByRef({ ref })),

		verifyTransaction: (quid: string) =>
			handleApiCall(transactionsApi.verifyTransaction({ quid })),

		verifyQuidTransaction: (quid: string) =>
			handleApiCall(transactionsApi.verifyQuidTransaction({ quid })),

		getBanks: () => handleApiCall(transactionsApi.banks()),

		resolveBank: (data: ResolveBank) =>
			handleApiCall(transactionsApi.resolveBank({ resolveBank: data })),

		withdraw: (quid: string) =>
			handleApiCall(transactionsApi.withdraw({ quid })),
	},

	// Withdrawal services
	withdrawal: {
		fetchAllRequests: () =>
			handleApiCall(withdrawalRequestsApi.fetchAllRequest()),

		fetchRequest: (quid: string) =>
			handleApiCall(withdrawalRequestsApi.fetchRequest({ quid })),

		initiateRequest: (data: WithdrawalRequest) =>
			handleApiCall(
				withdrawalRequestsApi.initiateRequest({
					withdrawalRequest: data,
				})
			),

		updateRequest: (data: WithdrawalUpdateDto) =>
			handleApiCall(
				withdrawalRequestsApi.initiateRequest1({
					withdrawalUpdateDto: data,
				})
			),
	},

	// Quid services
	quid: {
		getQuid: (quid: string) => handleApiCall(quidApi.getQuid({ quid })),

		updateQuidStatus: (quid: string, data: QuidStatusDto) =>
			handleApiCall(
				quidApi.updateQuidStatus({ quid, quidStatusDto: data })
			),

		setQuidActive: (quid: string) =>
			handleApiCall(quidApi.setQuidActive({ quid })),
	},

	// Rules services
	rules: {
		allRules: () => handleApiCall(rulesApi.allRules()),

		getRule: (quid: string) => handleApiCall(rulesApi.getRule({ quid })),

		createRule: (data: RuleDTO) =>
			handleApiCall(rulesApi.createRule({ ruleDTO: data })),

		claim: (quid: string) => handleApiCall(rulesApi.claim({ quid })),
	},

	// Payment services
	payment: {
		initializePayment: (
			data: InitializePaymentRequest,
			provider?: string
		) =>
			handleApiCall(
				paymentsApi.initializePayment({
					initializePaymentRequest: data,
					provider,
				})
			),

		getBanks: () => handleApiCall(paymentsApi.getBanks()),
	},

	// Auth services
	auth: {
		login: (data: LoginRequest) =>
			handleApiCall(authenticationApi.login({ loginRequest: data })),

		register: (data: RegisterRequest) =>
			handleApiCall(
				authenticationApi.register({ registerRequest: data })
			),

		forgotPassword: (email: string) =>
			handleApiCall(
				authenticationApi.forgotPassword({
					forgotPasswordRequest: { email },
				})
			),

		resetPassword: (token: string, newPassword: string) =>
			handleApiCall(
				authenticationApi.resetPassword({
					resetPasswordRequest: { token, newPassword },
				})
			),

		validateInvite: (token: string) =>
			handleApiCall(authenticationApi.validateInvite({ token })),
	},

	// Admin services
	admin: {
		// Dashboard
		dashboard: {
			getMetrics: (period: GetDashboardMetricsPeriodEnum) =>
				handleApiCall(
					adminDashboardApi.getDashboardMetrics({ period })
				),

			getTimeSeries: (period: GetDashboardTimeSeriesPeriodEnum) =>
				handleApiCall(
					adminDashboardApi.getDashboardTimeSeries({ period })
				),

			getQuidMetrics: (period: GetDashboardTimeSeriesPeriodEnum) =>
				handleApiCall(
					adminDashboardApi.getQuidDashboardMetrics({ period })
				),

			getTransactionMetrics: (period: GetDashboardTimeSeriesPeriodEnum) =>
				handleApiCall(
					adminDashboardApi.getTransactionDashboardMetrics({ period })
				),

			getWithdrawalMetrics: (period: GetDashboardTimeSeriesPeriodEnum) =>
				handleApiCall(
					adminDashboardApi.getWithdrawalDashboardMetrics({ period })
				),
		},

		// Logging
		logging: {
			getAuditLogs: (
				pageable: Pageable,
				adminUserId?: number,
				actionType?: any,
				startDate?: string,
				endDate?: string,
				targetEntityId?: string
			) =>
				handleApiCall(
					adminLoggingApi.getAuditLogs({
						pageable,
						adminUserId,
						actionType,
						startDate,
						endDate,
						targetEntityId,
					})
				),

			downloadApplicationLog: () =>
				handleApiCall(adminLoggingApi.downloadApplicationLog()),
		},

		// Invites
		invites: {
			createInvite: (data: InviteRequest) =>
				handleApiCall(
					inviteUserApi.createInvite({ inviteRequest: data })
				),

			getAllInvites: () => handleApiCall(inviteUserApi.getAllInvites()),

			resendInvite: (id: number) =>
				handleApiCall(inviteUserApi.resendInvite({ id })),

			deleteInvite: (id: number) =>
				handleApiCall(inviteUserApi.deleteInvite({ id })),
		},

		// User management
		users: {
			listUsers: (
				pageable: Pageable,
				email?: string,
				status?: string,
				role?: any
			) =>
				handleApiCall(
					adminUsersApi.listUsers({ pageable, email, status, role })
				),

			getUserDetails: (userId: number) =>
				handleApiCall(adminUsersApi.getUserDetails({ userId })),

			updateUserRole: (userId: number, roleData: any) =>
				handleApiCall(
					adminUsersApi.updateUserRole({
						userId,
						userRoleUpdateDto: roleData,
					})
				),

			updateUserStatus: (userId: number, statusData: any) =>
				handleApiCall(
					adminUsersApi.updateUserStatus({
						userId,
						userStatusUpdateDto: statusData,
					})
				),
		},

		// Transaction management
		transactions: {
			getTransactions: (
				pageable: any,
				status?: any,
				paymentProvider?: string,
				currency?: string,
				search?: string
			) =>
				handleApiCall(
					adminTransactionManagementApi.getTransactions({
						pageable,
						status,
						paymentProvider,
						currency,
						search,
					})
				),

			getTransaction: (transactionId: string) =>
				handleApiCall(
					adminTransactionManagementApi.getTransaction({
						transactionId,
					})
				),

			refundTransaction: (transactionId: string) =>
				handleApiCall(
					adminTransactionManagementApi.refundTransaction({
						transactionId,
					})
				),
		},

		// Quid management
		quids: {
			getQuids: (
				pageable: any,
				quid?: string,
				status?: any,
				currency?: string
			) =>
				handleApiCall(
					adminQuidManagementApi.getQuids({
						pageable,
						quid,
						status,
						currency,
					})
				),

			getQuid: (quidCode: string) =>
				handleApiCall(adminQuidManagementApi.getQuid1({ quidCode })),

			getClaimAttempts: (quidCode: string, pageable: Pageable) =>
				handleApiCall(
					adminQuidManagementApi.getClaimAttemptsForQuid({
						quidCode,
						pageable,
					})
				),

			getWinners: (quidCode: string, pageable: Pageable) =>
				handleApiCall(
					adminQuidManagementApi.getWinnersForQuid({
						quidCode,
						pageable,
					})
				),

			createQuid: (createQuidRequest: any) =>
				handleApiCall(
					adminQuidManagementApi.createQuid({ createQuidRequest })
				),

			updateQuidStatus: (quidCode: string, statusData: any) =>
				handleApiCall(
					adminQuidManagementApi.updateQuidStatus1({
						quidCode,
						quidStatusUpdateRequest: statusData,
					})
				),
		},

		// Withdrawal management
		withdrawals: {
			getWithdrawals: (
				pageable: any,
				status?: any,
				currency?: any,
				search?: string
			) =>
				handleApiCall(
					adminWithdrawalManagementApi.getWithdrawals({
						pageable,
						status,
						currency,
						search,
					})
				),

			getWithdrawal: (withdrawalId: number) =>
				handleApiCall(
					adminWithdrawalManagementApi.getWithdrawal({ withdrawalId })
				),

			approveWithdrawal: (withdrawalId: number) =>
				handleApiCall(
					adminWithdrawalManagementApi.approveWithdrawal({
						withdrawalId,
					})
				),

			rejectWithdrawal: (withdrawalId: number, reason: string) =>
				handleApiCall(
					adminWithdrawalManagementApi.rejectWithdrawal({
						withdrawalId,
						rejectWithdrawalRequestDto: { reason },
					})
				),
		},

		settings: {
			getAllSettings: () =>
				handleApiCall(adminSettings.getUserPreferences()),

			getUserProfile: () => handleApiCall(adminSettings.getUserProfile()),

			changePassword: (changePasswordRequest: ChangePasswordRequest) =>
				handleApiCall(
					adminSettings.changePassword({
						changePasswordRequest,
					})
				),

			updateUserProfile: (
				updateAdminProfileRequest: UpdateAdminProfileRequest
			) =>
				handleApiCall(
					adminSettings.updateUserProfile({
						updateAdminProfileRequest,
					})
				),

			updateNotificationPreferences: (
				data: AdminSettingsManagementApiUpdateNotificationPreferencesRequest
			) =>
				handleApiCall(
					adminSettings.updateNotificationPreferences({
						...data,
					})
				),

			updateSecurityPreferences: (
				data: AdminSettingsManagementApiUpdateSecurityPreferencesRequest
			) =>
				handleApiCall(
					adminSettings.updateSecurityPreferences({
						...data,
					})
				),

			updateUIPreferences: (
				data: AdminSettingsManagementApiUpdateUIPreferencesRequest
			) =>
				handleApiCall(
					adminSettings.updateUIPreferences({
						...data,
					})
				),

			uploadAvatar: (data: UploadAvatarRequest) =>
				handleApiCall(
					adminSettings.uploadAvatar({
						uploadAvatarRequest: data,
					})
				),
		},
	},

	session: {
		getAllSessions: () => handleApiCall(sessionApi.getUserSessions()),

		getActiveSessions: () => handleApiCall(sessionApi.getActiveSessions()),

		revokeSession: (sessionId: string) =>
			handleApiCall(sessionApi.revokeSession({ sessionId })),

		revokeOtherSessions: () =>
			handleApiCall(sessionApi.revokeOtherSessions()),

		revokeAllSessions: () => handleApiCall(sessionApi.revokeAllSessions()),
	},

	apiKey: {
		init: () => handleApiCall(dynamicApiKey.initKeyExchange()),

		complete: (ecdhCompleteRequest: EcdhCompleteRequest) =>
			handleApiCall(
				dynamicApiKey.completeKeyExchange({
					ecdhCompleteRequest,
				})
			),
	},
};

// Export individual services for more granular imports
export const {
	transaction,
	withdrawal,
	quid,
	rules,
	payment,
	auth,
	admin,
	apiKey,
	session,
} = apiService;
