# PaymentsApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getBanks**](#getbanks) | **GET** /api/payments/banks | Get list of supported banks|
|[**initializePayment**](#initializepayment) | **POST** /api/payments/initialize | Initialize a payment|

# **getBanks**
> Array<BankDto> getBanks()

Retrieves a list of all supported banks for payments.

### Example

```typescript
import {
    PaymentsApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new PaymentsApi(configuration);

const { status, data } = await apiInstance.getBanks();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<BankDto>**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successfully retrieved list of banks |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **initializePayment**
> InitializePaymentResponse initializePayment(initializePaymentRequest)

Initializes a new payment transaction with the specified provider or the default provider if none is specified.

### Example

```typescript
import {
    PaymentsApi,
    Configuration,
    InitializePaymentRequest
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new PaymentsApi(configuration);

let initializePaymentRequest: InitializePaymentRequest; //
let provider: string; //The name of the payment provider to use (optional) (default to undefined)

const { status, data } = await apiInstance.initializePayment(
    initializePaymentRequest,
    provider
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **initializePaymentRequest** | **InitializePaymentRequest**|  | |
| **provider** | [**string**] | The name of the payment provider to use | (optional) defaults to undefined|


### Return type

**InitializePaymentResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Payment initialized successfully |  -  |
|**400** | Bad request, e.g., invalid payload |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

