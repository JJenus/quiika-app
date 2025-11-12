## @app/api-sdk@1.0.0

This generator creates TypeScript/JavaScript client that utilizes [axios](https://github.com/axios/axios). The generated Node module can be used in the following environments:

Environment
* Node.js
* Webpack
* Browserify

Language level
* ES5 - you must have a Promises/A+ library installed
* ES6

Module system
* CommonJS
* ES6 module system

It can be used in both TypeScript and JavaScript. In TypeScript, the definition will be automatically resolved via `package.json`. ([Reference](https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html))

### Building

To build and compile the typescript sources to javascript use:
```
npm install
npm run build
```

### Publishing

First build the package then run `npm publish`

### Consuming

navigate to the folder of your consuming project and run one of the following commands.

_published:_

```
npm install @app/api-sdk@1.0.0 --save
```

_unPublished (not recommended):_

```
npm install PATH_TO_GENERATED_PACKAGE --save
```

### Documentation for API Endpoints

All URIs are relative to *http://localhost:8080*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*ActuatorApi* | [**health**](docs/ActuatorApi.md#health) | **GET** /actuator/health | Actuator web endpoint \&#39;health\&#39;
*ActuatorApi* | [**links**](docs/ActuatorApi.md#links) | **GET** /actuator | Actuator root web endpoint
*ActuatorApi* | [**listNames**](docs/ActuatorApi.md#listnames) | **GET** /actuator/metrics | Actuator web endpoint \&#39;metrics\&#39;
*ActuatorApi* | [**metric**](docs/ActuatorApi.md#metric) | **GET** /actuator/metrics/{requiredMetricName} | Actuator web endpoint \&#39;metrics-requiredMetricName\&#39;
*ActuatorApi* | [**scrape**](docs/ActuatorApi.md#scrape) | **GET** /actuator/prometheus | Actuator web endpoint \&#39;prometheus\&#39;
*AdminDashboardApi* | [**getDashboardMetrics**](docs/AdminDashboardApi.md#getdashboardmetrics) | **GET** /admin/dashboard/metrics | Get dashboard metrics
*AdminDashboardApi* | [**getDashboardTimeSeries**](docs/AdminDashboardApi.md#getdashboardtimeseries) | **GET** /admin/dashboard/timeseries | Get dashboard time series data
*AdminLoggingApi* | [**downloadApplicationLog**](docs/AdminLoggingApi.md#downloadapplicationlog) | **GET** /admin/logs/application | Download application log
*AdminLoggingApi* | [**getAuditLogs**](docs/AdminLoggingApi.md#getauditlogs) | **GET** /admin/logs/audit | Get audit logs
*AdminQuidManagementApi* | [**createQuid**](docs/AdminQuidManagementApi.md#createquid) | **POST** /admin/quids | Create a new Quid
*AdminQuidManagementApi* | [**getClaimAttemptsForQuid**](docs/AdminQuidManagementApi.md#getclaimattemptsforquid) | **GET** /admin/quids/{quidCode}/claims | Get claim attempts for a Quid
*AdminQuidManagementApi* | [**getQuid1**](docs/AdminQuidManagementApi.md#getquid1) | **GET** /admin/quids/{quidCode} | Find Quid by code
*AdminQuidManagementApi* | [**getQuids**](docs/AdminQuidManagementApi.md#getquids) | **GET** /admin/quids | Get all Quids
*AdminQuidManagementApi* | [**getWinnersForQuid**](docs/AdminQuidManagementApi.md#getwinnersforquid) | **GET** /admin/quids/{quidCode}/winners | Get winners for a Quid
*AdminQuidManagementApi* | [**updateQuidStatus1**](docs/AdminQuidManagementApi.md#updatequidstatus1) | **PUT** /admin/quids/{quidCode}/status | Update Quid status
*AdminTransactionManagementApi* | [**getTransaction**](docs/AdminTransactionManagementApi.md#gettransaction) | **GET** /admin/transactions/{transactionId} | Find transaction by ID
*AdminTransactionManagementApi* | [**getTransactions**](docs/AdminTransactionManagementApi.md#gettransactions) | **GET** /admin/transactions | Get all transactions
*AdminTransactionManagementApi* | [**refundTransaction**](docs/AdminTransactionManagementApi.md#refundtransaction) | **POST** /admin/transactions/{transactionId}/refund | Refund a transaction
*AdminUsersApi* | [**getUserDetails**](docs/AdminUsersApi.md#getuserdetails) | **GET** /admin/users/{userId} | Get user details by ID
*AdminUsersApi* | [**listUsers**](docs/AdminUsersApi.md#listusers) | **GET** /admin/users | List and filter users
*AdminUsersApi* | [**updateUserRole**](docs/AdminUsersApi.md#updateuserrole) | **PUT** /admin/users/{userId}/role | Update user role
*AdminUsersApi* | [**updateUserStatus**](docs/AdminUsersApi.md#updateuserstatus) | **PUT** /admin/users/{userId}/status | Update user account status
*AdminWithdrawalManagementApi* | [**approveWithdrawal**](docs/AdminWithdrawalManagementApi.md#approvewithdrawal) | **POST** /admin/withdrawals/{withdrawalId}/approve | Approve a withdrawal request
*AdminWithdrawalManagementApi* | [**getWithdrawal**](docs/AdminWithdrawalManagementApi.md#getwithdrawal) | **GET** /admin/withdrawals/{withdrawalId} | Get withdrawal by ID
*AdminWithdrawalManagementApi* | [**getWithdrawals**](docs/AdminWithdrawalManagementApi.md#getwithdrawals) | **GET** /admin/withdrawals | Get all withdrawal requests
*AdminWithdrawalManagementApi* | [**rejectWithdrawal**](docs/AdminWithdrawalManagementApi.md#rejectwithdrawal) | **POST** /admin/withdrawals/{withdrawalId}/reject | Reject a withdrawal request
*AuthenticationApi* | [**forgotPassword**](docs/AuthenticationApi.md#forgotpassword) | **POST** /auth/forgot-password | Request a password reset
*AuthenticationApi* | [**login**](docs/AuthenticationApi.md#login) | **POST** /auth/login | Authenticate user
*AuthenticationApi* | [**register**](docs/AuthenticationApi.md#register) | **POST** /auth/register | Register a new user
*AuthenticationApi* | [**resetPassword**](docs/AuthenticationApi.md#resetpassword) | **POST** /auth/reset-password | Reset user password
*AuthenticationApi* | [**validateInvite**](docs/AuthenticationApi.md#validateinvite) | **GET** /auth/invites/validate/{token} | Validate an invite token
*DynamicAPIKeyApi* | [**completeKeyExchange**](docs/DynamicAPIKeyApi.md#completekeyexchange) | **POST** /auth/key/complete | Complete key exchange
*DynamicAPIKeyApi* | [**initKeyExchange**](docs/DynamicAPIKeyApi.md#initkeyexchange) | **POST** /auth/key/init | Initialize key exchange
*InviteUserApi* | [**createInvite**](docs/InviteUserApi.md#createinvite) | **POST** /admin/invites/ | 
*InviteUserApi* | [**deleteInvite**](docs/InviteUserApi.md#deleteinvite) | **DELETE** /admin/invites/{id} | 
*InviteUserApi* | [**getAllInvites**](docs/InviteUserApi.md#getallinvites) | **GET** /admin/invites/ | 
*InviteUserApi* | [**resendInvite**](docs/InviteUserApi.md#resendinvite) | **POST** /admin/invites/{id} | 
*PaymentWebhooksApi* | [**handleFlutterwaveWebhook**](docs/PaymentWebhooksApi.md#handleflutterwavewebhook) | **POST** /api/webhooks/flutterwave | Handles Flutterwave webhook events
*PaymentWebhooksApi* | [**handlePaystackWebhook**](docs/PaymentWebhooksApi.md#handlepaystackwebhook) | **POST** /api/webhooks/paystack | Handles Paystack webhook events
*PaymentsApi* | [**getBanks**](docs/PaymentsApi.md#getbanks) | **GET** /api/payments/banks | Get list of supported banks
*PaymentsApi* | [**initializePayment**](docs/PaymentsApi.md#initializepayment) | **POST** /api/payments/initialize | Initialize a payment
*QuidApi* | [**getQuid**](docs/QuidApi.md#getquid) | **GET** /quid/{quid} | Get Quid details
*QuidApi* | [**setQuidActive**](docs/QuidApi.md#setquidactive) | **PUT** /quid/{quid}/status/activate | Activate a Quid
*QuidApi* | [**updateQuidStatus**](docs/QuidApi.md#updatequidstatus) | **PUT** /quid/{quid}/status | Update Quid status
*RulesApi* | [**allRules**](docs/RulesApi.md#allrules) | **GET** /rules | Get all rules
*RulesApi* | [**claim**](docs/RulesApi.md#claim) | **POST** /rules/claim | Attempt to claim a Quid
*RulesApi* | [**createRule**](docs/RulesApi.md#createrule) | **POST** /rules | Create a new rule
*RulesApi* | [**getRule**](docs/RulesApi.md#getrule) | **GET** /rules/{quid} | Get a rule by Quid
*ServerSentEventsApi* | [**connect**](docs/ServerSentEventsApi.md#connect) | **GET** /sse/connect/{sessionId} | Subscribe to an event stream
*ServerSentEventsApi* | [**disconnect**](docs/ServerSentEventsApi.md#disconnect) | **DELETE** /sse/disconnect/{sessionId} | Disconnect SSE connection
*ServerSentEventsApi* | [**sendMessageToUser**](docs/ServerSentEventsApi.md#sendmessagetouser) | **GET** /sse/send | Send a message to a user (For internal testing)
*SessionManagementApi* | [**getActiveSessions**](docs/SessionManagementApi.md#getactivesessions) | **GET** /auth/sessions/active | Get active sessions for current user
*SessionManagementApi* | [**getSessionCount**](docs/SessionManagementApi.md#getsessioncount) | **GET** /auth/sessions/count | Get active session count for current user
*SessionManagementApi* | [**getUserSessions**](docs/SessionManagementApi.md#getusersessions) | **GET** /auth/sessions | Get all active sessions for current user
*SessionManagementApi* | [**revokeAllSessions**](docs/SessionManagementApi.md#revokeallsessions) | **DELETE** /auth/sessions/all | Revoke all sessions for current user
*SessionManagementApi* | [**revokeOtherSessions**](docs/SessionManagementApi.md#revokeothersessions) | **DELETE** /auth/sessions | Revoke all other sessions except current one
*SessionManagementApi* | [**revokeSession**](docs/SessionManagementApi.md#revokesession) | **DELETE** /auth/sessions/{sessionId} | Revoke a specific session
*TransactionsApi* | [**banks**](docs/TransactionsApi.md#banks) | **GET** /transactions/banks | Get list of banks
*TransactionsApi* | [**findAll**](docs/TransactionsApi.md#findall) | **GET** /transactions | Find all transactions
*TransactionsApi* | [**findTransaction**](docs/TransactionsApi.md#findtransaction) | **GET** /transactions/{transactionId} | Find transaction by ID
*TransactionsApi* | [**findTransactionByRef**](docs/TransactionsApi.md#findtransactionbyref) | **GET** /transactions/reference/{ref} | Find transaction by reference
*TransactionsApi* | [**initTransaction**](docs/TransactionsApi.md#inittransaction) | **POST** /transactions | Initialize a transaction
*TransactionsApi* | [**resolveBank**](docs/TransactionsApi.md#resolvebank) | **POST** /transactions/banks/resolve-name | Resolve bank account name
*TransactionsApi* | [**verifyQuidTransaction**](docs/TransactionsApi.md#verifyquidtransaction) | **GET** /transactions/quid/{quid}/verify | Verify a Quid transaction
*TransactionsApi* | [**verifyTransaction**](docs/TransactionsApi.md#verifytransaction) | **GET** /transactions/verify/{quid} | Find transaction by Quid
*TransactionsApi* | [**withdraw**](docs/TransactionsApi.md#withdraw) | **GET** /transactions/withdraw/{quid} | Withdraw from a Quid
*WelcomeApi* | [**welcome**](docs/WelcomeApi.md#welcome) | **GET** / | Show welcome page
*WithdrawalRequestsApi* | [**fetchAllRequest**](docs/WithdrawalRequestsApi.md#fetchallrequest) | **GET** /withdrawal-request | Get all withdrawal requests
*WithdrawalRequestsApi* | [**fetchRequest**](docs/WithdrawalRequestsApi.md#fetchrequest) | **GET** /withdrawal-request/{quid} | Get a withdrawal request by Quid
*WithdrawalRequestsApi* | [**initiateRequest**](docs/WithdrawalRequestsApi.md#initiaterequest) | **POST** /withdrawal-request | Initiate a withdrawal request
*WithdrawalRequestsApi* | [**initiateRequest1**](docs/WithdrawalRequestsApi.md#initiaterequest1) | **PUT** /withdrawal-request | Update a withdrawal request


### Documentation For Models

 - [ApiKeyResponse](docs/ApiKeyResponse.md)
 - [AuditLogDto](docs/AuditLogDto.md)
 - [BankDto](docs/BankDto.md)
 - [ClaimAttemptDto](docs/ClaimAttemptDto.md)
 - [CreateQuidRequest](docs/CreateQuidRequest.md)
 - [DashboardMetricsDto](docs/DashboardMetricsDto.md)
 - [EcdhCompleteRequest](docs/EcdhCompleteRequest.md)
 - [EcdhInitResponse](docs/EcdhInitResponse.md)
 - [ForgotPasswordRequest](docs/ForgotPasswordRequest.md)
 - [InitializePaymentRequest](docs/InitializePaymentRequest.md)
 - [InitializePaymentResponse](docs/InitializePaymentResponse.md)
 - [InviteDto](docs/InviteDto.md)
 - [InviteRequest](docs/InviteRequest.md)
 - [JwtAuthenticationResponse](docs/JwtAuthenticationResponse.md)
 - [Link](docs/Link.md)
 - [LoginRequest](docs/LoginRequest.md)
 - [MetricBigDecimal](docs/MetricBigDecimal.md)
 - [MetricLong](docs/MetricLong.md)
 - [Page](docs/Page.md)
 - [PageAuditLogDto](docs/PageAuditLogDto.md)
 - [PageClaimAttemptDto](docs/PageClaimAttemptDto.md)
 - [PageQuidDto](docs/PageQuidDto.md)
 - [PageTransactionDto](docs/PageTransactionDto.md)
 - [PageWinnerDto](docs/PageWinnerDto.md)
 - [PageWithdrawalRequestDto](docs/PageWithdrawalRequestDto.md)
 - [Pageable](docs/Pageable.md)
 - [PageableObject](docs/PageableObject.md)
 - [Quid](docs/Quid.md)
 - [QuidClaimResponse](docs/QuidClaimResponse.md)
 - [QuidDetailDto](docs/QuidDetailDto.md)
 - [QuidDto](docs/QuidDto.md)
 - [QuidStatusDto](docs/QuidStatusDto.md)
 - [QuidStatusUpdateRequest](docs/QuidStatusUpdateRequest.md)
 - [QuiikaErrorResponse](docs/QuiikaErrorResponse.md)
 - [QuiikaResponse](docs/QuiikaResponse.md)
 - [RegisterRequest](docs/RegisterRequest.md)
 - [RejectWithdrawalRequestDto](docs/RejectWithdrawalRequestDto.md)
 - [ResetPasswordRequest](docs/ResetPasswordRequest.md)
 - [ResolveBank](docs/ResolveBank.md)
 - [Rule](docs/Rule.md)
 - [RuleDTO](docs/RuleDTO.md)
 - [RuleDto](docs/RuleDto.md)
 - [SessionCountResponse](docs/SessionCountResponse.md)
 - [SortObject](docs/SortObject.md)
 - [Split](docs/Split.md)
 - [SplitDTO](docs/SplitDTO.md)
 - [TimeSeriesDataDto](docs/TimeSeriesDataDto.md)
 - [TimeSeriesDataPoint](docs/TimeSeriesDataPoint.md)
 - [Transaction](docs/Transaction.md)
 - [TransactionDetailDto](docs/TransactionDetailDto.md)
 - [TransactionDto](docs/TransactionDto.md)
 - [UserDto](docs/UserDto.md)
 - [UserRoleUpdateDto](docs/UserRoleUpdateDto.md)
 - [UserSessionDetails](docs/UserSessionDetails.md)
 - [UserStatusUpdateDto](docs/UserStatusUpdateDto.md)
 - [WinnerDto](docs/WinnerDto.md)
 - [WithdrawalRequest](docs/WithdrawalRequest.md)
 - [WithdrawalRequestDetailDto](docs/WithdrawalRequestDetailDto.md)
 - [WithdrawalRequestDto](docs/WithdrawalRequestDto.md)
 - [WithdrawalUpdateDto](docs/WithdrawalUpdateDto.md)


<a id="documentation-for-authorization"></a>
## Documentation For Authorization


Authentication schemes defined for the API:
<a id="bearerAuth"></a>
### bearerAuth

- **Type**: Bearer authentication (JWT)

<a id="apiKey"></a>
### apiKey

- **Type**: API key
- **API key parameter name**: X-API-Key
- **Location**: HTTP header

