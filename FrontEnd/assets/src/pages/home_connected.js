
export async function connectedHome() {
    renderConnected()
}


function renderConnected(){
    editionBar()
}


function editionBar(){

    const bodyElement = document.querySelector("body")
    bodyElement.classList.add("body-connected")

    const editionBar = document.createElement("div")
    editionBar.classList.add("edition-bar")

    const penIcon = document.createElement("i")
    penIcon.classList.add("fa-regular", "fa-pen-to-square")

    const editionElement = document.createElement("span")
    editionElement.innerText = "Mode édition"

    editionBar.appendChild(penIcon)
    editionBar.appendChild(editionElement)

    bodyElement.insertBefore(editionBar, bodyElement.firstChild)
}