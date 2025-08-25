
import { getCategories } from '../api/categories.js'
import { getWorks } from '../api/works.js'

import { renderGallery, renderFilter, initFilters } from '../features/gallery.js';
import { editionBar, renderLogout, renderEditGallery , disconectUser} from "../features/connected-home.js"

export async function initHome(connected) {
    try {
        const [works, categories] = await Promise.all([getWorks(), getCategories()])

        renderGallery(works);
        renderFilter(categories)
        initFilters(works)

        if (connected) {applyConnectedHome()}
    }
    catch (e){
        console.error("Erreur chargement données", e)
    }
}


function applyConnectedHome() {
    // renders
    editionBar()
    renderLogout()
    renderEditGallery()   

    // actions
    disconectUser()
    openProjectManagement()
}   



function openProjectManagement(){

    const btnOpen = document.getElementById("open-project-management")
    const dialog = document.getElementById("project-management")

 

    btnOpen.addEventListener("click", () =>{
        dialog.showModal()
    })

    closeModals(dialog)
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