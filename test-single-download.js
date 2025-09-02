const axios = require('axios');

const BACKEND_URL = 'https://musicvndow.onrender.com';

async function testSingleDownload() {
    console.log('🎵 Testing Single YouTube Download...\n');

    // Test with a shorter YouTube video
    const testUrl = 'https://youtu.be/9bZkp7q19f0'; // Gangnam Style - shorter video
    
    try {
        console.log(`📥 Attempting to download: ${testUrl}`);
        console.log('⏳ Please wait...\n');
        
        const response = await axios.post(`${BACKEND_URL}/api/download`, {
            url: testUrl
        });
        
        console.log('✅ DOWNLOAD SUCCESS!');
        console.log('📊 Response:', response.data);
        
    } catch (error) {
        console.log('❌ DOWNLOAD FAILED!');
        console.log('🔍 Error Details:', error.response?.data || error.message);
        
        if (error.response?.status === 500) {
            console.log('\n🚨 Backend Error - System not working properly');
        }
    }
}

// Run test
testSingleDownload();
