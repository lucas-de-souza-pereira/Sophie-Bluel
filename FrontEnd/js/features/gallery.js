

export function renderGallery(works){

    let galleryDiv = document.querySelector(".gallery")

    galleryDiv.innerHTML = "";

    for (let i = 0; i < works.length; i++){

        const picture = works[i]

        const figureElement = document.createElement("figure")
        figureElement.dataset.id = picture.id

        const pictureElement = document.createElement("img")
        pictureElement.src = picture.imageUrl
        pictureElement.alt = picture.title

        const figcaptionElement = document.createElement("figcaption")
        figcaptionElement.innerText = picture.title

        galleryDiv.appendChild(figureElement)
        figureElement.appendChild(pictureElement)
        figureElement.appendChild(figcaptionElement)

    }
}


