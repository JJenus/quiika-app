# DynamicAPIKeyApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**completeKeyExchange**](#completekeyexchange) | **POST** /auth/key/complete | Complete key exchange|
|[**initKeyExchange**](#initkeyexchange) | **POST** /auth/key/init | Initialize key exchange|

# **completeKeyExchange**
> ApiKeyResponse completeKeyExchange(ecdhCompleteRequest)

Completes the ECDH key exchange and returns the shared secret (API key).

### Example

```typescript
import {
    DynamicAPIKeyApi,
    Configuration,
    EcdhCompleteRequest
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new DynamicAPIKeyApi(configuration);

let ecdhCompleteRequest: EcdhCompleteRequest; //

const { status, data } = await apiInstance.completeKeyExchange(
    ecdhCompleteRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ecdhCompleteRequest** | **EcdhCompleteRequest**|  | |


### Return type

**ApiKeyResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Key exchange completed successfully |  -  |
|**400** | Invalid client public key or session |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **initKeyExchange**
> EcdhInitResponse initKeyExchange()

Starts the ECDH key exchange process by generating a server key pair.

### Example

```typescript
import {
    DynamicAPIKeyApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new DynamicAPIKeyApi(configuration);

const { status, data } = await apiInstance.initKeyExchange();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**EcdhInitResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Key exchange initiated successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

