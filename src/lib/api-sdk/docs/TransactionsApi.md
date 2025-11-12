# TransactionsApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**banks**](#banks) | **GET** /transactions/banks | Get list of banks|
|[**findAll**](#findall) | **GET** /transactions | Find all transactions|
|[**findTransaction**](#findtransaction) | **GET** /transactions/{transactionId} | Find transaction by ID|
|[**findTransactionByRef**](#findtransactionbyref) | **GET** /transactions/reference/{ref} | Find transaction by reference|
|[**initTransaction**](#inittransaction) | **POST** /transactions | Initialize a transaction|
|[**resolveBank**](#resolvebank) | **POST** /transactions/banks/resolve-name | Resolve bank account name|
|[**verifyQuidTransaction**](#verifyquidtransaction) | **GET** /transactions/quid/{quid}/verify | Verify a Quid transaction|
|[**verifyTransaction**](#verifytransaction) | **GET** /transactions/verify/{quid} | Find transaction by Quid|
|[**withdraw**](#withdraw) | **GET** /transactions/withdraw/{quid} | Withdraw from a Quid|

# **banks**
> BankDto<any> banks()

Retrieves a list of supported banks for payments.

### Example

```typescript
import {
    TransactionsApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new TransactionsApi(configuration);

const { status, data } = await apiInstance.banks();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**BankDto<any>**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of supported banks |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **findAll**
> TransactionDto<any> findAll()

Retrieves a list of all transactions.

### Example

```typescript
import {
    TransactionsApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new TransactionsApi(configuration);

const { status, data } = await apiInstance.findAll();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**TransactionDto<any>**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of transactions |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **findTransaction**
> TransactionDto findTransaction()

Retrieves transaction details using its ID.

### Example

```typescript
import {
    TransactionsApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new TransactionsApi(configuration);

let transactionId: string; //Unique transaction ID (default to undefined)

const { status, data } = await apiInstance.findTransaction(
    transactionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **transactionId** | [**string**] | Unique transaction ID | defaults to undefined|


### Return type

**TransactionDto**

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

# **findTransactionByRef**
> TransactionDto findTransactionByRef()

Retrieves transaction details using its reference.

### Example

```typescript
import {
    TransactionsApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new TransactionsApi(configuration);

let ref: string; //Payment reference (default to undefined)

const { status, data } = await apiInstance.findTransactionByRef(
    ref
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ref** | [**string**] | Payment reference | defaults to undefined|


### Return type

**TransactionDto**

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

# **initTransaction**
> TransactionDto initTransaction(transactionDto)

Creates and initializes a new transaction.

### Example

```typescript
import {
    TransactionsApi,
    Configuration,
    TransactionDto
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new TransactionsApi(configuration);

let transactionDto: TransactionDto; //

const { status, data } = await apiInstance.initTransaction(
    transactionDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **transactionDto** | **TransactionDto**|  | |


### Return type

**TransactionDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Transaction initialized successfully |  -  |
|**400** | Invalid request payload |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **resolveBank**
> ResolveBank resolveBank(resolveBank)

Verifies bank account details and returns the account holder\'s name.

### Example

```typescript
import {
    TransactionsApi,
    Configuration,
    ResolveBank
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new TransactionsApi(configuration);

let resolveBank: ResolveBank; //

const { status, data } = await apiInstance.resolveBank(
    resolveBank
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **resolveBank** | **ResolveBank**|  | |


### Return type

**ResolveBank**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Account name resolved successfully |  -  |
|**400** | Invalid bank details |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **verifyQuidTransaction**
> QuidClaimResponse verifyQuidTransaction()

Verifies the transaction associated with a Quid.

### Example

```typescript
import {
    TransactionsApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new TransactionsApi(configuration);

let quid: string; //Quid identifier (default to undefined)

const { status, data } = await apiInstance.verifyQuidTransaction(
    quid
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **quid** | [**string**] | Quid identifier | defaults to undefined|


### Return type

**QuidClaimResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Quid transaction verified |  -  |
|**404** | Quid or transaction not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **verifyTransaction**
> TransactionDto verifyTransaction()

Retrieves transaction details using a Quid.

### Example

```typescript
import {
    TransactionsApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new TransactionsApi(configuration);

let quid: string; //Quid identifier (default to undefined)

const { status, data } = await apiInstance.verifyTransaction(
    quid
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **quid** | [**string**] | Quid identifier | defaults to undefined|


### Return type

**TransactionDto**

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

# **withdraw**
> withdraw()

Initiates a withdrawal process for a given Quid.

### Example

```typescript
import {
    TransactionsApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new TransactionsApi(configuration);

let quid: string; //Quid identifier (default to undefined)

const { status, data } = await apiInstance.withdraw(
    quid
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **quid** | [**string**] | Quid identifier | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Withdrawal request accepted |  -  |
|**400** | Invalid or missing Quid |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

