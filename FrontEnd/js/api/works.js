import { method } from "lodash"
import { API_BASE } from "../utils/config.js"
import { getToken } from "../utils/storage.js"

export async function getWorks(){
        const response = await fetch(`${API_BASE}/works`)
        const works = await response.json()
        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
        return works;
        }


export async function deleteWorks(id){

    const token = getToken()

    const response = await fetch(`${API_BASE}/works/${id}`, {
        method: 'DELETE',
        headers: { Authorization : `Bearer ${token}`  }
    })
    if (!response.ok){
        const error = new Error(`${response.status} ${response.statusText}`)
        error.status = response.status
        throw error
    }

}