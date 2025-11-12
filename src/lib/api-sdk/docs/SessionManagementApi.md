# SessionManagementApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getActiveSessions**](#getactivesessions) | **GET** /auth/sessions/active | Get active sessions for current user|
|[**getSessionCount**](#getsessioncount) | **GET** /auth/sessions/count | Get active session count for current user|
|[**getUserSessions**](#getusersessions) | **GET** /auth/sessions | Get all active sessions for current user|
|[**revokeAllSessions**](#revokeallsessions) | **DELETE** /auth/sessions/all | Revoke all sessions for current user|
|[**revokeOtherSessions**](#revokeothersessions) | **DELETE** /auth/sessions | Revoke all other sessions except current one|
|[**revokeSession**](#revokesession) | **DELETE** /auth/sessions/{sessionId} | Revoke a specific session|

# **getActiveSessions**
> Array<UserSessionDetails> getActiveSessions()


### Example

```typescript
import {
    SessionManagementApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new SessionManagementApi(configuration);

const { status, data } = await apiInstance.getActiveSessions();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<UserSessionDetails>**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successfully retrieved active sessions |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getSessionCount**
> SessionCountResponse getSessionCount()


### Example

```typescript
import {
    SessionManagementApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new SessionManagementApi(configuration);

const { status, data } = await apiInstance.getSessionCount();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**SessionCountResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successfully retrieved session count |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUserSessions**
> Array<UserSessionDetails> getUserSessions()


### Example

```typescript
import {
    SessionManagementApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new SessionManagementApi(configuration);

const { status, data } = await apiInstance.getUserSessions();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<UserSessionDetails>**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successfully retrieved sessions |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **revokeAllSessions**
> revokeAllSessions()


### Example

```typescript
import {
    SessionManagementApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new SessionManagementApi(configuration);

const { status, data } = await apiInstance.revokeAllSessions();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | All sessions revoked successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **revokeOtherSessions**
> revokeOtherSessions()


### Example

```typescript
import {
    SessionManagementApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new SessionManagementApi(configuration);

let authorization: string; //The Authorization header containing the current session\'s JWT. (default to undefined)

const { status, data } = await apiInstance.revokeOtherSessions(
    authorization
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **authorization** | [**string**] | The Authorization header containing the current session\&#39;s JWT. | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Other sessions revoked successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **revokeSession**
> revokeSession()


### Example

```typescript
import {
    SessionManagementApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new SessionManagementApi(configuration);

let sessionId: string; //The ID of the session to revoke. (default to undefined)

const { status, data } = await apiInstance.revokeSession(
    sessionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sessionId** | [**string**] | The ID of the session to revoke. | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Session revoked successfully |  -  |
|**404** | Session not found or does not belong to the user |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

