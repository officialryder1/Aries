import { redirect, fail } from '@sveltejs/kit'
import { isTokenExpired } from '$lib/utils/tokenUtil.js'
import { URL } from '$env/static/private'


export async function load({fetch, locals, cookies}) {

    const accessToken = cookies.get('access_token')

    if(isTokenExpired(accessToken)){
        cookies.delete('access_token', { path: '/' });
        cookies.delete('refresh_token', { path: '/' });
        throw redirect(302, '/api/logout');
    }

    const user = locals.user
    if(!user){
        throw redirect(302, '/api/logout')
    }
    try{
        const res = await fetch(`/api/characters`)
        const response = await fetch(`${URL}/api/cards`)

        if(res.status === 401 && response.status === 401){
            throw redirect(302, '/api/logout')
        }

        if (!res.ok) {
            throw new Error('Failed to fetch characters');
        }
        if (!response.ok) {
            throw new Error('Failed to fetch cards');
        }

        const characters = await res.json()
        const cards = await response.json()
      
        return{
            characters,
            user,
            cards
        }
    } catch(error){
        console.error('Error fetching characters:', error);
        
        throw redirect(302, '/');
    }
    
    
    
}

export const actions = {
    default: async ({request, locals, cookies}) => {
        const user = locals.user.id
        const formData = await request.formData()

        const character = await formData.get('id')
        const res = await fetch(`${URL}/api/create_avatar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.get('access_token')}`
            },
            body: JSON.stringify({user, character})
        })

        const player = await res.json()
        
        
        
        if(!res.ok){
            return fail(res.status, {
                error: "Failed"
            })
        }

        locals.player = player
        throw redirect(302, '/create_avatar')
    }
}