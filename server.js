const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const archiver = require('archiver');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Create directories if they don't exist
const uploadsPath = path.join(__dirname, 'uploads');
const downloadsPath = path.join(__dirname, 'downloads');

[uploadsPath, downloadsPath].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Multi-Method Download System
class MultiMethodDownloader {
    constructor() {
        this.methods = {
            ytdlp: this.downloadWithYtDlp.bind(this),
            pytube: this.downloadWithPytube.bind(this),
            youtubeDl: this.downloadWithYoutubeDl.bind(this),
            spotdl: this.downloadWithSpotdl.bind(this),
            scdl: this.downloadWithScdl.bind(this)
        };
    }

    // Detect platform and select best methods
    detectPlatform(url) {
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            return ['ytdlp', 'pytube', 'youtubeDl'];
        } else if (url.includes('spotify.com')) {
            return ['ytdlp', 'spotdl'];
        } else if (url.includes('soundcloud.com')) {
            return ['ytdlp', 'scdl'];
        } else if (url.includes('tiktok.com') || url.includes('facebook.com')) {
            return ['ytdlp'];
        } else {
            return ['ytdlp', 'youtubeDl']; // Default fallback
        }
    }

    // Download with yt-dlp (Primary method)
    async downloadWithYtDlp(url, outputPath) {
        return new Promise((resolve, reject) => {
            const pythonCmd = this.checkPythonCommand();
            const cookiesPath = path.join(__dirname, 'cookies.txt');
            const hasCookies = fs.existsSync(cookiesPath);
            
            let command = `${pythonCmd} -m yt_dlp -x --audio-format mp3 --audio-quality 0 -o "${outputPath}" --add-metadata --extract-audio --format bestaudio/best`;
            
            if (hasCookies) {
                command += ` --cookies "${cookiesPath}"`;
            }
            
            command += ` "${url}"`;

            console.log(`[yt-dlp] Executing: ${command}`);

            exec(command, { timeout: 300000 }, (error, stdout, stderr) => {
                if (error) {
                    console.error(`[yt-dlp] Error: ${error.message}`);
                    reject(new Error(`yt-dlp failed: ${error.message}`));
                    return;
                }
                resolve({ method: 'yt-dlp', output: stdout });
            });
        });
    }

    // Download with pytube (YouTube only)
    async downloadWithPytube(url, outputPath) {
        return new Promise((resolve, reject) => {
            const pythonCmd = this.checkPythonCommand();
            const script = `
import pytube
import os
try:
    yt = pytube.YouTube("${url}")
    audio = yt.streams.filter(only_audio=True).first()
    if audio:
        filename = audio.download(output_path="${path.dirname(outputPath)}")
        # Rename to .mp3
        base, ext = os.path.splitext(filename)
        new_file = base + '.mp3'
        os.rename(filename, new_file)
        print(f"Downloaded: {new_file}")
    else:
        print("No audio stream found")
except Exception as e:
    print(f"Error: {str(e)}")
    exit(1)
            `;

            const command = `echo '${script}' | ${pythonCmd}`;
            console.log(`[pytube] Executing pytube script`);

            exec(command, { timeout: 180000 }, (error, stdout, stderr) => {
                if (error) {
                    console.error(`[pytube] Error: ${error.message}`);
                    reject(new Error(`pytube failed: ${error.message}`));
                    return;
                }
                resolve({ method: 'pytube', output: stdout });
            });
        });
    }

    // Download with youtube-dl (Classic method)
    async downloadWithYoutubeDl(url, outputPath) {
        return new Promise((resolve, reject) => {
            const pythonCmd = this.checkPythonCommand();
            const command = `${pythonCmd} -m youtube_dl -x --audio-format mp3 --audio-quality 0 -o "${outputPath}" --add-metadata --extract-audio --format bestaudio "${url}"`;

            console.log(`[youtube-dl] Executing: ${command}`);

            exec(command, { timeout: 300000 }, (error, stdout, stderr) => {
                if (error) {
                    console.error(`[youtube-dl] Error: ${error.message}`);
                    reject(new Error(`youtube-dl failed: ${error.message}`));
                    return;
                }
                resolve({ method: 'youtube-dl', output: stdout });
            });
        });
    }

    // Download with spotdl (Spotify specific)
    async downloadWithSpotdl(url, outputPath) {
        return new Promise((resolve, reject) => {
            const command = `spotdl "${url}" --output "${path.dirname(outputPath)}" --format mp3`;

            console.log(`[spotdl] Executing: ${command}`);

            exec(command, { timeout: 300000 }, (error, stdout, stderr) => {
                if (error) {
                    console.error(`[spotdl] Error: ${error.message}`);
                    reject(new Error(`spotdl failed: ${error.message}`));
                    return;
                }
                resolve({ method: 'spotdl', output: stdout });
            });
        });
    }

    // Download with scdl (SoundCloud specific)
    async downloadWithScdl(url, outputPath) {
        return new Promise((resolve, reject) => {
            const command = `scdl -l "${url}" --path "${path.dirname(outputPath)}" --flac`;

            console.log(`[scdl] Executing: ${command}`);

            exec(command, { timeout: 300000 }, (error, stdout, stderr) => {
                if (error) {
                    console.error(`[scdl] Error: ${error.message}`);
                    reject(new Error(`scdl failed: ${error.message}`));
                    return;
                }
                resolve({ method: 'scdl', output: stdout });
            });
        });
    }

    // Check Python command (python3 or python)
    checkPythonCommand() {
        try {
            exec('python3 --version', (error) => {
                if (!error) return 'python3';
            });
        } catch (e) {}
        
        try {
            exec('python --version', (error) => {
                if (!error) return 'python';
            });
        } catch (e) {}
        
        return 'python3'; // Default fallback
    }

    // Main download method with parallel execution and fallback
    async download(url, outputPath) {
        const platform = this.detectPlatform(url);
        const methods = platform.map(method => method);
        
        console.log(`[MultiDownloader] Platform detected: ${url.includes('youtube') ? 'YouTube' : url.includes('spotify') ? 'Spotify' : url.includes('soundcloud') ? 'SoundCloud' : 'Other'}`);
        console.log(`[MultiDownloader] Using methods: ${methods.join(', ')}`);

        // Try methods in parallel with fallback
        const promises = methods.map(async (methodName) => {
            try {
                console.log(`[MultiDownloader] Trying ${methodName}...`);
                const result = await this.methods[methodName](url, outputPath);
                console.log(`[MultiDownloader] ${methodName} succeeded!`);
                return { success: true, method: methodName, result };
            } catch (error) {
                console.error(`[MultiDownloader] ${methodName} failed: ${error.message}`);
                return { success: false, method: methodName, error: error.message };
            }
        });

        try {
            const results = await Promise.allSettled(promises);
            
            // Find first successful result
            for (const result of results) {
                if (result.status === 'fulfilled' && result.value.success) {
                    console.log(`[MultiDownloader] Download successful with ${result.value.method}`);
                    return result.value.result;
                }
            }

            // If all methods failed, throw error
            const errors = results
                .filter(r => r.status === 'fulfilled' && !r.value.success)
                .map(r => `${r.value.method}: ${r.value.error}`)
                .join('; ');
            
            throw new Error(`All download methods failed: ${errors}`);
            
        } catch (error) {
            console.error(`[MultiDownloader] All methods failed: ${error.message}`);
            throw error;
        }
    }
}

// Initialize downloader
const downloader = new MultiMethodDownloader();

// Routes
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        downloadsPath: downloadsPath,
        downloadsExists: fs.existsSync(downloadsPath),
        uploadsPath: uploadsPath,
        uploadsExists: fs.existsSync(uploadsPath)
    });
});

// Download endpoint
app.post('/api/download', async (req, res) => {
    try {
        const { url } = req.body;
        
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        console.log(`[API] Download request for: ${url}`);
        
        // Generate unique filename
        const timestamp = Date.now();
        const outputPath = path.join(downloadsPath, `%(title)s_${timestamp}.%(ext)s`);
        
        // Download using multi-method system
        const result = await downloader.download(url, outputPath);
        
        // Find downloaded file
        const files = fs.readdirSync(downloadsPath);
        const downloadedFile = files.find(file => file.includes(timestamp.toString()));
        
        if (downloadedFile) {
            const filePath = path.join(downloadsPath, downloadedFile);
            const stats = fs.statSync(filePath);
            
            res.json({
                success: true,
                message: `Download successful using ${result.method}`,
                filename: downloadedFile,
                size: stats.size,
                method: result.method
            });
        } else {
            res.json({
                success: true,
                message: `Download successful using ${result.method}`,
                method: result.method
            });
        }
        
    } catch (error) {
        console.error(`[API] Download error: ${error.message}`);
        res.status(500).json({
            error: 'Download failed',
            details: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// Batch download endpoint
app.post('/api/batch-download', async (req, res) => {
    try {
        const { urls } = req.body;
        
        if (!urls || !Array.isArray(urls) || urls.length === 0) {
            return res.status(400).json({ error: 'URLs array is required' });
        }

        console.log(`[API] Batch download request for ${urls.length} URLs`);
        
        const results = [];
        const errors = [];
        
        // Process URLs in parallel
        const downloadPromises = urls.map(async (url, index) => {
            try {
                const timestamp = Date.now() + index;
                const outputPath = path.join(downloadsPath, `%(title)s_${timestamp}.%(ext)s`);
                
                const result = await downloader.download(url, outputPath);
                results.push({ url, success: true, method: result.method });
                
            } catch (error) {
                errors.push({ url, error: error.message });
            }
        });

        await Promise.allSettled(downloadPromises);
        
        res.json({
            success: true,
            message: `Batch download completed`,
            total: urls.length,
            successful: results.length,
            failed: errors.length,
            results,
            errors
        });
        
    } catch (error) {
        console.error(`[API] Batch download error: ${error.message}`);
        res.status(500).json({
            error: 'Batch download failed',
            details: error.message
        });
    }
});

// List files endpoint
app.get('/api/files', (req, res) => {
    try {
        const files = fs.readdirSync(downloadsPath)
            .filter(file => !file.startsWith('.'))
            .map(file => {
                const filePath = path.join(downloadsPath, file);
                const stats = fs.statSync(filePath);
                return {
                    filename: file,
                    size: stats.size,
                    created: stats.birthtime,
                    modified: stats.mtime
                };
            })
            .sort((a, b) => b.modified - a.modified);

        res.json({ files });
    } catch (error) {
        console.error(`[API] List files error: ${error.message}`);
        res.status(500).json({ error: 'Failed to list files' });
    }
});

// Delete file endpoint
app.delete('/api/files/:filename', (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(downloadsPath, filename);
        
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.json({ message: `File ${filename} deleted successfully` });
        } else {
            res.status(404).json({ error: 'File not found' });
        }
    } catch (error) {
        console.error(`[API] Delete file error: ${error.message}`);
        res.status(500).json({ error: 'Failed to delete file' });
    }
});

// Delete all files endpoint
app.delete('/api/files', (req, res) => {
    try {
        const files = fs.readdirSync(downloadsPath);
        let deletedCount = 0;
        
        files.forEach(file => {
            if (!file.startsWith('.')) {
                const filePath = path.join(downloadsPath, file);
                fs.unlinkSync(filePath);
                deletedCount++;
            }
        });
        
        res.json({ 
            message: `Deleted ${deletedCount} files successfully`,
            deletedCount 
        });
    } catch (error) {
        console.error(`[API] Delete all files error: ${error.message}`);
        res.status(500).json({ error: 'Failed to delete files' });
    }
});

// Download file endpoint
app.get('/api/download/:filename', (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(downloadsPath, filename);
        
        if (fs.existsSync(filePath)) {
            res.download(filePath);
        } else {
            res.status(404).json({ error: 'File not found' });
        }
    } catch (error) {
        console.error(`[API] Download file error: ${error.message}`);
        res.status(500).json({ error: 'Failed to download file' });
    }
});

// Download all files as ZIP
app.get('/api/download-all', (req, res) => {
    try {
        const files = fs.readdirSync(downloadsPath).filter(file => !file.startsWith('.'));
        
        if (files.length === 0) {
            return res.status(404).json({ error: 'No files to download' });
        }

        const archive = archiver('zip');
        const zipPath = path.join(downloadsPath, 'all_files.zip');
        const output = fs.createWriteStream(zipPath);

        output.on('close', () => {
            res.download(zipPath, 'all_files.zip', (err) => {
                if (err) {
                    console.error(`[API] ZIP download error: ${err.message}`);
                }
                // Clean up ZIP file
                fs.unlinkSync(zipPath);
            });
        });

        archive.on('error', (err) => {
            console.error(`[API] Archive error: ${err.message}`);
            res.status(500).json({ error: 'Failed to create archive' });
        });

        archive.pipe(output);

        files.forEach(file => {
            const filePath = path.join(downloadsPath, file);
            archive.file(filePath, { name: file });
        });

        archive.finalize();
        
    } catch (error) {
        console.error(`[API] Download all error: ${error.message}`);
        res.status(500).json({ error: 'Failed to download all files' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 MusicVNDow Backend Server running on port ${PORT}`);
    console.log(`📁 Downloads directory: ${downloadsPath}`);
    console.log(`📁 Uploads directory: ${uploadsPath}`);
    console.log(`🔧 Multi-Method Download System: ACTIVE`);
    console.log(`✅ yt-dlp, pytube, youtube-dl, spotdl, scdl ready`);
});

module.exports = app;
