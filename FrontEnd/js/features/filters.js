
export function renderFilter(categories){

    const galleryFilters = document.querySelector(".gallery-filters")
    const frag = document.createDocumentFragment()
    galleryFilters.replaceChildren(frag)
    // galleryFilters.innerHTML =""

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


export function initFilters(works){

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
