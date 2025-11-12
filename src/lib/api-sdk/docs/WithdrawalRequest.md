# WithdrawalRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [optional] [default to undefined]
**quid** | **string** |  | [optional] [default to undefined]
**transaction** | [**Transaction**](Transaction.md) |  | [optional] [default to undefined]
**accountName** | **string** |  | [optional] [default to undefined]
**accountNumber** | **string** |  | [optional] [default to undefined]
**amount** | **number** |  | [optional] [default to undefined]
**bank** | **string** |  | [optional] [default to undefined]
**bankCode** | **string** |  | [optional] [default to undefined]
**reference** | **string** |  | [optional] [default to undefined]
**currency** | **string** |  | [optional] [default to undefined]
**status** | **string** |  | [optional] [default to undefined]
**rejectionReason** | **string** |  | [optional] [default to undefined]
**accessKey** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { WithdrawalRequest } from '@app/api-sdk';

const instance: WithdrawalRequest = {
    id,
    quid,
    transaction,
    accountName,
    accountNumber,
    amount,
    bank,
    bankCode,
    reference,
    currency,
    status,
    rejectionReason,
    accessKey,
    createdAt,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
