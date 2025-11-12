# QuidApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getQuid**](#getquid) | **GET** /quid/{quid} | Get Quid details|
|[**setQuidActive**](#setquidactive) | **PUT** /quid/{quid}/status/activate | Activate a Quid|
|[**updateQuidStatus**](#updatequidstatus) | **PUT** /quid/{quid}/status | Update Quid status|

# **getQuid**
> Quid getQuid()

Retrieves the details of a specific Quid.

### Example

```typescript
import {
    QuidApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new QuidApi(configuration);

let quid: string; //The code of the Quid to retrieve. (default to undefined)

const { status, data } = await apiInstance.getQuid(
    quid
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **quid** | [**string**] | The code of the Quid to retrieve. | defaults to undefined|


### Return type

**Quid**

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

# **setQuidActive**
> QuiikaResponse setQuidActive()

Sets a Quid\'s status to active. Requires ADMIN role.

### Example

```typescript
import {
    QuidApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new QuidApi(configuration);

let quid: string; //The code of the Quid to activate. (default to undefined)

const { status, data } = await apiInstance.setQuidActive(
    quid
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **quid** | [**string**] | The code of the Quid to activate. | defaults to undefined|


### Return type

**QuiikaResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Quid activated successfully |  -  |
|**404** | Quid not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateQuidStatus**
> QuiikaResponse updateQuidStatus(quidStatusDto)

Updates the status of a specific Quid.

### Example

```typescript
import {
    QuidApi,
    Configuration,
    QuidStatusDto
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new QuidApi(configuration);

let quid: string; //The code of the Quid to update. (default to undefined)
let quidStatusDto: QuidStatusDto; //

const { status, data } = await apiInstance.updateQuidStatus(
    quid,
    quidStatusDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **quidStatusDto** | **QuidStatusDto**|  | |
| **quid** | [**string**] | The code of the Quid to update. | defaults to undefined|


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
|**200** | Quid status updated successfully |  -  |
|**404** | Quid not found |  -  |
|**400** | Invalid status value |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

