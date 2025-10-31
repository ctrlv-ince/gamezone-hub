# Avatar Upload Feature Documentation

## Overview

The avatar upload feature allows users to upload a profile picture during registration or update it later via the API endpoint.

## Features

✓ **Upload during registration** - Optional profile picture during sign-up  
✓ **Update avatar anytime** - Dedicated endpoint to change avatar  
✓ **Cloudinary integration** - Secure cloud storage for images  
✓ **Validation** - File type and size validation  
✓ **Automatic cleanup** - Old avatars automatically deleted from Cloudinary  
✓ **Default avatar** - Fallback placeholder if no image uploaded  

## Architecture

### Backend

#### Cloudinary Service (`backend/utils/cloudinary.js`)
Handles all Cloudinary operations:
- `uploadImage()` - Upload image to Cloudinary
- `deleteImage()` - Delete image from Cloudinary
- `uploadMultipleImages()` - Batch upload

#### Multer Middleware (`backend/middleware/upload.js`)
Handles file uploads:
- File size validation (max 5MB)
- File type validation (JPEG, PNG, GIF, WebP)
- Temporary storage in `backend/uploads/`
- Error handling for upload failures

#### Auth Controller (`backend/controllers/authController.js`)
Enhanced with avatar handling:
- `registerUser()` - Accepts optional avatar file
- `updateAvatar()` - Updates user avatar (authenticated)

#### Routes (`backend/routes/auth.js`)
```javascript
POST   /register        - Register with optional avatar
PUT    /avatar          - Update avatar (authenticated)
```

### Frontend

#### Avatar Upload Component (`frontend/src/components/AvatarUpload.jsx`)
Reusable component for avatar uploads:
- Image preview display
- Upload via icon button
- Error handling with toast notifications
- Loading states

#### Register Page (`frontend/src/pages/Register.jsx`)
Integrated avatar upload:
- Optional profile picture selection
- Visual preview before submission
- File validation client-side
- Integrated with registration flow

#### Auth Service (`frontend/src/services/authService.js`)
Updated to support file uploads:
- FormData for multipart requests
- Avatar file passed with registration data

## File Structure

```
backend/
├── utils/cloudinary.js          # Cloudinary operations
├── middleware/upload.js          # Multer file upload handler
├── controllers/authController.js # Enhanced with avatar endpoints
├── routes/auth.js               # Avatar routes added
└── uploads/                     # Temporary file storage

frontend/
├── src/
│   ├── components/AvatarUpload.jsx    # Reusable avatar component
│   ├── pages/Register.jsx              # Avatar integrated
│   └── services/authService.js         # File upload support
```

## API Endpoints

### Register with Avatar

**Endpoint:** `POST /api/auth/register`

**Content-Type:** `multipart/form-data`

**Request Body:**
```javascript
{
  name: string,              // Required, max 30 chars
  email: string,             // Required, valid email
  password: string,          // Required, min 6 chars
  confirmPassword: string,   // Required, must match password
  avatar: File               // Optional, max 5MB
}
```

**Response (Success):**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "avatar": {
      "public_id": "gamezone/avatars/xyz123",
      "url": "https://res.cloudinary.com/..."
    }
  }
}
```

### Update Avatar

**Endpoint:** `PUT /api/auth/avatar`

**Authentication:** Required (JWT Bearer token)

**Content-Type:** `multipart/form-data`

**Request Body:**
```javascript
{
  avatar: File  // Required, max 5MB
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Avatar updated successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "avatar": {
      "public_id": "gamezone/avatars/abc456",
      "url": "https://res.cloudinary.com/..."
    }
  }
}
```

## Validation Rules

### File Type Validation
- **Allowed:** JPEG, PNG, GIF, WebP
- **Rejected:** BMP, TIFF, etc.

### File Size Validation
- **Maximum:** 5MB
- **Minimum:** No limit

### Image Requirements
- **Aspect Ratio:** Any (will be displayed as circular avatar)
- **Dimensions:** Recommended min 200x200px
- **Quality:** Any (will be optimized by Cloudinary)

## Error Handling

### Common Errors

**Invalid File Type:**
```json
{
  "success": false,
  "message": "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed."
}
```

**File Too Large:**
```json
{
  "success": false,
  "message": "File size must not exceed 5MB"
}
```

**Upload Failed:**
```json
{
  "success": false,
  "message": "Cloudinary upload error: [error details]"
}
```

**Unauthorized:**
```json
{
  "success": false,
  "message": "Unauthorized access"
}
```

## Usage Examples

### Frontend Registration with Avatar

```javascript
import { useAuth } from '../hooks/useAuth';

function RegisterPage() {
  const { register } = useAuth();
  const [avatarFile, setAvatarFile] = useState(null);

  const handleSubmit = async (name, email, password, confirmPassword) => {
    const result = await register(name, email, password, confirmPassword, avatarFile);
    
    if (result.success) {
      console.log('Registration successful!', result.user);
    }
  };

  return (
    // ... form JSX
  );
}
```

### Update Avatar with Component

```javascript
import AvatarUpload from '../components/AvatarUpload';

function ProfilePage() {
  const { user } = useAuth();

  const handleAvatarUpdate = (updatedUser) => {
    console.log('Avatar updated:', updatedUser.avatar);
  };

  return (
    <AvatarUpload 
      currentAvatar={user?.avatar} 
      onAvatarUpdate={handleAvatarUpdate}
      editable={true}
    />
  );
}
```

### Direct API Call

```javascript
async function updateAvatar(file, token) {
  const formData = new FormData();
  formData.append('avatar', file);

  const response = await fetch('/api/auth/avatar', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  return response.json();
}
```

## Cloudinary Configuration

### Setup Steps

1. **Create Cloudinary Account**
   - Visit https://cloudinary.com/
   - Sign up and verify email

2. **Get Credentials**
   - Dashboard → Settings → API Keys
   - Copy: Cloud Name, API Key, API Secret

3. **Update .env File**
   ```env
   CLOUDINARY_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Security**
   - Never commit `.env` file
   - API Secret should never be exposed client-side
   - Use Node.js backend for uploads

### Cloudinary Folder Structure

All avatars are organized in:
```
gamezone/avatars/[user_id]_[timestamp]
```

This allows easy management and bulk operations on user avatars.

## Best Practices

### Frontend
- ✓ Validate file type before upload
- ✓ Validate file size before upload
- ✓ Show image preview before submission
- ✓ Provide clear feedback (loading, error, success)
- ✓ Disable form during upload
- ✓ Handle network errors gracefully

### Backend
- ✓ Validate all file properties on server
- ✓ Clean up temporary files after upload
- ✓ Delete old Cloudinary images when updating
- ✓ Use error middleware for multer errors
- ✓ Implement rate limiting for uploads
- ✓ Log upload failures for debugging

### Security
- ✓ Only allow image file types
- ✓ Enforce file size limits
- ✓ Require authentication for profile operations
- ✓ Store public_id in database (not URL)
- ✓ Never expose API credentials to frontend
- ✓ Validate file headers (not just extension)

## Troubleshooting

### Upload fails with "CLOUDINARY_NAME is undefined"
- **Issue:** Environment variables not loaded
- **Solution:** Ensure `.env` exists in backend root and `dotenv` is required

### "Unauthorized access" when updating avatar
- **Issue:** JWT token expired or invalid
- **Solution:** Re-login to get fresh token, token automatically refreshed on register

### Images not showing after upload
- **Issue:** Cloudinary URL is public but slow to propagate
- **Solution:** Cache busting in frontend (add timestamp), wait a moment before refresh

### "File size exceeds limit" error
- **Issue:** Selected file is larger than 5MB
- **Solution:** Compress image before upload using tools like TinyPNG

### Temporary files accumulating in uploads/
- **Issue:** Upload process crashes before cleanup
- **Solution:** Implement cron job to clean old files or use cloud storage instead

## Performance Optimization

### Image Optimization
Cloudinary automatically optimizes images:
- Automatic format selection (WebP for modern browsers)
- Quality adjustment
- Responsive image sizes
- CDN delivery

### Caching Strategy
```javascript
// Client-side: Add cache buster to avatar URL
const avatarUrl = user.avatar.url + `?t=${Date.now()}`;
```

### Batch Operations
```javascript
// Delete multiple old avatars efficiently
const deletePromises = oldAvatarIds.map(id => deleteImage(id));
await Promise.all(deletePromises);
```

## Future Enhancements

- [ ] Image cropping before upload
- [ ] Gravatar fallback integration
- [ ] Avatar placeholder colors based on name
- [ ] Batch avatar processing
- [ ] Image optimization settings
- [ ] CDN caching headers
- [ ] Avatar history/versioning