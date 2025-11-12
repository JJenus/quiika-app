# AdminLoggingApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**downloadApplicationLog**](#downloadapplicationlog) | **GET** /admin/logs/application | Download application log|
|[**getAuditLogs**](#getauditlogs) | **GET** /admin/logs/audit | Get audit logs|

# **downloadApplicationLog**
> File downloadApplicationLog()

Downloads the application log file. Only accessible by admins.

### Example

```typescript
import {
    AdminLoggingApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminLoggingApi(configuration);

const { status, data } = await apiInstance.downloadApplicationLog();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**File**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Log file downloaded successfully |  -  |
|**404** | Log file not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAuditLogs**
> PageAuditLogDto getAuditLogs()

Retrieves a paginated list of audit logs with optional filters.

### Example

```typescript
import {
    AdminLoggingApi,
    Configuration,
    Pageable
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminLoggingApi(configuration);

let pageable: Pageable; // (default to undefined)
let adminUserId: number; //Filter by admin user ID (optional) (default to undefined)
let actionType: 'USER_STATUS_UPDATE' | 'USER_ROLE_UPDATE' | 'QUID_CREATE' | 'QUID_STATUS_UPDATE' | 'TRANSACTION_REFUND' | 'WITHDRAWAL_APPROVE' | 'WITHDRAWAL_REJECT' | 'INVITE_CREATE' | 'INVITE_RESEND' | 'INVITE_DELETE'; //Filter by action type (optional) (default to undefined)
let startDate: string; //Filter by start date and time (optional) (default to undefined)
let endDate: string; //Filter by end date and time (optional) (default to undefined)
let targetEntityId: string; //Filter by target entity ID (optional) (default to undefined)

const { status, data } = await apiInstance.getAuditLogs(
    pageable,
    adminUserId,
    actionType,
    startDate,
    endDate,
    targetEntityId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **pageable** | **Pageable** |  | defaults to undefined|
| **adminUserId** | [**number**] | Filter by admin user ID | (optional) defaults to undefined|
| **actionType** | [**&#39;USER_STATUS_UPDATE&#39; | &#39;USER_ROLE_UPDATE&#39; | &#39;QUID_CREATE&#39; | &#39;QUID_STATUS_UPDATE&#39; | &#39;TRANSACTION_REFUND&#39; | &#39;WITHDRAWAL_APPROVE&#39; | &#39;WITHDRAWAL_REJECT&#39; | &#39;INVITE_CREATE&#39; | &#39;INVITE_RESEND&#39; | &#39;INVITE_DELETE&#39;**]**Array<&#39;USER_STATUS_UPDATE&#39; &#124; &#39;USER_ROLE_UPDATE&#39; &#124; &#39;QUID_CREATE&#39; &#124; &#39;QUID_STATUS_UPDATE&#39; &#124; &#39;TRANSACTION_REFUND&#39; &#124; &#39;WITHDRAWAL_APPROVE&#39; &#124; &#39;WITHDRAWAL_REJECT&#39; &#124; &#39;INVITE_CREATE&#39; &#124; &#39;INVITE_RESEND&#39; &#124; &#39;INVITE_DELETE&#39;>** | Filter by action type | (optional) defaults to undefined|
| **startDate** | [**string**] | Filter by start date and time | (optional) defaults to undefined|
| **endDate** | [**string**] | Filter by end date and time | (optional) defaults to undefined|
| **targetEntityId** | [**string**] | Filter by target entity ID | (optional) defaults to undefined|


### Return type

**PageAuditLogDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successfully retrieved audit logs |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

