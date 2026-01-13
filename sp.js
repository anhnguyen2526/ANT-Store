const startTime = Date.now();

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const content = document.getElementById("page-content");

  const elapsed = Date.now() - startTime;
  const minTime = 6000; // 6 giây

  const remaining = Math.max(minTime - elapsed, 0);

  setTimeout(() => {
    // Hiện nội dung
    content.style.display = "block";

    // Ẩn loader
    loader.classList.add("hide");

    setTimeout(() => {
      loader.remove();
    }, 600);
  }, remaining);
});

// Lấy phần tử logo và ảnh bên trong
const logo = document.querySelector('.floating-logo'); 
const logoImg = logo.querySelector('img');

// Khi click vào logo
logo.addEventListener('click', () => {
  lightbox.style.display = 'flex';
  lightboxImg.src = logoImg.src; // ảnh hiện tại của logo
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');

logo.addEventListener('click', () => {
  lightbox.style.display = 'flex';
  lightboxImg.src = logoImg.src;
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Click ngoài ảnh cũng đóng
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});
