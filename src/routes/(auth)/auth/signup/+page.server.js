import {URL} from "$env/static/private"
import { fail, redirect } from "@sveltejs/kit"

const url = `${URL}/api/register`

export const actions = {
    default: async ({request}) => {
        const formData = await request.formData()

        const username = formData.get('username')
        const email = formData.get('email')
        const password = formData.get('password')
        const password2 = formData.get('password2')

        if(password !== password2){
            return fail(400, {
                error: "password do not match"
            })
        }

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        })
        const result = await res.json()
        if(!res.ok){
            return fail(res.status, {
                error: result.username || "Login Failed"
            })
        }
        throw redirect(302, '/auth/login')
    }
}