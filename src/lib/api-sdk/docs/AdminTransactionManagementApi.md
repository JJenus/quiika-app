# AdminTransactionManagementApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getTransaction**](#gettransaction) | **GET** /admin/transactions/{transactionId} | Find transaction by ID|
|[**getTransactions**](#gettransactions) | **GET** /admin/transactions | Get all transactions|
|[**refundTransaction**](#refundtransaction) | **POST** /admin/transactions/{transactionId}/refund | Refund a transaction|

# **getTransaction**
> TransactionDetailDto getTransaction()

Retrieves transaction details using its ID.

### Example

```typescript
import {
    AdminTransactionManagementApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminTransactionManagementApi(configuration);

let transactionId: string; //The ID of the transaction to retrieve. (default to undefined)

const { status, data } = await apiInstance.getTransaction(
    transactionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **transactionId** | [**string**] | The ID of the transaction to retrieve. | defaults to undefined|


### Return type

**TransactionDetailDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Transaction found |  -  |
|**404** | Transaction not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getTransactions**
> PageTransactionDto getTransactions()

Retrieves a paginated list of all transactions, with optional filters.

### Example

```typescript
import {
    AdminTransactionManagementApi,
    Configuration,
    Pageable
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminTransactionManagementApi(configuration);

let pageable: Pageable; // (default to undefined)
let status: 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'COMPLETED' | 'FAILED' | 'REFUNDED' | 'APPROVED' | 'REJECTED' | 'UNKNOWN_STATUS'; //Filter by transaction status (optional) (default to undefined)
let paymentProvider: string; //Filter by payment provider (optional) (default to undefined)
let currency: string; //Filter by currency code (optional) (default to undefined)
let search: string; //Search term to filter transactions (optional) (default to undefined)

const { status, data } = await apiInstance.getTransactions(
    pageable,
    status,
    paymentProvider,
    currency,
    search
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **pageable** | **Pageable** |  | defaults to undefined|
| **status** | [**&#39;PENDING&#39; | &#39;PROCESSING&#39; | &#39;SUCCESS&#39; | &#39;COMPLETED&#39; | &#39;FAILED&#39; | &#39;REFUNDED&#39; | &#39;APPROVED&#39; | &#39;REJECTED&#39; | &#39;UNKNOWN_STATUS&#39;**]**Array<&#39;PENDING&#39; &#124; &#39;PROCESSING&#39; &#124; &#39;SUCCESS&#39; &#124; &#39;COMPLETED&#39; &#124; &#39;FAILED&#39; &#124; &#39;REFUNDED&#39; &#124; &#39;APPROVED&#39; &#124; &#39;REJECTED&#39; &#124; &#39;UNKNOWN_STATUS&#39;>** | Filter by transaction status | (optional) defaults to undefined|
| **paymentProvider** | [**string**] | Filter by payment provider | (optional) defaults to undefined|
| **currency** | [**string**] | Filter by currency code | (optional) defaults to undefined|
| **search** | [**string**] | Search term to filter transactions | (optional) defaults to undefined|


### Return type

**PageTransactionDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successfully retrieved transactions |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **refundTransaction**
> TransactionDetailDto refundTransaction()

Refunds a transaction by its ID. Only accessible by admins.

### Example

```typescript
import {
    AdminTransactionManagementApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminTransactionManagementApi(configuration);

let transactionId: string; //The ID of the transaction to refund. (default to undefined)

const { status, data } = await apiInstance.refundTransaction(
    transactionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **transactionId** | [**string**] | The ID of the transaction to refund. | defaults to undefined|


### Return type

**TransactionDetailDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Transaction refunded successfully |  -  |
|**404** | Transaction not found |  -  |
|**400** | Transaction cannot be refunded |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

