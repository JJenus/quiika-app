# AdminDashboardApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getDashboardMetrics**](#getdashboardmetrics) | **GET** /admin/dashboard/metrics | Get dashboard metrics|
|[**getDashboardTimeSeries**](#getdashboardtimeseries) | **GET** /admin/dashboard/timeseries | Get dashboard time series data|

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

