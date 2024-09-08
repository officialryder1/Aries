import { fail, redirect } from '@sveltejs/kit'
import { URL } from '$env/static/private'
import { isTokenExpired } from '$lib/utils/tokenUtil.js'


export async function load({fetch, locals, cookies}) {
   
    const accessToken = cookies.get('access_token')

    if(isTokenExpired(accessToken)){
        cookies.delete('access_token', { path: '/' });
        cookies.delete('refresh_token', { path: '/' });
        throw redirect(302, '/api/logout');
    }
    const user_id = locals.user.id
    const user = locals.user
    if(!user){
        throw redirect(302, '/api/logout')
    }

    const res = await fetch(`${URL}/api/get_player?user_id=${user_id}`)
    const player = await res.json()

    if(!res){
        return fail(res.status, {
            error: player.detail || "Failed to get player detail"
        })
    }
    return {
        user: locals.user,
        player
    };
}