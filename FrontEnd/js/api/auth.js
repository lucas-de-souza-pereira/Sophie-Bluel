import { API_BASE } from "../utils/config.js"


export async function postAuthentication(identifier) {

    const payload = JSON.stringify(identifier)
    console.log(payload)
    const response = await fetch(`${API_BASE}/users/login`, {
    method : "POST",
    headers : { "Content-Type": "application/json" },
    body : payload
})
    
        if (!response.ok){
            const error = new Error(`${response.status} ${response.statusText}`)
            error.status = response.status
            throw error
        } 
    const token = await response.json()
    console.log(token)
    return token
}