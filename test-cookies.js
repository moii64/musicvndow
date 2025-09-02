#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

console.log('🧪 Testing cookies.txt and download methods...\n');

// Test 1: Check cookies.txt
console.log('1️⃣ Checking cookies.txt...');
const cookiesPath = path.join(__dirname, 'cookies.txt');

if (fs.existsSync(cookiesPath)) {
    try {
        const cookiesContent = fs.readFileSync(cookiesPath, 'utf8');
        const lines = cookiesContent.split('\n').filter(line => line.trim());
        
        if (cookiesContent.trim() && cookiesContent.includes('youtube.com')) {
            console.log(`✅ cookies.txt found and valid (${lines.length} lines)`);
            
            // Check for key cookies
            const hasLogin = cookiesContent.includes('LOGIN_INFO') || 
                           cookiesContent.includes('SID') || 
                           cookiesContent.includes('SSID');
            
            if (hasLogin) {
                console.log('✅ Contains authentication cookies');
            } else {
                console.log('⚠️ May not contain authentication cookies');
            }
        } else {
            console.log('❌ cookies.txt exists but appears invalid or empty');
        }
    } catch (err) {
        console.log(`❌ Error reading cookies.txt: ${err.message}`);
    }
} else {
    console.log('❌ cookies.txt not found');
}

// Test 2: Check pytube script
console.log('\n2️⃣ Checking pytube_downloader.py...');
const pytubeScript = path.join(__dirname, 'pytube_downloader.py');

if (fs.existsSync(pytubeScript)) {
    console.log('✅ pytube_downloader.py found');
} else {
    console.log('❌ pytube_downloader.py not found');
}

// Test 3: Check Python availability
console.log('\n3️⃣ Checking Python availability...');
exec('python3 --version', (error, stdout, stderr) => {
    if (error) {
        exec('python --version', (error2, stdout2, stderr2) => {
            if (error2) {
                console.log('❌ Python not found');
            } else {
                console.log(`✅ Python found: ${stdout2.trim()}`);
            }
        });
    } else {
        console.log(`✅ Python3 found: ${stdout.trim()}`);
    }
});

// Test 4: Check yt-dlp
console.log('\n4️⃣ Checking yt-dlp...');
exec('python3 -m yt_dlp --version', (error, stdout, stderr) => {
    if (error) {
        console.log('❌ yt-dlp not found');
    } else {
        console.log(`✅ yt-dlp found: ${stdout.trim()}`);
    }
});

// Test 5: Check youtube-dl
console.log('\n5️⃣ Checking youtube-dl...');
exec('python3 -m youtube_dl --version', (error, stdout, stderr) => {
    if (error) {
        console.log('❌ youtube-dl not found');
    } else {
        console.log(`✅ youtube-dl found: ${stdout.trim()}`);
    }
});

// Test 6: Test cookies with yt-dlp (dry run)
console.log('\n6️⃣ Testing cookies with yt-dlp (dry run)...');
if (fs.existsSync(cookiesPath)) {
    const testUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    const command = `python3 -m yt_dlp --cookies "${cookiesPath}" --skip-download --print title "${testUrl}"`;
    
    exec(command, { timeout: 30000 }, (error, stdout, stderr) => {
        if (error) {
            if (error.message.includes('429')) {
                console.log('❌ Rate limited (HTTP 429) - cookies may be invalid or expired');
            } else if (error.message.includes('Sign in')) {
                console.log('❌ Authentication required - cookies may be invalid or expired');
            } else {
                console.log(`❌ Error: ${error.message}`);
            }
        } else {
            console.log(`✅ Cookies working! Title: ${stdout.trim()}`);
        }
    });
} else {
    console.log('⚠️ Skipping cookies test - no cookies.txt');
}

console.log('\n🧪 Test completed. Check results above.\n');
