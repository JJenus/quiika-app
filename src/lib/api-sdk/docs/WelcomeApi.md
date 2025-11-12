# WelcomeApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**welcome**](#welcome) | **GET** / | Show welcome page|

# **welcome**
> string welcome()

Displays a simple HTML welcome page with application info.

### Example

```typescript
import {
    WelcomeApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new WelcomeApi(configuration);

const { status, data } = await apiInstance.welcome();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**string**

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

