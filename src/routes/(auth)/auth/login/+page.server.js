import {URL} from "$env/static/private"
import { fail, redirect } from '@sveltejs/kit';

const url = `${URL}/api/token/`
export const actions = {
    default: async ({request, cookies}) => {
        const formData = await request.formData()

        const username = formData.get('username')
        const password = formData.get('password')

        if(!username || !password){
            return fail(400, {
                error: 'Missing username or password'
            })
        }

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
        const result = await res.json()
        if(!res.ok){
            return fail(res.status, {
                error: result.detail || "Login Failed"
            })
        }

        // Set cookies
        cookies.set('access_token', result.access, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'Strict'
        })
    
        cookies.set('refresh_token', result.refresh, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'Strict'
        })
        throw redirect(302, '/game')
    }
    
};