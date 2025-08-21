


const formLogin = document.querySelector("form")

formLogin.addEventListener("submit", async (e) =>{
    
    e.preventDefault()

    const identifier = {
        email : e.target.elements["login-email"].value.trim(),
        password : e.target.elements["login-password"].value
    }

    const payload = JSON.stringify(identifier)

    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method : "POST",
            headers : { "Content-Type": "application/json" },
            body : payload
        })

        if (!response.ok){
            displayError("Erreur dans l’identifiant ou le mot de passe")
            return
            }

        const token = await response.json()
        localStorage.setItem("token", token.token)

        location.href = "../index.html"

    } catch (err){
        displayError("Service indisponible")
    }

})

function displayError(error){

    let errorBox = document.querySelector(".login-error")

    if (!errorBox){
        errorBox = document.createElement("p")
        errorBox.classList.add("login-error")
        errorBox.style.color = "red"
        errorBox.marginTop = "10px"
        formLogin.appendChild(errorBox)
    }
    errorBox.textContent = error 
}
