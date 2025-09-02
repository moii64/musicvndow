// Test Multiple URLs to check backend behavior
const testMultipleUrls = async () => {
    console.log('🧪 Testing Multiple URLs...');
    
    const testUrls = [
        'https://youtu.be/dQw4w9WgXcQ', // Rick Roll
        'https://www.youtube.com/watch?v=jNQXAC9IVRw', // Me at the zoo (first YouTube video)
        'https://youtu.be/9bZkp7q19f0' // PSY - GANGNAM STYLE
    ];
    
    for (let i = 0; i < testUrls.length; i++) {
        const url = testUrls[i];
        console.log(`\n${i + 1}. Testing: ${url}`);
        
        try {
            const response = await fetch('https://musicvndow.onrender.com/api/download', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    url: url,
                    format: 'mp3'
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('✅ Success:', data.message);
            } else {
                const errorText = await response.text();
                console.log('❌ Error:', response.status);
                
                // Check if it's old or new code
                if (errorText.includes('python3 -m yt_dlp')) {
                    console.log('🚨 OLD CODE detected (python3)');
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
            
            // Wait between requests
            await new Promise(resolve => setTimeout(resolve, 2000));
            
        } catch (error) {
            console.error('❌ Request failed:', error.message);
        }
    }
    
    console.log('\n🎯 Summary:');
    console.log('- If you see "OLD CODE detected" → Render chưa deploy code mới');
    console.log('- If you see "NEW CODE detected" → Backend đã được fix');
    console.log('- If you see "Rate limited" → YouTube đang block requests');
};

// Run test
testMultipleUrls();
