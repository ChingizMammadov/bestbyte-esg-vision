# Deploying the ESG Vision Frontend to Vercel

This document provides step-by-step instructions for deploying the ESG Vision frontend to Vercel.

## Prerequisites

- GitHub account (for connecting your repository to Vercel)
- Vercel account (sign up at https://vercel.com if you don't have one)

## Deployment Steps

### 1. Push Your Code to GitHub

Ensure your project is pushed to a GitHub repository:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push
```

### 2. Connect to Vercel

1. Log in to your Vercel account at https://vercel.com/
2. Click on "Add New..." and select "Project"
3. Import your GitHub repository (you may need to install the Vercel GitHub app if you haven't already)
4. Select the "bestbyte-esg-vision" repository

### 3. Configure Project Settings

In the Vercel deployment settings:

1. **Framework Preset**: Select "Vite" from the dropdown
2. **Root Directory**: Set to `frontend` (since your frontend is in a subdirectory)
3. **Build Command**: The default `npm run build` is correct
4. **Output Directory**: The default `dist` is correct

### 4. Environment Variables

Add the following environment variable:

- `VITE_API_URL`: Set this to your deployed backend API URL
  (e.g., `https://your-backend-api-url.com`)

### 5. Deploy

Click "Deploy" and wait for the build to complete. Vercel will provide you with a deployment URL once the build is successful.

### 6. Custom Domain (Optional)

To use a custom domain:

1. Go to your project's dashboard in Vercel
2. Navigate to "Settings" > "Domains"
3. Add your custom domain and follow the DNS configuration instructions

## Automatic Deployments

After the initial setup, Vercel will automatically deploy your frontend whenever you push changes to your GitHub repository. You can configure branch deployments in the project settings.

## Troubleshooting

If you encounter any build issues:

1. Check the build logs in Vercel for specific errors
2. Ensure all dependencies are correctly listed in `package.json`
3. Verify that environment variables are correctly set
4. Make sure your `vercel.json` configuration is correct

## Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
- [Vercel Documentation](https://vercel.com/docs)
- [SPA Routing on Vercel](https://vercel.com/guides/using-react-router-with-vercel)