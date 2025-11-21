# UIPreferencesDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**theme** | **string** |  | [optional] [default to undefined]
**timezone** | **string** |  | [optional] [default to undefined]
**language** | **string** |  | [optional] [default to undefined]
**uiDensity** | **string** |  | [optional] [default to undefined]
**sidebarCollapsed** | **boolean** |  | [optional] [default to undefined]
**defaultPage** | **string** |  | [optional] [default to undefined]
**tableColumns** | **{ [key: string]: boolean; }** |  | [optional] [default to undefined]
**dashboardWidgets** | **Array&lt;string&gt;** |  | [optional] [default to undefined]

## Example

```typescript
import { UIPreferencesDto } from '@app/api-sdk';

const instance: UIPreferencesDto = {
    theme,
    timezone,
    language,
    uiDensity,
    sidebarCollapsed,
    defaultPage,
    tableColumns,
    dashboardWidgets,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
