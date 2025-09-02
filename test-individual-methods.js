const axios = require('axios');

const BACKEND_URL = 'https://musicvndow.onrender.com';

async function testIndividualMethods() {
    console.log('🧪 Testing Individual Download Methods...\n');

    // Test 1: Health Check
    try {
        console.log('1️⃣ Testing Health Check...');
        const healthResponse = await axios.get(`${BACKEND_URL}/health`);
        console.log('✅ Health Check:', healthResponse.data);
        console.log('');
    } catch (error) {
        console.log('❌ Health Check Failed:', error.message);
        return;
    }

    // Test 2: List Files (to see if backend is working)
    try {
        console.log('2️⃣ Testing List Files...');
        const filesResponse = await axios.get(`${BACKEND_URL}/api/files`);
        console.log('✅ Files List:', filesResponse.data);
        console.log('');
    } catch (error) {
        console.log('❌ List Files Failed:', error.message);
    }

    // Test 3: Test with a different YouTube URL
    try {
        console.log('3️⃣ Testing with Different YouTube URL...');
        const downloadResponse = await axios.post(`${BACKEND_URL}/api/download`, {
            url: 'https://youtu.be/9bZkp7q19f0' // Gangnam Style
        });
        console.log('✅ Download Success:', downloadResponse.data);
        console.log('');
    } catch (error) {
        console.log('❌ Download Failed:', error.response?.data || error.message);
        console.log('🔍 Error Details:', error.response?.status, error.response?.statusText);
    }

    // Test 4: Test with a very short YouTube video
    try {
        console.log('4️⃣ Testing with Short YouTube Video...');
        const downloadResponse = await axios.post(`${BACKEND_URL}/api/download`, {
            url: 'https://youtu.be/kJQP7kiw5Fk' // Despacito
        });
        console.log('✅ Download Success:', downloadResponse.data);
        console.log('');
    } catch (error) {
        console.log('❌ Download Failed:', error.response?.data || error.message);
        console.log('🔍 Error Details:', error.response?.status, error.response?.statusText);
    }
}

// Run tests
testIndividualMethods();
