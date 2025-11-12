# UserDto

User details for admin operations

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** | Unique user ID | [optional] [default to undefined]
**email** | **string** | User email address | [optional] [default to undefined]
**firstName** | **string** | First name | [optional] [default to undefined]
**lastName** | **string** | Last name | [optional] [default to undefined]
**enabled** | **boolean** | Is account enabled? | [optional] [default to undefined]
**locked** | **boolean** | Is account locked? | [optional] [default to undefined]
**role** | **string** | User role | [optional] [default to undefined]
**createdAt** | **string** | Account creation timestamp | [optional] [default to undefined]
**updatedAt** | **string** | Last update timestamp | [optional] [default to undefined]

## Example

```typescript
import { UserDto } from '@app/api-sdk';

const instance: UserDto = {
    id,
    email,
    firstName,
    lastName,
    enabled,
    locked,
    role,
    createdAt,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
