const axios = require('axios');

const BACKEND_URL = 'https://musicvndow.onrender.com';

// Different YouTube URLs to test
const testUrls = [
    'https://youtu.be/dQw4w9WgXcQ',  // Rick Roll
    'https://youtu.be/9bZkp7q19f0',  // Gangnam Style
    'https://youtu.be/kJQP7kiw5Fk',  // Despacito
    'https://youtu.be/OPf0YbXqDm0',  // Uptown Funk
    'https://youtu.be/ZZ5LpwO-An4'   // Shape of You
];

async function testYouTubeDownloads() {
    console.log('🎵 Testing YouTube Downloads with Multiple URLs...\n');

    for (let i = 0; i < testUrls.length; i++) {
        const url = testUrls[i];
        console.log(`${i + 1}️⃣ Testing: ${url}`);
        
        try {
            const response = await axios.post(`${BACKEND_URL}/api/download`, { url });
            console.log('✅ SUCCESS:', response.data);
            console.log('');
            
            // If one succeeds, we can stop
            return response.data;
            
        } catch (error) {
            console.log('❌ FAILED:', error.response?.data?.error || error.message);
            console.log('');
        }
        
        // Wait a bit between requests
        if (i < testUrls.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
    
    console.log('🚨 All YouTube URLs failed!');
    console.log('💡 This indicates a system-wide issue, not URL-specific');
}

// Run test
testYouTubeDownloads();
