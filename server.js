const express = require('express');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const multer = require('multer');
const cors = require('cors');
const archiver = require('archiver');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/downloads', express.static('downloads'));

// Multer config cho upload file
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API để download từ URL
app.post('/api/download', async (req, res) => {
    const { url, format = 'mp3', quality = 'best' } = req.body;
    
    if (!url) {
        return res.status(400).json({ error: 'URL không được để trống' });
    }

    try {
        const downloadPath = './downloads';
        const outputTemplate = path.join(downloadPath, '%(title)s.%(ext)s');
        
        const ytdlp = spawn('yt-dlp', [
            url,
            '-x',
            '--audio-format', format,
            '--audio-quality', '0',
            '-o', outputTemplate,
            '--write-thumbnail',
            '--add-metadata',
            '--extract-audio',
            '--format', 'bestaudio/best'
        ]);

        let output = '';
        let error = '';

        ytdlp.stdout.on('data', (data) => {
            output += data.toString();
        });

        ytdlp.stderr.on('data', (data) => {
            error += data.toString();
        });

        ytdlp.on('close', (code) => {
            if (code === 0) {
                res.json({ 
                    success: true, 
                    message: 'Download thành công',
                    output: output 
                });
            } else {
                res.status(500).json({ 
                    success: false, 
                    error: 'Download thất bại',
                    details: error 
                });
            }
        });

    } catch (err) {
        res.status(500).json({ 
            success: false, 
            error: 'Lỗi server',
            details: err.message 
        });
    }
});

// API để lấy danh sách file đã download
app.get('/api/files', (req, res) => {
    const downloadPath = './downloads';
    
    console.log('API /api/files called');
    
    try {
        // Tạo thư mục downloads nếu chưa tồn tại
        if (!fs.existsSync(downloadPath)) {
            console.log('Creating downloads directory');
            fs.mkdirSync(downloadPath, { recursive: true });
        }

        fs.readdir(downloadPath, (err, files) => {
            if (err) {
                console.error('Error reading downloads directory:', err);
                return res.status(500).json({ error: 'Không thể đọc thư mục downloads' });
            }

            console.log('All files in downloads:', files);

                    const fileList = files
            .map(file => {
                    try {
                        const filePath = path.join(downloadPath, file);
                        const stats = fs.statSync(filePath);
                        return {
                            name: file,
                            size: stats.size,
                            date: stats.mtime,
                            url: `/downloads/${encodeURIComponent(file)}`
                        };
                    } catch (statErr) {
                        console.error('Error getting file stats for:', file, statErr);
                        return {
                            name: file,
                            size: 0,
                            date: new Date(),
                            url: `/downloads/${encodeURIComponent(file)}`
                        };
                    }
                });

            console.log('Filtered files:', fileList);
            res.json({ files: fileList });
        });
    } catch (error) {
        console.error('Error in /api/files:', error);
        res.status(500).json({ error: 'Lỗi server khi lấy danh sách file' });
    }
});

// API để xóa file
app.delete('/api/files/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join('./downloads', filename);

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        res.json({ success: true, message: 'File đã được xóa' });
    } else {
        res.status(404).json({ error: 'File không tồn tại' });
    }
});

// API để xóa tất cả file
app.delete('/api/delete-all', (req, res) => {
    const downloadPath = './downloads';
    
    if (!fs.existsSync(downloadPath)) {
        return res.json({ success: true, deletedCount: 0, message: 'Không có file nào để xóa' });
    }

    try {
        const files = fs.readdirSync(downloadPath);
        let deletedCount = 0;

        // Delete only audio/video files
        files.forEach(file => {
            if (file.endsWith('.mp3') || file.endsWith('.mp4') || file.endsWith('.wav')) {
                const filePath = path.join(downloadPath, file);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    deletedCount++;
                }
            }
        });

        res.json({ 
            success: true, 
            deletedCount: deletedCount, 
            message: `Đã xóa ${deletedCount} file` 
        });
    } catch (err) {
        console.error('Error deleting all files:', err);
        res.status(500).json({ error: 'Lỗi khi xóa file' });
    }
});

// API để batch download từ playlist
app.post('/api/batch-download', async (req, res) => {
    const { urls, format = 'mp3' } = req.body;
    
    if (!urls || !Array.isArray(urls)) {
        return res.status(400).json({ error: 'Danh sách URL không hợp lệ' });
    }

    const results = [];
    
    for (const url of urls) {
        try {
            const downloadPath = './downloads';
            const outputTemplate = path.join(downloadPath, '%(title)s.%(ext)s');
            
            await new Promise((resolve, reject) => {
                const ytdlp = spawn('yt-dlp', [
                    url,
                    '-x',
                    '--audio-format', format,
                    '--audio-quality', '0',
                    '-o', outputTemplate,
                    '--write-thumbnail',
                    '--add-metadata',
                    '--extract-audio',
                    '--format', 'bestaudio/best'
                ]);

                ytdlp.on('close', (code) => {
                    if (code === 0) {
                        results.push({ url, status: 'success' });
                    } else {
                        results.push({ url, status: 'failed' });
                    }
                    resolve();
                });

                ytdlp.on('error', () => {
                    results.push({ url, status: 'failed' });
                    resolve();
                });
            });
        } catch (err) {
            results.push({ url, status: 'failed', error: err.message });
        }
    }

    res.json({ success: true, results });
});

// API để tải tất cả file dưới dạng zip
app.post('/api/download-all', async (req, res) => {
    const { files } = req.body;
    
    if (!files || !Array.isArray(files) || files.length === 0) {
        return res.status(400).json({ error: 'Không có file nào để tải' });
    }

    try {
        const archive = archiver('zip', {
            zlib: { level: 9 } // Sets the compression level
        });

        // Set response headers
        res.attachment(`all-files-${new Date().toISOString().split('T')[0]}.zip`);
        archive.pipe(res);

        // Add each file to the zip
        for (const file of files) {
            const filePath = path.join('./downloads', file.name);
            if (fs.existsSync(filePath)) {
                archive.file(filePath, { name: file.name });
            }
        }

        // Finalize the archive
        await archive.finalize();

    } catch (err) {
        console.error('Error creating zip:', err);
        res.status(500).json({ error: 'Lỗi khi tạo file zip' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    console.log(`📁 Thư mục downloads: ${path.resolve('./downloads')}`);
});
