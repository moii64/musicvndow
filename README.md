# 🎵 MusicVNDow

**Tải nhạc trực tuyến nhanh chóng và chất lượng cao**

## ✨ Tính năng

- 🎯 **Tải nhạc từ YouTube, Spotify, SoundCloud**
- 🎵 **Hỗ trợ nhiều định dạng:** MP3, MP4, WAV
- 📦 **Tải hàng loạt** từ playlist
- 📁 **Quản lý file** đã tải
- 🗑️ **Xóa file** dễ dàng
- 📥 **Tải tất cả** dưới dạng ZIP
- 🎨 **Giao diện đẹp** và responsive

## 🚀 Deploy miễn phí

### 1. Vercel (Khuyến nghị)

```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Deploy
vercel

# Hoặc deploy từ GitHub
# 1. Push code lên GitHub
# 2. Kết nối với Vercel
# 3. Tự động deploy
```

**Tên miền:** `musicvndow.vercel.app`

### 2. Netlify

```bash
# Build và deploy
npm run build
# Upload thư mục public lên Netlify
```

**Tên miền:** `musicvndow.netlify.app`

### 3. Railway

```bash
# Kết nối GitHub repository
# Railway sẽ tự động deploy
```

**Tên miền:** `musicvndow.railway.app`

### 4. Render

```bash
# Kết nối GitHub repository
# Render sẽ tự động deploy
```

**Tên miền:** `musicvndow.onrender.com`

## 🛠️ Cài đặt local

```bash
# Clone repository
git clone <your-repo-url>
cd musicvndow

# Cài đặt dependencies
npm install

# Cài đặt yt-dlp (cần thiết cho download)
# Windows: choco install yt-dlp
# macOS: brew install yt-dlp
# Linux: sudo apt install yt-dlp

# Chạy server
npm start
```

Truy cập: `http://localhost:3000`

## 📱 Sử dụng

1. **Tải nhạc đơn lẻ:**
   - Nhập URL video/nhạc
   - Chọn định dạng (MP3/MP4/WAV)
   - Click "Tải xuống"

2. **Tải hàng loạt:**
   - Nhập danh sách URL (mỗi URL một dòng)
   - Chọn định dạng
   - Click "Tải hàng loạt"

3. **Quản lý file:**
   - Xem danh sách file đã tải
   - Tải lại từng file
   - Xóa file không cần thiết
   - Tải tất cả dưới dạng ZIP

## 🔧 Cấu hình

### Environment Variables

```env
PORT=3000
NODE_ENV=production
```

### Cấu hình yt-dlp

App sử dụng `yt-dlp` để download. Đảm bảo đã cài đặt:

```bash
# Kiểm tra version
yt-dlp --version
```

## 📄 License

MIT License - Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng:

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📞 Liên hệ

- **Email:** support@musicvndow.com
- **Website:** https://musicvndow.com

---

**Được phát triển với ❤️ tại Việt Nam - MusicVNDow**

