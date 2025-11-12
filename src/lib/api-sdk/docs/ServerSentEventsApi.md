# ServerSentEventsApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**connect**](#connect) | **GET** /sse/connect/{sessionId} | Subscribe to an event stream|
|[**disconnect**](#disconnect) | **DELETE** /sse/disconnect/{sessionId} | Disconnect SSE connection|
|[**sendMessageToUser**](#sendmessagetouser) | **GET** /sse/send | Send a message to a user (For internal testing)|

# **connect**
> connect()

Establishes a Server-Sent Events (SSE) connection for a given session ID to receive real-time updates.

### Example

```typescript
import {
    ServerSentEventsApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new ServerSentEventsApi(configuration);

let sessionId: string; //The session ID to connect with (default to undefined)

const { status, data } = await apiInstance.connect(
    sessionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sessionId** | [**string**] | The session ID to connect with | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/event-stream, application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | SSE connection established successfully. The response body will be a stream of events. |  -  |
|**401** | Unauthorized if the session is invalid or not authenticated |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **disconnect**
> disconnect()

Removes the Server-Sent Events (SSE) connection for the given session ID and cleans up resources.

### Example

```typescript
import {
    ServerSentEventsApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new ServerSentEventsApi(configuration);

let sessionId: string; //The session ID to disconnect (default to undefined)

const { status, data } = await apiInstance.disconnect(
    sessionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sessionId** | [**string**] | The session ID to disconnect | defaults to undefined|


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
|**200** | SSE connection disconnected successfully |  -  |
|**401** | Unauthorized if the session is invalid or not authenticated |  -  |
|**404** | Session not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **sendMessageToUser**
> QuiikaResponse sendMessageToUser()

Sends a message to a specific user via SSE. This endpoint is intended for internal testing and debugging purposes.

### Example

```typescript
import {
    ServerSentEventsApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new ServerSentEventsApi(configuration);

let userId: string; //The ID of the user to send the message to (default to undefined)
let message: string; //The message content (default to undefined)

const { status, data } = await apiInstance.sendMessageToUser(
    userId,
    message
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] | The ID of the user to send the message to | defaults to undefined|
| **message** | [**string**] | The message content | defaults to undefined|


### Return type

**QuiikaResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Message sent successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

