# QuidDetailDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**quid** | [**QuidDto**](QuidDto.md) |  | [optional] [default to undefined]
**rule** | [**RuleDto**](RuleDto.md) |  | [optional] [default to undefined]
**claimAttempts** | [**Array&lt;ClaimAttemptDto&gt;**](ClaimAttemptDto.md) |  | [optional] [default to undefined]
**winners** | [**Array&lt;WinnerDto&gt;**](WinnerDto.md) |  | [optional] [default to undefined]

## Example

```typescript
import { QuidDetailDto } from '@app/api-sdk';

const instance: QuidDetailDto = {
    quid,
    rule,
    claimAttempts,
    winners,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
