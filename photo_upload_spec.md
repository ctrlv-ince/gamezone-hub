# Technical Specification: User Profile Photo Upload

## 1. Backend Changes

### 1.1. Model

- **File:** `backend/models/User.js`
- **Changes:**
  - The `User` model already has an `avatar` field of type `String`. No changes are required to the model.

### 1.2. API Route

- **File:** `backend/routes/upload.js`
- **Changes:**
  - Create a new route to handle single profile picture uploads. This route will be distinct from the existing `upload.array('images')` route, which is designed for multiple file uploads.

### 1.3. Controller

- **File:** `backend/controllers/uploadController.js`
- **Changes:**
  - Create a new controller function, `uploadProfilePicture`, to handle the single file upload. This function will take the uploaded file, call the `uploadProfilePicture` service, and return the secure URL of the uploaded image.

### 1.4. Service

- **File:** `backend/services/uploadService.js`
- **Changes:**
  - Create a new service function, `uploadProfilePicture`, that takes a single file, uploads it to Cloudinary, and returns the secure URL. This function will be similar to the existing `uploadImages` service but will be adapted to handle a single file.

## 2. Frontend Changes

### 2.1. UI Component

- **File:** `frontend/src/pages/UpdateProfilePage.jsx`
- **Changes:**
  - Add a file input to the `UpdateProfilePage` component to allow users to select a profile picture.
  - The selected image will be displayed in the `Avatar` component.
  - A new button will be added to trigger the upload process.

### 2.2. API Service

- **File:** `frontend/src/services/uploadService.js`
- **Changes:**
  - Create a new function, `uploadProfilePicture`, to send the selected file to the new backend endpoint. This function will handle the API request and return the server's response.

### 2.3. State Management

- **File:** `frontend/src/pages/UpdateProfilePage.jsx`
- **Changes:**
  - The `onSubmit` function in the `UpdateProfilePage` component will be updated to handle the profile picture upload.
  - After a successful upload, the user's `avatar` in the `UserContext` will be updated with the new URL, ensuring the UI reflects the change across the application.