const { MultiMethodDownloader } = require('./server.js');

// Test the fallback system
async function testFallbackSystem() {
    console.log('🧪 Testing MultiDownloader Fallback System...\n');
    
    const downloader = new MultiMethodDownloader();
    
    // Test URLs
    const testUrls = [
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Rick Roll
        'https://www.youtube.com/watch?v=jNQXAC9IVRw', // Me at the zoo
        'https://www.youtube.com/watch?v=9bZkp7q19f0'  // Gangnam Style
    ];
    
    for (const url of testUrls) {
        console.log(`\n🔗 Testing URL: ${url}`);
        console.log('─'.repeat(50));
        
        try {
            const platform = downloader.detectPlatform(url);
            console.log(`📱 Platform detected: ${platform.join(', ')}`);
            
            // Test each method individually
            for (const methodName of platform) {
                console.log(`\n🔄 Testing ${methodName} method...`);
                try {
                    const outputPath = `./downloads/test_${methodName}_${Date.now()}.%(ext)s`;
                    const result = await downloader.methods[methodName](url, outputPath);
                    console.log(`✅ ${methodName} SUCCESS: ${result.method}`);
                    break; // Stop if successful
                } catch (error) {
                    console.log(`❌ ${methodName} FAILED: ${error.message}`);
                    
                    // Analyze error type
                    if (error.message.includes('429') || error.message.includes('Too Many Requests')) {
                        console.log(`   🔴 Rate limit detected - will try next method`);
                    } else if (error.message.includes('Sign in') || error.message.includes('authentication')) {
                        console.log(`   🟡 Authentication required - will try next method`);
                    } else if (error.message.includes('pytube')) {
                        console.log(`   🟡 pytube error - will try next method`);
                    } else {
                        console.log(`   ⚠️  Generic error - will try next method`);
                    }
                }
            }
            
        } catch (error) {
            console.log(`💥 All methods failed: ${error.message}`);
        }
    }
}

// Test cookies status
async function testCookiesStatus() {
    console.log('\n🍪 Testing Cookies Status...\n');
    
    try {
        const response = await fetch('http://localhost:3000/api/cookies-status');
        const data = await response.json();
        
        console.log('Cookies Status:', JSON.stringify(data, null, 2));
        
        if (data.status === 'missing') {
            console.log('\n⚠️  No cookies.txt found!');
            console.log('📋 Recommendations:');
            data.recommendations.forEach(rec => console.log(`   • ${rec}`));
        } else {
            console.log('\n✅ Cookies available!');
            console.log(`📁 Path: ${data.path}`);
            console.log(`📊 Size: ${data.size} bytes`);
            console.log(`🕒 Last modified: ${data.lastModified}`);
        }
        
    } catch (error) {
        console.log(`❌ Could not check cookies status: ${error.message}`);
    }
}

// Run tests
async function runTests() {
    try {
        await testFallbackSystem();
        await testCookiesStatus();
    } catch (error) {
        console.error('Test failed:', error);
    }
}

// Export for use in other files
module.exports = { testFallbackSystem, testCookiesStatus };

// Run if called directly
if (require.main === module) {
    runTests();
}
