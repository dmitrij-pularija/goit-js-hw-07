import { galleryItems } from "./gallery-items.js";
const gallery = document.querySelector(".gallery");
const img1 = document.querySelector(".gimg");

function createGallery() {
  const items = [];
  for (const galleryItem of galleryItems) {
    const item = document.createElement("li");
    const itemLink = document.createElement("a");
    const itemImg = document.createElement("img");
    item.classList.add("gallery__item");
    itemLink.classList.add("gallery__link");
    itemImg.classList.add("gallery__image");
    itemLink.setAttribute("href", galleryItem.original);
    itemImg.setAttribute("src", galleryItem.preview);
    itemImg.setAttribute("alt", galleryItem.description);
    itemLink.append(itemImg);
    item.append(itemLink);
    items.push(item);
  }
  gallery.append(...items);
}

createGallery();
gallery.addEventListener("click", viewImg);

function viewImg(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  var lightbox = new SimpleLightbox(".gallery__link", {
    enableKeyboard: true,
    docClose: false,
    captions: true,
    captionSelector: "img",
    captionType: "attr",
    captionsData: "alt",
    captionPosition: "bottom",
    captionDelay: 250,
    close: false
  });
  lightbox.on("show.simplelightbox", () => {
    document.addEventListener("keydown", esc);
  });
}
function esc(event) {
  if (event.code === "Escape") {
    event.preventDefault();
    document.removeEventListener("keydown", esc);
  }
}
