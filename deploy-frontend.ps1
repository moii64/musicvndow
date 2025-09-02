# Deploy Frontend lên Vercel
Write-Host "🌐 Deploying Frontend to Vercel..." -ForegroundColor Green

# Kiểm tra Vercel CLI
Write-Host "🔍 Checking Vercel CLI..." -ForegroundColor Yellow
vercel --version

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Red
    npm install -g vercel
}

# Login Vercel (nếu cần)
Write-Host "🔐 Checking Vercel login..." -ForegroundColor Yellow
vercel whoami

if ($LASTEXITCODE -ne 0) {
    Write-Host "🔐 Please login to Vercel..." -ForegroundColor Yellow
    vercel login
}

# Deploy
Write-Host "📤 Deploying to Vercel..." -ForegroundColor Yellow
vercel --prod

Write-Host "✅ Frontend deployed to Vercel!" -ForegroundColor Green
Write-Host "🔗 Check your Vercel dashboard for the URL" -ForegroundColor Cyan
