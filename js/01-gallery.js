import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryBox = document.querySelector(".gallery");
const imagesMarkup = makeGalleryItemsMarkup(galleryItems);

galleryBox.insertAdjacentHTML("beforeend", imagesMarkup);

function makeGalleryItemsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
  <a class="gallery__link" href="${preview}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>
    `;
    })
    .join("");
}

galleryBox.addEventListener("click", onGalleryImageClick);

function onGalleryImageClick(evt) {
  evt.preventDefault();

  const isGalleryBoxLinkEl = evt.target.nodeName === "IMG";
  if (!isGalleryBoxLinkEl) {
    return;
  }

  const selectedImage = evt.target.getAttribute("data-source");

  const instance = basicLightbox.create(`
             <img src="${selectedImage}" width="1000" >
`);

  instance.show();

  galleryBox.addEventListener("keydown", onModalClose);

  function onModalClose(evt) {
    if (evt.key === "Escape") {
      instance.close();
    }
  }
}
