# 🚀 Hướng dẫn nhanh - VN Music Downloader

## ⚡ Chạy nhanh (Windows)

### Cách 1: Sử dụng script tự động (Khuyến nghị)
```bash
# Chạy script batch
start-servers.bat

# Hoặc chạy script PowerShell
.\start-servers.ps1
```

### Cách 2: Chạy thủ công
```bash
# Terminal 1: Chạy Express Server (API)
npm start

# Terminal 2: Chạy Live Server (Frontend)
npm run live
```

## 🌐 Truy cập ứng dụng

- **Frontend**: http://localhost:8080
- **API Server**: http://localhost:3000
- **Test Page**: http://localhost:8080/test.html

## 📱 Cách sử dụng

1. **Mở trình duyệt** và truy cập http://localhost:8080
2. **Nhập URL** video/nhạc (YouTube, Spotify, SoundCloud, etc.)
3. **Chọn định dạng** (MP3, MP4, WAV)
4. **Nhấn "Tải xuống"**
5. **File sẽ được tải** về thư mục `downloads/`

## 🔧 Troubleshooting

### Lỗi "yt-dlp not found"
```bash
# Cài đặt yt-dlp
pip install yt-dlp
```

### Lỗi port đã được sử dụng
```bash
# Thay đổi port trong server.js
const PORT = process.env.PORT || 3001;
```

### Lỗi Live Server không chạy
```bash
# Cài đặt Live Server
npm install -g live-server

# Chạy lại
live-server public --port=8080
```

## 📁 Cấu trúc thư mục

```
nhac/
├── public/              # Frontend files
│   ├── index.html      # Trang chính
│   ├── test.html       # Trang test
│   ├── style.css       # CSS styles
│   └── script.js       # JavaScript
├── downloads/          # Files đã tải
├── server.js           # Express server
├── start-servers.bat   # Script tự động
└── start-servers.ps1   # Script PowerShell
```

## 🎯 Tính năng chính

- ✅ Tải nhạc từ YouTube, Spotify, SoundCloud
- ✅ Hỗ trợ nhiều định dạng (MP3, MP4, WAV)
- ✅ Tải hàng loạt (batch download)
- ✅ Giao diện hiện đại, responsive
- ✅ Quản lý file đã tải
- ✅ Progress bar và loading states

## 🆘 Hỗ trợ

Nếu gặp vấn đề, hãy:
1. Kiểm tra Node.js đã cài đặt chưa
2. Chạy `npm install` để cài dependencies
3. Đảm bảo yt-dlp đã cài đặt
4. Kiểm tra port 3000 và 8080 không bị chiếm

---

**🎵 VN Music Downloader - Giải pháp tải nhạc hàng đầu Việt Nam**
