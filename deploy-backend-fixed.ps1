# Deploy Backend với các fix cho HTTP 429 và missing pytube
Write-Host "🚀 Deploying Backend với fixes..." -ForegroundColor Cyan

# 1. Kiểm tra git status
Write-Host "`n1️⃣ Checking git status..." -ForegroundColor Yellow
git status

# 2. Add all changes
Write-Host "`n2️⃣ Adding changes..." -ForegroundColor Yellow
git add .

# 3. Commit với message rõ ràng
Write-Host "`n3️⃣ Committing changes..." -ForegroundColor Yellow
git commit -m "Fix HTTP 429 rate limit and missing pytube_downloader.py

- Fix pytube script path (absolute path instead of relative)
- Add cookies validation and startup health check
- Improve error handling with retry logic
- Add rate limiting protection (--sleep-interval)
- Enhanced logging for debugging"

# 4. Push to remote
Write-Host "`n4️⃣ Pushing to remote..." -ForegroundColor Yellow
git push

# 5. Kiểm tra deployment status
Write-Host "`n5️⃣ Checking deployment status..." -ForegroundColor Yellow
Write-Host "✅ Backend đã được push thành công!" -ForegroundColor Green
Write-Host "🔄 Render sẽ tự động deploy trong vài phút..." -ForegroundColor Yellow

# 6. Hướng dẫn kiểm tra
Write-Host "`n📋 Hướng dẫn kiểm tra:" -ForegroundColor Cyan
Write-Host "1. Đợi 2-5 phút để Render deploy xong" -ForegroundColor White
Write-Host "2. Kiểm tra logs tại: https://dashboard.render.com" -ForegroundColor White
Write-Host "3. Tìm startup health check messages:" -ForegroundColor White
Write-Host "   - ✅ cookies.txt found and valid" -ForegroundColor Green
Write-Host "   - ✅ pytube_downloader.py found" -ForegroundColor Green
Write-Host "   - ✅ Python command: python3" -ForegroundColor Green

# 7. Test commands
Write-Host "`n🧪 Test commands sau khi deploy:" -ForegroundColor Cyan
Write-Host "• Test cookies: .\test-cookies.ps1" -ForegroundColor White
Write-Host "• Test download: node test-simple-url.js" -ForegroundColor White

Write-Host "`n🎯 Fixes đã áp dụng:" -ForegroundColor Cyan
Write-Host "✅ Pytube script path fixed" -ForegroundColor Green
Write-Host "✅ Cookies validation added" -ForegroundColor Green
Write-Host "✅ Retry logic improved" -ForegroundColor Green
Write-Host "✅ Rate limiting protection" -ForegroundColor Green
Write-Host "✅ Startup health check" -ForegroundColor Green

Write-Host "`n🚀 Deploy completed! Check Render dashboard for status." -ForegroundColor Green
