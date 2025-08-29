# 🎵 Hướng dẫn Download nhạc từ Diijam.vn

## ⚠️ Lưu ý quan trọng:
- Script hiện tại chỉ tải được file **preview** (75KB) 
- Để tải bài nhạc **full**, bạn cần tài khoản **VIP/Premium** trên Diijam.vn

## 📋 Các script có sẵn:

### 1. Script đơn giản (khuyến nghị)
```bash
npm run download-simple
```
- Tải file preview nhanh nhất
- Phù hợp cho việc test

### 2. Script full track
```bash
npm run download-full
```
- Tìm kiếm bài nhạc full
- Có thể cần tài khoản VIP

### 3. Script HLS segments
```bash
npm run download-hls
```
- Tải và merge HLS segments
- Cho kết quả tốt hơn

### 4. Script cuối cùng (v2)
```bash
npm run download-final-v2
```
- Kết hợp tất cả phương pháp
- Hiệu quả nhất

## 🔧 Cách setup để tải bài nhạc full:

### Bước 1: Đăng ký tài khoản Diijam
1. Truy cập https://diijam.vn
2. Đăng ký tài khoản mới
3. Nâng cấp lên VIP/Premium (nếu cần)

### Bước 2: Lấy cookies đăng nhập
1. Mở Chrome DevTools (F12)
2. Vào tab Application > Cookies
3. Copy tất cả cookies từ domain diijam.vn
4. Lưu vào file `cookies.txt`

### Bước 3: Sử dụng script với cookies
```bash
# Thêm cookies vào script
npm run download-final-v2
```

## 📁 Cấu trúc file:
```
nhac/
├── links.txt                    # Danh sách URL cần tải
├── cookies.txt                  # Cookies đăng nhập (nếu có)
├── downloads/                   # Thư mục chứa file tải về
└── *.js                        # Các script download
```

## 🎯 Kết quả hiện tại:
- ✅ Tải được file preview (75KB)
- ❌ Chưa tải được bài nhạc full
- 🔄 Cần tài khoản VIP để tải full

## 💡 Gợi ý:
1. **Sử dụng script đơn giản** để test nhanh
2. **Đăng ký VIP** để tải bài nhạc full
3. **Thử nhiều URL khác nhau** để tìm bài có thể tải được

## 🚀 Lệnh nhanh:
```bash
# Tải nhanh
npm run download-simple

# Tải với tất cả phương pháp
npm run download-final-v2

# Xem danh sách script
npm run
```

---
*Script được tạo bởi AI Assistant - Chỉ dùng cho mục đích học tập*
