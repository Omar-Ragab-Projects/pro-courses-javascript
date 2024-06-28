// Local Storage Colors
let colors = document.querySelectorAll(".setting-container li");
if (localStorage.getItem("color")) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color")
  );
  colors.forEach((c) => c.classList.remove("active"));

  document
    .querySelector(`[data-color='${localStorage.getItem("color")}']`)
    .classList.add("active");
}
// Settings
let settingToggle = document.querySelector(".setting-box .setting-toggle");
let gear = document.querySelector(".setting-box .gear");
let settingBox = document.querySelector(".setting-box");
settingToggle.onclick = function () {
  settingBox.classList.toggle("open");
  gear.classList.toggle("fa-spin");
};
// Change Colors
colors.forEach((color) => {
  color.addEventListener("click", (e) => {
    colors.forEach((c) => c.classList.remove("active"));
    color.classList.add("active");
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color", e.target.dataset.color);
  });
});
// Random Bg Settings
let randomSet = document.querySelectorAll(".options-box:nth-child(2) span");
let specialImage = document.querySelectorAll(".options-box .special-image img");

randomSet[0].onclick = function () {
  this.classList.add("active");
  randomSet[1].classList.remove("active");
  localStorage.setItem("randomBg", "yes");
  localStorage.removeItem("special-image");
  specialImage.forEach((i) => i.classList.remove("active"));
  randbg = setInterval(() => {
    let randomImg = Math.floor(Math.random() * imags.length);
    landpage.style.backgroundImage = `url("./../imgs/${imags[randomImg]}")`;
  }, 10000);
};
randomSet[1].onclick = function () {
  this.classList.add("active");
  randomSet[0].classList.remove("active");
  localStorage.setItem("randomBg", "no");
  landpage.style.backgroundImage = "url(./../imgs/bg2.jpg)";
  localStorage.removeItem("special-image");
  specialImage.forEach((i) => i.classList.remove("active"));
  clearInterval(randbg);
};
// LandPage Background Images
let landpage = document.querySelector(".landing-page");
let imags = ["bg1.jpg", "bg2.jpg", "bg3.jpg", "bg4.jpg", "bg5.jpg"];
randbg = setInterval(() => {
  let randomImg = Math.floor(Math.random() * imags.length);
  landpage.style.backgroundImage = `url("./../imgs/${imags[randomImg]}")`;
}, 10000);
// Local Storage Random Bg
if (localStorage.getItem("randomBg")) {
  document
    .querySelectorAll(".options-box:nth-child(2) span")
    .forEach((s) => s.classList.remove("active"));
  if (localStorage.getItem("randomBg") === "yes") {
    document
      .querySelectorAll(".options-box:nth-child(2) span")[0]
      .classList.add("active");
  } else {
    document
      .querySelectorAll(".options-box:nth-child(2) span")[1]
      .classList.add("active");
    clearInterval(randbg);
  }
}
// Special Image
specialImage.forEach((img) => {
  img.addEventListener("click", (e) => {
    e.target.parentElement
      .querySelectorAll("img")
      .forEach((i) => i.classList.remove("active"));
    e.target.classList.add("active");
    landpage.style.backgroundImage = `url(${e.target.src})`;
    localStorage.removeItem("randomBg");
    clearInterval(randbg);
    randomSet.forEach((r) => r.classList.remove("active"));
    localStorage.setItem("special-image", e.target.src);
  });
});
// Local Storage Special Image
if (localStorage.getItem("special-image")) {
  landpage.style.backgroundImage = `url(${localStorage.getItem(
    "special-image"
  )})`;
  localStorage.removeItem("randomBg");
  randomSet.forEach((r) => r.classList.remove("active"));
  clearInterval(randbg);
  specialImage.forEach((image) => {
    if (image.src == localStorage.getItem("special-image")) {
      image.classList.add("active");
    }
  });
}

// Nav Bullets
const navBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".header .links");
function clickToGo(bullets) {
  bullets.forEach((link) => {
    link.addEventListener("click", (e) => {
      document
        .querySelector(e.target.dataset.section)
        .scrollIntoView({ behavior: "smooth" });
      // Way 2
      // scrollTo({
      //   top: document.querySelector(e.target.dataset.section).offsetTop,
      //   left: 0,
      //   behavior: "smooth",
      // });
    });
  });
}
clickToGo(navBullets);
clickToGo(allLinks);
// Transport Bullets
let transportBullets = document.querySelectorAll(
  ".options-box:nth-child(3) span"
);
transportBullets.forEach((choose) => {
  choose.addEventListener("click", (e) => {
    transportBullets.forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
    localStorage.setItem("show-bullets", e.target.innerHTML);
    if (e.target.innerHTML === "Yes") {
      document.querySelector(".nav-bullets").style.display = "block";
    } else {
      document.querySelector(".nav-bullets").style.display = "none";
    }
  });
});
// Transport Bullet Local Storage
if (localStorage.getItem("show-bullets")) {
  transportBullets.forEach((b) => b.classList.remove("active"));
  if (localStorage.getItem("show-bullets") === "Yes") {
    document.querySelector(".nav-bullets").style.display = "block";
    transportBullets[0].classList.add("active");
  } else {
    document.querySelector(".nav-bullets").style.display = "none";
    transportBullets[1].classList.add("active");
  }
}
// Reset Settings
document.querySelector(".setting-box .reset-settings").onclick = function () {
  localStorage.removeItem("color");
  localStorage.removeItem("special-image");
  localStorage.removeItem("show-bullets");
  localStorage.removeItem("randomBg");
  window.location.reload();
};
// Toggle Menu
let toggleBtn = document.querySelector(".header .toggle-button");

toggleBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  allLinks[0].classList.toggle("active");
  if (allLinks[0].classList.contains("active")) {
    let activeLinks = document.querySelector(".header .links.active");
    activeLinks.addEventListener("click", function () {
      allLinks[0].classList.remove("active");
    });
  }
});
allLinks[0].addEventListener("click", (e) => {
  e.stopPropagation();
});
document.addEventListener("click", (e) => {
  // allLinks[0].classList.remove("active");
  if (e.target !== toggleBtn && e.target !== allLinks[0]) {
    if (allLinks[0].classList.contains("active")) {
      allLinks[0].classList.remove("active");
    }
  }
});
// Scroll To Top
let aboutUs = document.querySelector(".about-us");
let scrollToTop = document.querySelector(".scroll-to-top");
window.addEventListener("scroll", (e) => {
  if (window.scrollY >= aboutUs.offsetTop) {
    scrollToTop.classList.add("show");
  } else {
    scrollToTop.classList.remove("show");
  }
});
scrollToTop.addEventListener("click", (e) => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
// Statics Interval
let staticSection = document.querySelector(".statics");
let staticNums = document.querySelectorAll(".static-box .information .number");
let staticPlus = document.querySelectorAll(
  ".static-box .information .number + span"
);
let startedGo = true;
window.addEventListener("scroll", (e) => {
  if (window.scrollY >= staticSection.offsetTop - 800) {
    if (startedGo) {
      staticNums.forEach((num) => {
        setTimeout(() => {
          staticPlus.forEach((p) => (p.style.opacity = "1"));
        }, 2000);
        let staticInt = setInterval(() => {
          num.innerHTML++;
          if (num.innerHTML === num.dataset.value) {
            clearInterval(staticInt);
          }
        }, 2000 / num.dataset.value);
      });
    }
    startedGo = false;
  }
});
// Categories Images
let categoriesImgs = document.querySelectorAll(
  ".categories-section .categories img"
);
categoriesImgs.forEach((img) => {
  img.addEventListener("click", (e) => {
    let popupOverlay = document.createElement("div");
    popupOverlay.className = "popup-overlay";
    document.body.appendChild(popupOverlay);
    let popupWindow = document.createElement("div");
    popupWindow.className = "popup-window";
    popupOverlay.appendChild(popupWindow);
    if (img.alt !== null) {
      let popupHead = document.createElement("h3");
      let headTextPopup = document.createTextNode(img.alt);
      popupHead.appendChild(headTextPopup);
      popupHead.className = "popup-head";
      popupWindow.appendChild(popupHead);
    }
    let popupImg = document.createElement("img");
    popupImg.className = "popup-img";
    popupWindow.appendChild(popupImg);
    popupImg.src = e.target.src;
    let closePopup = document.createElement("span");
    let closePopupText = document.createTextNode("X");
    closePopup.className = "close-popup";
    closePopup.appendChild(closePopupText);
    popupWindow.appendChild(closePopup);
    offThePopup();
  });
});
// Another Way To Close The Popup
// document.addEventListener("click", (e) => {
//   if (e.target == document.querySelector(".close-popup")) {
//     e.target.parentElement.remove();
//     document.querySelector(".popup-overlay").remove();
//   }
// });
function offThePopup() {
  document.querySelector(".popup-overlay").onclick = () => {
    document.querySelector(".popup-overlay").remove();
  };
}
