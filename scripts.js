// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    // Tìm kiếm
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 0 0 2px rgba(43, 138, 62, 0.2)';
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.style.boxShadow = 'none';
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    alert(`Tìm kiếm: ${query}`);
                    this.value = '';
                }
            }
        });
    }
    
    // Thông báo
    const notificationBtn = document.getElementById('notificationBtn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            const notifications = [
                { title: 'Cảnh báo thời tiết', message: 'Dự báo mưa lớn vào chiều nay tại khu vực ĐBSCL' },
                { title: 'Giá nông sản', message: 'Giá lúa tăng 2.5% so với hôm qua' },
                { title: 'Bài viết mới', message: 'Đã có bài viết mới: "Kỹ thuật tưới tiết kiệm cho cây ăn trái"' }
            ];
            
            let notificationHTML = '<div class="notifications-list">';
            notifications.forEach(notif => {
                notificationHTML += `
                    <div class="notification-item">
                        <h4>${notif.title}</h4>
                        <p>${notif.message}</p>
                    </div>
                `;
            });
            notificationHTML += '</div>';
            
            // Tạo modal thông báo
            const modal = document.createElement('div');
            modal.className = 'notification-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Thông báo (3)</h3>
                        <button class="close-modal">&times;</button>
                    </div>
                    ${notificationHTML}
                    <div class="modal-footer">
                        <button class="mark-all-read">Đánh dấu đã đọc tất cả</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Đóng modal
            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            // Đánh dấu đã đọc
            const markReadBtn = modal.querySelector('.mark-all-read');
            markReadBtn.addEventListener('click', function() {
                const badge = document.querySelector('.notification-badge');
                if (badge) badge.style.display = 'none';
                document.body.removeChild(modal);
            });
            
            // Đóng khi click bên ngoài
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        });
    }
    
    // Cập nhật ngày giờ hiện tại
    function updateDateTime() {
        const now = new Date();
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        
        const dateStr = now.toLocaleDateString('vi-VN', dateOptions);
        const timeStr = now.toLocaleTimeString('vi-VN', timeOptions);
        
        const dateTimeElements = document.querySelectorAll('.current-datetime');
        dateTimeElements.forEach(el => {
            el.innerHTML = `${dateStr} | ${timeStr}`;
        });
    }
    
    // Cập nhật mỗi giây
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Thêm style cho modal
    const style = document.createElement('style');
    style.textContent = `
        .notification-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        
        .notification-modal .modal-content {
            background-color: white;
            border-radius: 8px;
            width: 90%;
            max-width: 500px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }
        
        .notification-modal .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #e9ecef;
        }
        
        .notification-modal .modal-header h3 {
            margin: 0;
        }
        
        .notification-modal .close-modal {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #495057;
        }
        
        .notification-modal .notifications-list {
            padding: 20px;
        }
        
        .notification-modal .notification-item {
            padding: 15px;
            border-bottom: 1px solid #f1f3f5;
        }
        
        .notification-modal .notification-item:last-child {
            border-bottom: none;
        }
        
        .notification-modal .notification-item h4 {
            margin: 0 0 8px 0;
            color: #212529;
        }
        
        .notification-modal .notification-item p {
            margin: 0;
            color: #495057;
            font-size: 0.9rem;
        }
        
        .notification-modal .modal-footer {
            padding: 15px 20px;
            border-top: 1px solid #e9ecef;
            text-align: right;
        }
        
        .notification-modal .mark-all-read {
            background-color: #2b8a3e;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-family: 'Inter', sans-serif;
        }
    `;
    document.head.appendChild(style);
});