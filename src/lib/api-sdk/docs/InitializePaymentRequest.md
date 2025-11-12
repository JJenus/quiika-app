# InitializePaymentRequest

Payment initialization payload

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**amount** | **number** |  | [optional] [default to undefined]
**email** | **string** |  | [optional] [default to undefined]
**reference** | **string** |  | [optional] [default to undefined]
**callbackUrl** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { InitializePaymentRequest } from '@app/api-sdk';

const instance: InitializePaymentRequest = {
    amount,
    email,
    reference,
    callbackUrl,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
