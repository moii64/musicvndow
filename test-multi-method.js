const axios = require('axios');

const BACKEND_URL = 'https://musicvndow.onrender.com';

async function testMultiMethodSystem() {
    console.log('🧪 Testing Multi-Method Download System...\n');

    try {
        // Test 1: Health Check
        console.log('1️⃣ Testing Health Check...');
        const healthResponse = await axios.get(`${BACKEND_URL}/health`);
        console.log('✅ Health Check:', healthResponse.data);
        console.log('');

        // Test 2: YouTube URL (should use yt-dlp, pytube, youtube-dl)
        console.log('2️⃣ Testing YouTube Download (Multi-Method)...');
        const youtubeResponse = await axios.post(`${BACKEND_URL}/api/download`, {
            url: 'https://youtu.be/dQw4w9WgXcQ'
        });
        console.log('✅ YouTube Download:', youtubeResponse.data);
        console.log('');

        // Test 3: List Files
        console.log('3️⃣ Testing List Files...');
        const filesResponse = await axios.get(`${BACKEND_URL}/api/files`);
        console.log('✅ Files List:', filesResponse.data);
        console.log('');

        // Test 4: Batch Download Test
        console.log('4️⃣ Testing Batch Download...');
        const batchResponse = await axios.post(`${BACKEND_URL}/api/batch-download`, {
            urls: [
                'https://youtu.be/dQw4w9WgXcQ',
                'https://youtu.be/9bZkp7q19f0'
            ]
        });
        console.log('✅ Batch Download:', batchResponse.data);
        console.log('');

        console.log('🎉 All tests completed successfully!');
        console.log('🔧 Multi-Method System is working!');

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
        
        if (error.response?.status === 500) {
            console.log('\n🔍 Checking if backend is running old code...');
            console.log('💡 This might indicate the backend needs to be redeployed');
        }
    }
}

// Run tests
testMultiMethodSystem();
