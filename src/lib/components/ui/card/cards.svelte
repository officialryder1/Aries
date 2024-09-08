<script>
	import Card from "./card.svelte";
    import { createCard, updateProfile } from '$lib/utils/profile'
    
    export let cards
    export let user
    export let showSelect = true
   
    function submitCard(){
        showSelect = false
        updateProfile(user)

    }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each cards as {name, image, description, card_point, card_type, rarity, mana_point, can_nullify, attack_point, defense_point, id} }
        <Card {name} {image} {description} {card_point} {card_type} {rarity} {mana_point} {can_nullify} {defense_point} {attack_point} {id}>
            {#if showSelect}
            <button class="bg-blue-500 w-full rounded-lg mx-2 my-4 hover:bg-blue-600 transition-colors duration-300" on:click={() => createCard(id)}>select</button>
            {/if}
        </Card>
    {/each}
    {#if showSelect}
    <button class="bg-blue-500 w-full rounded-lg mx-2 my-4 hover:bg-blue-600 transition-colors duration-300" on:click={() => submitCard()}>load card</button>
    {/if}
</div>