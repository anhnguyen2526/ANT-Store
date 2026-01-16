const typewriters = document.querySelectorAll('.typewriter');

typewriters.forEach(el => {
  el.addEventListener('animationend', (e) => {
    if (e.animationName === 'typing') {
      el.classList.add('done'); // thêm class 'done' cho từng p
    }
  });
});

/***********************
 * PRODUCT + POPUP
 ***********************/
document.addEventListener("DOMContentLoaded", () => {

  /* ==== BIẾN CŨ GIỮ NGUYÊN ==== */
  const cards = document.querySelectorAll(".card");
  const cardWrapper = document.querySelector(".card-wrapper");

  const detail = document.getElementById("product-detail");
  const title = document.getElementById("detail-title");
  const desc = document.getElementById("detail-desc");
  const gallery = document.querySelector(".gallery");

  const popup = document.getElementById("popup");
  const popupContent = popup?.querySelector(".popup-content");
  const closePopupBtn = popup?.querySelector(".close");

  if (!cards.length || !detail || !popup) return;

  /* ==== DATA ==== */
  const data = [
    {
      title: "Dâu Mộc Châu",
      desc: `
<strong>🍓 Dâu tươi Mộc Châu-Sơn La chính gốc</strong><br>
🌿 Trồng tại cao nguyên mát lành, chín tự nhiên, không chất bảo quản<br>
🧺Thu hoạch trong ngày – ngọt dịu – an tâm cho cả gia đình<br>
✈️ Ship toàn quốc - Đặc biệt TP.HCM
`,
      media: ["img/dau1.jpg","img/dau2.jpg", "img/dau3.jpg","img/dau4.jpg","img/dau5.jpg","img/dau6.jpg","img/dau7.jpg","img/dau8.jpg","video/dau1.mp4"]
    },
    {
      title: "Cafe chất",
      desc: "Cafe rang mộc, đậm vị, không pha trộn.",
      media: ["img/cafe1.jpg", "img/cafe2.jpg"]
    },
    {
      title: "Hạt điều",
      desc: "Hạt điều rang muối, giòn béo tự nhiên.",
      media: ["img/dieu1.jpg", "video/dieu.mp4"]
    }
  ];

  /***********************
   * CLICK CARD → DETAIL
   ***********************/
  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      cardWrapper.style.display = "none";
      detail.classList.remove("hidden");

title.textContent = data[index].title;
title.style.color = "#2d6a4f"; 
desc.innerHTML = data[index].desc;

      gallery.innerHTML = "";

      data[index].media.forEach(src => {
        if (src.endsWith(".mp4")) {
          gallery.insertAdjacentHTML(
            "beforeend",
            `<video src="${src}" controls playsinline></video>`
          );
        } else {
          gallery.insertAdjacentHTML(
            "beforeend",
            `<img src="${src}" alt="">`
          );
        }
      });

      window.scrollTo({ top: detail.offsetTop - 40, behavior: "smooth" });
    });
  });

  /***********************
   * BACK BUTTON
   ***********************/
  const backBtn = document.querySelector(".back-btn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      detail.classList.add("hidden");
      cardWrapper.style.display = "flex";
      gallery.innerHTML = "";
    });
  }

  /***********************
   * OPEN POPUP
   ***********************/
  document.addEventListener("click", e => {
    const target = e.target.closest(".gallery img, .gallery video");
    if (!target) return;

    popup.classList.remove("hidden");
    popupContent.innerHTML = target.outerHTML;
    document.body.style.overflow = "hidden";
  });

  /***********************
   * CLOSE POPUP
   ***********************/
  const closePopup = () => {
    popup.classList.add("hidden");
    popupContent.innerHTML = "";
    document.body.style.overflow = "";
  };

  closePopupBtn?.addEventListener("click", closePopup);

  popup.addEventListener("click", e => {
    if (e.target === popup) closePopup();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !popup.classList.contains("hidden")) {
      closePopup();
    }
  });

});