// Test Simple Download (without cookies)
const testSimpleDownload = async () => {
    console.log('🧪 Testing Simple Download (no cookies)...');
    
    try {
        // Test download without cookies
        const response = await fetch('https://musicvndow.onrender.com/api/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: 'https://youtu.be/dQw4w9WgXcQ', // Rick Roll - test video
                format: 'mp3'
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Download Success:', data);
        } else {
            const errorText = await response.text();
            console.log('❌ Download Error:', response.status, errorText);
            
            // Check if it's the old code or new code
            if (errorText.includes('python3 -m yt_dlp')) {
                console.log('🚨 Still running OLD CODE (python3)');
                console.log('💡 Need to wait for Render to deploy new code');
            } else if (errorText.includes('python -m yt_dlp')) {
                console.log('✅ Running NEW CODE (python fallback)');
            }
        }
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
};

// Run test
testSimpleDownload();
