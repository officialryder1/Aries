import { redirect } from '@sveltejs/kit'
import { isTokenExpired } from '$lib/utils/tokenUtil.js'

export async function load({locals, cookies}) {
    const accessToken = cookies.get('access_token')

    if(isTokenExpired(accessToken)){
        cookies.delete('access_token', {path: '/'})
        cookies.delete('refresh_token', {path: '/'})
        throw redirect(302, '/api/logout')
    }

    const user = locals.user
    if(!user){
        throw redirect(302, '/api/logout')
    }
}