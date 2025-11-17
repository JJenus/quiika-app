# QuidDashboardMetricsDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**totalQuids** | [**MetricLong**](MetricLong.md) |  | [optional] [default to undefined]
**totalQuidValue** | [**MetricBigDecimal**](MetricBigDecimal.md) |  | [optional] [default to undefined]
**quidsByStatus** | **{ [key: string]: number; }** |  | [optional] [default to undefined]

## Example

```typescript
import { QuidDashboardMetricsDto } from '@app/api-sdk';

const instance: QuidDashboardMetricsDto = {
    totalQuids,
    totalQuidValue,
    quidsByStatus,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
