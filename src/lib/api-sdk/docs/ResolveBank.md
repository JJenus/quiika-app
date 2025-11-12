# ResolveBank

Request and response for bank account name resolution

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**accountNumber** | **string** | Bank account number | [default to undefined]
**bankCode** | **string** | Bank code (e.g., Paystack bank code) | [default to undefined]
**accountName** | **string** | Resolved account holder\&#39;s name | [optional] [default to undefined]

## Example

```typescript
import { ResolveBank } from '@app/api-sdk';

const instance: ResolveBank = {
    accountNumber,
    bankCode,
    accountName,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
