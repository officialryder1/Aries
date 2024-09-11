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

    try{
        const res = await fetch(`${URL}/api/get_player?user_id=${user_id}`)
        

        if(!res){
            const errorData = await res.json()
            return fail(res.status, {
                error: errorData.detail || "Failed to get player detail"
            })
        }
        const player = await res.json()
        return {
            user: locals.user,
            player
        };
    }catch (error) {
        return fail(500, {
            error: "Server error: Failed to fetch player details"
        });
    }
}