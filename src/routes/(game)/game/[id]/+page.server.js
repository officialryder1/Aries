import {URL} from '$env/static/private'

export async function load({fetch, params}) {
    const id = params.id
    
    
    const res = await fetch(`${URL}/api/match/${id}`)
   
    if(!res.ok){
        console.error("Error fetching match data")
        return {
            match: null,
            error: "Failed to load match"
        }
    }

    const match = await res.json()
    console.log(match)
    return {
        match
    };
}