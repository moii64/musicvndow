# ⚡ Deploy Nhanh - MusicVNDow

## 🚀 Deploy trong 5 phút

### Bước 1: Chuẩn bị
```bash
# Đảm bảo đã cài đặt
- Node.js (v16+)
- Git
- GitHub account
```

### Bước 2: Push lên GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/moii64/musicvndow.git
git push -u origin main
```

### Bước 3: Deploy tự động

#### 🌟 Vercel (Khuyến nghị)
1. Truy cập [vercel.com](https://vercel.com)
2. Đăng ký bằng GitHub
3. Click "New Project"
4. Chọn repository `musicvndow`
5. Click "Deploy"

**Kết quả:** `https://musicvndow-mmax64s-projects.vercel.app`

#### 🌟 Netlify
1. Truy cập [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Chọn GitHub repository
4. Build command: `npm run build`
5. Publish directory: `public`

**Kết quả:** `https://musicvndow.netlify.app`

#### 🌟 Railway
1. Truy cập [railway.app](https://railway.app)
2. Click "New Project"
3. Chọn "Deploy from GitHub repo"
4. Chọn repository

**Kết quả:** `https://musicvndow.railway.app`

#### 🌟 Render
1. Truy cập [render.com](https://render.com)
2. Click "New Web Service"
3. Connect GitHub repository
4. Build Command: `npm install`
5. Start Command: `npm start`

**Kết quả:** `https://musicvndow.onrender.com`

## 🎯 Sử dụng Script Tự động (Đã Test ✅)

### Linux/Mac
```bash
chmod +x deploy.sh
./deploy.sh vercel
```

### Windows PowerShell (Đã Test Thành Công)
```powershell
.\deploy.ps1 -Platform vercel
```

**✅ Kết quả test:**
- Git: ✅ Đã cài đặt
- Node.js: ✅ v22.18.0
- npm: ✅ v10.9.3  
- Dependencies: ✅ Đã cài đặt
- Vercel CLI: ✅ Tự động cài đặt
- Git repo: ✅ Đã khởi tạo

**📋 Cần hoàn thành:**
1. Cấu hình Git user (nếu chưa có)
2. Đăng nhập Vercel: `vercel login`
3. Chạy lại deploy script

## 📝 Tên miền tùy chỉnh

Sau khi deploy, bạn có thể:
- Thêm custom domain
- Cấu hình DNS
- SSL tự động

## 🎉 Hoàn thành!

Website của bạn sẽ có:
- ✅ Tên miền miễn phí
- ✅ SSL certificate
- ✅ CDN toàn cầu
- ✅ Auto-deploy
- ✅ Analytics

**Chúc bạn thành công! 🚀**
