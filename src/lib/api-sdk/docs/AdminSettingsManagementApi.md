# AdminSettingsManagementApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**changePassword**](#changepassword) | **POST** /admin/settings/change-password | Change user password|
|[**getProfileActivities**](#getprofileactivities) | **GET** /admin/settings/activities | Get profile activities|
|[**getSecurityEvents**](#getsecurityevents) | **GET** /admin/settings/security-events | Get security events|
|[**getUserPreferences**](#getuserpreferences) | **GET** /admin/settings/preferences | Get user preferences|
|[**getUserProfile**](#getuserprofile) | **GET** /admin/settings/profile | Get user profile|
|[**updateNotificationPreferences**](#updatenotificationpreferences) | **PATCH** /admin/settings/preferences/notifications | Update notification preferences|
|[**updateSecurityPreferences**](#updatesecuritypreferences) | **PATCH** /admin/settings/preferences/security | Update security preferences|
|[**updateUIPreferences**](#updateuipreferences) | **PATCH** /admin/settings/preferences/ui | Update UI preferences|
|[**updateUserProfile**](#updateuserprofile) | **PATCH** /admin/settings/profile | Update user profile|
|[**uploadAvatar**](#uploadavatar) | **POST** /admin/settings/avatar | Upload profile picture|

# **changePassword**
> { [key: string]: boolean; } changePassword(changePasswordRequest)

Changes the password for the currently authenticated admin user.

### Example

```typescript
import {
    AdminSettingsManagementApi,
    Configuration,
    ChangePasswordRequest
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminSettingsManagementApi(configuration);

let changePasswordRequest: ChangePasswordRequest; //

const { status, data } = await apiInstance.changePassword(
    changePasswordRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **changePasswordRequest** | **ChangePasswordRequest**|  | |


### Return type

**{ [key: string]: boolean; }**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Password changed successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getProfileActivities**
> PageProfileActivityResponse getProfileActivities()

Retrieves a paginated list of activities for the currently authenticated user.

### Example

```typescript
import {
    AdminSettingsManagementApi,
    Configuration,
    Pageable
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminSettingsManagementApi(configuration);

let pageable: Pageable; // (default to undefined)
let type: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.getProfileActivities(
    pageable,
    type
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **pageable** | **Pageable** |  | defaults to undefined|
| **type** | [**string**] |  | (optional) defaults to undefined|


### Return type

**PageProfileActivityResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Activities retrieved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getSecurityEvents**
> PageSecurityEventResponse getSecurityEvents()

Retrieves a paginated list of security events for the currently authenticated user.

### Example

```typescript
import {
    AdminSettingsManagementApi,
    Configuration,
    Pageable
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminSettingsManagementApi(configuration);

let pageable: Pageable; // (default to undefined)
let type: string; // (optional) (default to undefined)
let status: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.getSecurityEvents(
    pageable,
    type,
    status
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **pageable** | **Pageable** |  | defaults to undefined|
| **type** | [**string**] |  | (optional) defaults to undefined|
| **status** | [**string**] |  | (optional) defaults to undefined|


### Return type

**PageSecurityEventResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Security events retrieved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUserPreferences**
> AllPreferencesResponse getUserPreferences()

Retrieves all preferences for the currently authenticated user.

### Example

```typescript
import {
    AdminSettingsManagementApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminSettingsManagementApi(configuration);

const { status, data } = await apiInstance.getUserPreferences();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**AllPreferencesResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Preferences retrieved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUserProfile**
> AdminProfileResponse getUserProfile()

Retrieves the profile of the currently authenticated admin user.

### Example

```typescript
import {
    AdminSettingsManagementApi,
    Configuration
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminSettingsManagementApi(configuration);

const { status, data } = await apiInstance.getUserProfile();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**AdminProfileResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Profile retrieved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateNotificationPreferences**
> NotificationPreferencesDto updateNotificationPreferences(notificationPreferencesDto)

Updates notification preferences for the currently authenticated user.

### Example

```typescript
import {
    AdminSettingsManagementApi,
    Configuration,
    NotificationPreferencesDto
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminSettingsManagementApi(configuration);

let notificationPreferencesDto: NotificationPreferencesDto; //

const { status, data } = await apiInstance.updateNotificationPreferences(
    notificationPreferencesDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **notificationPreferencesDto** | **NotificationPreferencesDto**|  | |


### Return type

**NotificationPreferencesDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Preferences updated successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateSecurityPreferences**
> SecurityPreferencesDto updateSecurityPreferences(securityPreferencesDto)

Updates security preferences for the currently authenticated user.

### Example

```typescript
import {
    AdminSettingsManagementApi,
    Configuration,
    SecurityPreferencesDto
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminSettingsManagementApi(configuration);

let securityPreferencesDto: SecurityPreferencesDto; //

const { status, data } = await apiInstance.updateSecurityPreferences(
    securityPreferencesDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **securityPreferencesDto** | **SecurityPreferencesDto**|  | |


### Return type

**SecurityPreferencesDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Preferences updated successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateUIPreferences**
> UIPreferencesDto updateUIPreferences(uIPreferencesDto)

Updates UI preferences for the currently authenticated user.

### Example

```typescript
import {
    AdminSettingsManagementApi,
    Configuration,
    UIPreferencesDto
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminSettingsManagementApi(configuration);

let uIPreferencesDto: UIPreferencesDto; //

const { status, data } = await apiInstance.updateUIPreferences(
    uIPreferencesDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **uIPreferencesDto** | **UIPreferencesDto**|  | |


### Return type

**UIPreferencesDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Preferences updated successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateUserProfile**
> AdminProfileResponse updateUserProfile(updateAdminProfileRequest)

Updates the profile of the currently authenticated admin user.

### Example

```typescript
import {
    AdminSettingsManagementApi,
    Configuration,
    UpdateAdminProfileRequest
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminSettingsManagementApi(configuration);

let updateAdminProfileRequest: UpdateAdminProfileRequest; //

const { status, data } = await apiInstance.updateUserProfile(
    updateAdminProfileRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateAdminProfileRequest** | **UpdateAdminProfileRequest**|  | |


### Return type

**AdminProfileResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Profile updated successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **uploadAvatar**
> { [key: string]: string; } uploadAvatar()

Uploads or updates the profile picture for the currently authenticated user.

### Example

```typescript
import {
    AdminSettingsManagementApi,
    Configuration,
    UploadAvatarRequest
} from '@app/api-sdk';

const configuration = new Configuration();
const apiInstance = new AdminSettingsManagementApi(configuration);

let uploadAvatarRequest: UploadAvatarRequest; // (optional)

const { status, data } = await apiInstance.uploadAvatar(
    uploadAvatarRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **uploadAvatarRequest** | **UploadAvatarRequest**|  | |


### Return type

**{ [key: string]: string; }**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Avatar updated successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

