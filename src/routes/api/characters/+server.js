import { URL } from "$env/static/private"
const url = `${URL}/api/characters`

export async function GET({cookies}) {
    
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.get('access_token')}`
        }
    })

    return new Response(res.body)
};