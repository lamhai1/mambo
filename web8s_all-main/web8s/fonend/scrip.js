/* ========================== */
/* MENU CẤP 1                */
/* ========================== */
function toggleMenu(id, arrowId) {
    let menu = document.getElementById(id);
    let arrow = document.getElementById(arrowId);

    let isOpen = menu.style.display === "block";

    // Đóng tất cả submenu
    document.querySelectorAll(".submenu").forEach(m => m.style.display = "none");
    document.querySelectorAll(".arrow").forEach(a => a.classList.remove("open"));

    if (!isOpen) {
        menu.style.display = "block";
        arrow.classList.add("open");
    }
}

/* ========================== */
/* MENU CẤP 2                */
/* ========================== */
function toggleNested(e, id, arrowId) {
    e.stopPropagation();

    let menu = document.getElementById(id);
    let arrow = document.getElementById(arrowId);

    let isOpen = menu.style.display === "block";

    document.querySelectorAll(".nested").forEach(m => m.style.display = "none");
    document.querySelectorAll(".arrow").forEach(a => a.classList.remove("open"));

    if (!isOpen) {
        menu.style.display = "block";
        arrow.classList.add("open");
    }
}

/* ========================== */
/* SEARCH MENU               */
/* ========================== */
function searchMenu() {
    let keyword = document.getElementById("searchInput").value.toLowerCase();
    let items = document.querySelectorAll("nav ul li");

    items.forEach(li => {
        li.style.display = li.innerText.toLowerCase().includes(keyword) ? "block" : "none";
    });
}

/* ========================== */
/* QUỐC GIA KHÁC             */
/* ========================== */
function toggleQuocGiaKhac() {
    document.getElementById("quoc_gia_khac_box").style.display =
        (document.getElementById("quoc_gia").value === "Khác") ? "block" : "none";
}

/* ========================== */
/* SLIDER                    */
/* ========================== */
const slider = document.querySelector(".slider");
const images = document.querySelectorAll(".slider img");
let index = 0;

document.querySelector(".next").onclick = () => {
    index++;
    if (index >= images.length) index = 0;
    updateSlider();
};

document.querySelector(".prev").onclick = () => {
    index--;
    if (index < 0) index = images.length - 1;
    updateSlider();
};

function updateSlider() {
    slider.style.transform = `translateX(-${index * 100}%)`;
}

setInterval(() => {
    index++;
    if (index >= images.length) index = 0;
    updateSlider();
}, 4000);

/* ========================== */
/* SCROLL TO FORM            */
/* ========================== */
document.querySelectorAll('a[href="#dangky"]').forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("dangky").scrollIntoView({ behavior: "smooth" });
    });
});

/* ========================== */
/* VALIDATE HỌ TÊN           */
/* ========================== */
document.getElementById("ho_ten").addEventListener("input", function () {
    let value = this.value.replace(/[^\p{L}\s]/gu, ""); 
    value = value.replace(/\s{2,}/g, " ");
    value = value.replace(/\b\p{L}/gu, ch => ch.toUpperCase());
    this.value = value;
});

/* ========================== */
/* VALIDATE NĂM SINH — KHÔNG CHO GÕ "-" */
/* ========================== */
const namSinh = document.getElementById("nam_sinh");

// Chặn phím không phải số
namSinh.addEventListener("keydown", function (e) {
    const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];

    if (allowedKeys.includes(e.key)) return;

    // Nếu không phải số => chặn
    if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
    }
});

// Chặn ký tự dán vào nếu không phải số
namSinh.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");

    // Giới hạn năm
    let year = parseInt(this.value);

    if (year > 2020) this.value = 2020;
    if (year < 1950 && this.value.length === 4) this.value = 1950;
});

/* ========================== */
/* VALIDATE SỐ ĐIỆN THOẠI     */
/* ========================== */
document.getElementById("sdt").addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
});

/* ========================== */
/* GỬI FORM                  */
/* ========================== */
document.getElementById('userRegistrationForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const messageDisplay = document.getElementById('message');
    messageDisplay.textContent = 'Đang gửi thông tin...';
    messageDisplay.style.color = '#0f75bd';

    const data = {
        ho_ten: document.getElementById('ho_ten').value,
        nam_sinh: document.getElementById('nam_sinh').value,
        dia_chi: document.getElementById('dia_chi').value,
        chuong_trinh: document.getElementById('chuong_trinh').value,
        quoc_gia: document.getElementById('quoc_gia').value,
        quoc_gia_khac: document.getElementById('quoc_gia_khac') ? document.getElementById('quoc_gia_khac').value : "",
        sdt: document.getElementById('sdt').value
    };

    const apiUrl = 'http://localhost/web8s/backend_api/insert.php';

    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(apiResult => {
            if (apiResult.status) {
                messageDisplay.textContent = '✅ Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.';
                messageDisplay.style.color = 'green';
                event.target.reset();
            } else {
                messageDisplay.textContent = '❌ Lỗi: ' + apiResult.message;
                messageDisplay.style.color = 'red';
            }
        })
        .catch(error => {
messageDisplay.textContent = '❌ Không thể kết nối đến máy chủ. Kiểm tra Apache & MySQL.';
            messageDisplay.style.color = 'red';
            console.error(error);
        });
});