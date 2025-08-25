import { API_BASE } from "../utils/config.js"


export async function getCategories() {

    const response = await fetch(`${API_BASE}/categories`)
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const categories = await response.json();

    const uniqueCategories = [] 
    const seen = new Set() 
    
    for (const cat of categories){ 
        if (!seen.has(cat.id)){ 
            seen.add(cat.id) 
            uniqueCategories.push(cat) } } 
    
    return uniqueCategories
}