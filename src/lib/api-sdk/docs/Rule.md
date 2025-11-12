# Rule


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]
**quid** | [**Quid**](Quid.md) |  | [optional] [default to undefined]
**nthPerson** | **number** |  | [optional] [default to undefined]
**startTime** | **string** |  | [optional] [default to undefined]
**endTime** | **string** |  | [optional] [default to undefined]
**totalSplits** | **number** |  | [optional] [default to undefined]
**totalAmount** | **number** |  | [optional] [default to undefined]
**splits** | [**Array&lt;Split&gt;**](Split.md) |  | [optional] [default to undefined]

## Example

```typescript
import { Rule } from '@app/api-sdk';

const instance: Rule = {
    id,
    createdAt,
    updatedAt,
    quid,
    nthPerson,
    startTime,
    endTime,
    totalSplits,
    totalAmount,
    splits,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
