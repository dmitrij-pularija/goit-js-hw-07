import { galleryItems } from "./gallery-items.js";

const gallery = document.querySelector(".gallery");

function createGallery() {
  const items = [];
  for (const galleryItem of galleryItems) {
    const item = document.createElement("div");
    const itemLink = document.createElement("a");
    const itemImg = document.createElement("img");
    item.classList.add("gallery__item");
    itemLink.classList.add("gallery__link");
    itemLink.setAttribute("href", galleryItem.original);
    itemImg.classList.add("gallery__image");
    itemImg.setAttribute("src", galleryItem.preview);
    itemImg.setAttribute("alt", galleryItem.description);
    itemImg.setAttribute("src-full", galleryItem.original);
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
  const instance = basicLightbox.create(
    `<img src="${event.target.getAttribute(
      "src-full"
    )}" width="800" height="600"/>`,
    {
      closable: false,
      onShow: (instance) => {
        document.addEventListener("keydown", esc.bind(instance));
      },
      onClose: (instance) => {
        document.removeEventListener("keydown", esc.bind(instance));
      },
    }
  );

  instance.show();
}

function esc(event) {
  if (!this.visible()) {
    return;
  }
  if (event.code === "Escape") {
    event.preventDefault();
    this.close();
  } else {
    alert("Press Escape to return :}");
  }
}
