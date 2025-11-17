# WithdrawalDashboardMetricsDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**totalWithdrawals** | [**MetricLong**](MetricLong.md) |  | [optional] [default to undefined]
**totalApprovedWithdrawalValue** | [**MetricBigDecimal**](MetricBigDecimal.md) |  | [optional] [default to undefined]
**withdrawalsByStatus** | **{ [key: string]: number; }** |  | [optional] [default to undefined]

## Example

```typescript
import { WithdrawalDashboardMetricsDto } from '@app/api-sdk';

const instance: WithdrawalDashboardMetricsDto = {
    totalWithdrawals,
    totalApprovedWithdrawalValue,
    withdrawalsByStatus,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
