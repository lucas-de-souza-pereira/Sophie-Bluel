
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
    createModalTemplate()

    // actions
    disconectUser()
    modalProjectManagement(works)
}   




function createModalTemplate(){


//  <dialog class="modal" id="project-management"  aria-labelledby="dlg-title">
    // 	<div class="modal-panel">
    // 		<form method="dialog" class="modal-header delete-projects">
    // 			<button class="modal-close" id = "modal-close" aria-label="Fermer"  value="cancel">
    // 				<i class="fa-solid fa-xmark"></i>
    // 			</button>
    // 		</form>
    // 		<h2></h2>
    // 		<button class="sendBtn"></button>
    // 	</div>
//  </dialog> 


    const body = document.querySelector("body")

    const dialog = document.createElement("dialog")
    dialog.classList.add("modal")
    dialog.id = "project-management"
    dialog.setAttribute("aria-labelledby", "dlg-title")

    const divPanel = document.createElement("div")
    divPanel.classList.add("modal-panel")

    const formModal = document.createElement("form")
    formModal.classList.add("modal-header")
    // a passer en paramètre ?
    // formModal.classList.add("delete-projects")

    const closeBtn = document.createElement("button")
    closeBtn.classList.add("modal-close")
    closeBtn.id = "modal-close"
    closeBtn.setAttribute("aria-label", "Fermer")
    closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'

    const h2 = document.createElement("h2")

    const sendBtn = document.createElement("button")
    sendBtn.classList.add("sendBtn")

    document.body.prepend(dialog)
    dialog.appendChild(divPanel)
    divPanel.appendChild(formModal)
    formModal.appendChild(closeBtn)
    divPanel.appendChild(h2)
    divPanel.appendChild(sendBtn)

}


function renderModalProjectManagement(){

    const divPanel = document.querySelector(".modal-panel")

    const h2 = document.querySelector(".modal-panel h2")
    h2.innerText = "Galerie photo"

    const galleryDiv = document.createElement("div")
    galleryDiv.id = "gallery-edit"
    galleryDiv.classList.add("modal-gallery")

    const sendBtn = document.querySelector(".sendBtn")
    sendBtn.classList.add("open-modal-picture")
    sendBtn.innerText = "Ajouter une photo"

    divPanel.insertBefore(galleryDiv,sendBtn)

}

function renderModalAddProject(){

    const divPanel = document.querySelector(".modal-panel")

    const formModal = document.querySelector(".modal-header")
    const goBackBtn = document.createElement("button")
    goBackBtn.classList.add("go-back")
    goBackBtn.setAttribute("aria-label", "Retour")
    goBackBtn.innerHTML = '<i class="fa-solid fa-arrow-left"></i>'
    formModal.appendChild(goBackBtn)

    const h2 = document.querySelector(".modal-panel h2")
    h2.innerText = "Ajout photo"

    const formAddProject = document.createElement("form")
    formAddProject.classList.add("form-add-picture")
    divPanel.appendChild(formAddProject)
    
    const divInputImage = document.createElement("div")
    divInputImage.classList.add("div-input-image")
    formAddProject.appendChild(divInputImage)

    const image = document.createElement("i")
    image.classList.add("fa-regular", "fa-image")
    divInputImage.appendChild(image)

    const inputHidden = document.createElement("input")
    inputHidden.type="file"
    inputHidden.id="fileElem"
    inputHidden.accept="image/*"
    inputHidden.style="display:none"
    divInputImage.appendChild(inputHidden)

    const buttonAddPicture = document.createElement("button") 
    buttonAddPicture.type = "button"
    buttonAddPicture.id = "fileSelect"
    buttonAddPicture.innerText = "+ Ajouter photo"
    divInputImage.appendChild(buttonAddPicture)

    const text = document.createElement("p")
    text.innerText = "jpg, png : 4mo max"
    divInputImage.appendChild(text)

    const labelTitle = document.createElement("label") 
    labelTitle.for = "title"
    labelTitle.innerText = "Titre"
    formAddProject.appendChild(labelTitle)

    const inputTitle = document.createElement("input")
    inputTitle.type = "text"
    inputTitle.name = "title"
    inputTitle.id = "title-project"
    formAddProject.appendChild(inputTitle)

    const labelCategories = document.createElement("label") 
    labelCategories.for = "categories-select"
    labelCategories.innerText = "Catégorie"
    formAddProject.appendChild(labelCategories)

    const selectCategories = document.createElement("select")
    inputCategories.name = "categories-select"
    inputCategories.id = "categories-select"
    formAddProject.appendChild(selectCategories)

    const sendBtn = document.querySelector(".sendBtn")
    sendBtn.classList.add("btn-add-picture")
    sendBtn.innerText = "Valider"
}


function modalProjectManagement(works){

    const dialog = document.getElementById("project-management")
    // const gallery = document.querySelector(".modal-gallery")

    // if (!dialog || !gallery) {return}
    // open close
    openModals(dialog)
    closeModals(dialog)

    // renders
    renderModalProjectManagement()
    renderGalleryModal(works)

   //actions
    deleteProject(gallery)
    modalAddProjects()
}

function modalAddProjects(){

    gallery.addEventListener("click")
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

function deleteProject(){

    const gallery = document.querySelector(".modal-gallery")

    
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
