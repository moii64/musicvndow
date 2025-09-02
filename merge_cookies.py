#!/usr/bin/env python3
"""
Script để kết hợp cookies từ nhiều trình duyệt
Sử dụng: python merge_cookies.py
"""

import os
import re
from datetime import datetime, timedelta

def parse_cookies_file(filename):
    """Parse file cookies và trả về dictionary"""
    cookies = {}
    if not os.path.exists(filename):
        print(f"⚠️ File {filename} không tồn tại")
        return cookies
    
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line.startswith('#') or not line:
                    continue
                
                # Parse dòng cookies theo format Netscape
                parts = line.split('\t')
                if len(parts) >= 7:
                    domain = parts[0]
                    path = parts[2]
                    secure = parts[3]
                    expiry = parts[4]
                    name = parts[5]
                    value = parts[6]
                    
                    # Tạo key duy nhất
                    key = f"{domain}{path}{name}"
                    cookies[key] = {
                        'domain': domain,
                        'path': path,
                        'secure': secure,
                        'expiry': expiry,
                        'name': name,
                        'value': value,
                        'source': filename
                    }
                    print(f"✅ Đã đọc cookie: {name} từ {domain}")
    except Exception as e:
        print(f"❌ Lỗi khi đọc {filename}: {e}")
    
    return cookies

def merge_cookies():
    """Kết hợp cookies từ tất cả trình duyệt"""
    print("🔄 Bắt đầu kết hợp cookies từ nhiều trình duyệt...")
    
    # Danh sách file cookies cần kết hợp
    cookie_files = [
        'cookies_chrome.txt',
        'cookies_firefox.txt', 
        'cookies_edge.txt',
        'cookies_safari.txt'
    ]
    
    # Dictionary để lưu tất cả cookies
    all_cookies = {}
    
    # Đọc cookies từ từng file
    for cookie_file in cookie_files:
        cookies = parse_cookies_file(cookie_file)
        all_cookies.update(cookies)
    
    # Tạo file cookies.txt tổng hợp
    output_file = 'cookies_merged.txt'
    
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            # Header
            f.write("# Netscape HTTP Cookie File - Merged from multiple browsers\n")
            f.write(f"# Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write("# http://curl.haxx.se/rfc/cookie_spec.html\n")
            f.write("# This file contains cookies from multiple browsers\n\n")
            
            # Ghi cookies
            for key, cookie in all_cookies.items():
                line = f"{cookie['domain']}\t{cookie['path']}\t{cookie['secure']}\t{cookie['expiry']}\t{cookie['name']}\t{cookie['value']}\n"
                f.write(line)
        
        print(f"✅ Đã tạo file {output_file} với {len(all_cookies)} cookies")
        print(f"📊 Cookies từ các nguồn:")
        
        # Thống kê cookies theo nguồn
        sources = {}
        for cookie in all_cookies.values():
            source = cookie['source']
            sources[source] = sources.get(source, 0) + 1
        
        for source, count in sources.items():
            print(f"   - {source}: {count} cookies")
            
    except Exception as e:
        print(f"❌ Lỗi khi tạo file {output_file}: {e}")
        return False
    
    return True

def create_browser_specific_cookies():
    """Tạo cookies cho từng trình duyệt cụ thể"""
    print("\n🔧 Tạo cookies cho từng trình duyệt...")
    
    browsers = ['chrome', 'firefox', 'edge', 'safari']
    
    for browser in browsers:
        if browser == 'safari' and os.name != 'posix':  # Safari chỉ có trên macOS
            print(f"⚠️ Safari chỉ có trên macOS, bỏ qua...")
            continue
            
        output_file = f'cookies_{browser}.txt'
        print(f"🔄 Tạo cookies cho {browser}...")
        
        try:
            # Sử dụng yt-dlp để tạo cookies
            import subprocess
            cmd = f'yt-dlp --cookies-from-browser {browser} --cookies {output_file} "https://www.youtube.com"'
            
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            
            if result.returncode == 0:
                print(f"✅ Đã tạo {output_file}")
            else:
                print(f"⚠️ Không thể tạo cookies cho {browser}: {result.stderr}")
                
        except Exception as e:
            print(f"❌ Lỗi khi tạo cookies cho {browser}: {e}")

if __name__ == "__main__":
    print("🍪 YouTube Cookies Merger")
    print("=" * 40)
    
    # Tạo cookies cho từng trình duyệt
    create_browser_specific_cookies()
    
    print("\n" + "=" * 40)
    
    # Kết hợp cookies
    if merge_cookies():
        print("\n🎉 Hoàn thành! Bây giờ bạn có thể:")
        print("1. Sử dụng cookies_merged.txt làm cookies.txt chính")
        print("2. Hoặc sử dụng cookies từ trình duyệt cụ thể")
        print("3. Upload lên GitHub để deploy")
    else:
        print("\n❌ Có lỗi xảy ra, vui lòng kiểm tra lại")
