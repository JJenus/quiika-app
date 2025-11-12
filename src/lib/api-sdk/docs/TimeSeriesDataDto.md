# TimeSeriesDataDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**userSignups** | [**Array&lt;TimeSeriesDataPoint&gt;**](TimeSeriesDataPoint.md) |  | [optional] [default to undefined]
**quidsCreated** | [**Array&lt;TimeSeriesDataPoint&gt;**](TimeSeriesDataPoint.md) |  | [optional] [default to undefined]
**transactionsCompleted** | [**Array&lt;TimeSeriesDataPoint&gt;**](TimeSeriesDataPoint.md) |  | [optional] [default to undefined]
**withdrawalsProcessed** | [**Array&lt;TimeSeriesDataPoint&gt;**](TimeSeriesDataPoint.md) |  | [optional] [default to undefined]

## Example

```typescript
import { TimeSeriesDataDto } from '@app/api-sdk';

const instance: TimeSeriesDataDto = {
    userSignups,
    quidsCreated,
    transactionsCompleted,
    withdrawalsProcessed,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
