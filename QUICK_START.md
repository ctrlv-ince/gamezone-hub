# GameZone Hub - Quick Start Guide

## Project Overview

GameZone Hub is a full-stack e-commerce application with:
- ✓ User authentication (Login/Register)
- ✓ Avatar upload with Cloudinary
- ✓ Protected routes
- ✓ Clean architecture
- ✓ Material UI components

## Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas account
- Cloudinary account
- Mailtrap account (for email)

## Installation

### 1. Clone Repository
```bash
cd gamezone
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Configure Environment
Create/update `backend/.env`:
```env
PORT=5000
NODE_ENV=development

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/gamezone?retryWrites=true&w=majority

JWT_SECRET=your_secret_key_at_least_32_chars
JWT_EXPIRES_TIME=7d

CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

MAILTRAP_HOST=smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your_user
MAILTRAP_PASS=your_pass
MAILTRAP_FROM_EMAIL=noreply@gamezone.com
MAILTRAP_FROM_NAME=GameZone Hub

CORS_ORIGIN=http://localhost:5173

ADMIN_EMAIL=admin@gamezone.com
```

#### Start Backend Server
```bash
npm start
```
Backend runs on: **http://localhost:5000**

### 3. Frontend Setup

#### Install Dependencies
```bash
cd frontend
npm install
```

#### Configure Environment
Create/update `frontend/.env`:
```env
VITE_BACKEND_URL=http://localhost:5000/api
```

#### Start Frontend Development Server
```bash
npm run dev
```
Frontend runs on: **http://localhost:5173**

## Usage

### Register a New Account

1. Navigate to **http://localhost:5173/register**
2. Fill in registration form:
   - Full Name (2-30 characters)
   - Email (valid email format)
   - Password (min 6 characters)
   - Confirm Password (must match)
   - **Optional:** Upload profile picture (JPG, PNG, GIF, WebP - max 5MB)
3. Click "Create Account"
4. On success, redirected to home page

### Login to Account

1. Navigate to **http://localhost:5173/login**
2. Enter email and password
3. Click "Sign In"
4. On success, redirected to home page

### Update Avatar

1. Create endpoint in your profile/account page:
```javascript
import AvatarUpload from '../components/AvatarUpload';
import { useAuth } from '../hooks/useAuth';

function Profile() {
  const { user } = useAuth();
  
  return (
    <AvatarUpload 
      currentAvatar={user?.avatar}
      editable={true}
    />
  );
}
```

## Project Structure

```
gamezone/
├── backend/
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Auth & file upload
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── utils/           # Helper functions
│   ├── .env             # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   ├── context/     # React context
│   │   ├── hooks/       # Custom hooks
│   │   ├── utils/       # Utilities
│   │   └── App.jsx      # Main app
│   ├── .env             # Environment variables
│   └── package.json
│
├── ENV_SETUP.md         # Environment guide
├── AVATAR_UPLOAD.md     # Avatar feature docs
└── QUICK_START.md       # This file
```

## Key Features

### Authentication
- User registration with validation
- JWT-based login
- Protected routes
- Token management in localStorage
- Auth context state management

### Avatar Upload
- Optional during registration
- Update anytime (authenticated)
- Cloudinary cloud storage
- Automatic validation (type & size)
- Default avatar fallback

### Form Validation
- Email validation
- Password strength (min 6 chars)
- Name validation (2-30 chars)
- Confirm password matching
- File type/size validation

### UI/UX
- Material UI components
- Real-time form validation
- Toast notifications
- Loading states
- Error handling
- Image preview

## API Endpoints

### Authentication

**Register User**
```
POST /api/auth/register
Content-Type: multipart/form-data

Body:
- name: string
- email: string
- password: string
- confirmPassword: string
- avatar: File (optional)
```

**Login User**
```
POST /api/auth/login
Content-Type: application/json

Body:
- email: string
- password: string
```

**Get Current User**
```
GET /api/auth/me
Authorization: Bearer <token>
```

**Update Avatar**
```
PUT /api/auth/avatar
Authorization: Bearer <token>
Content-Type: multipart/form-data

Body:
- avatar: File
```

## Testing the App

### Test Registration
```javascript
// With avatar
POST http://localhost:5000/api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "avatar": <file>
}

// Without avatar
POST http://localhost:5000/api/auth/register
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

### Test Login
```javascript
POST http://localhost:5000/api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Test Get Current User
```javascript
GET http://localhost:5000/api/auth/me
Headers:
- Authorization: Bearer <token_from_login>
```

## Troubleshooting

### Backend Won't Start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process using port 5000
taskkill /PID <process_id> /F

# Ensure MongoDB connection string is correct
# Check .env file for MONGO_URI
```

### Frontend Won't Connect to Backend
```bash
# Verify VITE_BACKEND_URL in frontend/.env
# Should be: http://localhost:5000/api

# Check backend is running on port 5000
curl http://localhost:5000/api/auth/login
```

### Avatar Upload Fails
```bash
# Check Cloudinary credentials in backend/.env
# Verify file size < 5MB
# Verify file type is JPEG, PNG, GIF, or WebP
# Check backend /uploads folder exists
```

### Authentication Errors
```bash
# Check JWT_SECRET is set in backend/.env
# Verify token is included in Authorization header
# Format: Authorization: Bearer <token>
# Ensure token hasn't expired
```

## Environment Setup Details

See **ENV_SETUP.md** for:
- Detailed variable explanations
- Service sign-up guides (MongoDB, Cloudinary, Mailtrap)
- Credential retrieval steps
- Security best practices

## Avatar Upload Details

See **AVATAR_UPLOAD.md** for:
- Feature architecture
- API endpoint documentation
- Validation rules
- Error handling
- Usage examples
- Troubleshooting

## Development

### Start Both Services

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Hot Reload
- Backend: Modify files, restart npm start
- Frontend: Vite auto-reloads on file changes

### Code Quality
```bash
# Frontend linting
cd frontend
npm run lint

# Backend - implement ESLint if needed
```

## Production Deployment

### Backend
1. Set `NODE_ENV=production`
2. Update `JWT_SECRET` with strong key
3. Use production MongoDB connection
4. Deploy to Heroku, Railway, or similar

### Frontend
1. Build bundle: `npm run build`
2. Output in `dist/` folder
3. Deploy to Vercel, Netlify, or similar
4. Update `VITE_BACKEND_URL` to production API

## Next Steps

1. ✓ Configure environment variables
2. ✓ Set up MongoDB, Cloudinary, Mailtrap
3. ✓ Run backend server
4. ✓ Run frontend dev server
5. ✓ Test registration/login/avatar
6. ✓ Build protected routes for features
7. ✓ Add product management
8. ✓ Add shopping cart
9. ✓ Add payment processing
10. ✓ Deploy to production

## Support

- Check error messages in browser console
- Check backend logs for API errors
- Verify environment variables
- Review documentation files
- Check Cloudinary dashboard for upload issues

## License

ISC

---

Happy coding! 🚀