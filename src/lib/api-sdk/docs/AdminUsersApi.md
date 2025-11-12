# AdminUsersApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getUserDetails**](#getuserdetails) | **GET** /admin/users/{userId} | Get user details by ID|
|[**listUsers**](#listusers) | **GET** /admin/users | List and filter users|
|[**updateUserRole**](#updateuserrole) | **PUT** /admin/users/{userId}/role | Update user role|
|[**updateUserStatus**](#updateuserstatus) | **PUT** /admin/users/{userId}/status | Update user account status|

# **getUserDetails**
> UserDto getUserDetails()

Retrieve detailed information about a specific user. Note: Will be expanded with transaction history and audit logs.

### Example

```typescript
import {
    AdminUsersApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminUsersApi(configuration);

let userId: number; //Unique user ID (default to undefined)

const { status, data } = await apiInstance.getUserDetails(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] | Unique user ID | defaults to undefined|


### Return type

**UserDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | User found |  -  |
|**404** | User not found |  -  |
|**403** | Forbidden – insufficient privileges |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listUsers**
> Page listUsers()

Retrieve a paginated list of users with optional filters by email, status, or role.

### Example

```typescript
import {
    AdminUsersApi,
    Configuration,
    Pageable
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminUsersApi(configuration);

let pageable: Pageable; //Pagination and sorting (e.g., ?page=0&size=20&sort=email,desc) (default to undefined)
let email: string; //Filter by user email (partial match) (optional) (default to undefined)
let status: string; //Filter by account status: \'enabled\' or \'disabled\' (optional) (default to undefined)
let role: 'USER' | 'ADMIN' | 'MODERATOR'; //Filter by user role (optional) (default to undefined)

const { status, data } = await apiInstance.listUsers(
    pageable,
    email,
    status,
    role
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **pageable** | **Pageable** | Pagination and sorting (e.g., ?page&#x3D;0&amp;size&#x3D;20&amp;sort&#x3D;email,desc) | defaults to undefined|
| **email** | [**string**] | Filter by user email (partial match) | (optional) defaults to undefined|
| **status** | [**string**] | Filter by account status: \&#39;enabled\&#39; or \&#39;disabled\&#39; | (optional) defaults to undefined|
| **role** | [**&#39;USER&#39; | &#39;ADMIN&#39; | &#39;MODERATOR&#39;**]**Array<&#39;USER&#39; &#124; &#39;ADMIN&#39; &#124; &#39;MODERATOR&#39;>** | Filter by user role | (optional) defaults to undefined|


### Return type

**Page**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Paginated list of users |  -  |
|**403** | Forbidden – insufficient privileges |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateUserRole**
> UserDto updateUserRole(userRoleUpdateDto)

Assign a new role to a user. Only accessible to ADMIN.

### Example

```typescript
import {
    AdminUsersApi,
    Configuration,
    UserRoleUpdateDto
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminUsersApi(configuration);

let userId: number; //User ID to update (default to undefined)
let userRoleUpdateDto: UserRoleUpdateDto; //

const { status, data } = await apiInstance.updateUserRole(
    userId,
    userRoleUpdateDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userRoleUpdateDto** | **UserRoleUpdateDto**|  | |
| **userId** | [**number**] | User ID to update | defaults to undefined|


### Return type

**UserDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | User role updated successfully |  -  |
|**400** | Invalid role value |  -  |
|**404** | User not found |  -  |
|**403** | Forbidden – only ADMIN can update roles |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateUserStatus**
> UserDto updateUserStatus(userStatusUpdateDto)

Enable, disable, or lock a user account.

### Example

```typescript
import {
    AdminUsersApi,
    Configuration,
    UserStatusUpdateDto
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminUsersApi(configuration);

let userId: number; //User ID to update (default to undefined)
let userStatusUpdateDto: UserStatusUpdateDto; //

const { status, data } = await apiInstance.updateUserStatus(
    userId,
    userStatusUpdateDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userStatusUpdateDto** | **UserStatusUpdateDto**|  | |
| **userId** | [**number**] | User ID to update | defaults to undefined|


### Return type

**UserDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | User status updated successfully |  -  |
|**400** | Invalid status action |  -  |
|**404** | User not found |  -  |
|**403** | Forbidden – insufficient privileges |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

