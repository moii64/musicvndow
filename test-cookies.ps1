# Test cookies.txt and download methods on Windows
Write-Host "🧪 Testing cookies.txt and download methods...`n" -ForegroundColor Cyan

# Test 1: Check cookies.txt
Write-Host "1️⃣ Checking cookies.txt..." -ForegroundColor Yellow
$cookiesPath = Join-Path $PSScriptRoot "cookies.txt"

if (Test-Path $cookiesPath) {
    try {
        $cookiesContent = Get-Content $cookiesPath -Raw -ErrorAction Stop
        $lines = ($cookiesContent -split "`n" | Where-Object { $_.Trim() }).Count
        
        if ($cookiesContent.Trim() -and $cookiesContent.Contains("youtube.com")) {
            Write-Host "✅ cookies.txt found and valid ($lines lines)" -ForegroundColor Green
            
            # Check for key cookies
            $hasLogin = $cookiesContent.Contains("LOGIN_INFO") -or 
                       $cookiesContent.Contains("SID") -or 
                       $cookiesContent.Contains("SSID")
            
            if ($hasLogin) {
                Write-Host "✅ Contains authentication cookies" -ForegroundColor Green
            } else {
                Write-Host "⚠️ May not contain authentication cookies" -ForegroundColor Yellow
            }
        } else {
            Write-Host "❌ cookies.txt exists but appears invalid or empty" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ Error reading cookies.txt: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "❌ cookies.txt not found" -ForegroundColor Red
}

# Test 2: Check pytube script
Write-Host "`n2️⃣ Checking pytube_downloader.py..." -ForegroundColor Yellow
$pytubeScript = Join-Path $PSScriptRoot "pytube_downloader.py"

if (Test-Path $pytubeScript) {
    Write-Host "✅ pytube_downloader.py found" -ForegroundColor Green
} else {
    Write-Host "❌ pytube_downloader.py not found" -ForegroundColor Red
}

# Test 3: Check Python availability
Write-Host "`n3️⃣ Checking Python availability..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Python found: $pythonVersion" -ForegroundColor Green
    } else {
        Write-Host "❌ Python not found" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Python not found" -ForegroundColor Red
}

# Test 4: Check yt-dlp
Write-Host "`n4️⃣ Checking yt-dlp..." -ForegroundColor Yellow
try {
    $ytdlpVersion = python -m yt_dlp --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ yt-dlp found: $ytdlpVersion" -ForegroundColor Green
    } else {
        Write-Host "❌ yt-dlp not found" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ yt-dlp not found" -ForegroundColor Red
}

# Test 5: Check youtube-dl
Write-Host "`n5️⃣ Checking youtube-dl..." -ForegroundColor Yellow
try {
    $youtubeDlVersion = python -m youtube_dl --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ youtube-dl found: $youtubeDlVersion" -ForegroundColor Green
    } else {
        Write-Host "❌ youtube-dl not found" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ youtube-dl not found" -ForegroundColor Red
}

# Test 6: Test cookies with yt-dlp (dry run)
Write-Host "`n6️⃣ Testing cookies with yt-dlp (dry run)..." -ForegroundColor Yellow
if (Test-Path $cookiesPath) {
    $testUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    $command = "python -m yt_dlp --cookies `"$cookiesPath`" --skip-download --print title `"$testUrl`""
    
    try {
        $result = Invoke-Expression $command 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Cookies working! Title: $result" -ForegroundColor Green
        } else {
            if ($result -match "429") {
                Write-Host "❌ Rate limited (HTTP 429) - cookies may be invalid or expired" -ForegroundColor Red
            } elseif ($result -match "Sign in") {
                Write-Host "❌ Authentication required - cookies may be invalid or expired" -ForegroundColor Red
            } else {
                Write-Host "❌ Error: $result" -ForegroundColor Red
            }
        }
    } catch {
        Write-Host "❌ Error testing cookies: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "⚠️ Skipping cookies test - no cookies.txt" -ForegroundColor Yellow
}

Write-Host "`n🧪 Test completed. Check results above.`n" -ForegroundColor Cyan
