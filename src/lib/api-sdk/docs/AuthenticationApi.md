# AuthenticationApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**forgotPassword**](#forgotpassword) | **POST** /auth/forgot-password | Request a password reset|
|[**login**](#login) | **POST** /auth/login | Authenticate user|
|[**register**](#register) | **POST** /auth/register | Register a new user|
|[**resetPassword**](#resetpassword) | **POST** /auth/reset-password | Reset user password|
|[**validateInvite**](#validateinvite) | **GET** /auth/invites/validate/{token} | Validate an invite token|

# **forgotPassword**
> forgotPassword(forgotPasswordRequest)

Initiates the password reset process for a user\'s email address.

### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    ForgotPasswordRequest
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let forgotPasswordRequest: ForgotPasswordRequest; //

const { status, data } = await apiInstance.forgotPassword(
    forgotPasswordRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **forgotPasswordRequest** | **ForgotPasswordRequest**|  | |


### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Password reset email sent successfully |  -  |
|**404** | Email address not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **login**
> JwtAuthenticationResponse login(loginRequest)

Logs in a user and returns a JWT token.

### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    LoginRequest
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let loginRequest: LoginRequest; //

const { status, data } = await apiInstance.login(
    loginRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **loginRequest** | **LoginRequest**|  | |


### Return type

**JwtAuthenticationResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Login successful |  -  |
|**401** | Invalid credentials |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **register**
> JwtAuthenticationResponse register(registerRequest)

Registers a new user using an invite token and returns a JWT token.

### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    RegisterRequest
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let registerRequest: RegisterRequest; //

const { status, data } = await apiInstance.register(
    registerRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **registerRequest** | **RegisterRequest**|  | |


### Return type

**JwtAuthenticationResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Registration successful |  -  |
|**400** | Invalid registration details or invite token |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **resetPassword**
> resetPassword(resetPasswordRequest)

Resets the user\'s password using a valid reset token.

### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    ResetPasswordRequest
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let resetPasswordRequest: ResetPasswordRequest; //

const { status, data } = await apiInstance.resetPassword(
    resetPasswordRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **resetPasswordRequest** | **ResetPasswordRequest**|  | |


### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Password has been reset successfully |  -  |
|**400** | Invalid or expired reset token |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **validateInvite**
> validateInvite()

Checks if an invite token is valid.

### Example

```typescript
import {
    AuthenticationApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let token: string; //The invite token to validate. (default to undefined)

const { status, data } = await apiInstance.validateInvite(
    token
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **token** | [**string**] | The invite token to validate. | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Invite token is valid |  -  |
|**404** | Invite token not found or invalid |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

