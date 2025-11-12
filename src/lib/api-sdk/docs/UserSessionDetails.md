# UserSessionDetails


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**sessionId** | **string** |  | [optional] [default to undefined]
**ipAddress** | **string** |  | [optional] [default to undefined]
**userAgent** | **string** |  | [optional] [default to undefined]
**loginTime** | **number** |  | [optional] [default to undefined]
**lastAccessed** | **number** |  | [optional] [default to undefined]
**email** | **string** |  | [optional] [default to undefined]
**location** | **string** |  | [optional] [default to undefined]
**deviceType** | **string** |  | [optional] [default to undefined]
**sessionDuration** | **number** |  | [optional] [default to undefined]
**inactivityDuration** | **number** |  | [optional] [default to undefined]

## Example

```typescript
import { UserSessionDetails } from '@app/api-sdk';

const instance: UserSessionDetails = {
    sessionId,
    ipAddress,
    userAgent,
    loginTime,
    lastAccessed,
    email,
    location,
    deviceType,
    sessionDuration,
    inactivityDuration,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
