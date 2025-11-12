# AuditLogDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [optional] [default to undefined]
**timestamp** | **string** |  | [optional] [default to undefined]
**adminUserId** | **number** |  | [optional] [default to undefined]
**actionType** | **string** |  | [optional] [default to undefined]
**targetEntity** | **string** |  | [optional] [default to undefined]
**targetEntityId** | **string** |  | [optional] [default to undefined]
**details** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { AuditLogDto } from '@app/api-sdk';

const instance: AuditLogDto = {
    id,
    timestamp,
    adminUserId,
    actionType,
    targetEntity,
    targetEntityId,
    details,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
