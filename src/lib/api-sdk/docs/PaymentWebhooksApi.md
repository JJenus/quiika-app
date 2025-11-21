# PaymentWebhooksApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**handleFlutterwaveWebhook**](#handleflutterwavewebhook) | **POST** /webhooks/flutterwave | Handles Flutterwave webhook events|
|[**handlePaystackWebhook**](#handlepaystackwebhook) | **POST** /webhooks/paystack | Handles Paystack webhook events|

# **handleFlutterwaveWebhook**
> handleFlutterwaveWebhook(body)

Receives and processes webhook notifications from Flutterwave to update payment statuses.

### Example

```typescript
import {
    PaymentWebhooksApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new PaymentWebhooksApi(configuration);

let verifHash: string; //Flutterwave signature header for webhook verification (default to undefined)
let body: object; //Raw JSON payload from Flutterwave. The structure depends on the event type.

const { status, data } = await apiInstance.handleFlutterwaveWebhook(
    verifHash,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **object**| Raw JSON payload from Flutterwave. The structure depends on the event type. | |
| **verifHash** | [**string**] | Flutterwave signature header for webhook verification | defaults to undefined|


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
|**200** | Webhook processed successfully |  -  |
|**400** | Invalid signature or malformed payload |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **handlePaystackWebhook**
> handlePaystackWebhook(body)

Receives and processes webhook notifications from Paystack to update payment statuses.

### Example

```typescript
import {
    PaymentWebhooksApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new PaymentWebhooksApi(configuration);

let xPaystackSignature: string; //Paystack signature header for webhook verification (default to undefined)
let body: object; //Raw JSON payload from Paystack. The structure depends on the event type.

const { status, data } = await apiInstance.handlePaystackWebhook(
    xPaystackSignature,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **object**| Raw JSON payload from Paystack. The structure depends on the event type. | |
| **xPaystackSignature** | [**string**] | Paystack signature header for webhook verification | defaults to undefined|


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
|**200** | Webhook processed successfully |  -  |
|**400** | Invalid signature or malformed payload |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

