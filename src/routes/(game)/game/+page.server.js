import { URL } from '$env/static/private'
import { redirect } from '@sveltejs/kit'

export async function load({fetch, locals}){
    const user_id = await locals.user.id

    const res = await fetch(`${URL}/api/game/find_match?user_id=${user_id}`)

    
    if(!res.ok){
        throw redirect('302', '/create_avatar')
        // throw new Error('Failed to retrieve data')

    }

    const match = await res.json()

    return {
        match
    }
}
//* working on the logic for the pending, request and find match