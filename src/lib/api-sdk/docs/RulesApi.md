# RulesApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**allRules**](#allrules) | **GET** /rules | Get all rules|
|[**claim**](#claim) | **POST** /rules/claim | Attempt to claim a Quid|
|[**createRule**](#createrule) | **POST** /rules | Create a new rule|
|[**getRule**](#getrule) | **GET** /rules/{quid} | Get a rule by Quid|

# **allRules**
> Array<Rule> allRules()

Retrieves a list of all existing claim rules.

### Example

```typescript
import {
    RulesApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new RulesApi(configuration);

const { status, data } = await apiInstance.allRules();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<Rule>**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successfully retrieved all rules |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **claim**
> QuiikaResponse claim()

Attempts to claim a Quid based on its associated rules.

### Example

```typescript
import {
    RulesApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new RulesApi(configuration);

let quid: string; //The Quid to attempt to claim. (default to undefined)

const { status, data } = await apiInstance.claim(
    quid
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **quid** | [**string**] | The Quid to attempt to claim. | defaults to undefined|


### Return type

**QuiikaResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Claim attempt processed |  -  |
|**400** | Claim attempt failed (e.g., Quid not claimable, rules not met) |  -  |
|**404** | Quid or Rule not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createRule**
> Rule createRule(ruleDTO)

Creates a new claim rule with specified conditions and splits.

### Example

```typescript
import {
    RulesApi,
    Configuration,
    RuleDTO
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new RulesApi(configuration);

let ruleDTO: RuleDTO; //

const { status, data } = await apiInstance.createRule(
    ruleDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ruleDTO** | **RuleDTO**|  | |


### Return type

**Rule**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Rule created successfully |  -  |
|**400** | Invalid rule data provided |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getRule**
> Rule getRule()

Retrieves the details of a rule associated with a specific Quid.

### Example

```typescript
import {
    RulesApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new RulesApi(configuration);

let quid: string; //The Quid associated with the rule. (default to undefined)

const { status, data } = await apiInstance.getRule(
    quid
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **quid** | [**string**] | The Quid associated with the rule. | defaults to undefined|


### Return type

**Rule**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Rule found |  -  |
|**404** | Rule not found for the given Quid |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

