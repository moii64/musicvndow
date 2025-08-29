const fs = require("fs");
const path = require("path");
const youtubedl = require("youtube-dl-exec");

// File chứa danh sách link
const LINKS_FILE = "links.txt";
// Thư mục tải về
const DOWNLOAD_DIR = "downloads";
// Giới hạn số link tải song song
const MAX_CONCURRENT = 3;

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR);
}

// Hàm tải 1 bài nhạc
async function downloadTrack(url) {
  try {
    console.log(`⬇️ Đang tải: ${url}`);
    await youtubedl(url, {
      extractAudio: true,
      audioFormat: "mp3",
      output: path.join(DOWNLOAD_DIR, "%(title)s.%(ext)s"),
      // Bypass Cloudflare
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      referer: "https://play.diijam.vn/",
      // Thêm headers
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
      // Thử với extractor args
      extractorArgs: "generic:impersonate",
      // Thêm cookies nếu có
      cookies: "cookies.txt",
      // Retry nếu fail
      retries: 3
    });
    console.log(`✅ Hoàn tất: ${url}`);
  } catch (err) {
    console.error(`❌ Lỗi khi tải ${url}:`, err.stderr || err.message);
  }
}

// Chia batch tải song song
async function downloadInBatches(links, batchSize) {
  for (let i = 0; i < links.length; i += batchSize) {
    const batch = links.slice(i, i + batchSize);
    console.log(`🚀 Batch ${i / batchSize + 1}: tải ${batch.length} link`);
    await Promise.all(batch.map(link => downloadTrack(link)));
  }
}

async function main() {
  const links = fs.readFileSync(LINKS_FILE, "utf-8")
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0);

  console.log(`📂 Có ${links.length} link trong file ${LINKS_FILE}`);
  await downloadInBatches(links, MAX_CONCURRENT);
  console.log("🎵 Tất cả bài nhạc đã tải xong!");
}

main();
