import { PUBLIC_URL } from '$env/static/public'
import { goto } from "$app/navigation";

export async function accept(id, user){
    let url = ''
    const res = await fetch(`${PUBLIC_URL}/game/accept_match/${id}/?user_id=${user}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(res.ok){
        const data = await res.json()
        url = data.redirect_url
        const id = url.split('/').pop()
        goto(`/game/${id}`)
        
    } else{
        console.error("Error accepting match", res.statusText)
        console.log(id)
    }

}   

export async function requestMatch(user){
    let message = ''
    const res = await fetch(`${PUBLIC_URL}/game/match_request?user_id=${user}`)

    message = await res.json()

    return message
}

export async function pickCard(matchId, cardId){
    await fetch(`${PUBLIC_URL}/pick_card/${matchId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({card_id:cardId})
    })

    goto('/profile')
}