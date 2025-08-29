const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class YouTubeMusicDownloader {
    constructor() {
        this.downloadPath = './downloads';
        this.searchTerms = [
            'nhạc trẻ việt nam',
            'nhạc bolero việt nam',
            'nhạc vàng việt nam',
            'nhạc rock việt nam',
            'nhạc pop việt nam',
            'nhạc dance việt nam',
            'nhạc chill việt nam',
            'vietnamese music',
            'nhạc việt nam hay nhất',
            'top hits việt nam'
        ];
    }

    async checkYtDlp() {
        return new Promise((resolve) => {
            const ytdlp = spawn('yt-dlp', ['--version']);
            
            ytdlp.on('close', (code) => {
                if (code === 0) {
                    console.log('✅ yt-dlp đã được cài đặt');
                    resolve(true);
                } else {
                    console.log('❌ yt-dlp chưa được cài đặt');
                    resolve(false);
                }
            });
            
            ytdlp.on('error', () => {
                console.log('❌ yt-dlp chưa được cài đặt');
                resolve(false);
            });
        });
    }

    async installYtDlp() {
        console.log('📦 Đang cài đặt yt-dlp...');
        
        return new Promise((resolve) => {
            const npm = spawn('npm', ['install', '-g', 'yt-dlp']);
            
            npm.on('close', (code) => {
                if (code === 0) {
                    console.log('✅ Đã cài đặt yt-dlp thành công');
                    resolve(true);
                } else {
                    console.log('❌ Không thể cài đặt yt-dlp');
                    resolve(false);
                }
            });
            
            npm.on('error', () => {
                console.log('❌ Không thể cài đặt yt-dlp');
                resolve(false);
            });
        });
    }

    async searchAndDownload(searchTerm) {
        console.log(`🔍 Đang tìm kiếm: ${searchTerm}`);
        
        const searchUrl = `ytsearch10:${searchTerm}`;
        const outputTemplate = path.join(this.downloadPath, '%(title)s.%(ext)s');
        
        return new Promise((resolve) => {
            const ytdlp = spawn('yt-dlp', [
                searchUrl,
                '-x',                    // Extract audio only
                '--audio-format', 'mp3', // Convert to MP3
                '--audio-quality', '0',  // Best quality
                '-o', outputTemplate,    // Output template
                '--no-playlist',         // Don't download playlists
                '--max-downloads', '5',  // Max 5 videos per search
                '--write-thumbnail',     // Download thumbnail
                '--add-metadata',        // Add metadata
                '--embed-thumbnail',     // Embed thumbnail
                '--extract-audio',       // Extract audio
                '--format', 'bestaudio/best', // Best audio format
                '--prefer-ffmpeg',       // Prefer ffmpeg
                '--postprocessors', 'FFmpegExtractAudio:-c:a mp3 -b:a 320k' // High quality MP3
            ]);
            
            ytdlp.stdout.on('data', (data) => {
                console.log(`📥 ${data.toString().trim()}`);
            });
            
            ytdlp.stderr.on('data', (data) => {
                console.log(`⚠️ ${data.toString().trim()}`);
            });
            
            ytdlp.on('close', (code) => {
                if (code === 0) {
                    console.log(`✅ Hoàn thành tải nhạc cho: ${searchTerm}`);
                } else {
                    console.log(`❌ Lỗi khi tải nhạc cho: ${searchTerm}`);
                }
                resolve();
            });
            
            ytdlp.on('error', (error) => {
                console.log(`❌ Lỗi yt-dlp: ${error.message}`);
                resolve();
            });
        });
    }

    async downloadFromPlaylist(playlistUrl) {
        console.log(`📋 Đang tải playlist: ${playlistUrl}`);
        
        const outputTemplate = path.join(this.downloadPath, '%(playlist_index)s-%(title)s.%(ext)s');
        
        return new Promise((resolve) => {
            const ytdlp = spawn('yt-dlp', [
                playlistUrl,
                '-x',                    // Extract audio only
                '--audio-format', 'mp3', // Convert to MP3
                '--audio-quality', '0',  // Best quality
                '-o', outputTemplate,    // Output template
                '--write-thumbnail',     // Download thumbnail
                '--add-metadata',        // Add metadata
                '--embed-thumbnail',     // Embed thumbnail
                '--extract-audio',       // Extract audio
                '--format', 'bestaudio/best', // Best audio format
                '--prefer-ffmpeg',       // Prefer ffmpeg
                '--postprocessors', 'FFmpegExtractAudio:-c:a mp3 -b:a 320k' // High quality MP3
            ]);
            
            ytdlp.stdout.on('data', (data) => {
                console.log(`📥 ${data.toString().trim()}`);
            });
            
            ytdlp.stderr.on('data', (data) => {
                console.log(`⚠️ ${data.toString().trim()}`);
            });
            
            ytdlp.on('close', (code) => {
                if (code === 0) {
                    console.log(`✅ Hoàn thành tải playlist`);
                } else {
                    console.log(`❌ Lỗi khi tải playlist`);
                }
                resolve();
            });
            
            ytdlp.on('error', (error) => {
                console.log(`❌ Lỗi yt-dlp: ${error.message}`);
                resolve();
            });
        });
    }

    async downloadFromChannel(channelUrl) {
        console.log(`📺 Đang tải từ channel: ${channelUrl}`);
        
        const outputTemplate = path.join(this.downloadPath, '%(uploader)s/%(title)s.%(ext)s');
        
        return new Promise((resolve) => {
            const ytdlp = spawn('yt-dlp', [
                channelUrl,
                '-x',                    // Extract audio only
                '--audio-format', 'mp3', // Convert to MP3
                '--audio-quality', '0',  // Best quality
                '-o', outputTemplate,    // Output template
                '--max-downloads', '20', // Max 20 videos
                '--write-thumbnail',     // Download thumbnail
                '--add-metadata',        // Add metadata
                '--embed-thumbnail',     // Embed thumbnail
                '--extract-audio',       // Extract audio
                '--format', 'bestaudio/best', // Best audio format
                '--prefer-ffmpeg',       // Prefer ffmpeg
                '--postprocessors', 'FFmpegExtractAudio:-c:a mp3 -b:a 320k' // High quality MP3
            ]);
            
            ytdlp.stdout.on('data', (data) => {
                console.log(`📥 ${data.toString().trim()}`);
            });
            
            ytdlp.stderr.on('data', (data) => {
                console.log(`⚠️ ${data.toString().trim()}`);
            });
            
            ytdlp.on('close', (code) => {
                if (code === 0) {
                    console.log(`✅ Hoàn thành tải từ channel`);
                } else {
                    console.log(`❌ Lỗi khi tải từ channel`);
                }
                resolve();
            });
            
            ytdlp.on('error', (error) => {
                console.log(`❌ Lỗi yt-dlp: ${error.message}`);
                resolve();
            });
        });
    }

    async downloadAllMusic() {
        console.log('🎵 Bắt đầu tải tất cả nhạc từ YouTube...');
        
        // Kiểm tra yt-dlp
        const hasYtDlp = await this.checkYtDlp();
        if (!hasYtDlp) {
            console.log('📦 Cài đặt yt-dlp...');
            const installed = await this.installYtDlp();
            if (!installed) {
                console.log('❌ Không thể cài đặt yt-dlp. Vui lòng cài đặt thủ công.');
                return;
            }
        }
        
        // Tạo thư mục downloads nếu chưa có
        if (!fs.existsSync(this.downloadPath)) {
            fs.mkdirSync(this.downloadPath, { recursive: true });
        }
        
        // Tải nhạc theo từ khóa tìm kiếm
        for (const term of this.searchTerms) {
            await this.searchAndDownload(term);
            // Delay giữa các tìm kiếm
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
        
        // Tải từ một số playlist phổ biến
        const popularPlaylists = [
            'https://www.youtube.com/playlist?list=PLWz5rJ2EKKc9Gq6FEnbsXJgqcnQJa0G8S', // Nhạc trẻ Việt Nam
            'https://www.youtube.com/playlist?list=PLWz5rJ2EKKc8j2B07z5E-zK2V9X6fXb8M', // Nhạc bolero
            'https://www.youtube.com/playlist?list=PLWz5rJ2EKKc7j2B07z5E-zK2V9X6fXb8M'  // Nhạc vàng
        ];
        
        for (const playlist of popularPlaylists) {
            try {
                await this.downloadFromPlaylist(playlist);
                await new Promise(resolve => setTimeout(resolve, 3000));
            } catch (error) {
                console.log(`❌ Lỗi playlist ${playlist}: ${error.message}`);
            }
        }
        
        // Tải từ một số channel âm nhạc Việt Nam
        const musicChannels = [
            'https://www.youtube.com/@NhacTreVietNam',
            'https://www.youtube.com/@NhacBolero',
            'https://www.youtube.com/@NhacVang'
        ];
        
        for (const channel of musicChannels) {
            try {
                await this.downloadFromChannel(channel);
                await new Promise(resolve => setTimeout(resolve, 5000));
            } catch (error) {
                console.log(`❌ Lỗi channel ${channel}: ${error.message}`);
            }
        }
        
        console.log('🎉 Hoàn thành tải tất cả nhạc!');
        console.log(`📁 Kiểm tra thư mục: ${this.downloadPath}`);
    }
}

// Main function
async function main() {
    const downloader = new YouTubeMusicDownloader();
    await downloader.downloadAllMusic();
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = YouTubeMusicDownloader;
