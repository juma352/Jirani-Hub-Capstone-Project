# JiraniHub Deployment Guide

## Backend Deployment (Render)

### 1. Prepare Your Repository
1. Push your code to GitHub
2. Make sure your `server` folder contains all backend files

### 2. Deploy to Render
1. Go to [Render.com](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `jirani-hub-api` (or your preferred name)
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 3. Set Environment Variables
In Render dashboard, add these environment variables:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jiranihub
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=production
PORT=10000
```

### 4. Database Setup
1. Create a MongoDB Atlas account at [mongodb.com](https://mongodb.com)
2. Create a new cluster
3. Create a database user
4. Get your connection string
5. Add your Render app's IP to MongoDB whitelist (or use 0.0.0.0/0 for all IPs)

## Frontend Deployment (Vercel)

### 1. Update Configuration
1. Update the `vercel.json` file with your actual Render URL
2. Replace `your-render-app-name` with your actual Render service name

### 2. Deploy to Vercel
1. Go to [Vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3. Set Environment Variables
In Vercel dashboard, add these environment variables:
```
VITE_API_URL=https://your-render-app-name.onrender.com/api
VITE_SOCKET_URL=https://your-render-app-name.onrender.com
```

### 4. Update CORS Settings
After deployment, update your backend CORS settings in `server/server.js`:
```javascript
origin: process.env.NODE_ENV === 'production' 
    ? ['https://jirani-hub-capstone-project.vercel.app', 'https://your-custom-domain.com']
    : 'http://localhost:5173',
```

## Post-Deployment Steps

### 1. Test Your Deployment
1. Visit your Vercel app URL
2. Test user registration/login
3. Test creating listings
4. Test image uploads
5. Test real-time features (chat, alerts)

### 2. Custom Domain (Optional)
1. **Vercel**: Add custom domain in project settings
2. **Render**: Add custom domain in service settings

### 3. SSL Certificates
Both Render and Vercel provide automatic SSL certificates.

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Update CORS origins in backend
2. **Environment Variables**: Double-check all env vars are set
3. **Database Connection**: Verify MongoDB connection string
4. **File Uploads**: Render has ephemeral storage, consider using cloud storage
5. **Build Errors**: Check build logs in deployment dashboard

### File Upload Considerations:
Since Render uses ephemeral storage, uploaded files will be lost on restart. Consider:
1. **Cloudinary** for image storage
2. **AWS S3** for file storage
3. **Firebase Storage** for files

### Performance Optimization:
1. Enable gzip compression
2. Use CDN for static assets
3. Implement caching strategies
4. Monitor performance with Render/Vercel analytics

## Environment Variables Summary

### Backend (.env):
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jiranihub
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=production
PORT=10000
```

### Frontend (Vercel):
```
VITE_API_URL=https://jirani-hub-capstone-project.onrender.com/api
VITE_SOCKET_URL=https://jirani-hub-capstone-project.onrender.com
```

## Monitoring and Maintenance

1. **Render**: Monitor logs and metrics in dashboard
2. **Vercel**: Check function logs and analytics
3. **MongoDB Atlas**: Monitor database performance
4. Set up alerts for downtime or errors

## Security Checklist

- [ ] JWT secret is secure and random
- [ ] MongoDB connection uses authentication
- [ ] CORS is properly configured
- [ ] Environment variables are not exposed
- [ ] HTTPS is enabled (automatic with Render/Vercel)
- [ ] Input validation is implemented
- [ ] Rate limiting is configured (optional)

Your JiraniHub application should now be fully deployed and accessible worldwide!