import { cardsStore } from "$lib/store/UserCard";
import { PUBLIC_URL } from '$env/static/public'
import { goto } from "$app/navigation";


let userCard = []
export function createCard(id){
    if(userCard.length === 0 || userCard.length < 5){
        userCard.push(id)
        console.log(userCard)
        if(userCard.length === 5){
            cardsStore.update(array => {
                return [...array, ...userCard]
            })
        }
    } else{
        console.log("Card limit has been reached")
        console.log(userCard.length)
    }
}

export async function updateProfile(user){
    
    if(userCard.length === 5){
        const res = await fetch(`${PUBLIC_URL}/update_player?user_id=${user}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                card: userCard
            })
        })
        const result = await res.json();
            
        if (res.ok) {
            console.log(result);
            goto('/profile')
        } else {
            console.error('Error submitting cards:', result);
        }
    }
}

export async function fetchCardDetail(ids){
    const cardDetail = await Promise.all(ids.map(async (id) => {
        try{
            const res = await fetch(`${PUBLIC_URL}/get_card/${id}`)

            if(!res.ok){
                throw new Error(`Failed to fetch card with ID: ${id}`)
            }

            const card = await res.json()
            return card
        } catch(error){
            console.error('Error fetching card details:', error)
            return null
        }
    }))

    return cardDetail.filter(card => card !== null)
}

export async function characterDetail(id){
    try{
        const res = await fetch(`${PUBLIC_URL}/get_character/${id}`)
        if (!res.ok) {
            console.error('Failed to fetch character:', res.statusText);
            throw new Error(`Error fetching character: ${res.status}`);
        }
        const character = await res.json()
        return character
    }catch (error) {
        console.error('Error fetching character details:', error);
        return null;  // Return null or handle it appropriately
    }
}

export async function getRankAndCardPoint(id){
    const res = await fetch(`${PUBLIC_URL}/player_rank?user=${id}`)
    const detail = await res.json()
    const card_point = detail?.total_attack_points
    
    const rank = detail?.rank
    const time_interval = detail?.time_interval

    return {
        rank,
        card_point,
        time_interval
    }
}