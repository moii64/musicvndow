# VN Music Downloader - Web Interface

🎵 **Giải pháp tải nhạc trực tuyến hàng đầu Việt Nam**

Một web application hiện đại để tải nhạc từ YouTube, Spotify, SoundCloud và nhiều nền tảng khác với giao diện đẹp mắt và dễ sử dụng.

## ✨ Tính năng nổi bật

- 🚀 **Tải nhanh**: Tốc độ tải xuống nhanh chóng với công nghệ tối ưu
- 🎵 **Chất lượng cao**: Hỗ trợ tải xuống với chất lượng âm thanh tốt nhất
- 📋 **Playlist**: Tải xuống toàn bộ playlist chỉ với một cú nhấp
- 🔒 **An toàn**: Không lưu trữ dữ liệu, bảo mật thông tin người dùng
- 📱 **Responsive**: Giao diện tối ưu cho mọi thiết bị
- 🎨 **Hiện đại**: Thiết kế đẹp mắt với gradient và animation

## 🛠️ Cài đặt

### Yêu cầu hệ thống
- Node.js 16+ 
- yt-dlp (đã cài đặt sẵn hoặc tự động cài)

### Bước 1: Clone repository
```bash
git clone <repository-url>
cd nhac
```

### Bước 2: Cài đặt dependencies
```bash
npm install
```

### Bước 3: Cài đặt yt-dlp (nếu chưa có)
```bash
# Windows (với pip)
pip install yt-dlp

# Hoặc tải từ GitHub
# https://github.com/yt-dlp/yt-dlp/releases
```

### Bước 4: Chạy ứng dụng

#### Cách 1: Chạy với Express Server (Khuyến nghị)
```bash
# Chế độ production
npm start

# Chế độ development (với nodemon)
npm run dev
```

Ứng dụng sẽ chạy tại: `http://localhost:3000`

#### Cách 2: Chạy với Live Server (Chỉ frontend)
```bash
# Cài đặt Live Server (nếu chưa có)
npm install -g live-server

# Chạy Live Server
npm run live

# Hoặc chạy trực tiếp
live-server public --port=8080 --open=/index.html
```

Ứng dụng sẽ chạy tại: `http://localhost:8080`

**Lưu ý**: Khi sử dụng Live Server, bạn cần chạy Express Server riêng để API hoạt động:
```bash
# Terminal 1: Chạy Express Server
npm start

# Terminal 2: Chạy Live Server
npm run live
```

#### Cách 3: Sử dụng Script tự động (Khuyến nghị cho Windows)
```bash
# Sử dụng script batch
start-servers.bat

# Hoặc sử dụng script PowerShell
.\start-servers.ps1
```

Script sẽ tự động:
- Kiểm tra Node.js
- Cài đặt dependencies
- Chạy cả Express Server và Live Server
- Mở trình duyệt

## 🎯 Cách sử dụng

### Tải nhạc đơn lẻ
1. Mở trình duyệt và truy cập `http://localhost:3000`
2. Nhập URL video/nhạc vào ô input
3. Chọn định dạng (MP3, MP4, WAV)
4. Nhấn "Tải xuống"
5. File sẽ được tải về thư mục `downloads/`

### Tải hàng loạt
1. Cuộn xuống phần "Tải hàng loạt"
2. Nhập danh sách URL (mỗi URL một dòng)
3. Chọn định dạng
4. Nhấn "Tải hàng loạt"

### Quản lý file
- Xem danh sách file đã tải trong phần "File đã tải"
- Tải lại file hoặc xóa file không cần thiết
- Nhấn "Làm mới" để cập nhật danh sách

## 📁 Cấu trúc dự án

```
nhac/
├── public/                 # Frontend files
│   ├── index.html         # Main HTML page
│   ├── style.css          # CSS styles
│   └── script.js          # Frontend JavaScript
├── downloads/             # Downloaded files
├── uploads/               # Uploaded files (if any)
├── server.js              # Express server
├── package.json           # Dependencies
└── README_WEB.md          # This file
```

## 🔧 API Endpoints

### POST /api/download
Tải nhạc từ URL
```json
{
  "url": "https://youtube.com/watch?v=...",
  "format": "mp3"
}
```

### GET /api/files
Lấy danh sách file đã tải

### DELETE /api/files/:filename
Xóa file theo tên

### POST /api/batch-download
Tải hàng loạt từ danh sách URL
```json
{
  "urls": ["url1", "url2", "url3"],
  "format": "mp3"
}
```

## 🎨 Giao diện

- **Thiết kế hiện đại**: Gradient background, glassmorphism effects
- **Responsive**: Tối ưu cho desktop, tablet, mobile
- **Animation**: Smooth transitions và hover effects
- **UX tốt**: Loading states, progress bars, error handling

## 🔒 Bảo mật

- Không lưu trữ thông tin người dùng
- Không ghi log URL nhạy cảm
- CORS được cấu hình đúng cách
- Input validation và sanitization

## 🚀 Deployment

### Heroku
```bash
# Tạo Procfile
echo "web: node server.js" > Procfile

# Deploy
git add .
git commit -m "Deploy web interface"
git push heroku main
```

### VPS/Dedicated Server
```bash
# Sử dụng PM2
npm install -g pm2
pm2 start server.js --name "vn-music-downloader"
pm2 startup
pm2 save
```

## 🐛 Troubleshooting

### Lỗi yt-dlp không tìm thấy
```bash
# Kiểm tra yt-dlp
yt-dlp --version

# Cài đặt lại nếu cần
pip install --upgrade yt-dlp
```

### Lỗi port đã được sử dụng
```bash
# Thay đổi port trong server.js
const PORT = process.env.PORT || 3001;
```

### Lỗi permission thư mục downloads
```bash
# Tạo thư mục và set permission
mkdir downloads
chmod 755 downloads  # Linux/Mac
```

## 📈 Tính năng tương lai

- [ ] Hỗ trợ thêm nhiều nền tảng (TikTok, Instagram, etc.)
- [ ] Proxy rotation để tránh rate limiting
- [ ] User authentication và history
- [ ] Download queue management
- [ ] Audio format conversion
- [ ] Video download với subtitle
- [ ] Mobile app (React Native)

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Hãy:

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📄 License

MIT License - Xem file LICENSE để biết thêm chi tiết.

## 🙏 Cảm ơn

- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - Công cụ download mạnh mẽ
- [Express.js](https://expressjs.com/) - Web framework
- [Font Awesome](https://fontawesome.com/) - Icons
- [Inter Font](https://rsms.me/inter/) - Typography

---

**Được phát triển với ❤️ tại Việt Nam**
