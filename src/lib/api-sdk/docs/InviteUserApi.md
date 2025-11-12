# InviteUserApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createInvite**](#createinvite) | **POST** /admin/invites/ | |
|[**deleteInvite**](#deleteinvite) | **DELETE** /admin/invites/{id} | |
|[**getAllInvites**](#getallinvites) | **GET** /admin/invites/ | |
|[**resendInvite**](#resendinvite) | **POST** /admin/invites/{id} | |

# **createInvite**
> InviteDto createInvite(inviteRequest)


### Example

```typescript
import {
    InviteUserApi,
    Configuration,
    InviteRequest
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new InviteUserApi(configuration);

let inviteRequest: InviteRequest; //

const { status, data } = await apiInstance.createInvite(
    inviteRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **inviteRequest** | **InviteRequest**|  | |


### Return type

**InviteDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteInvite**
> deleteInvite()


### Example

```typescript
import {
    InviteUserApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new InviteUserApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.deleteInvite(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


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
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAllInvites**
> Array<InviteDto> getAllInvites()


### Example

```typescript
import {
    InviteUserApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new InviteUserApi(configuration);

const { status, data } = await apiInstance.getAllInvites();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<InviteDto>**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **resendInvite**
> resendInvite()


### Example

```typescript
import {
    InviteUserApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new InviteUserApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.resendInvite(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


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
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

