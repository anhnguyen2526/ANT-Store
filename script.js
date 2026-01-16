const typewriters = document.querySelectorAll('.typewriter');

typewriters.forEach(el => {
  el.addEventListener('animationend', (e) => {
    if (e.animationName === 'typing') {
      el.classList.add('done'); // thêm class 'done' cho từng p
    }
  });
});

const items = document.querySelectorAll('.menu ul li');
const indicator = document.querySelector('.menu .indicator');

// ===== XÁC ĐỊNH ITEM ACTIVE =====
let activeItem = items[0]; // mặc định Trang chủ

items.forEach(item => {
  const link = item.querySelector('a');
  if (link.href === window.location.href) {
    activeItem = item;
  }
});

// ===== DI CHUYỂN INDICATOR =====
function moveIndicator(el) {
  indicator.style.width = el.offsetWidth + 'px';
  indicator.style.left = el.offsetLeft + 'px';
}

// ===== GÁN SỰ KIỆN =====
items.forEach(item => {
  // Hover (desktop)
  item.addEventListener('mouseenter', () => {
    moveIndicator(item);
  });

  // Rời chuột → quay về active
  item.addEventListener('mouseleave', () => {
    moveIndicator(activeItem);
  });

  // Touch (mobile)
  item.addEventListener('touchstart', () => {
    moveIndicator(item);
  });
});

// ===== VỊ TRÍ BAN ĐẦU =====
window.addEventListener('load', () => {
  moveIndicator(activeItem);
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
      desc: "Dâu tươi Mộc Châu, ngọt thanh, thu hoạch trong ngày.",
      media: ["img/dau1.jpg", "img/dau2.jpg", "video/dau.mp4"]
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
      desc.textContent = data[index].desc;

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