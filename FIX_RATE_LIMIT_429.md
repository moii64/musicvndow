# 🔧 Fix HTTP 429 Rate Limit & Missing pytube_downloader.py

## 🚨 Vấn đề đang gặp phải

### 1. HTTP 429 Rate Limit
```
ERROR: [youtube] ... Sign in to confirm you're not a bot
WARNING: Unable to download webpage: HTTP Error 429: Too Many Requests
```

### 2. Thiếu file pytube_downloader.py
```
python3: can't open file '/opt/render/project/src/pytube_downloader.py': [Errno 2] No such file or directory
```

---

## ✅ Giải pháp đã áp dụng

### 1. Sửa đường dẫn pytube_downloader.py
- **Trước:** `python3 pytube_downloader.py` (relative path)
- **Sau:** `python3 "${__dirname}/pytube_downloader.py"` (absolute path)

### 2. Thêm cookies validation
- Kiểm tra cookies.txt có tồn tại và hợp lệ
- Validate nội dung cookies có chứa "youtube.com"
- Thêm retry logic và rate limiting protection

### 3. Cải thiện error handling
- Thêm `--retries 3 --fragment-retries 3`
- Thêm `--sleep-interval 2 --max-sleep-interval 10`
- Kiểm tra startup health khi khởi động server

---

## 🧪 Test và Debug

### Chạy test script để kiểm tra:
```bash
# Windows PowerShell
.\test-cookies.ps1

# Linux/Mac/Node.js
node test-cookies.js
```

### Test cookies với yt-dlp:
```bash
python3 -m yt_dlp --cookies cookies.txt --skip-download --print title "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
```

---

## 🔑 Cách lấy cookies.txt mới

### 1. Sử dụng Get cookies.txt extension:
1. Cài đặt extension "Get cookies.txt" trên Chrome/Firefox
2. Đăng nhập vào YouTube: https://www.youtube.com/
3. Click extension → Export → Save as cookies.txt
4. Upload file lên server

### 2. Kiểm tra cookies hợp lệ:
```bash
# Cookies phải chứa:
- youtube.com domain
- LOGIN_INFO, SID, hoặc SSID cookies
- Không được trống hoặc chỉ có comment
```

---

## 📁 File structure cần thiết

```
/opt/render/project/src/
├── server.js                    ✅ Đã sửa
├── pytube_downloader.py        ✅ Cần có
├── cookies.txt                  ✅ Cần có và hợp lệ
├── requirements.txt             ✅ Python dependencies
└── downloads/                   ✅ Thư mục download
```

---

## 🚀 Deploy lại

### 1. Commit changes:
```bash
git add .
git commit -m "Fix HTTP 429 rate limit and missing pytube script"
git push
```

### 2. Render sẽ tự động deploy lại

### 3. Kiểm tra logs:
- Startup health check sẽ hiển thị status
- Cookies validation sẽ báo warning nếu có vấn đề

---

## 🔍 Debug thêm nếu vẫn lỗi

### 1. Kiểm tra cookies.txt trên server:
```bash
# SSH vào Render (nếu có)
ls -lh /opt/render/project/src/cookies.txt
head -n 5 /opt/render/project/src/cookies.txt
```

### 2. Test individual methods:
```bash
# Test yt-dlp
python3 -m yt_dlp --cookies cookies.txt --skip-download "URL"

# Test pytube
python3 pytube_downloader.py "URL" "output_dir"
```

### 3. Check Python packages:
```bash
pip list | grep -E "(yt-dlp|youtube-dl|pytube)"
```

---

## 💡 Tips để tránh rate limit

1. **Sử dụng cookies.txt hợp lệ** từ tài khoản YouTube đã đăng nhập
2. **Không download quá nhiều** trong thời gian ngắn
3. **Thêm delay** giữa các requests (`--sleep-interval`)
4. **Sử dụng multiple methods** (yt-dlp → pytube → youtube-dl)
5. **Rotate cookies** nếu cần thiết

---

## 📞 Support

Nếu vẫn gặp vấn đề:
1. Chạy test script để debug
2. Kiểm tra logs chi tiết
3. Verify cookies.txt format
4. Test từng method riêng lẻ
