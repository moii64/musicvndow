# Test MultiDownloader Fallback System
# PowerShell script để test hệ thống fallback

Write-Host "🧪 Testing MultiDownloader Fallback System..." -ForegroundColor Cyan
Write-Host ""

# Test health endpoint
Write-Host "📊 Testing Health Endpoint..." -ForegroundColor Yellow
try {
    $healthResponse = Invoke-RestMethod -Uri "http://localhost:3000/health" -Method Get
    Write-Host "✅ Health check passed" -ForegroundColor Green
    Write-Host "   Status: $($healthResponse.status)" -ForegroundColor White
    Write-Host "   Cookies: $($healthResponse.cookies.status)" -ForegroundColor White
    
    if ($healthResponse.cookies.exists) {
        Write-Host "   🍪 Cookies available at: $($healthResponse.cookies.path)" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  No cookies.txt found - may hit rate limits" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Health check failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test cookies status endpoint
Write-Host "🍪 Testing Cookies Status..." -ForegroundColor Yellow
try {
    $cookiesResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/cookies-status" -Method Get
    Write-Host "✅ Cookies status retrieved" -ForegroundColor Green
    
    if ($cookiesResponse.status -eq "available") {
        Write-Host "   🍪 Cookies available" -ForegroundColor Green
        Write-Host "   📁 Path: $($cookiesResponse.path)" -ForegroundColor White
        Write-Host "   📊 Size: $($cookiesResponse.size) bytes" -ForegroundColor White
        Write-Host "   🕒 Modified: $($cookiesResponse.lastModified)" -ForegroundColor White
    } else {
        Write-Host "   ⚠️  Cookies missing" -ForegroundColor Yellow
        Write-Host "   📋 Recommendations:" -ForegroundColor White
        foreach ($rec in $cookiesResponse.recommendations) {
            Write-Host "      • $rec" -ForegroundColor White
        }
    }
} catch {
    Write-Host "❌ Cookies status failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test download endpoint with a simple URL
Write-Host "🔗 Testing Download Endpoint..." -ForegroundColor Yellow
$testUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ" # Rick Roll

try {
    $downloadBody = @{
        url = $testUrl
    } | ConvertTo-Json
    
    Write-Host "   Testing URL: $testUrl" -ForegroundColor White
    
    $downloadResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/download" -Method Post -Body $downloadBody -ContentType "application/json"
    
    if ($downloadResponse.success) {
        Write-Host "   ✅ Download successful!" -ForegroundColor Green
        Write-Host "      Method: $($downloadResponse.method)" -ForegroundColor White
        Write-Host "      Platform: $($downloadResponse.platform)" -ForegroundColor White
        if ($downloadResponse.filename) {
            Write-Host "      File: $($downloadResponse.filename)" -ForegroundColor White
            Write-Host "      Size: $($downloadResponse.size) bytes" -ForegroundColor White
        }
    } else {
        Write-Host "   ❌ Download failed" -ForegroundColor Red
    }
    
} catch {
    Write-Host "   ❌ Download test failed: $($_.Exception.Message)" -ForegroundColor Red
    
    # Parse error details
    if ($_.Exception.Response) {
        try {
            $errorBody = $_.Exception.Response.GetResponseStream()
            $reader = New-Object System.IO.StreamReader($errorBody)
            $errorContent = $reader.ReadToEnd()
            $errorJson = $errorContent | ConvertFrom-Json
            
            if ($errorJson.details) {
                Write-Host "      Error details:" -ForegroundColor Red
                $errorJson.details -split "`n" | ForEach-Object {
                    if ($_.Trim()) {
                        Write-Host "         $_" -ForegroundColor Red
                    }
                }
            }
        } catch {
            Write-Host "      Could not parse error details" -ForegroundColor Red
        }
    }
}

Write-Host ""
Write-Host "🎯 Test Summary:" -ForegroundColor Cyan
Write-Host "   • Health endpoint: $(if ($healthResponse) { '✅ PASS' } else { '❌ FAIL' })" -ForegroundColor $(if ($healthResponse) { 'Green' } else { 'Red' })
Write-Host "   • Cookies status: $(if ($cookiesResponse) { '✅ PASS' } else { '❌ FAIL' })" -ForegroundColor $(if ($cookiesResponse) { 'Green' } else { 'Red' })
Write-Host "   • Download test: $(if ($downloadResponse -and $downloadResponse.success) { '✅ PASS' } else { '❌ FAIL' })" -ForegroundColor $(if ($downloadResponse -and $downloadResponse.success) { 'Green' } else { 'Red' })

Write-Host ""
Write-Host "💡 Next steps:" -ForegroundColor Cyan
if ($cookiesResponse -and $cookiesResponse.status -eq "missing") {
    Write-Host "   1. Export cookies from your browser" -ForegroundColor White
    Write-Host "   2. Upload cookies.txt to server directory" -ForegroundColor White
    Write-Host "   3. Restart server and test again" -ForegroundColor White
} else {
    Write-Host "   1. System is working correctly" -ForegroundColor White
    Write-Host "   2. Try different YouTube URLs" -ForegroundColor White
    Write-Host "   3. Monitor logs for any issues" -ForegroundColor White
}

Write-Host ""
Write-Host "🏁 Testing completed!" -ForegroundColor Green
