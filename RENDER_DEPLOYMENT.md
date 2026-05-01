# TaskMaster Pro - Render Deployment Guide

## ✅ Deploy to Render in 5 Minutes

Yes! Your application is perfectly configured for **Render.com** deployment. Here's exactly how to do it:

---

## 📋 Prerequisites

1. **Render Account** - [Sign up for free](https://render.com)
2. **GitHub Account** - Your repository pushed to GitHub
3. **Environment Variables** - JWT_SECRET ready to set

---

## 🚀 Step-by-Step Deployment

### Step 1: Push Your Code to GitHub

```bash
git init
git add .
git commit -m "Ready for Render deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/taskmaster.git
git push -u origin main
```

### Step 2: Create a Render Account & Connect GitHub

1. Go to [render.com](https://render.com)
2. Click **Sign up** → Choose **Continue with GitHub**
3. Authorize Render to access your GitHub repositories
4. Your GitHub account is now connected ✅

### Step 3: Deploy Using Automatic Configuration

Render will automatically detect your `render.yaml` file!

#### Option A: Automatic Deployment (Recommended)

1. Log in to Render Dashboard
2. Click **New** → **Web Service**
3. Select your `taskmaster` repository
4. Render will auto-detect settings from `render.yaml`
5. Click **Deploy** 🚀

#### Option B: Manual Configuration

If auto-detection doesn't work, configure manually:

1. **Create Web Service:**
   - Click **New** → **Web Service**
   - Select your repository
   - Name: `taskmaster-api`
   - Runtime: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run dev`
   - Plan: **Free** or **Starter**
   - Region: Choose closest to you

2. **Set Environment Variables:**
   - Click **Environment** tab
   - Add these variables:
     ```
     NODE_ENV=production
     PORT=3000
     JWT_SECRET=your_super_secret_key_here_change_this
     ```

3. **Add MongoDB Database:**
   - Click **New** → **PostgreSQL Database** (or use MongoDB Atlas)
   - Name: `taskmaster-db`
   - Copy the connection string
   - Add as `MONGO_URI` environment variable

4. **Click Deploy**

### Step 4: Set MongoDB Connection

**Option 1: Use MongoDB Atlas (Recommended - Free Tier Available)**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a free cluster
4. Get your connection string
5. In Render Dashboard → Environment Variables:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmaster
   ```

**Option 2: Use Render's Managed MongoDB**

- Render can provision MongoDB for you
- Go to **Databases** → **New MongoDB**
- Follow the prompts
- Connection string will be auto-populated

### Step 5: Configure JWT Secret

In Render Dashboard → **Environment**:

```
JWT_SECRET=your_random_secret_key_minimum_32_characters_long
```

Generate a secure key:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 6: Deploy!

1. Click **Create Web Service**
2. Render will build and deploy automatically
3. Monitor progress in the **Logs** tab
4. Your app will be live at: `https://taskmaster-api.onrender.com` (or custom domain)

---

## 📊 What Render Does Automatically

✅ Builds your application (`npm install && npm run build`)
✅ Installs Node.js runtime
✅ Serves your frontend from the `dist/` folder
✅ Runs your Express server on port 3000
✅ Manages SSL/HTTPS certificates
✅ Provides custom domain support
✅ Auto-restarts on crashes
✅ Free tier with generous limits

---

## 🔄 Automatic Deployments

After initial deployment, every `git push` to main automatically triggers a new deployment:

```bash
# Make changes locally
git add .
git commit -m "Update features"
git push origin main

# Render automatically deploys! 🚀
# Check progress in Render Dashboard
```

---

## 📡 Test Your Deployment

After deployment succeeds:

1. **Health Check**

   ```bash
   curl https://your-app.onrender.com/api/health
   ```

   Should return:

   ```json
   { "status": "ok", "timestamp": "2026-05-01T..." }
   ```

2. **Test API**

   ```bash
   # Register
   curl -X POST https://your-app.onrender.com/api/v1/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","password":"password123"}'

   # Login
   curl -X POST https://your-app.onrender.com/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

3. **Visit Frontend**
   - Go to `https://your-app.onrender.com`
   - You should see your React app!

---

## 💰 Render Pricing

| Plan         | Cost      | Notes                                                                          |
| ------------ | --------- | ------------------------------------------------------------------------------ |
| **Free**     | $0/month  | Perfect for learning & hobby projects. Auto-spins down after 15 min inactivity |
| **Starter**  | $7/month  | Always running, faster startup, 0.5 CPU, 512MB RAM                             |
| **Standard** | $12/month | 1 CPU, 1GB RAM, better for production                                          |

> **Pro Tip:** Start with Free tier for testing. Upgrade to Starter ($7/mo) for always-on production.

---

## 🔐 Security on Render

- ✅ **HTTPS by default** - All traffic encrypted
- ✅ **Environment variables** - Never exposed in logs
- ✅ **Automatic backups** - Database snapshots available
- ✅ **DDoS protection** - Built-in
- ✅ **Security headers** - Helmet already configured in your app

---

## 🚨 Troubleshooting

### Deployment Failed

1. Check **Logs** tab in Render Dashboard
2. Common issues:
   - Missing environment variables → Add them
   - MongoDB connection error → Verify MONGO_URI
   - Node version → Use Node 20+ (Render default)

### App Running But API Not Responding

1. Check `MONGO_URI` is correct
2. Verify `JWT_SECRET` is set
3. Check MongoDB Atlas IP whitelist (allow `0.0.0.0/0`)

### Free Plan Auto-Spinning Down

- After 15 minutes of inactivity, free tier spins down
- Solution: Upgrade to Starter ($7/mo) for always-on service

### Custom Domain

1. Buy domain (Namecheap, GoDaddy, etc.)
2. Render Dashboard → **Settings** → **Custom Domain**
3. Add your domain and follow DNS instructions

---

## 📈 Scaling When You Grow

When your app becomes popular:

1. **Upgrade Plan:** Free → Starter → Standard → Pro
2. **Add Database:** Expand MongoDB Atlas cluster
3. **Use CDN:** Render auto-caches frontend assets
4. **Monitor Performance:** Use Render Metrics dashboard

---

## 🔗 Useful Links

- [Render Documentation](https://render.com/docs)
- [Deploy Node.js App](https://render.com/docs/deploy-node-express-app)
- [Environment Variables](https://render.com/docs/environment-variables)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Custom Domains](https://render.com/docs/custom-domains)

---

## ✅ Render Deployment Checklist

Before clicking deploy:

- [ ] Code pushed to GitHub
- [ ] `render.yaml` file present in root
- [ ] `package.json` has correct scripts
- [ ] `.env.example` documenting required vars
- [ ] `.gitignore` excludes `.env`
- [ ] Frontend builds successfully locally
- [ ] Backend starts without errors locally
- [ ] MongoDB Atlas account ready (or using Render DB)
- [ ] JWT_SECRET generated and ready to set
- [ ] All dependencies installed (`npm install`)

---

## 🎉 You're Ready!

Your TaskMaster application is **fully prepared for Render deployment**.

### Next Steps:

1. Push code to GitHub
2. Connect your GitHub account to Render
3. Click **Deploy**
4. Set environment variables
5. Watch it go live! 🚀

---

**Questions?**

- Check Render Logs in the Dashboard
- Review [Render Documentation](https://render.com/docs)
- Check MongoDB Atlas connection string format

**Your app will be live in minutes!** ✨
