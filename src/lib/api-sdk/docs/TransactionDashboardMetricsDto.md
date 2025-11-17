# TransactionDashboardMetricsDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**totalTransactions** | [**MetricLong**](MetricLong.md) |  | [optional] [default to undefined]
**totalSuccessfulTransactionValue** | [**MetricBigDecimal**](MetricBigDecimal.md) |  | [optional] [default to undefined]
**transactionsByStatus** | **{ [key: string]: number; }** |  | [optional] [default to undefined]

## Example

```typescript
import { TransactionDashboardMetricsDto } from '@app/api-sdk';

const instance: TransactionDashboardMetricsDto = {
    totalTransactions,
    totalSuccessfulTransactionValue,
    transactionsByStatus,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
