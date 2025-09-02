# Force Deploy Backend lên Render
Write-Host "🚀 Force Deploying Backend to Render..." -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan

# Kiểm tra Git status
Write-Host "📋 Checking Git status..." -ForegroundColor Yellow
git status

# Đảm bảo code mới nhất
Write-Host "🔄 Pulling latest changes..." -ForegroundColor Yellow
git pull origin master

# Thêm files nếu có thay đổi
Write-Host "➕ Adding any new files..." -ForegroundColor Yellow
git add .

# Commit nếu có thay đổi
Write-Host "💾 Committing if any changes..." -ForegroundColor Yellow
git commit -m "🔄 Force deploy: Ensure latest code is deployed" || Write-Host "No changes to commit" -ForegroundColor Yellow

# Force push để trigger Render
Write-Host "📤 Force pushing to GitHub..." -ForegroundColor Yellow
git push origin master --force

Write-Host ""
Write-Host "✅ Code pushed to GitHub!" -ForegroundColor Green
Write-Host "🔗 Check Render deployment at: https://dashboard.render.com" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  IMPORTANT:" -ForegroundColor Red
Write-Host "1. Go to https://dashboard.render.com" -ForegroundColor White
Write-Host "2. Select project 'musicvndow-backend'" -ForegroundColor White
Write-Host "3. Click 'Manual Deploy' → 'Deploy latest commit'" -ForegroundColor White
Write-Host "4. Wait for build to complete (2-5 minutes)" -ForegroundColor White
Write-Host ""
Write-Host "🔍 After deployment, test with:" -ForegroundColor Yellow
Write-Host "curl https://musicvndow.onrender.com/health" -ForegroundColor White
Write-Host ""
Write-Host "Press any key when manual deploy is complete..." -ForegroundColor Magenta
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Test backend
Write-Host ""
Write-Host "🧪 Testing Backend..." -ForegroundColor Yellow
Write-Host "Testing health check..." -ForegroundColor White
try {
    $response = Invoke-WebRequest -Uri "https://musicvndow.onrender.com/health" -Method GET
    Write-Host "✅ Health check: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor White
} catch {
    Write-Host "❌ Health check failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎯 Next steps:" -ForegroundColor Yellow
Write-Host "1. Test download functionality on frontend" -ForegroundColor White
Write-Host "2. Check if yt-dlp error is fixed" -ForegroundColor White
Write-Host "3. Monitor Render logs for any issues" -ForegroundColor White
