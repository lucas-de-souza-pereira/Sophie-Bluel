
import { getCategories } from '../api/categories.js'
import { getWorks } from '../api/works.js'

import { renderGallery } from '../features/gallery.js';
import { renderFilter, initFilters } from '../features/filters.js';
import { editionBar, renderLogout, renderEditGallery , disconectUser} from "../features/connected-home.js"

export async function initHome(connected) {
    try {
        const [works, categories] = await Promise.all([getWorks(), getCategories()])

        renderGallery(works);
        renderFilter(categories)
        initFilters(works)

        if (connected) {applyConnectedHome(works)}
    }
    catch (e){
        console.error("Erreur chargement données", e)
    }
}


function applyConnectedHome(works) {
    // renders
    editionBar()
    renderLogout()
    renderEditGallery()   

    // actions
    disconectUser()
    modalProjectManagement(works)
}   



function modalProjectManagement(works){

    const btnOpen = document.getElementById("open-project-management")
    const dialog = document.getElementById("project-management")

    // open close
    openModals(dialog)
    closeModals(dialog)

    // renders
    renderGalleryModal(works)

    //actions
    delProject()
}

function delProject(){

    trashCan = document.querySelector("del-project")

    trashCan.addEventListener("click", (e) =>{

    })
}


function openModals(dialog){
    btnOpen.addEventListener("click", () =>{
        dialog.showModal()
    })
}

function closeModals(dialog){
    const btnClose = document.getElementById("modal-close")

    btnClose.addEventListener("click", () =>{
        dialog.close()
    })

    dialog.addEventListener("click", (e) =>{
        if (e.target === dialog){
            dialog.close()
        }
    })
}


function renderGalleryModal(works){

    let galleryDiv = document.querySelector(".modal-gallery")
    galleryDiv.innerHTML = "";

    for (let i = 0; i < works.length; i++){

        const picture = works[i]

        const figureElement = document.createElement("figure")
        figureElement.dataset.id = picture.id

        const pictureElement = document.createElement("img")
        pictureElement.src = picture.imageUrl
        pictureElement.alt = picture.title

        const trashCan = document.createElement("button")
        trashCan.type = "button"
        trashCan.classList.add("del-project")
        trashCan.innerHTML = '<i class="fa-solid fa-trash-can"></i>'

        galleryDiv.appendChild(figureElement)
        figureElement.appendChild(pictureElement)
        figureElement.appendChild(trashCan)

    }
}