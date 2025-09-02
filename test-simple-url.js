// Test with simple URL
const testSimpleUrl = async () => {
    console.log('🧪 Testing with simple URL...');
    
    try {
        // Test with a very simple URL
        const response = await fetch('https://musicvndow.onrender.com/api/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw', // First YouTube video
                format: 'mp3'
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Download Success:', data);
        } else {
            const errorText = await response.text();
            console.log('❌ Download Error:', response.status);
            
            // Check if it's old or new code
            if (errorText.includes('python3 -m yt_dlp')) {
                console.log('🚨 OLD CODE detected (python3)');
                console.log('💡 Need to force deploy on Render');
            } else if (errorText.includes('python -m yt_dlp')) {
                console.log('✅ NEW CODE detected (python fallback)');
            }
            
            // Check for specific errors
            if (errorText.includes('HTTP Error 429')) {
                console.log('⚠️  Rate limited by YouTube');
            }
            if (errorText.includes('Sign in to confirm you\'re not a bot')) {
                console.log('⚠️  Bot detection by YouTube');
            }
        }
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
};

// Run test
testSimpleUrl();
