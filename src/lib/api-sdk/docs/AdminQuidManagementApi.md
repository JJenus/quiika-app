# AdminQuidManagementApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createQuid**](#createquid) | **POST** /admin/quids | Create a new Quid|
|[**getClaimAttemptsForQuid**](#getclaimattemptsforquid) | **GET** /admin/quids/{quidCode}/claims | Get claim attempts for a Quid|
|[**getQuid1**](#getquid1) | **GET** /admin/quids/{quidCode} | Find Quid by code|
|[**getQuids**](#getquids) | **GET** /admin/quids | Get all Quids|
|[**getWinnersForQuid**](#getwinnersforquid) | **GET** /admin/quids/{quidCode}/winners | Get winners for a Quid|
|[**updateQuidStatus1**](#updatequidstatus1) | **PUT** /admin/quids/{quidCode}/status | Update Quid status|

# **createQuid**
> QuidDto createQuid(createQuidRequest)

Creates a new Quid. Only accessible by admins.

### Example

```typescript
import {
    AdminQuidManagementApi,
    Configuration,
    CreateQuidRequest
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminQuidManagementApi(configuration);

let createQuidRequest: CreateQuidRequest; //

const { status, data } = await apiInstance.createQuid(
    createQuidRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createQuidRequest** | **CreateQuidRequest**|  | |


### Return type

**QuidDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Quid created successfully |  -  |
|**400** | Invalid request payload |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getClaimAttemptsForQuid**
> PageClaimAttemptDto getClaimAttemptsForQuid()

Retrieves a paginated list of claim attempts for a specific Quid.

### Example

```typescript
import {
    AdminQuidManagementApi,
    Configuration,
    Pageable
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminQuidManagementApi(configuration);

let quidCode: string; //The code of the Quid. (default to undefined)
let pageable: Pageable; // (default to undefined)

const { status, data } = await apiInstance.getClaimAttemptsForQuid(
    quidCode,
    pageable
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **quidCode** | [**string**] | The code of the Quid. | defaults to undefined|
| **pageable** | **Pageable** |  | defaults to undefined|


### Return type

**PageClaimAttemptDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successfully retrieved claim attempts |  -  |
|**404** | Quid not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getQuid1**
> QuidDetailDto getQuid1()

Retrieves Quid details using its code.

### Example

```typescript
import {
    AdminQuidManagementApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminQuidManagementApi(configuration);

let quidCode: string; //The code of the Quid to retrieve. (default to undefined)

const { status, data } = await apiInstance.getQuid1(
    quidCode
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **quidCode** | [**string**] | The code of the Quid to retrieve. | defaults to undefined|


### Return type

**QuidDetailDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Quid found |  -  |
|**404** | Quid not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getQuids**
> PageQuidDto getQuids()

Retrieves a paginated list of all Quids, with optional filters.

### Example

```typescript
import {
    AdminQuidManagementApi,
    Configuration,
    Pageable
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminQuidManagementApi(configuration);

let pageable: Pageable; // (default to undefined)
let quid: string; //Filter by Quid code (optional) (default to undefined)
let status: 'ACTIVE' | 'SPLIT' | 'CLAIMED' | 'BLOCKED' | 'EXPIRED' | 'CONFLICTED'; //Filter by Quid status (optional) (default to undefined)
let currency: string; //Filter by currency (optional) (default to undefined)

const { status, data } = await apiInstance.getQuids(
    pageable,
    quid,
    status,
    currency
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **pageable** | **Pageable** |  | defaults to undefined|
| **quid** | [**string**] | Filter by Quid code | (optional) defaults to undefined|
| **status** | [**&#39;ACTIVE&#39; | &#39;SPLIT&#39; | &#39;CLAIMED&#39; | &#39;BLOCKED&#39; | &#39;EXPIRED&#39; | &#39;CONFLICTED&#39;**]**Array<&#39;ACTIVE&#39; &#124; &#39;SPLIT&#39; &#124; &#39;CLAIMED&#39; &#124; &#39;BLOCKED&#39; &#124; &#39;EXPIRED&#39; &#124; &#39;CONFLICTED&#39;>** | Filter by Quid status | (optional) defaults to undefined|
| **currency** | [**string**] | Filter by currency | (optional) defaults to undefined|


### Return type

**PageQuidDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successfully retrieved Quids |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getWinnersForQuid**
> PageWinnerDto getWinnersForQuid()

Retrieves a paginated list of winners for a specific Quid.

### Example

```typescript
import {
    AdminQuidManagementApi,
    Configuration,
    Pageable
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminQuidManagementApi(configuration);

let quidCode: string; //The code of the Quid. (default to undefined)
let pageable: Pageable; // (default to undefined)

const { status, data } = await apiInstance.getWinnersForQuid(
    quidCode,
    pageable
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **quidCode** | [**string**] | The code of the Quid. | defaults to undefined|
| **pageable** | **Pageable** |  | defaults to undefined|


### Return type

**PageWinnerDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successfully retrieved winners |  -  |
|**404** | Quid not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateQuidStatus1**
> QuidDto updateQuidStatus1(quidStatusUpdateRequest)

Updates the status of an existing Quid.

### Example

```typescript
import {
    AdminQuidManagementApi,
    Configuration,
    QuidStatusUpdateRequest
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminQuidManagementApi(configuration);

let quidCode: string; //The code of the Quid to update. (default to undefined)
let quidStatusUpdateRequest: QuidStatusUpdateRequest; //

const { status, data } = await apiInstance.updateQuidStatus1(
    quidCode,
    quidStatusUpdateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **quidStatusUpdateRequest** | **QuidStatusUpdateRequest**|  | |
| **quidCode** | [**string**] | The code of the Quid to update. | defaults to undefined|


### Return type

**QuidDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Quid status updated successfully |  -  |
|**404** | Quid not found |  -  |
|**400** | Invalid request payload |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

