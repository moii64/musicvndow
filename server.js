const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const archiver = require('archiver');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Tạo thư mục downloads nếu chưa có
const downloadPath = path.join(__dirname, 'downloads');
if (!fs.existsSync(downloadPath)) {
    fs.mkdirSync(downloadPath, { recursive: true });
}

// Serve static files từ downloads
app.use('/downloads', express.static(downloadPath));

// API để download từ URL
app.post('/api/download', async (req, res) => {
    const { url, format = 'mp3' } = req.body;
    
    if (!url) {
        return res.status(400).json({
            success: false,
            error: 'URL không được để trống'
        });
    }

    console.log(`Downloading: ${url} in ${format} format`);

    // Kiểm tra yt-dlp có sẵn không
    const ytdlpCheck = spawn('yt-dlp', ['--version']);
    
    ytdlpCheck.on('error', (err) => {
        console.error('yt-dlp not found:', err);
        return res.status(500).json({
            success: false,
            error: 'yt-dlp chưa được cài đặt. Vui lòng chạy: npm run install-ytdlp'
        });
    });

    ytdlpCheck.on('close', (code) => {
        if (code !== 0) {
            return res.status(500).json({
                success: false,
                error: 'yt-dlp không hoạt động. Vui lòng cài đặt lại.'
            });
        }

        // Thực hiện download
        const args = [
            url,
            '-x',
            '--audio-format', format,
            '--audio-quality', '0',
            '-o', path.join(downloadPath, '%(title)s.%(ext)s'),
            '--write-thumbnail',
            '--add-metadata',
            '--extract-audio',
            '--format', 'bestaudio/best'
        ];

        const ytdlp = spawn('yt-dlp', args);
        let output = '';

        ytdlp.stdout.on('data', (data) => {
            output += data.toString();
            console.log('yt-dlp output:', data.toString());
        });

        ytdlp.stderr.on('data', (data) => {
            output += data.toString();
            console.log('yt-dlp error:', data.toString());
        });

        ytdlp.on('close', (code) => {
            if (code === 0) {
                // Tìm file vừa download
                fs.readdir(downloadPath, (err, files) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            error: 'Không thể đọc thư mục downloads'
                        });
                    }

                    // Tìm file mới nhất
                    const audioFiles = files.filter(file =>
                        file.endsWith('.mp3') || file.endsWith('.mp4') || file.endsWith('.wav')
                    );

                    if (audioFiles.length > 0) {
                        const latestFile = audioFiles[audioFiles.length - 1];
                        const filePath = path.join(downloadPath, latestFile);
                        const stats = fs.statSync(filePath);

                        res.json({
                            success: true,
                            message: 'Download thành công',
                            file: {
                                name: latestFile,
                                size: stats.size,
                                url: `/downloads/${encodeURIComponent(latestFile)}`,
                                downloadUrl: `${req.protocol}://${req.get('host')}/downloads/${encodeURIComponent(latestFile)}`
                            },
                            output: output
                        });
                    } else {
                        res.json({
                            success: true,
                            message: 'Download thành công nhưng không tìm thấy file',
                            output: output
                        });
                    }
                });
            } else {
                res.status(500).json({
                    success: false,
                    error: `Download thất bại với code: ${code}`,
                    output: output
                });
            }
        });

        ytdlp.on('error', (err) => {
            console.error('yt-dlp error:', err);
            res.status(500).json({
                success: false,
                error: 'Lỗi khi chạy yt-dlp',
                details: err.message
            });
        });
    });
});

// API để lấy danh sách file
app.get('/api/files', (req, res) => {
    console.log('API /api/files called');
    
    fs.readdir(downloadPath, (err, files) => {
        if (err) {
            console.error('Error reading downloads directory:', err);
            return res.status(500).json({
                success: false,
                error: 'Không thể đọc thư mục downloads'
            });
        }

        console.log('All files in downloads:', files);
        
        const fileList = files
            .filter(file => true) // Hiển thị tất cả file
            .map(file => {
                try {
                    const filePath = path.join(downloadPath, file);
                    const stats = fs.statSync(filePath);
                    
                    return {
                        name: file,
                        size: stats.size,
                        date: stats.mtime,
                        url: `/downloads/${encodeURIComponent(file)}`,
                        downloadUrl: `${req.protocol}://${req.get('host')}/downloads/${encodeURIComponent(file)}`
                    };
                } catch (statErr) {
                    console.error(`Error getting stats for ${file}:`, statErr);
                    return {
                        name: file,
                        size: 0,
                        date: new Date(),
                        url: `/downloads/${encodeURIComponent(file)}`,
                        downloadUrl: `${req.protocol}://${req.get('host')}/downloads/${encodeURIComponent(file)}`
                    };
                }
            });

        console.log('Filtered files:', fileList);
        
        res.json({
            success: true,
            files: fileList
        });
    });
});

// API để xóa file
app.delete('/api/files/:filename', (req, res) => {
    const filename = decodeURIComponent(req.params.filename);
    const filePath = path.join(downloadPath, filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({
            success: false,
            error: 'File không tồn tại'
        });
    }

    try {
        fs.unlinkSync(filePath);
        res.json({
            success: true,
            message: 'File đã được xóa'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Lỗi khi xóa file'
        });
    }
});

// API để xóa tất cả file
app.delete('/api/delete-all', (req, res) => {
    fs.readdir(downloadPath, (err, files) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: 'Không thể đọc thư mục downloads'
            });
        }

        let deletedCount = 0;
        files.forEach(file => {
            try {
                const filePath = path.join(downloadPath, file);
                fs.unlinkSync(filePath);
                deletedCount++;
            } catch (err) {
                console.error(`Error deleting ${file}:`, err);
            }
        });

        res.json({
            success: true,
            message: `Đã xóa ${deletedCount} file`,
            deletedCount
        });
    });
});

// API để download tất cả file dưới dạng ZIP
app.post('/api/download-all', (req, res) => {
    fs.readdir(downloadPath, (err, files) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: 'Không thể đọc thư mục downloads'
            });
        }

        if (files.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Không có file nào để tải'
            });
        }

        const archive = archiver('zip');
        const zipName = `all-files-${new Date().toISOString().split('T')[0]}.zip`;

        res.attachment(zipName);
        archive.pipe(res);

        files.forEach(file => {
            const filePath = path.join(downloadPath, file);
            archive.file(filePath, { name: file });
        });

        archive.finalize();
    });
});

// API để download hàng loạt
app.post('/api/batch-download', async (req, res) => {
    const { urls, format = 'mp3' } = req.body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
        return res.status(400).json({
            success: false,
            error: 'Danh sách URL không hợp lệ'
        });
    }

    const results = [];

    for (const url of urls) {
        try {
            const result = await new Promise((resolve, reject) => {
                const args = [
                    url,
                    '-x',
                    '--audio-format', format,
                    '--audio-quality', '0',
                    '-o', path.join(downloadPath, '%(title)s.%(ext)s'),
                    '--write-thumbnail',
                    '--add-metadata',
                    '--extract-audio',
                    '--format', 'bestaudio/best'
                ];

                const ytdlp = spawn('yt-dlp', args);
                let output = '';

                ytdlp.stdout.on('data', (data) => {
                    output += data.toString();
                });

                ytdlp.stderr.on('data', (data) => {
                    output += data.toString();
                });

                ytdlp.on('close', (code) => {
                    if (code === 0) {
                        resolve({ status: 'success', url, output });
                    } else {
                        reject({ status: 'error', url, error: `Exit code: ${code}`, output });
                    }
                });

                ytdlp.on('error', (err) => {
                    reject({ status: 'error', url, error: err.message });
                });
            });

            results.push(result);
        } catch (error) {
            results.push(error);
        }
    }

    res.json({
        success: true,
        results
    });
});

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Backend đang chạy tại http://localhost:${PORT}`);
    console.log(`📁 Thư mục downloads: ${downloadPath}`);
    console.log(`🔧 Health check: http://localhost:${PORT}/health`);
    console.log(`📋 API docs: http://localhost:${PORT}/api/files`);
});
