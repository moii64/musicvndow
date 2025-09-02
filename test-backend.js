// Test Backend API
const testBackend = async () => {
    console.log('🧪 Testing Backend API...');
    
    try {
        // Test 1: Health Check
        console.log('\n1. Testing Health Check...');
        const healthResponse = await fetch('https://musicvndow.onrender.com/health');
        const healthData = await healthResponse.json();
        console.log('✅ Health Check:', healthData);
        
        // Test 2: List Files
        console.log('\n2. Testing List Files...');
        const filesResponse = await fetch('https://musicvndow.onrender.com/api/files');
        const filesData = await filesResponse.json();
        console.log('✅ List Files:', filesData);
        
        // Test 3: Download (with error handling)
        console.log('\n3. Testing Download API...');
        const downloadResponse = await fetch('https://musicvndow.onrender.com/api/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: 'https://youtu.be/HsgTIMDA6ps?si=aej5HOF',
                format: 'mp3'
            })
        });
        
        if (downloadResponse.ok) {
            const downloadData = await downloadResponse.json();
            console.log('✅ Download API Response:', downloadData);
        } else {
            const errorData = await downloadResponse.text();
            console.log('❌ Download API Error:', downloadResponse.status, errorData);
        }
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
};

// Run test
testBackend();
