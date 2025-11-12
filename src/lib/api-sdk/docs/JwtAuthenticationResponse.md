# JwtAuthenticationResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**accessToken** | **string** |  | [optional] [default to undefined]
**refreshToken** | **string** |  | [optional] [default to undefined]
**sessionId** | **string** |  | [optional] [default to undefined]
**user** | [**UserDto**](UserDto.md) |  | [optional] [default to undefined]

## Example

```typescript
import { JwtAuthenticationResponse } from '@app/api-sdk';

const instance: JwtAuthenticationResponse = {
    accessToken,
    refreshToken,
    sessionId,
    user,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
