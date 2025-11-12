# ActuatorApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**health**](#health) | **GET** /actuator/health | Actuator web endpoint \&#39;health\&#39;|
|[**links**](#links) | **GET** /actuator | Actuator root web endpoint|
|[**listNames**](#listnames) | **GET** /actuator/metrics | Actuator web endpoint \&#39;metrics\&#39;|
|[**metric**](#metric) | **GET** /actuator/metrics/{requiredMetricName} | Actuator web endpoint \&#39;metrics-requiredMetricName\&#39;|
|[**scrape**](#scrape) | **GET** /actuator/prometheus | Actuator web endpoint \&#39;prometheus\&#39;|

# **health**
> object health()


### Example

```typescript
import {
    ActuatorApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new ActuatorApi(configuration);

const { status, data } = await apiInstance.health();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**object**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/vnd.spring-boot.actuator.v3+json, application/vnd.spring-boot.actuator.v2+json, application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **links**
> { [key: string]: { [key: string]: Link; }; } links()


### Example

```typescript
import {
    ActuatorApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new ActuatorApi(configuration);

const { status, data } = await apiInstance.links();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**{ [key: string]: { [key: string]: Link; }; }**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/vnd.spring-boot.actuator.v3+json, application/vnd.spring-boot.actuator.v2+json, application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listNames**
> object listNames()


### Example

```typescript
import {
    ActuatorApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new ActuatorApi(configuration);

const { status, data } = await apiInstance.listNames();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**object**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/vnd.spring-boot.actuator.v3+json, application/vnd.spring-boot.actuator.v2+json, application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **metric**
> object metric()


### Example

```typescript
import {
    ActuatorApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new ActuatorApi(configuration);

let requiredMetricName: string; // (default to undefined)
let tag: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.metric(
    requiredMetricName,
    tag
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **requiredMetricName** | [**string**] |  | defaults to undefined|
| **tag** | [**string**] |  | (optional) defaults to undefined|


### Return type

**object**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/vnd.spring-boot.actuator.v3+json, application/vnd.spring-boot.actuator.v2+json, application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **scrape**
> object scrape()


### Example

```typescript
import {
    ActuatorApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new ActuatorApi(configuration);

let format: 'CONTENT_TYPE_004' | 'CONTENT_TYPE_OPENMETRICS_100' | 'CONTENT_TYPE_PROTOBUF'; // (optional) (default to undefined)
let includedNames: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.scrape(
    format,
    includedNames
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **format** | [**&#39;CONTENT_TYPE_004&#39; | &#39;CONTENT_TYPE_OPENMETRICS_100&#39; | &#39;CONTENT_TYPE_PROTOBUF&#39;**]**Array<&#39;CONTENT_TYPE_004&#39; &#124; &#39;CONTENT_TYPE_OPENMETRICS_100&#39; &#124; &#39;CONTENT_TYPE_PROTOBUF&#39;>** |  | (optional) defaults to undefined|
| **includedNames** | [**string**] |  | (optional) defaults to undefined|


### Return type

**object**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain;version=0.0.4;charset=utf-8, application/openmetrics-text;version=1.0.0;charset=utf-8, application/vnd.google.protobuf;proto=io.prometheus.client.MetricFamily;encoding=delimited


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

