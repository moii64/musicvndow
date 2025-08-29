const { GPT4All } = require('gpt4all');

// Kiểm tra xem GPT4All có sẵn không
async function checkGPT4All() {
    try {
        // Kiểm tra xem module có được cài đặt không
        const gpt4all = require('gpt4all');
        console.log('✅ GPT4All module đã được cài đặt');
        
        // Kiểm tra phiên bản
        console.log('📦 Phiên bản GPT4All:', require('gpt4all/package.json').version);
        
        return true;
    } catch (error) {
        console.log('❌ GPT4All chưa được cài đặt');
        console.log('💡 Chạy: npm install gpt4all');
        return false;
    }
}

// Kiểm tra model có sẵn không
async function checkModel(modelName = 'ggml-gpt4all-j-v1.3-groovy') {
    try {
        const gpt4all = new GPT4All(modelName);
        
        // Kiểm tra xem model có tồn tại không
        const isModelDownloaded = await gpt4all.isModelDownloaded();
        
        if (isModelDownloaded) {
            console.log(`✅ Model "${modelName}" đã được tải`);
            return true;
        } else {
            console.log(`⚠️ Model "${modelName}" chưa được tải`);
            console.log('💡 Đang tải model...');
            
            // Tải model
            await gpt4all.downloadModel();
            console.log(`✅ Đã tải xong model "${modelName}"`);
            return true;
        }
    } catch (error) {
        console.log(`❌ Lỗi khi kiểm tra model "${modelName}":`, error.message);
        return false;
    }
}

// Kiểm tra kết nối và test chat
async function testChat() {
    try {
        const gpt4all = new GPT4All('ggml-gpt4all-j-v1.3-groovy');
        
        // Khởi tạo model
        await gpt4all.init();
        console.log('✅ Model đã được khởi tạo thành công');
        
        // Test chat đơn giản
        const response = await gpt4all.chat([
            { role: 'user', content: 'Xin chào! Bạn có thể giúp tôi không?' }
        ]);
        
        console.log('🤖 Phản hồi từ GPT4All:');
        console.log(response.choices[0].message.content);
        
        // Đóng kết nối
        await gpt4all.close();
        console.log('✅ Kết nối đã được đóng');
        
        return true;
    } catch (error) {
        console.log('❌ Lỗi khi test chat:', error.message);
        return false;
    }
}

// Hàm kiểm tra tổng hợp
async function runAllChecks() {
    console.log('🔍 Bắt đầu kiểm tra GPT4All...\n');
    
    // Kiểm tra module
    const moduleCheck = await checkGPT4All();
    if (!moduleCheck) return;
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Kiểm tra model
    const modelCheck = await checkModel();
    if (!modelCheck) return;
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Test chat
    await testChat();
    
    console.log('\n' + '='.repeat(50));
    console.log('✅ Hoàn thành kiểm tra GPT4All!');
}

// Chạy kiểm tra nếu file được thực thi trực tiếp
if (require.main === module) {
    runAllChecks().catch(console.error);
}

module.exports = {
    checkGPT4All,
    checkModel,
    testChat,
    runAllChecks
};

