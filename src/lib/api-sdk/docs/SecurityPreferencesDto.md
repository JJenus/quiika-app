# SecurityPreferencesDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**sessionTimeout** | **number** |  | [optional] [default to undefined]
**requireReauthForSensitiveActions** | **boolean** |  | [optional] [default to undefined]
**loginNotifications** | **boolean** |  | [optional] [default to undefined]

## Example

```typescript
import { SecurityPreferencesDto } from '@app/api-sdk';

const instance: SecurityPreferencesDto = {
    sessionTimeout,
    requireReauthForSensitiveActions,
    loginNotifications,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
