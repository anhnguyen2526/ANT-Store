const startTime = Date.now();

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");        // loader
  const content = document.getElementById("page-content"); // nội dung trang

  const elapsed = Date.now() - startTime;
  const minTime = 4900; // 6 giây

  const remaining = Math.max(minTime - elapsed, 0);

  setTimeout(() => {
    // Ẩn loader
    loader.classList.add("hide");
    // Hiện nội dung
    content.style.display = "block";

    // Sau 0.6s xóa hoàn toàn loader khỏi DOM
    setTimeout(() => {
      loader.remove();
    }, 600);
  }, remaining);
});
