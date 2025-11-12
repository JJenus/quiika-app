# AdminWithdrawalManagementApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**approveWithdrawal**](#approvewithdrawal) | **POST** /admin/withdrawals/{withdrawalId}/approve | Approve a withdrawal request|
|[**getWithdrawal**](#getwithdrawal) | **GET** /admin/withdrawals/{withdrawalId} | Get withdrawal by ID|
|[**getWithdrawals**](#getwithdrawals) | **GET** /admin/withdrawals | Get all withdrawal requests|
|[**rejectWithdrawal**](#rejectwithdrawal) | **POST** /admin/withdrawals/{withdrawalId}/reject | Reject a withdrawal request|

# **approveWithdrawal**
> WithdrawalRequestDetailDto approveWithdrawal()

Approves a withdrawal request by its ID. Only accessible by admins.

### Example

```typescript
import {
    AdminWithdrawalManagementApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminWithdrawalManagementApi(configuration);

let withdrawalId: number; //The ID of the withdrawal request to approve. (default to undefined)

const { status, data } = await apiInstance.approveWithdrawal(
    withdrawalId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **withdrawalId** | [**number**] | The ID of the withdrawal request to approve. | defaults to undefined|


### Return type

**WithdrawalRequestDetailDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Withdrawal request approved successfully |  -  |
|**404** | Withdrawal request not found |  -  |
|**400** | Withdrawal request cannot be approved |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getWithdrawal**
> WithdrawalRequestDetailDto getWithdrawal()

Retrieves withdrawal request details using its ID.

### Example

```typescript
import {
    AdminWithdrawalManagementApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminWithdrawalManagementApi(configuration);

let withdrawalId: number; //The ID of the withdrawal request to retrieve. (default to undefined)

const { status, data } = await apiInstance.getWithdrawal(
    withdrawalId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **withdrawalId** | [**number**] | The ID of the withdrawal request to retrieve. | defaults to undefined|


### Return type

**WithdrawalRequestDetailDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Withdrawal request found |  -  |
|**404** | Withdrawal request not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getWithdrawals**
> PageWithdrawalRequestDto getWithdrawals()

Retrieves a paginated list of all withdrawal requests, with optional filters.

### Example

```typescript
import {
    AdminWithdrawalManagementApi,
    Configuration,
    Pageable
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminWithdrawalManagementApi(configuration);

let pageable: Pageable; // (default to undefined)
let status: 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'COMPLETED' | 'FAILED' | 'REFUNDED' | 'APPROVED' | 'REJECTED' | 'UNKNOWN_STATUS'; //Filter by withdrawal status (optional) (default to undefined)
let currency: 'GHS' | 'NGN' | 'ZAR' | 'KES'; //Filter by currency (optional) (default to undefined)
let search: string; //Search term to filter withdrawals (optional) (default to undefined)

const { status, data } = await apiInstance.getWithdrawals(
    pageable,
    status,
    currency,
    search
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **pageable** | **Pageable** |  | defaults to undefined|
| **status** | [**&#39;PENDING&#39; | &#39;PROCESSING&#39; | &#39;SUCCESS&#39; | &#39;COMPLETED&#39; | &#39;FAILED&#39; | &#39;REFUNDED&#39; | &#39;APPROVED&#39; | &#39;REJECTED&#39; | &#39;UNKNOWN_STATUS&#39;**]**Array<&#39;PENDING&#39; &#124; &#39;PROCESSING&#39; &#124; &#39;SUCCESS&#39; &#124; &#39;COMPLETED&#39; &#124; &#39;FAILED&#39; &#124; &#39;REFUNDED&#39; &#124; &#39;APPROVED&#39; &#124; &#39;REJECTED&#39; &#124; &#39;UNKNOWN_STATUS&#39;>** | Filter by withdrawal status | (optional) defaults to undefined|
| **currency** | [**&#39;GHS&#39; | &#39;NGN&#39; | &#39;ZAR&#39; | &#39;KES&#39;**]**Array<&#39;GHS&#39; &#124; &#39;NGN&#39; &#124; &#39;ZAR&#39; &#124; &#39;KES&#39;>** | Filter by currency | (optional) defaults to undefined|
| **search** | [**string**] | Search term to filter withdrawals | (optional) defaults to undefined|


### Return type

**PageWithdrawalRequestDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successfully retrieved withdrawal requests |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rejectWithdrawal**
> WithdrawalRequestDetailDto rejectWithdrawal(rejectWithdrawalRequestDto)

Rejects a withdrawal request by its ID. Only accessible by admins.

### Example

```typescript
import {
    AdminWithdrawalManagementApi,
    Configuration,
    RejectWithdrawalRequestDto
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminWithdrawalManagementApi(configuration);

let withdrawalId: number; //The ID of the withdrawal request to reject. (default to undefined)
let rejectWithdrawalRequestDto: RejectWithdrawalRequestDto; //

const { status, data } = await apiInstance.rejectWithdrawal(
    withdrawalId,
    rejectWithdrawalRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **rejectWithdrawalRequestDto** | **RejectWithdrawalRequestDto**|  | |
| **withdrawalId** | [**number**] | The ID of the withdrawal request to reject. | defaults to undefined|


### Return type

**WithdrawalRequestDetailDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Withdrawal request rejected successfully |  -  |
|**404** | Withdrawal request not found |  -  |
|**400** | Withdrawal request cannot be rejected |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

