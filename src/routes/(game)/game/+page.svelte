<script>
    import { accept, requestMatch } from '$lib/utils/game.js'
    import { getRankAndCardPoint } from '$lib/utils/profile.js';
	import { onMount } from 'svelte';
    import { PUBLIC_API_KEY } from '$env/static/public'
    import Pusher from 'pusher-js';
	import { goto } from '$app/navigation'

    export let data
    let pusher, channel

    let user = data?.user.id
    let showMatch = false
    $: availableMatch = availableMatch || []


    onMount(async () => {
        getRank= await getRankAndCardPoint(user)
        pusher = new Pusher(PUBLIC_API_KEY, {
            cluster: 'eu'
        })

        channel = pusher.subscribe('match-channel')

        channel.bind("new-match", function(data) {
            console.log("New match available", data)

            availableMatch = [...availableMatch, {
                requester_name: data.requester_name,
                id: data.match_request_id,
            }]
        })
    })

    async function findMatch(){
        showMatch = true
        if (Array.isArray(data?.match)) {
            data.match.forEach(match => {
                availableMatch = [...availableMatch, {
                    requester_name: match.requester_name,
                    id: match.id
                }];
            });
        } else if (data?.result) { 
            // In case data.result is a single match object
            availableMatch = [...availableMatch, {
                requester_name: data.match.requester_name,
                id: data.match.id
            }];
        }
    }

    async function acceptMatch(e){
        accept(e, user)
    }

    onMount(() => {
        pusher =  new Pusher(PUBLIC_API_KEY, {
            cluster: 'eu'
        })

        channel = pusher.subscribe('match-channel')
        channel.bind('match-accepted', function(data){
            console.log("Match accepted", data)

            if(data.match_id && (data.player_one_id === user || data.player_two_id === user)) {
                const url = data?.redirect_url
                console.log(`Redirecting to ${url}`)
                goto(data?.redirect_url)
                console.log(url)
            }
        })
        
    })

    // Create match
    let message = ''
    let showMessage = false
    async function createMatch(){
        message = requestMatch(user)
        showMessage = true
        console.log(message)
    }

    let getRank = []

    console.log(getRank)

</script>

<div class=" h-full flex justify-center items-center flex-col">
   <div>
    <button class="bg-red-600 w-50 p-2 rounded-lg shadow-lg hover:bg-red-500 transition-colors duration-500 mr-10 cursor-pointer" on:click={createMatch}>Create match</button>
    <button class="bg-green-600 w-50 p-2 rounded-lg shadow-lg hover:bg-green-500 transition-colors duration-500 cursor-pointer" on:click={findMatch}>Find match</button>
   </div>
</div> 

{#if showMatch}
        {#if availableMatch.length > 0}
            <p class="pt-10 font-bold tracking-wide text-center">Select match</p>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each availableMatch as {requester_name, id} }
                
                <div class="bg-white w-80 shadow-lg rounded-lg  text-gray-600 text-center font-bold p-10 mt-5">
                    <h4>Match request by</h4>
                    <p>player: {requester_name}</p>
                    <p>rank: {getRank.rank}</p>
                    
                    <button class="bg-red-600 w-50 p-2 rounded-lg shadow-orange-200 shadow-lg hover:bg-red-500 transition-colors duration-300 text-white" on:click={() => acceptMatch(id)}>accept</button>
                </div>
                
            {/each}
            </div>
        {:else}
            <p>No match currently..</p>
        {/if}
{/if}
{#if showMessage}
    <div class="p-10 text-base">
        <p class="font-bold -tracking-tight text-center">Creating Match, wait for a player to accept match ....</p>
    </div>
{/if}
