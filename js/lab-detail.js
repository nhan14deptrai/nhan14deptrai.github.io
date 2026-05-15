// Lab configuration and file paths
const labsData = {
    1: {
        title: "Lab 01: HTML",
        description: "Các bài thực hành về HTML cơ bản",
        files: [
            {
                name: "Lab 01 - Example",
                path: "labthuchanh/Lab01/Lab01/Vi_du/index.html",
                type: "folder",
                icon: "fa-folder"
            },
            {
                name: "Lab 1 - Bài 4",
                path: "labthuchanh/Lab01/lab1_bai4.txt",
                type: "text",
                icon: "fa-file-lines"
            }
        ]
    },
    2: {
        title: "Lab 02: Table & List",
        description: "Các bài thực hành về Bảng và Danh sách",
        files: [
            {
                name: "Lab 2 - Bài 1",
                path: "labthuchanh/Lab02/Lab02/lab02_bai1.html",
                type: "html",
                icon: "fa-file-code"
            },
            {
                name: "Lab 2 - Bài 2",
                path: "labthuchanh/Lab02/Lab02/lab02_bai2.html",
                type: "html",
                icon: "fa-file-code"
            },
            {
                name: "Lab 2 - Khung Table",
                path: "labthuchanh/Lab02/Lab02/lab02_khung_table.html",
                type: "html",
                icon: "fa-file-code"
            },
            {
                name: "Lab 2 - Ví dụ",
                path: "labthuchanh/Lab02/Lab02/Vi_du_Lab01/index.html",
                type: "folder",
                icon: "fa-folder"
            }
        ]
    },
    3: {
        title: "Lab 03: Frame & Form",
        description: "Các bài thực hành về Frame và Form",
        files: [
            {
                name: "Lab 3 - Bài 3 XL",
                path: "labthuchanh/Lab03/Lab03/Lab03/xl_lab03_bai3.php",
                type: "php",
                icon: "fa-file-code"
            },
            {
                name: "Lab 3 - XP Thêm",
                path: "labthuchanh/Lab03/Lab03/Lab03/xpThem.php",
                type: "php",
                icon: "fa-file-code"
            }
        ]
    },
    4: {
        title: "Lab 04: CSS cơ bản",
        description: "Các bài thực hành về CSS cơ bản",
        files: [
            {
                name: "Lab 4 - Bài 1",
                path: "labthuchanh/Lab04/Lab04/Vi_du/Lab04_bai1.html",
                type: "html",
                icon: "fa-file-code"
            },
            {
                name: "Lab 4 - Ví dụ",
                path: "labthuchanh/Lab04/Lab04/Vi_du/index.html",
                type: "folder",
                icon: "fa-folder"
            }
        ]
    },
    5: {
        title: "Lab 05: Các thuộc tính CSS",
        description: "Các bài thực hành nâng cao về CSS",
        files: [
            {
                name: "Lab 5 - Bài 2",
                path: "labthuchanh/Lab05/Lab05/Bai_2/index.html",
                type: "html",
                icon: "fa-file-code"
            },
            {
                name: "Lab 5 - Ví dụ",
                path: "labthuchanh/Lab05/Lab05/Vi_du/index.html",
                type: "folder",
                icon: "fa-folder"
            }
        ]
    },
    6: {
        title: "Lab 06: Xây dựng layout responsive bằng CSS",
        description: "Các bài thực hành về Responsive Design",
        files: [
            {
                name: "Lab 6 - Bài 2 Minh họa",
                path: "labthuchanh/Lab06/Lab06/Bai_2_Minh_hoa_layout/index.html",
                type: "html",
                icon: "fa-file-code"
            },
            {
                name: "Lab 6 - Ví dụ",
                path: "labthuchanh/Lab06/Lab06/Vi_du/index.html",
                type: "folder",
                icon: "fa-folder"
            }
        ]
    },
    7: {
        title: "Lab 07: Javascript",
        description: "Các bài thực hành về Javascript cơ bản",
        files: [
            {
                name: "Lab 7 - Demo Bài 2",
                path: "labthuchanh/Lab07/Lab07/demo_bai_2/index.html",
                type: "html",
                icon: "fa-file-code"
            },
            {
                name: "Lab 7 - Ví dụ",
                path: "labthuchanh/Lab07/Lab07/Vi_du/index.html",
                type: "folder",
                icon: "fa-folder"
            }
        ]
    },
    8: {
        title: "Lab 08: Javascript nâng cao",
        description: "Các bài thực hành Javascript nâng cao",
        files: [
            {
                name: "Lab 8 - Ví dụ 1",
                path: "labthuchanh/Lab08/Lab08/Vi_du_1/",
                type: "folder",
                icon: "fa-folder"
            },
            {
                name: "Lab 8 - Ví dụ 2",
                path: "labthuchanh/Lab08/Lab08/Vi_du_2/",
                type: "folder",
                icon: "fa-folder"
            }
        ]
    },
    9: {
        title: "Lab 09: Bài thực hành nâng cao",
        description: "Các bài thực hành nâng cao",
        files: [
            {
                name: "Lab 9 - Ví dụ 1",
                path: "labthuchanh/Lab09/Vi_du_1/index.html",
                type: "html",
                icon: "fa-file-code"
            },
            {
                name: "Lab 9 - Ví dụ 2",
                path: "labthuchanh/Lab09/Vi_du_2/index.html",
                type: "html",
                icon: "fa-file-code"
            }
        ]
    },
    10: {
        title: "Lab 10: Bài thực hành hoàn chỉnh",
        description: "Bài thực hành cuối cùng",
        files: [
            {
                name: "Lab 10 - Ví dụ",
                path: "labthuchanh/Lab10/Vi_du/index.html",
                type: "html",
                icon: "fa-file-code"
            },
            {
                name: "Lab 10 - Script",
                path: "labthuchanh/Lab10/Vi_du/script.js",
                type: "js",
                icon: "fa-file-code"
            },
            {
                name: "Lab 10 - Style",
                path: "labthuchanh/Lab10/Vi_du/style.css",
                type: "css",
                icon: "fa-file-code"
            }
        ]
    }
};

// Get lab number from URL parameter
function getLabFromURL() {
    // Lấy lab number từ hash (ví dụ: lab-detail.html#1)
    const hash = window.location.hash.substring(1);
    return parseInt(hash) || 1;
}

// Initialize page
function initLabDetail() {
    const labNumber = getLabFromURL();
    const labData = labsData[labNumber];

    if (!labData) {
        document.getElementById('lab-files-grid').innerHTML = 
            '<div class="no-files">Lab không tồn tại</div>';
        return;
    }

    // Update header
    document.getElementById('lab-title').textContent = labData.title;
    document.getElementById('lab-description').textContent = labData.description;

    // Render files
    renderLabFiles(labData.files);
}

// Render lab files as cards
function renderLabFiles(files) {
    const container = document.getElementById('lab-files-grid');
    
    if (!files || files.length === 0) {
        container.innerHTML = '<div class="no-files">Không có file nào</div>';
        return;
    }

    const html = files.map(file => `
        <div class="lab-file-card" onclick="openLabFile('${file.path}', '${file.type}')">
            <div class="lab-file-card-icon">
                <i class="fa-solid ${file.icon}"></i>
            </div>
            <div class="lab-file-card-name">${file.name}</div>
            <div class="lab-file-card-path">${file.path}</div>
            <div class="lab-file-card-type">${file.type}</div>
        </div>
    `).join('');

    container.innerHTML = html;
}

// Open lab file
function openLabFile(path, type) {
    if (type === 'folder') {
        // For folders, open the index.html inside
        window.location.href = path;
    } else if (type === 'html') {
        // For HTML files, open directly
        window.location.href = path;
    } else if (type === 'text' || type === 'php' || type === 'js' || type === 'css') {
        // For other files, open in new tab
        window.open(path, '_blank');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initLabDetail);

// Đợi HTML tải xong
document.addEventListener('DOMContentLoaded', () => {
    // Tìm tất cả các nút có class .btn-lab-detail
    const detailButtons = document.querySelectorAll('.btn-lab-detail');

    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Lấy giá trị data-lab (ví dụ: 1, 2, 3...)
            const labId = this.getAttribute('labsData');
            
            // Chuyển hướng sang trang chi tiết kèm theo hash id trên URL
            // Đảm bảo tên file HTML trang chi tiết của bạn khớp với URL bên dưới nhé
            window.location.href = `lab-detail.html#${labId}`;
        });
    });
});