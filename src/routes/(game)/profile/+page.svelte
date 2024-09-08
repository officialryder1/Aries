<script>
	import { onMount } from "svelte";
    import { fetchCardDetail, characterDetail, getRankAndCardPoint } from "$lib/utils/profile";
    import Avatar from "$lib/components/ui/Avatar/Avatar.svelte"; 
    import Cards from "$lib/components/ui/card/cards.svelte";
    
    export let data;

    let character = null;
    let cards = [];
    let playerDetails = []
    
    
   
    const player = data?.player[0];
    const cardID = player?.card || [];  
    const user_id = data?.user.id
    const user = data?.user.username

    console.log(player)
    onMount(async () => {
        if (player) {
            try {
               
                character = await characterDetail(player.character);
                cards = await fetchCardDetail(cardID);
                playerDetails = await getRankAndCardPoint(user_id)
               
                console.log(playerDetails)
            } catch (error) {
                console.error("Error fetching character or cards:", error);
            }
        }
    });
    $:console.log(character)
</script>


<div class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
    {#if player}
        <!-- Player Info Section -->
        <div class="flex items-center space-x-6 mb-6">
            {#if character}
                <Avatar {...character} class="w-32 h-32 rounded-full shadow-md" />
            {/if}
            <div>
                <h1 class="text-3xl font-bold text-gray-800">{user}</h1>
                <p class="text-gray-600">Rank: <span class="font-bold">{playerDetails.rank}</span></p>
                <div class="mt-4">
                    <div class="flex space-x-4">
                        <div class="text-gray-700">
                            <p class="font-semibold">HP:</p>
                            <p class="text-lg">{player.hp}</p>
                        </div>
                        <div class="text-gray-700">
                            <p class="font-semibold">Mana:</p>
                            <p class="text-lg">{player.mana}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {/if}

    {#if cards.length > 0}
        <!-- Cards Section -->
        <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <h2 class="text-2xl font-semibold mb-4">Player Cards</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Cards {cards} />
            </div>
        </div>
    {:else if player}
        <!-- Fallback if no cards are found -->
        <p class="text-center text-gray-600 mt-10">No cards available.</p>
    {/if}
</div>

{#if !player}
    <!-- Fallback if player data is not available -->
    <p class="text-center font-bold tracking-wide pt-90">Loading player details...</p>
{/if}
