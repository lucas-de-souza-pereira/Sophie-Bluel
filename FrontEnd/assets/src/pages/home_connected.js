
export async function connectedHome() {
    renderConnected()
}


function renderConnected(){
    editionBar()
    renderLogout()
    renderEditGallery()
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

function renderLogout(){

    const logoutElement = document.getElementById("nav-login")
    logoutElement.classList.add("logout")
    logoutElement.href = "index.html"
    logoutElement.innerText = "logout"

    logoutElement.addEventListener("click", () =>{

        localStorage.removeItem("token");
        
    })
}

function renderEditGallery(){

    const portfolioElement = document.getElementById("portfolio")

    const divPortfolio = document.createElement("div")
    divPortfolio.classList.add("portfiolio-connected")

    const h2Portfolio = document.querySelector("#portfolio h2")

    const editLink = document.createElement("a")
    editLink.innerHTML = "<i class='fa-regular fa-pen-to-square'></i> modifier"

    portfolioElement.insertBefore(divPortfolio,h2Portfolio)
    divPortfolio.appendChild(h2Portfolio)
    divPortfolio.appendChild(editLink)
}