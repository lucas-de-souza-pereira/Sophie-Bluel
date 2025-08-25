
import { getCategories } from '../api/categories.js'
import { getWorks } from '../api/works.js'

import { renderGallery, renderFilter, initFilters } from '../features/gallery.js';
import { editionBar, renderLogout, renderEditGallery } from "../features/connected-home.js"

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
    editionBar()
    renderLogout()
    renderEditGallery()
}



