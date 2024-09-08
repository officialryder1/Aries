import { URL } from '$env/static/private'
import { redirect } from '@sveltejs/kit'

export async function load({ fetch, locals, params}){
    const user = locals.user
    const match = params.id

    const res = await fetch(`${URL}/api/match_result`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: user.username,
            match: match
        })
    })
    if(!res.ok){
        return redirect(302, '/profile')
    }
    const result = await res.json()
    console.log(result)
    return {
        result,
        match,

    }
}