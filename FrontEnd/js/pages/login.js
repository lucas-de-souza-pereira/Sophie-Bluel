import { setToken } from "../utils/storage.js"
import { postAuthentication } from "../api/auth.js"
import { displayError } from "../ui/alerts.js"

const formLogin = document.querySelector("form")

formLogin.addEventListener("submit", async (e) =>{
    
    e.preventDefault()

    const identifier = {
        email : e.target.elements["login-email"].value.trim(),
        password : e.target.elements["login-password"].value
    }

    if (!identifier.email || !identifier.password){
        displayError(formLogin,"Veuillez remplir tout les champs")
        return
    }

    try {

        const {token} = await postAuthentication(identifier)

        setToken({token})

        location.href = "../index.html"

    } catch (error){
        if (error.status === 401 || error.status === 404){
            displayError(formLogin,"Erreur dans l'identifiant ou le mot de passe")
        } else{
            displayError(formLogin,"Service indisponible")
        }
        
    }

})

