export async function GET({cookies}){
    // Clear the cookies
    cookies.delete('access_token', {path: '/'})
    cookies.delete('refresh_token', {path: '/'})

    return new Response(null, {
        status: 302,
        headers:{
            location: '/auth/login'
        }
    })

}