// DOM Elements
const urlInput = document.getElementById('urlInput');
const downloadBtn = document.getElementById('downloadBtn');
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const resultContainer = document.getElementById('resultContainer');
const resultMessage = document.getElementById('resultMessage');
const filesList = document.getElementById('filesList');
const refreshFiles = document.getElementById('refreshFiles');
const downloadAllBtn = document.getElementById('downloadAllBtn');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const batchUrls = document.getElementById('batchUrls');
const batchDownloadBtn = document.getElementById('batchDownloadBtn');
const loadingModal = document.getElementById('loadingModal');
const loadingText = document.getElementById('loadingText');
const confirmDeleteModal = document.getElementById('confirmDeleteModal');
const confirmDeleteText = document.getElementById('confirmDeleteText');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

// Debug DOM elements
console.log('DOM Elements found:', {
    urlInput: !!urlInput,
    downloadBtn: !!downloadBtn,
    filesList: !!filesList,
    refreshFiles: !!refreshFiles
});

// State
let isDownloading = false;

// API Base URL - Local development or Render backend
const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://musicvndow-backend.onrender.com';

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    loadFiles();
    setupEventListeners();
    setupSmoothScrolling();
});

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Download button
    downloadBtn.addEventListener('click', handleDownload);
    
    // Enter key in URL input
    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleDownload();
        }
    });
    
    // Refresh files
    console.log('Setting up refresh button listener...');
    refreshFiles.addEventListener('click', async () => {
        console.log('Refresh button clicked!');
        // Add loading state to button
        const originalText = refreshFiles.innerHTML;
        refreshFiles.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tải...';
        refreshFiles.disabled = true;
        
        try {
            await loadFiles();
        } finally {
            // Restore button state
            refreshFiles.innerHTML = originalText;
            refreshFiles.disabled = false;
        }
    });
    
    // Download all files
    console.log('Setting up download all button listener...');
    downloadAllBtn.addEventListener('click', handleDownloadAll);
    
    // Delete all files
    console.log('Setting up delete all button listener...');
    deleteAllBtn.addEventListener('click', showDeleteConfirmModal);
    
    // Batch download
    batchDownloadBtn.addEventListener('click', handleBatchDownload);
    
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function setupSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Download Functions
async function handleDownload() {
    if (isDownloading) return;
    
    const url = urlInput.value.trim();
    
    if (!url) {
        showResult('Vui lòng nhập URL', 'error');
        return;
    }
    
    if (!isValidUrl(url)) {
        showResult('URL không hợp lệ', 'error');
        return;
    }
    
    isDownloading = true;
    showProgress();
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/download`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showResult(`Tải xuống thành công! Sử dụng ${data.method}`, 'success');
            urlInput.value = '';
            loadFiles(); // Refresh file list
        } else {
            showResult(`Lỗi: ${data.error}`, 'error');
        }
    } catch (error) {
        showResult('Lỗi kết nối server', 'error');
        console.error('Download error:', error);
    } finally {
        isDownloading = false;
        hideProgress();
    }
}

async function handleDownloadAll() {
    console.log('Download all button clicked!');
    
    // Get current files list
    const currentFiles = await getCurrentFiles();
    
    if (!currentFiles || currentFiles.length === 0) {
        showResult('Không có file nào để tải', 'error');
        return;
    }
    
    // Disable button and show loading
    const originalText = downloadAllBtn.innerHTML;
    downloadAllBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tải...';
    downloadAllBtn.disabled = true;
    
    try {
        // Create a zip file containing all files
        const response = await fetch(`${API_BASE_URL}/api/download-all`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ files: currentFiles })
        });
        
        if (response.ok) {
            // Create download link for zip file
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `all-files-${new Date().toISOString().split('T')[0]}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            showResult(`Đã tải xuống ${currentFiles.length} file`, 'success');
        } else {
            showResult('Lỗi khi tạo file zip', 'error');
        }
    } catch (error) {
        showResult('Lỗi kết nối server', 'error');
        console.error('Download all error:', error);
    } finally {
        // Restore button state
        downloadAllBtn.innerHTML = originalText;
        downloadAllBtn.disabled = false;
    }
}

async function showDeleteConfirmModal() {
    console.log('Delete all button clicked!');
    
    // Get current files list
    const currentFiles = await getCurrentFiles();
    
    if (!currentFiles || currentFiles.length === 0) {
        showResult('Không có file nào để xóa', 'error');
        return;
    }
    
    // Update modal text
    confirmDeleteText.textContent = `Bạn có chắc muốn xóa tất cả ${currentFiles.length} file?`;
    
    // Show modal
    confirmDeleteModal.style.display = 'flex';
    
    // Setup event listeners
    cancelDeleteBtn.onclick = () => {
        confirmDeleteModal.style.display = 'none';
    };
    
    confirmDeleteBtn.onclick = () => {
        confirmDeleteModal.style.display = 'none';
        handleDeleteAll();
    };
    
    // Close modal when clicking outside
    confirmDeleteModal.onclick = (e) => {
        if (e.target === confirmDeleteModal) {
            confirmDeleteModal.style.display = 'none';
        }
    };
}

async function handleDeleteAll() {
    // Disable button and show loading
    const originalText = deleteAllBtn.innerHTML;
    deleteAllBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xóa...';
    deleteAllBtn.disabled = true;
    
    try {
        // Delete all files
        const response = await fetch(`${API_BASE_URL}/api/delete-all`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            showResult(`Đã xóa ${data.deletedCount} file`, 'success');
            loadFiles(); // Refresh file list
        } else {
            showResult('Lỗi khi xóa file', 'error');
        }
    } catch (error) {
        showResult('Lỗi kết nối server', 'error');
        console.error('Delete all error:', error);
    } finally {
        // Restore button state
        deleteAllBtn.innerHTML = originalText;
        deleteAllBtn.disabled = false;
    }
}

async function getCurrentFiles() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/files`);
        const data = await response.json();
        return data.files || [];
    } catch (error) {
        console.error('Error getting current files:', error);
        return [];
    }
}

async function handleBatchDownload() {
    const urls = batchUrls.value.trim();
    const format = document.getElementById('batchFormat').value;
    
    if (!urls) {
        showResult('Vui lòng nhập danh sách URL', 'error');
        return;
    }
    
    const urlList = urls.split('\n').filter(url => url.trim());
    
    if (urlList.length === 0) {
        showResult('Không có URL hợp lệ', 'error');
        return;
    }
    
    showLoadingModal('Đang tải hàng loạt...');
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/batch-download`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ urls: urlList, format })
        });
        
        const data = await response.json();
        
        if (data.success) {
            const successCount = data.results.filter(r => r.status === 'success').length;
            const totalCount = data.results.length;
            
            showResult(`Hoàn thành: ${successCount}/${totalCount} file`, 'success');
            batchUrls.value = '';
            loadFiles();
        } else {
            showResult('Lỗi khi tải hàng loạt', 'error');
        }
    } catch (error) {
        showResult('Lỗi kết nối server', 'error');
        console.error('Batch download error:', error);
    } finally {
        hideLoadingModal();
    }
}

// File Management
async function loadFiles() {
    try {
        console.log('Loading files...');
        const response = await fetch(`${API_BASE_URL}/api/files`);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Files data:', data);
        
        if (data.files && data.files.length > 0) {
            console.log('Found files, displaying...');
            displayFiles(data.files);
        } else {
            console.log('No files found, showing empty message');
            filesList.innerHTML = '<p class="no-files">Chưa có file nào được tải</p>';
        }
    } catch (error) {
        console.error('Error loading files:', error);
        filesList.innerHTML = '<p class="error">Lỗi khi tải danh sách file: ' + error.message + '</p>';
    }
}

function displayFiles(files) {
    console.log('Displaying files:', files);
    
    if (!files || files.length === 0) {
        filesList.innerHTML = '<p class="no-files">Chưa có file nào được tải</p>';
        return;
    }
    
    const fileHtml = files.map(file => `
        <div class="file-item">
            <div class="file-info">
                <div class="file-name">${file.name}</div>
                <div class="file-meta">
                    ${formatFileSize(file.size)} • ${formatDate(file.date)}
                </div>
            </div>
            <div class="file-actions">
                <a href="${file.url}" download class="file-btn download-file-btn">
                    <i class="fas fa-download"></i>
                    Tải
                </a>
                <button onclick="deleteFile('${file.name}')" class="file-btn delete-file-btn">
                    <i class="fas fa-trash"></i>
                    Xóa
                </button>
            </div>
        </div>
    `).join('');
    
    console.log('Generated HTML:', fileHtml);
    filesList.innerHTML = fileHtml;
}

async function deleteFile(filename) {
    if (!confirm('Bạn có chắc muốn xóa file này?')) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/files/${encodeURIComponent(filename)}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            showResult('File đã được xóa', 'success');
            loadFiles();
        } else {
            showResult('Lỗi khi xóa file', 'error');
        }
    } catch (error) {
        showResult('Lỗi kết nối server', 'error');
        console.error('Delete error:', error);
    }
}

// UI Functions
function showProgress() {
    progressContainer.style.display = 'block';
    progressBar.style.width = '0%';
    
    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 90) progress = 90;
        progressBar.style.width = progress + '%';
        
        if (!isDownloading) {
            clearInterval(interval);
            progressBar.style.width = '100%';
        }
    }, 500);
}

function hideProgress() {
    setTimeout(() => {
        progressContainer.style.display = 'none';
        progressBar.style.width = '0%';
    }, 1000);
}

function showResult(message, type) {
    resultMessage.textContent = message;
    resultMessage.className = `result-message ${type}`;
    resultContainer.style.display = 'block';
    
    setTimeout(() => {
        resultContainer.style.display = 'none';
    }, 5000);
}

function showLoadingModal(text = 'Đang xử lý...') {
    loadingText.textContent = text;
    loadingModal.style.display = 'flex';
}

function hideLoadingModal() {
    loadingModal.style.display = 'none';
}

// Utility Functions
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Add some CSS for missing elements
const style = document.createElement('style');
style.textContent = `
    .no-files {
        text-align: center;
        color: #666;
        font-style: italic;
        padding: 2rem;
    }
    
    .error {
        text-align: center;
        color: #ff4757;
        padding: 2rem;
    }
    
    .file-btn {
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .file-btn i {
        font-size: 0.9rem;
    }
`;
document.head.appendChild(style);
