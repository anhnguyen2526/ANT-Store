/***********************
 * LOADER
 ***********************/
const startTime = Date.now();

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const content = document.getElementById("page-content");

  if (!loader || !content) return;

  const elapsed = Date.now() - startTime;
  const minTime = 4900;
  const remaining = Math.max(minTime - elapsed, 0);

  setTimeout(() => {
    loader.classList.add("hide");
    content.style.display = "block";

    setTimeout(() => {
      loader.remove();
    }, 600);
  }, remaining);
});

