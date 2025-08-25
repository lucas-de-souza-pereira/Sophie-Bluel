import { API_BASE } from "../utils/config.js"


export async function getWorks(){
        const response = await fetch(`${API_BASE}/works`)
        const works = await response.json()
        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
        return works;
        }