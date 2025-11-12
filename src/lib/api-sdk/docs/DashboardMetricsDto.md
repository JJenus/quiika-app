# DashboardMetricsDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**totalUsers** | [**MetricLong**](MetricLong.md) |  | [optional] [default to undefined]
**totalQuids** | [**MetricLong**](MetricLong.md) |  | [optional] [default to undefined]
**totalQuidValue** | [**MetricBigDecimal**](MetricBigDecimal.md) |  | [optional] [default to undefined]
**totalTransactions** | [**MetricLong**](MetricLong.md) |  | [optional] [default to undefined]
**totalSuccessfulTransactionValue** | [**MetricBigDecimal**](MetricBigDecimal.md) |  | [optional] [default to undefined]
**withdrawalRequestsByStatus** | **{ [key: string]: number; }** |  | [optional] [default to undefined]
**totalApprovedWithdrawalValue** | [**MetricBigDecimal**](MetricBigDecimal.md) |  | [optional] [default to undefined]
**systemHealth** | **{ [key: string]: any; }** |  | [optional] [default to undefined]

## Example

```typescript
import { DashboardMetricsDto } from '@app/api-sdk';

const instance: DashboardMetricsDto = {
    totalUsers,
    totalQuids,
    totalQuidValue,
    totalTransactions,
    totalSuccessfulTransactionValue,
    withdrawalRequestsByStatus,
    totalApprovedWithdrawalValue,
    systemHealth,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
