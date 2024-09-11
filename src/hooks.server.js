import jwt from 'jsonwebtoken'
import { isTokenExpired } from '$lib/utils/tokenUtil'
import { sequence } from '@sveltejs/kit/hooks'
import { URL} from '$env/static/private'



const SECRET_KEY = 'secret'

const firstHandle = async({event, resolve}) => {
    const accessToken = event.cookies.get('access_token')
    


    // decode user access token
           
    const user = jwt.decode(accessToken, SECRET_KEY)

    if(accessToken){
        try{
            
            // get the user id to use to retrieve data from db
            const user_id = user.user_id
            
            // fetch the data from backend
            const res = await fetch(`${URL}/api/user/${user_id}`)

            if(res.ok){
                const userDetails = await res.json()
                event.locals.user = userDetails
              
            } else{
                console.error('Failed to fetch user details')
            }
        }catch (err){
            console.error("Invalid token: ", err)
        }
    }

    // if(isTokenExpired(accessToken)){
    //     const res = await fetch(`${URL}/api/token/refresh/`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(refreshToken)
            
    //     })
        
        
    //     if(res.ok){
    //         const token = await res.json()
    //         event.cookies.set('access_token', token.access, {
    //         path: '/',
    //         httpOnly: true,
    //         secure: true,
    //         sameSite: 'Strict'
    //     })
    //         console.log('Access_token updated')
            
    //     }
            
    // }
  
    const response = await resolve(event)

    
    return response
    
}

const secondHandle = async({event, resolve}) =>{
    if(!event.locals.user){
        const refreshToken = event.cookies.get('refresh_token')
        if(!refreshToken)event.locals.user = undefined


        const claim = jwt.decode(refreshToken, SECRET_KEY)
        if(!claim)event.locals.user = undefined

        if(refreshToken){
            const accessToken = event.cookies.get('access_token')
            if(isTokenExpired(accessToken)){
                const res = await fetch(`${URL}/api/token/refresh/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(refreshToken)
                    
                })
                    
                    
                if(res.ok){
                    const token = await res.json()
                    event.cookies.set('access_token', token.access, {
                    path: '/',
                    httpOnly: true,
                    secure: true,
                    sameSite: 'Strict'
                })
                    console.log('Access_token updated')
                    
                }
                    
            }
        }
    }
    const response = await resolve(event)

    
    return response
}

export const handle = sequence(firstHandle, secondHandle)