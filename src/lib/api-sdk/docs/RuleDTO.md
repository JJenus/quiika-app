# RuleDTO

The rule data to create.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**quid** | **string** |  | [optional] [default to undefined]
**nthPerson** | **number** |  | [optional] [default to undefined]
**totalSplits** | **number** |  | [optional] [default to undefined]
**startTime** | **string** |  | [optional] [default to undefined]
**endTime** | **string** |  | [optional] [default to undefined]
**splits** | [**Array&lt;SplitDTO&gt;**](SplitDTO.md) |  | [optional] [default to undefined]

## Example

```typescript
import { RuleDTO } from '@app/api-sdk';

const instance: RuleDTO = {
    quid,
    nthPerson,
    totalSplits,
    startTime,
    endTime,
    splits,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
