export function getToken(){
    const token = localStorage.getItem("token")
    return token
}

export function setToken(data){
    localStorage.setItem("token", data.token)
}


export function removeToken(){
    localStorage.removeItem("token")
}