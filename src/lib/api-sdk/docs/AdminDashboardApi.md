# AdminDashboardApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getDashboardMetrics**](#getdashboardmetrics) | **GET** /admin/dashboard/metrics | Get dashboard metrics|
|[**getDashboardTimeSeries**](#getdashboardtimeseries) | **GET** /admin/dashboard/timeseries | Get dashboard time series data|
|[**getQuidDashboardMetrics**](#getquiddashboardmetrics) | **GET** /admin/dashboard/quids/metrics | Get Quid dashboard metrics|
|[**getTransactionDashboardMetrics**](#gettransactiondashboardmetrics) | **GET** /admin/dashboard/transactions/metrics | Get Transaction dashboard metrics|
|[**getWithdrawalDashboardMetrics**](#getwithdrawaldashboardmetrics) | **GET** /admin/dashboard/withdrawals/metrics | Get Withdrawal dashboard metrics|

# **getDashboardMetrics**
> DashboardMetricsDto getDashboardMetrics()

Provides key metrics for the dashboard over a specified period.

### Example

```typescript
import {
    AdminDashboardApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminDashboardApi(configuration);

let period: 'WEEKLY' | 'MONTHLY' | 'YEARLY'; //The period for which to retrieve metrics (WEEKLY, MONTHLY, YEARLY) (default to undefined)

const { status, data } = await apiInstance.getDashboardMetrics(
    period
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **period** | [**&#39;WEEKLY&#39; | &#39;MONTHLY&#39; | &#39;YEARLY&#39;**]**Array<&#39;WEEKLY&#39; &#124; &#39;MONTHLY&#39; &#124; &#39;YEARLY&#39;>** | The period for which to retrieve metrics (WEEKLY, MONTHLY, YEARLY) | defaults to undefined|


### Return type

**DashboardMetricsDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Metrics retrieved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getDashboardTimeSeries**
> TimeSeriesDataDto getDashboardTimeSeries()

Provides time series data for key metrics over a specified period.

### Example

```typescript
import {
    AdminDashboardApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminDashboardApi(configuration);

let period: 'WEEKLY' | 'MONTHLY' | 'YEARLY'; //The period for which to retrieve time series data (WEEKLY, MONTHLY, YEARLY) (default to undefined)

const { status, data } = await apiInstance.getDashboardTimeSeries(
    period
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **period** | [**&#39;WEEKLY&#39; | &#39;MONTHLY&#39; | &#39;YEARLY&#39;**]**Array<&#39;WEEKLY&#39; &#124; &#39;MONTHLY&#39; &#124; &#39;YEARLY&#39;>** | The period for which to retrieve time series data (WEEKLY, MONTHLY, YEARLY) | defaults to undefined|


### Return type

**TimeSeriesDataDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Time series data retrieved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getQuidDashboardMetrics**
> QuidDashboardMetricsDto getQuidDashboardMetrics()

Provides key metrics for Quids over a specified period.

### Example

```typescript
import {
    AdminDashboardApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminDashboardApi(configuration);

let period: 'WEEKLY' | 'MONTHLY' | 'YEARLY'; //The period for which to retrieve metrics (WEEKLY, MONTHLY, YEARLY) (default to undefined)

const { status, data } = await apiInstance.getQuidDashboardMetrics(
    period
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **period** | [**&#39;WEEKLY&#39; | &#39;MONTHLY&#39; | &#39;YEARLY&#39;**]**Array<&#39;WEEKLY&#39; &#124; &#39;MONTHLY&#39; &#124; &#39;YEARLY&#39;>** | The period for which to retrieve metrics (WEEKLY, MONTHLY, YEARLY) | defaults to undefined|


### Return type

**QuidDashboardMetricsDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Metrics retrieved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getTransactionDashboardMetrics**
> TransactionDashboardMetricsDto getTransactionDashboardMetrics()

Provides key metrics for Transactions over a specified period.

### Example

```typescript
import {
    AdminDashboardApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminDashboardApi(configuration);

let period: 'WEEKLY' | 'MONTHLY' | 'YEARLY'; //The period for which to retrieve metrics (WEEKLY, MONTHLY, YEARLY) (default to undefined)

const { status, data } = await apiInstance.getTransactionDashboardMetrics(
    period
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **period** | [**&#39;WEEKLY&#39; | &#39;MONTHLY&#39; | &#39;YEARLY&#39;**]**Array<&#39;WEEKLY&#39; &#124; &#39;MONTHLY&#39; &#124; &#39;YEARLY&#39;>** | The period for which to retrieve metrics (WEEKLY, MONTHLY, YEARLY) | defaults to undefined|


### Return type

**TransactionDashboardMetricsDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Metrics retrieved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getWithdrawalDashboardMetrics**
> WithdrawalDashboardMetricsDto getWithdrawalDashboardMetrics()

Provides key metrics for Withdrawals over a specified period.

### Example

```typescript
import {
    AdminDashboardApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminDashboardApi(configuration);

let period: 'WEEKLY' | 'MONTHLY' | 'YEARLY'; //The period for which to retrieve metrics (WEEKLY, MONTHLY, YEARLY) (default to undefined)

const { status, data } = await apiInstance.getWithdrawalDashboardMetrics(
    period
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **period** | [**&#39;WEEKLY&#39; | &#39;MONTHLY&#39; | &#39;YEARLY&#39;**]**Array<&#39;WEEKLY&#39; &#124; &#39;MONTHLY&#39; &#124; &#39;YEARLY&#39;>** | The period for which to retrieve metrics (WEEKLY, MONTHLY, YEARLY) | defaults to undefined|


### Return type

**WithdrawalDashboardMetricsDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Metrics retrieved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

