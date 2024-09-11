<script>
    import {goto} from '$app/navigation'
    import { onMount, onDestroy } from 'svelte'
    import { pickCard } from '$lib/utils/game';
    // import {PUBLIC_IMAGE_URL} from '$env/static/public'
    import { getRarity, getType } from '$lib/utils/rarity.js';
    import { fetchCardDetail } from '$lib/utils/profile.js';

    export let data

    const user = data?.user.username
    const winner = data?.result.winner.username
    const match = data?.match

    $: loserCards = []
    onMount(async() => {
        loserCards = data?.result.loser_card
    })

    function submitPick(){
        pickCard()
    }
    console.log(user)
    console.log(winner)
    console.log(match)

    const card = data?.result.winning_card[0]
    // const getImageUrl = (path) => `${PUBLIC_IMAGE_URL}${path}`
    console.log(card)
    onDestroy(() => {
        loserCards = []
    })
</script>

<div class="p-8">
  {#if winner === user}
      <!-- Winner Information -->
    <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-green-500">🎉 Congratulations, {user} Wins! 🎉</h1>
    </div>

    <!-- Winning Card -->
    <div class="flex justify-center mb-12">
        <div class="bg-gray-800 rounded-lg p-6 max-w-sm">
            <h2 class="text-xl font-semibold text-center mb-4">Winning Card</h2>
            <div class="h-48 w-full mb-4">
                <img src={card.image} alt={data?.result.winning_card[0].name} class="h-full w-full object-cover rounded-lg" />
            </div>
            <p class="text-center text-lg font-bold">{data?.result.winning_card[0].name} - {getRarity(card.rarity)} rank</p>
            <p class="text-center text-gray-300 mb-4">{card.description}</p>
            <div class="flex justify-between">
                <span class="text-red-500 font-semibold pr-10">Attack: {card.attack_point}</span>
                <span class="text-blue-500 font-semibold">Defense: {card.defense_point}</span>
            </div>
        </div>
    </div>

    <!-- Loser Information -->
    <div class="text-center mb-4">
        <h2 class="text-3xl font-bold text-red-500">{data?.result.loser.username} lost</h2>
        <p class="text-gray-400">Here's the deck of cards {data?.result.loser.username} has in his collections:</p>
    </div>

    <!-- Loser's Deck -->
    <div class="flex overflow-x-auto gap-4">
        {#each loserCards as card}
            <div class="flex-shrink-0 bg-gray-800 h-80 w-48 rounded-lg p-3 flex flex-col items-center">
                <div class="w-full h-32 mb-4">
                    <img src={card.image} alt={card.name} class="h-full w-full object-cover rounded-md" />
                </div>
                <p class="text-center text-sm font-bold">{card.name}</p>
                <div class="flex justify-between mt-2 w-full">
                    <span class="text-red-500 font-semibold">Atk: {card.attack_point}</span>
                    <span class="text-blue-500 font-semibold">Def: {card.defense_point}</span>
                </div>
                <div class="flex justify-between mt-2 w-full">
                    <span class="text-blue-500 font-semibold">rarity: {getRarity(card.rarity)}</span>
                    <span class="text-red-500 font-semibold">mp: {card.mana_point}</span>
                </div>
                <span class="text-red-500 font-semibold">type: {getType(card.card_type)}</span>
                <div class="pt-3 w-full">
                    <button class="bg-red-600 rounded-sm p-1 w-full font-bold tracking-wide hover:bg-red-700 cursor-pointer transition-colors duration-300" on:click={pickCard(card.id, user )}>pick</button>
                </div>
            </div>
        {/each}
    </div>
  {:else}
    <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-red-500">{data?.result.message} {data?.user.username}😌😌</h1>
    </div>

       <!-- Winning Card -->
    <div class="flex justify-center mb-12">
        <div class="bg-gray-800 rounded-lg p-6 max-w-sm">
            <h2 class="text-xl font-semibold text-center mb-4">Winning Card</h2>
            <div class="h-48 w-full mb-4">
                <img src={card.image} alt={data?.result.winning_card[0].name} class="h-full w-full object-cover rounded-lg" />
            </div>
            <p class="text-center text-lg font-bold">{data?.result.winning_card[0].name} - {getRarity(card.rarity)} rank</p>
            <p class="text-center text-gray-300 mb-4">{card.description}</p>
            <div class="flex justify-between">
                <span class="text-red-500 font-semibold pr-10">Attack: {card.attack_point}</span>
                <span class="text-blue-500 font-semibold">Defense: {card.defense_point}</span>
            </div>
        </div>
    </div>
  {/if}
</div>
