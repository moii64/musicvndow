# 🚀 Hướng dẫn Deploy MusicVNDow

## 📋 Chuẩn bị

### 1. Tạo GitHub Repository

```bash
# Khởi tạo git repository
git init
git add .
git commit -m "Initial commit: MusicVNDow"

# Tạo repository trên GitHub và push
git remote add origin https://github.com/moi64/musicvndow.git
git branch -M main
git push -u origin main
```

### 2. Cài đặt yt-dlp trên server

**Lưu ý:** Các nền tảng deploy có thể không hỗ trợ yt-dlp. Bạn cần sử dụng API thay thế.

## 🌐 Deploy lên Vercel (Khuyến nghị)

### Bước 1: Đăng ký Vercel
1. Truy cập [vercel.com](https://vercel.com)
2. Đăng ký bằng GitHub account
3. Click "New Project"

### Bước 2: Import Repository
1. Chọn repository `musicvndow`
2. Vercel sẽ tự động detect cấu hình
3. Click "Deploy"

### Bước 3: Cấu hình
- **Framework Preset:** Node.js
- **Build Command:** `npm run build`
- **Output Directory:** `public`
- **Install Command:** `npm install`

### Bước 4: Environment Variables
```
NODE_ENV=production
```

### Kết quả:
- **URL:** `https://musicvndow.vercel.app`
- **Custom Domain:** Có thể thêm domain riêng

## 🌐 Deploy lên Netlify

### Bước 1: Đăng ký Netlify
1. Truy cập [netlify.com](https://netlify.com)
2. Đăng ký bằng GitHub account

### Bước 2: Deploy
1. Click "New site from Git"
2. Chọn GitHub repository
3. Cấu hình:
   - **Build command:** `npm run build`
   - **Publish directory:** `public`

### Bước 3: Cấu hình Functions
Tạo file `netlify/functions/download.js`:

```javascript
const { spawn } = require('child_process');

exports.handler = async (event) => {
  // Handle download logic here
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Download function' })
  };
};
```

### Kết quả:
- **URL:** `https://musicvndow.netlify.app`

## 🌐 Deploy lên Railway

### Bước 1: Đăng ký Railway
1. Truy cập [railway.app](https://railway.app)
2. Đăng ký bằng GitHub account

### Bước 2: Deploy
1. Click "New Project"
2. Chọn "Deploy from GitHub repo"
3. Chọn repository

### Bước 3: Cấu hình
- **Environment:** Production
- **Port:** 3000

### Kết quả:
- **URL:** `https://musicvndow.railway.app`

## 🌐 Deploy lên Render

### Bước 1: Đăng ký Render
1. Truy cập [render.com](https://render.com)
2. Đăng ký bằng GitHub account

### Bước 2: Deploy
1. Click "New Web Service"
2. Connect GitHub repository
3. Cấu hình:
   - **Name:** musicvndow
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

### Bước 3: Environment Variables
```
NODE_ENV=production
PORT=3000
```

### Kết quả:
- **URL:** `https://musicvndow.onrender.com`

## 🔧 Cấu hình Custom Domain

### Vercel
1. Vào project settings
2. Tab "Domains"
3. Thêm custom domain
4. Cấu hình DNS records

### Netlify
1. Vào site settings
2. Tab "Domain management"
3. Thêm custom domain
4. Cấu hình DNS

### Railway
1. Vào project settings
2. Tab "Domains"
3. Thêm custom domain

## 🛠️ Troubleshooting

### Lỗi yt-dlp không tìm thấy
```bash
# Thêm vào server.js
const ytdlpPath = process.env.YTDLP_PATH || 'yt-dlp';
```

### Lỗi port
```javascript
// Trong server.js
const PORT = process.env.PORT || 3000;
```

### Lỗi CORS
```javascript
// Trong server.js
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*'
}));
```

## 📊 Monitoring

### Vercel Analytics
- Tự động có analytics
- Performance monitoring

### Netlify Analytics
- Cần upgrade plan
- Real-time analytics

### Railway Monitoring
- Built-in monitoring
- Logs và metrics

## 🔒 Security

### Environment Variables
```bash
# Không commit file .env
NODE_ENV=production
SECRET_KEY=your-secret-key
ALLOWED_ORIGINS=https://yourdomain.com
```

### Rate Limiting
```javascript
// Thêm rate limiting
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

## 📈 Performance

### Caching
```javascript
// Thêm caching headers
app.use('/downloads', express.static('downloads', {
  maxAge: '1d',
  etag: true
}));
```

### Compression
```javascript
const compression = require('compression');
app.use(compression());
```

## 🎯 Tối ưu SEO

### Meta Tags
```html
<meta name="description" content="MusicVNDow - Tải nhạc trực tuyến miễn phí">
<meta name="keywords" content="music downloader, tải nhạc, youtube, spotify">
<meta property="og:title" content="MusicVNDow">
<meta property="og:description" content="Tải nhạc trực tuyến nhanh chóng">
```

### Sitemap
Tạo file `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://musicvndow.com/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

## 🎉 Hoàn thành!

Sau khi deploy thành công, bạn sẽ có:
- ✅ Website hoạt động 24/7
- ✅ Tên miền miễn phí
- ✅ SSL certificate tự động
- ✅ CDN toàn cầu
- ✅ Auto-deploy từ GitHub

**Chúc bạn deploy thành công! 🚀**
