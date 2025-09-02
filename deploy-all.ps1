# Deploy All - Backend + Frontend
Write-Host "🚀 Starting Full Deployment..." -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Cyan

# Bước 1: Deploy Backend
Write-Host "📋 STEP 1: Deploying Backend to Render" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Yellow

# Kiểm tra Git status
Write-Host "📋 Checking Git status..." -ForegroundColor White
git status

# Thêm files
Write-Host "➕ Adding files to Git..." -ForegroundColor White
git add .

# Commit
Write-Host "💾 Committing changes..." -ForegroundColor White
git commit -m "🔧 Fix backend errors: yt-dlp detection, error handling, timeout protection"

# Push
Write-Host "📤 Pushing to GitHub..." -ForegroundColor White
git push origin master

Write-Host "✅ Backend deployed to Render!" -ForegroundColor Green
Write-Host "🔗 Check deployment at: https://dashboard.render.com" -ForegroundColor Cyan
Write-Host "⏳ Wait for build to complete (usually 2-5 minutes)..." -ForegroundColor Yellow

# Chờ user xác nhận
Write-Host ""
Write-Host "Press any key when backend deployment is complete..." -ForegroundColor Magenta
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Bước 2: Deploy Frontend
Write-Host ""
Write-Host "📋 STEP 2: Deploying Frontend to Vercel" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Yellow

# Kiểm tra Vercel CLI
Write-Host "🔍 Checking Vercel CLI..." -ForegroundColor White
vercel --version

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Red
    npm install -g vercel
}

# Login Vercel (nếu cần)
Write-Host "🔐 Checking Vercel login..." -ForegroundColor White
vercel whoami

if ($LASTEXITCODE -ne 0) {
    Write-Host "🔐 Please login to Vercel..." -ForegroundColor Yellow
    vercel login
}

# Deploy
Write-Host "📤 Deploying to Vercel..." -ForegroundColor White
vercel --prod

Write-Host ""
Write-Host "🎉 DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Cyan
Write-Host "✅ Backend: https://musicvndow.onrender.com" -ForegroundColor Green
Write-Host "✅ Frontend: Check Vercel dashboard for URL" -ForegroundColor Green
Write-Host ""
Write-Host "🔍 Next steps:" -ForegroundColor Yellow
Write-Host "1. Test backend: https://musicvndow.onrender.com/health" -ForegroundColor White
Write-Host "2. Test frontend download functionality" -ForegroundColor White
Write-Host "3. Check integration between frontend and backend" -ForegroundColor White
