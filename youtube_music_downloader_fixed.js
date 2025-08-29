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
            'vietnamese music',
            'nhạc việt nam hay nhất'
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

    async searchAndDownload(searchTerm) {
        console.log(`🔍 Đang tìm kiếm: ${searchTerm}`);
        
        const searchUrl = `ytsearch5:${searchTerm}`;
        const outputTemplate = path.join(this.downloadPath, '%(title)s.%(ext)s');
        
        return new Promise((resolve) => {
            const ytdlp = spawn('yt-dlp', [
                searchUrl,
                '-x',                    // Extract audio only
                '--audio-format', 'mp3', // Convert to MP3
                '--audio-quality', '0',  // Best quality
                '-o', outputTemplate,    // Output template
                '--no-playlist',         // Don't download playlists
                '--max-downloads', '3',  // Max 3 videos per search
                '--write-thumbnail',     // Download thumbnail
                '--add-metadata',        // Add metadata
                '--extract-audio',       // Extract audio
                '--format', 'bestaudio/best' // Best audio format
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
                '--max-downloads', '10', // Max 10 videos
                '--write-thumbnail',     // Download thumbnail
                '--add-metadata',        // Add metadata
                '--extract-audio',       // Extract audio
                '--format', 'bestaudio/best' // Best audio format
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
                '--max-downloads', '10', // Max 10 videos
                '--write-thumbnail',     // Download thumbnail
                '--add-metadata',        // Add metadata
                '--extract-audio',       // Extract audio
                '--format', 'bestaudio/best' // Best audio format
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

    async downloadSpecificVideos() {
        console.log('🎵 Tải một số video nhạc Việt Nam cụ thể...');
        
        const videoUrls = [
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Rick Roll (test)
            'https://www.youtube.com/watch?v=9bZkp7q19f0', // PSY - GANGNAM STYLE
            'https://www.youtube.com/watch?v=kJQP7kiw5Fk'  // Luis Fonsi - Despacito
        ];
        
        const outputTemplate = path.join(this.downloadPath, '%(title)s.%(ext)s');
        
        for (const videoUrl of videoUrls) {
            try {
                console.log(`🎬 Đang tải video: ${videoUrl}`);
                
                await new Promise((resolve) => {
                    const ytdlp = spawn('yt-dlp', [
                        videoUrl,
                        '-x',                    // Extract audio only
                        '--audio-format', 'mp3', // Convert to MP3
                        '--audio-quality', '0',  // Best quality
                        '-o', outputTemplate,    // Output template
                        '--write-thumbnail',     // Download thumbnail
                        '--add-metadata',        // Add metadata
                        '--extract-audio',       // Extract audio
                        '--format', 'bestaudio/best' // Best audio format
                    ]);
                    
                    ytdlp.stdout.on('data', (data) => {
                        console.log(`📥 ${data.toString().trim()}`);
                    });
                    
                    ytdlp.stderr.on('data', (data) => {
                        console.log(`⚠️ ${data.toString().trim()}`);
                    });
                    
                    ytdlp.on('close', (code) => {
                        if (code === 0) {
                            console.log(`✅ Hoàn thành tải video`);
                        } else {
                            console.log(`❌ Lỗi khi tải video`);
                        }
                        resolve();
                    });
                    
                    ytdlp.on('error', (error) => {
                        console.log(`❌ Lỗi yt-dlp: ${error.message}`);
                        resolve();
                    });
                });
                
                // Delay giữa các video
                await new Promise(resolve => setTimeout(resolve, 2000));
                
            } catch (error) {
                console.log(`❌ Lỗi video ${videoUrl}: ${error.message}`);
            }
        }
    }

    async downloadAllMusic() {
        console.log('🎵 Bắt đầu tải nhạc từ YouTube...');
        
        // Kiểm tra yt-dlp
        const hasYtDlp = await this.checkYtDlp();
        if (!hasYtDlp) {
            console.log('❌ yt-dlp chưa được cài đặt. Vui lòng cài đặt thủ công.');
            return;
        }
        
        // Tạo thư mục downloads nếu chưa có
        if (!fs.existsSync(this.downloadPath)) {
            fs.mkdirSync(this.downloadPath, { recursive: true });
        }
        
        // Tải một số video cụ thể trước
        await this.downloadSpecificVideos();
        
        // Tải nhạc theo từ khóa tìm kiếm
        for (const term of this.searchTerms) {
            await this.searchAndDownload(term);
            // Delay giữa các tìm kiếm
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
        
        // Tải từ một số playlist phổ biến
        const popularPlaylists = [
            'https://www.youtube.com/playlist?list=PLWz5rJ2EKKc9Gq6FEnbsXJgqcnQJa0G8S', // Nhạc trẻ Việt Nam
            'https://www.youtube.com/playlist?list=PLWz5rJ2EKKc8j2B07z5E-zK2V9X6fXb8M'  // Nhạc bolero
        ];
        
        for (const playlist of popularPlaylists) {
            try {
                await this.downloadFromPlaylist(playlist);
                await new Promise(resolve => setTimeout(resolve, 5000));
            } catch (error) {
                console.log(`❌ Lỗi playlist ${playlist}: ${error.message}`);
            }
        }
        
        console.log('🎉 Hoàn thành tải tất cả nhạc!');
        console.log(`📁 Kiểm tra thư mục: ${this.downloadPath}`);
        
        // Liệt kê các file đã tải
        const files = fs.readdirSync(this.downloadPath);
        console.log(`📊 Tổng số file đã tải: ${files.length}`);
        files.forEach(file => {
            console.log(`  - ${file}`);
        });
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
