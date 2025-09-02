# 🧪 Test API Backend MusicVNDow

## 🚀 Cách Test API

### **Cách 1: PowerShell Script (Khuyến nghị)**
```powershell
# Chạy script test tự động
.\test-api.ps1
```

### **Cách 2: VSCode REST Client**
1. Cài extension **REST Client**
2. Mở file `test.http`
3. Click **Send Request** trên từng endpoint

### **Cách 3: PowerShell thủ công**
```powershell
# Health check
Invoke-RestMethod -Uri "https://musicvndow.onrender.com/health"

# Root route
Invoke-RestMethod -Uri "https://musicvndow.onrender.com/"

# Get files
Invoke-RestMethod -Uri "https://musicvndow.onrender.com/api/files"
```

### **Cách 4: Postman/Insomnia**
- Import các request từ `test.http`
- Test từng endpoint một

---

## 📋 Endpoints cần test

### ✅ **GET** `/health`
- **Expected:** `{"status":"OK","timestamp":"...","uptime":...}`
- **Test:** Kiểm tra server hoạt động

### ✅ **GET** `/`
- **Expected:** JSON với message và danh sách endpoints
- **Test:** Kiểm tra route chính không bị lỗi 500

### ✅ **GET** `/api/files`
- **Expected:** `{"success":true,"files":[...]}`
- **Test:** Kiểm tra API lấy danh sách file

### ✅ **POST** `/api/download`
- **Body:** `{"url":"...","format":"mp3"}`
- **Expected:** `{"success":true,"message":"Download thành công"}`
- **Test:** Kiểm tra API download (cẩn thận, sẽ thực sự download)

---

## 🔍 Kết quả mong đợi

### **Nếu thành công:**
- ✅ Tất cả endpoints trả về 200 OK
- ✅ JSON response đúng format
- ✅ Không còn lỗi 500 Internal Server Error

### **Nếu vẫn lỗi:**
- ❌ Kiểm tra Render Dashboard → Logs
- ❌ Kiểm tra service có deploy lại chưa
- ❌ Kiểm tra `render.yaml` và `requirements.txt`

---

## 🎯 Mục tiêu cuối cùng

1. ✅ Backend Render hoạt động ổn định
2. ✅ Frontend Vercel kết nối được với backend
3. ✅ Download nhạc hoạt động hoàn hảo
4. ✅ Không còn lỗi "undefined" trên frontend

**Chạy `.\test-api.ps1` để test ngay! 🚀**
