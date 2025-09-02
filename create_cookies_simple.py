#!/usr/bin/env python3
"""
Script đơn giản để tạo cookies.txt cho YouTube
Sử dụng extension thay vì yt-dlp
"""

import os
import shutil
from datetime import datetime

def create_cookies_manual():
    """Hướng dẫn tạo cookies thủ công"""
    print("🍪 YouTube Cookies Creator - Manual Method")
    print("=" * 50)
    
    print("\n📋 Hướng dẫn tạo cookies.txt:")
    print("1. Cài đặt extension 'Get cookies.txt Clean' trên Chrome")
    print("2. Vào YouTube và đăng nhập")
    print("3. Click extension và export cookies")
    print("4. Lưu file với tên 'cookies.txt'")
    
    print("\n🔗 Link extension:")
    print("- Chrome: https://chrome.google.com/webstore/detail/get-cookiestxt-locally/cclelndahbckbenkjhflpdbgdldlbecc")
    print("- Firefox: https://addons.mozilla.org/en-US/firefox/addon/get-cookies-txt-locally/")
    
    print("\n📁 Kiểm tra file cookies.txt:")
    
    if os.path.exists('cookies.txt'):
        print("✅ File cookies.txt đã tồn tại!")
        
        # Đọc và hiển thị thông tin cookies
        try:
            with open('cookies.txt', 'r', encoding='utf-8') as f:
                lines = f.readlines()
                
            # Đếm cookies YouTube
            youtube_cookies = 0
            for line in lines:
                if line.strip() and not line.startswith('#') and '.youtube.com' in line:
                    youtube_cookies += 1
            
            print(f"📊 Tìm thấy {youtube_cookies} cookies YouTube")
            
            if youtube_cookies > 0:
                print("🎉 Cookies đã sẵn sàng để sử dụng!")
                print("💡 Bây giờ bạn có thể:")
                print("   1. Upload cookies.txt lên GitHub")
                print("   2. Deploy trên Render")
                print("   3. Test download YouTube")
            else:
                print("⚠️ Không tìm thấy cookies YouTube trong file")
                print("💡 Hãy đảm bảo đã đăng nhập YouTube trước khi export")
                
        except Exception as e:
            print(f"❌ Lỗi khi đọc file cookies.txt: {e}")
    else:
        print("❌ File cookies.txt chưa tồn tại")
        print("💡 Hãy làm theo hướng dẫn trên để tạo cookies.txt")

def create_cookies_template():
    """Tạo file cookies.txt mẫu"""
    template_file = 'cookies_template.txt'
    
    try:
        with open(template_file, 'w', encoding='utf-8') as f:
            f.write("# Netscape HTTP Cookie File - Template\n")
            f.write(f"# Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write("# http://curl.haxx.se/rfc/cookie_spec.html\n")
            f.write("# Đây là file mẫu, bạn cần thay thế bằng cookies thật\n\n")
            f.write("# Format: domain\\tpath\\tsecure\\texpiry\\tname\\tvalue\n")
            f.write("# Ví dụ:\n")
            f.write("# .youtube.com\\t/\\tTRUE\\t1735689600\\tLOGIN_INFO\\tyour_login_info_here\n")
            f.write("# .youtube.com\\t/\\tTRUE\\t1735689600\\tSID\\tyour_sid_here\n")
            f.write("# .youtube.com\\t/\\tTRUE\\t1735689600\\tHSID\\tyour_hsid_here\n")
            f.write("# .youtube.com\\t/\\tTRUE\\t1735689600\\tSSID\\tyour_ssid_here\n")
            f.write("# .youtube.com\\t/\\tTRUE\\t1735689600\\tAPISID\\tyour_apisid_here\n")
            f.write("# .youtube.com\\t/\\tTRUE\\t1735689600\\tSAPISID\\tyour_sapisid_here\n")
            f.write("# .youtube.com\\t/\\tTRUE\\t1735689600\\t__Secure-1PAPISID\\tyour_secure_1papisid_here\n")
            f.write("# .youtube.com\\t/\\tTRUE\\t1735689600\\t__Secure-3PAPISID\\tyour_secure_3papisid_here\n")
            f.write("# .youtube.com\\t/\\tTRUE\\t1735689600\\t__Secure-1PSID\\tyour_secure_1psid_here\n")
            f.write("# .youtube.com\\t/\\tTRUE\\t1735689600\\t__Secure-3PSID\\tyour_secure_3psid_here\n")
            f.write("# .youtube.com\\t/\\tTRUE\\t1735689600\\t__Secure-1PSIDTS\\tyour_secure_1psidts_here\n")
            f.write("# .youtube.com\\t/\\tTRUE\\t1735689600\\t__Secure-3PSIDTS\\tyour_secure_3psidts_here\n")
            f.write("# .youtube.com\\t/\\tTRUE\\t1735689600\\t__Secure-1PSIDCC\\tyour_secure_1psidcc_here\n")
            f.write("# .youtube.com\\t/\\tTRUE\\t1735689600\\t__Secure-3PSIDCC\\tyour_secure_3psidcc_here\n")
            f.write("# .youtube.com\\t/\\tTRUE\\t1735689600\\tCONSISTENCY\\tyour_consistency_here\n")
            f.write("# .youtube.com\\t/\\tTRUE\\t1735689600\\tPREF\\tyour_pref_here\n")
            f.write("# .youtube.com\\t/\\tTRUE\\t1735689600\\twide\\t1\n")
            f.write("# .youtube.com\\t/\\tTRUE\\t1735689600\\tVISITOR_INFO1_LIVE\\tyour_visitor_info_here\n")
        
        print(f"✅ Đã tạo file {template_file}")
        print("💡 Sử dụng file này làm tham khảo để tạo cookies.txt thật")
        
    except Exception as e:
        print(f"❌ Lỗi khi tạo template: {e}")

def main():
    """Hàm chính"""
    print("🎯 Chọn phương pháp tạo cookies:")
    print("1. Hướng dẫn tạo cookies thủ công (Khuyến nghị)")
    print("2. Tạo file cookies.txt mẫu")
    print("3. Thoát")
    
    while True:
        try:
            choice = input("\nNhập lựa chọn (1-3): ").strip()
            
            if choice == '1':
                create_cookies_manual()
                break
            elif choice == '2':
                create_cookies_template()
                break
            elif choice == '3':
                print("👋 Tạm biệt!")
                break
            else:
                print("❌ Lựa chọn không hợp lệ, hãy nhập 1, 2 hoặc 3")
                
        except KeyboardInterrupt:
            print("\n👋 Tạm biệt!")
            break
        except Exception as e:
            print(f"❌ Lỗi: {e}")

if __name__ == "__main__":
    main()
