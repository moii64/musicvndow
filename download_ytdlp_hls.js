const fs = require("fs");
const path = require("path");
const youtubedl = require("youtube-dl-exec");

const LINKS_FILE = "links.txt";
const DOWNLOAD_DIR = "downloads";

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR);
}

async function downloadWithYtDlp(url) {
  try {
    console.log(`⬇️ Đang tải với yt-dlp: ${url}`);
    
    await youtubedl(url, {
      extractAudio: true,
      audioFormat: "mp3",
      output: path.join(DOWNLOAD_DIR, "%(title)s.%(ext)s"),
      // HLS specific options
      format: "bestaudio/best",
      // Bypass restrictions
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      referer: "https://play.diijam.vn/",
      // Headers
      addHeader: [
        "Accept-Language: vi-VN,vi;q=0.9,en;q=0.8",
        "Accept-Encoding: gzip, deflate, br",
        "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Connection: keep-alive",
        "Upgrade-Insecure-Requests: 1",
        "Sec-Fetch-Dest: document",
        "Sec-Fetch-Mode: navigate",
        "Sec-Fetch-Site: none",
        "Sec-Fetch-User: ?1",
        "Cache-Control: max-age=0",
        "DNT: 1"
      ],
      // HLS options
      hlsUseMpegts: true,
      // Extractor args for Cloudflare bypass
      extractorArgs: "generic:impersonate",
      // Retry
      retries: 5,
      // Verbose for debugging
      verbose: true
    });
    
    console.log(`✅ Hoàn tất: ${url}`);
    return true;
    
  } catch (err) {
    console.error(`❌ Lỗi khi tải ${url}:`, err.stderr || err.message);
    return false;
  }
}

async function main() {
  console.log("🎵 Diijam yt-dlp HLS Downloader");
  console.log("=================================");
  
  const links = fs.readFileSync(LINKS_FILE, "utf-8")
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0 && line.includes("diijam.vn"));

  console.log(`📂 Tìm thấy ${links.length} link`);
  
  for (const link of links) {
    const success = await downloadWithYtDlp(link);
    if (success) {
      console.log(`🎉 THÀNH CÔNG: Đã tải ${link}`);
    } else {
      console.log(`❌ THẤT BẠI: Không tải được ${link}`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log("🎵 Hoàn tất!");
}

main().catch(console.error);
