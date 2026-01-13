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
