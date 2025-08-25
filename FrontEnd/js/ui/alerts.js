export function displayError(element, error){

    let errorBox = document.querySelector(".login-error")

    if (!errorBox){
        errorBox = document.createElement("p")
        errorBox.classList.add("login-error")
        errorBox.style.color = "red"
        errorBox.style.marginBottom = "20px"
        element.appendChild(errorBox)
    }
    errorBox.textContent = error 
}
