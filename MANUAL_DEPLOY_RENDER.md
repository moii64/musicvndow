# 🚨 **MANUAL DEPLOY RENDER - URGENT!**

## ⚠️ **Vấn đề hiện tại:**
Backend đang chạy **CODE CŨ** và gặp lỗi yt-dlp. Cần **MANUAL DEPLOY** trên Render.

## 🔧 **Bước 1: Truy cập Render Dashboard**
1. Mở: [https://dashboard.render.com](https://dashboard.render.com)
2. Đăng nhập vào tài khoản của bạn
3. Tìm project: **`musicvndow-backend`**

## 🚀 **Bước 2: Manual Deploy**
1. **Click vào project** `musicvndow-backend`
2. **Tìm tab "Deploy"**
3. **Click "Manual Deploy"** (nút màu xanh)
4. **Chọn "Deploy latest commit"**
5. **Click "Deploy"**

## ⏳ **Bước 3: Chờ Build**
- **Build time**: 2-5 phút
- **Status**: Sẽ hiển thị "Building" → "Deploying" → "Live"
- **Đợi cho đến khi status = "Live"**

## 🧪 **Bước 4: Test sau khi deploy**
```bash
# Test health check
curl https://musicvndow.onrender.com/health

# Test download API
curl -X POST https://musicvndow.onrender.com/api/download \
  -H "Content-Type: application/json" \
  -d '{"url":"https://youtu.be/HsgTIMDA6ps?si=aej5HOF","format":"mp3"}'
```

## 🎯 **Kết quả mong đợi:**
✅ **Backend deploy code mới**  
✅ **yt-dlp detection fixed**  
✅ **Error handling improved**  
✅ **Download API hoạt động**  

## 🚨 **Nếu vẫn lỗi:**
1. **Kiểm tra build logs** trên Render
2. **Xem error messages** trong logs
3. **Kiểm tra environment variables**
4. **Contact support** nếu cần

---

## 📋 **Tóm tắt:**
- **Frontend**: ✅ Vercel - Hoạt động tốt
- **Backend**: ❌ Render - Cần manual deploy
- **Code**: ✅ GitHub - Đã push đầy đủ
- **Cookies**: ✅ Đã thêm cookies.txt

**Hãy manual deploy ngay để fix lỗi yt-dlp! 🚀**
