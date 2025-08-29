# 🎵 MusicVNDow Backend

Backend độc lập cho ứng dụng tải nhạc trực tuyến.

## 🚀 Cài đặt

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Cài đặt yt-dlp
```bash
npm run install-ytdlp
```

### 3. Chạy server
```bash
npm start
```

## 📋 API Endpoints

### Health Check
- **GET** `/health` - Kiểm tra trạng thái server

### Download
- **POST** `/api/download` - Tải nhạc từ URL
  ```json
  {
    "url": "https://youtube.com/watch?v=...",
    "format": "mp3"
  }
  ```

### File Management
- **GET** `/api/files` - Lấy danh sách file đã tải
- **DELETE** `/api/files/:filename` - Xóa file
- **DELETE** `/api/delete-all` - Xóa tất cả file
- **POST** `/api/download-all` - Tải tất cả file dưới dạng ZIP

### Batch Download
- **POST** `/api/batch-download` - Tải hàng loạt
  ```json
  {
    "urls": ["url1", "url2", "url3"],
    "format": "mp3"
  }
  ```

## 🔧 Cấu hình

### Port
Mặc định: `3000`
Có thể thay đổi bằng biến môi trường `PORT`

### Thư mục downloads
Mặc định: `./downloads`
Tự động tạo nếu chưa tồn tại

## 🌐 Deploy

### Local
```bash
npm start
```

### Docker
```dockerfile
FROM node:18-alpine
RUN apk add --no-cache python3 py3-pip ffmpeg
RUN pip3 install yt-dlp
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Cloud Platforms
- **Render**: Tự động detect Node.js
- **Railway**: Tự động detect Node.js  
- **Heroku**: Tự động detect Node.js
- **Vercel**: Cần cấu hình serverless functions

## 📁 Cấu trúc thư mục
```
├── server.js          # Main server file
├── package.json       # Dependencies
├── downloads/         # Downloaded files
└── README_BACKEND.md  # This file
```

## 🔍 Troubleshooting

### yt-dlp không hoạt động
```bash
# Kiểm tra version
yt-dlp --version

# Cài đặt lại
npm run install-ytdlp
```

### Port đã được sử dụng
```bash
# Thay đổi port
PORT=8080 npm start
```

### Lỗi permissions
```bash
# Tạo thư mục downloads
mkdir downloads
chmod 755 downloads
```
