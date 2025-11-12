# WithdrawalRequestsApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**fetchAllRequest**](#fetchallrequest) | **GET** /withdrawal-request | Get all withdrawal requests|
|[**fetchRequest**](#fetchrequest) | **GET** /withdrawal-request/{quid} | Get a withdrawal request by Quid|
|[**initiateRequest**](#initiaterequest) | **POST** /withdrawal-request | Initiate a withdrawal request|
|[**initiateRequest1**](#initiaterequest1) | **PUT** /withdrawal-request | Update a withdrawal request|

# **fetchAllRequest**
> Array<WithdrawalRequest> fetchAllRequest()

Retrieves a list of all withdrawal requests.

### Example

```typescript
import {
    WithdrawalRequestsApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new WithdrawalRequestsApi(configuration);

const { status, data } = await apiInstance.fetchAllRequest();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<WithdrawalRequest>**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successfully retrieved all withdrawal requests |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **fetchRequest**
> WithdrawalRequest fetchRequest()

Retrieves a specific withdrawal request using its associated Quid.

### Example

```typescript
import {
    WithdrawalRequestsApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new WithdrawalRequestsApi(configuration);

let quid: string; //The Quid associated with the withdrawal request. (default to undefined)

const { status, data } = await apiInstance.fetchRequest(
    quid
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **quid** | [**string**] | The Quid associated with the withdrawal request. | defaults to undefined|


### Return type

**WithdrawalRequest**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Withdrawal request found |  -  |
|**404** | Withdrawal request not found for the given Quid |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **initiateRequest**
> QuiikaResponse initiateRequest(withdrawalRequest)

Creates a new withdrawal request for a user.

### Example

```typescript
import {
    WithdrawalRequestsApi,
    Configuration,
    WithdrawalRequest
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new WithdrawalRequestsApi(configuration);

let withdrawalRequest: WithdrawalRequest; //

const { status, data } = await apiInstance.initiateRequest(
    withdrawalRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **withdrawalRequest** | **WithdrawalRequest**|  | |


### Return type

**QuiikaResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Withdrawal request initiated successfully |  -  |
|**400** | Invalid withdrawal request data |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **initiateRequest1**
> initiateRequest1(withdrawalUpdateDto)

Updates an existing withdrawal request.

### Example

```typescript
import {
    WithdrawalRequestsApi,
    Configuration,
    WithdrawalUpdateDto
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new WithdrawalRequestsApi(configuration);

let withdrawalUpdateDto: WithdrawalUpdateDto; //

const { status, data } = await apiInstance.initiateRequest1(
    withdrawalUpdateDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **withdrawalUpdateDto** | **WithdrawalUpdateDto**|  | |


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
|**200** | Withdrawal request updated successfully |  -  |
|**404** | Withdrawal request not found |  -  |
|**400** | Invalid update data |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

