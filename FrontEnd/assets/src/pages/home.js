
export async function initHome() {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    renderGallery(works);
    renderFilter(works)
    initFilters(works)
}


function renderGallery(works){

    const galleryDiv = document.querySelector(".gallery")
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

function checkCategory(works){

    const categories = works.map(work => work.category)

    const uniqueCategories = []
    const seen = new Set()

    for (const cat of categories){
        if (!seen.has(cat.id)){
            seen.add(cat.id)
            uniqueCategories.push(cat)
        }
    }   

    return uniqueCategories

}

function renderFilter(works){

    const uniqueCategories = checkCategory(works)

    const galleryFilters = document.querySelector(".gallery-filters")
    galleryFilters.innerHTML =""

    const options = [{ id: "all", name: "Tous" }, ...uniqueCategories];

    for (let i = 0; i < options.length; i++){

        const cat = options[i]

        const btnFilters = document.createElement("button")
        btnFilters.type = "button"
        btnFilters.classList.add("gallery-button")

        if (cat.id === "all"){
            btnFilters.classList.add("active")
        }

        btnFilters.dataset.btnId = cat.id
        btnFilters.textContent = cat.name

        galleryFilters.appendChild(btnFilters)
    }
}


function initFilters(works){

    const btnFilters = document.querySelectorAll(".gallery-button")

    for (let i = 0 ; i < btnFilters.length; i++){
        
        btnFilters[i].addEventListener("click", () =>{

            for (let index = 0 ; index < btnFilters.length; index++){
                btnFilters[index].classList.remove("active")
            }

            let galleriesFiltered
            
            if (btnFilters[i].dataset.btnId === "all"){
                galleriesFiltered = works
            } else {
                galleriesFiltered = works.filter(function(work){
                return work.categoryId === Number(btnFilters[i].dataset.btnId)
                })
            }
            btnFilters[i].classList.add("active")
            renderGallery(galleriesFiltered)
        })
    }
}