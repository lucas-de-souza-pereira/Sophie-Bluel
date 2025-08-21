
export async function initHome() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        const works = await response.json();
        renderGallery(works);
        await renderFilter()
        initFilters(works)
    }
    catch (e){
        console.error("Erreur chargement données", e);
    }
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

async function checkCategory(){
try {
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();

    const uniqueCategories = [] 
    const seen = new Set() 
    
    for (const cat of categories){ 
        if (!seen.has(cat.id)){ 
            seen.add(cat.id) 
            uniqueCategories.push(cat) } } 
    
    return uniqueCategories
}
catch (e){
    console.error("Erreur chargement données", e);
}

}

async function renderFilter(){

    const categories = await checkCategory()

    const galleryFilters = document.querySelector(".gallery-filters")
    galleryFilters.innerHTML =""

    const options = [{ id: "all", name: "Tous" }, ...categories];

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