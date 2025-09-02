const axios = require('axios');

const BACKEND_URL = 'https://musicvndow.onrender.com';

async function testAlternativePlatforms() {
    console.log('🎵 Testing Alternative Platforms (bypass YouTube rate limit)...\n');

    // Test 1: SoundCloud (should work with scdl)
    try {
        console.log('1️⃣ Testing SoundCloud Download...');
        const scResponse = await axios.post(`${BACKEND_URL}/api/download`, {
            url: 'https://soundcloud.com/example-track' // Replace with real SoundCloud URL
        });
        console.log('✅ SoundCloud Success:', scResponse.data);
        console.log('');
    } catch (error) {
        console.log('❌ SoundCloud Failed:', error.response?.data?.error || error.message);
        console.log('');
    }

    // Test 2: Spotify (should work with spotdl)
    try {
        console.log('2️⃣ Testing Spotify Download...');
        const spotifyResponse = await axios.post(`${BACKEND_URL}/api/download`, {
            url: 'https://open.spotify.com/track/example' // Replace with real Spotify URL
        });
        console.log('✅ Spotify Success:', spotifyResponse.data);
        console.log('');
    } catch (error) {
        console.log('❌ Spotify Failed:', error.response?.data?.error || error.message);
        console.log('');
    }

    // Test 3: Health check to confirm backend is working
    try {
        console.log('3️⃣ Testing Backend Health...');
        const healthResponse = await axios.get(`${BACKEND_URL}/health`);
        console.log('✅ Backend Health:', healthResponse.data);
        console.log('');
    } catch (error) {
        console.log('❌ Backend Health Failed:', error.message);
    }
}

// Run tests
testAlternativePlatforms();
