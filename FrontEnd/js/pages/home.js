
import { getCategories } from '../api/categories.js'
import { getWorks , deleteWorks } from '../api/works.js'


import { renderGallery } from '../features/gallery.js';
import { renderBtnFilter, initFilters } from '../features/filters.js';
import { editionBar, renderLogout, renderEditGallery , disconectUser} from "../features/connected-home.js"

export async function initHome(connected) {
    try {
        const [works, categories] = await Promise.all([getWorks(), getCategories()])

        renderGallery(works);
        renderBtnFilter(categories)
        initFilters(works)

        if (connected) {applyConnectedHome(works)}
    }
    catch (err){
        console.error("Erreur chargement données", err)
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

    const dialog = document.getElementById("project-management")
    // const gallery = document.querySelector(".modal-gallery")

    // if (!dialog || !gallery) {return}

    // open close
    openModals(dialog)
    closeModals(dialog)

    // renders
//     renderGalleryModal(works)

//     //actions
//     deleteProject(gallery)

}

function modalAddProjects(gallery){


    gallery.addEventListener("click")
}



function deleteProject(gallery){

    gallery.addEventListener("click", async (e) =>{

        const trashCan = e.target.closest(".del-project")
        if (!trashCan) {return}

        const figure = trashCan.closest("figure")
        const id = Number(figure.dataset.id)
        if (!id) {return}

        try{
            await deleteWorks(id)
            let newWorks = await getWorks()
            renderGalleryModal(newWorks)
            renderGallery(newWorks)
            initFilters(newWorks)
        }
        catch(err){
            if (err.status === 401 || err.status === 500){
                console.error("Erreur :", err)
            }
        }

    })
}


function openModals(dialog){
    const btnOpen = document.getElementById("open-project-management")
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